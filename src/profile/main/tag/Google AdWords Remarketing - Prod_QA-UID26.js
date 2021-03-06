//~~tv:7115.20150714
//~~tc: Fixing a bug for checking the value of the send_ecom parameter.
//~~anlagnada: 04-Oct-2016  - added omgpixel fire

//tealium universal tag - utag.sender.7115 ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;

        // Please do not modify
        if (utag.ut === undefined) { utag.ut = {}; }
        // Start Tealium loader 4.35
        if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
        // End Tealium loader
        // Start Tealium typeOf 4.35
        if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
        // End Tealium typeOf

        u.ev = {"view" : 1};
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];

    ##UTGEN##

    u.send = function (a, b) {
        if (u.ev[a] || u.ev.all !== undefined) {
            //##UTENABLEDEBUG##utag.DB("send:##UTID##");

            var c, d, e, f, g;

            u.data = {
                //##UTVARconfig_<id from config>##
                "google_conversion_id" : "##UTVARconfig_id##",
                "pagetype" : "##UTVARconfig_pagetype##",
                "value" : "##UTVARconfig_value##",
                "send_ecom" : "##UTVARconfig_send_ecom##",
                "google_remarketing_only" : true,
                "base_url" : "//www.googleadservices.com/pagead/conversion_async.js",
                "params" : {},
                // E-Commerce Vars
                "product_id" : [],
                "product_category" : [],
                "product_quantity" : [],
                "product_unit_price" : []
            };

            // Start tag-scoped extensions
        ##UTEXTEND##
            // End tag-scoped extensions

            c = [], g = {};
            var prefix = "";

            u.data.google_custom_params = {};

            // Start Mapping
            for (d in utag.loader.GV(u.map)) {
                if (b[d] !== undefined && b[d] !== "") {
                    e = u.map[d].split(",");
                    for (f = 0; f < e.length; f++) {
                        prefix = /^ecomm\.|^hotel\.|^edu\.|^flight\.|^hrental\.|^job\.|^local\.|^listing\.|^travel\.|^dynx\./.exec(e[f]);
                        var prefix_custom = 'custom.';
                        if (prefix !== null){
                            prefix = prefix[0].slice(0, -1);
                            u.data.params[prefix] = u.data.params[prefix] || {};
                            u.data.params[prefix][e[f].substr(prefix.length + 1)] = b[d];
                        } else if (e[f].indexOf(prefix_custom) == 0) {
                            u.data.google_custom_params[e[f].substr(prefix_custom.length)] = b[d];
                        } else {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
            }
            if ((typeof b['isFlightConfirmation'] != 'undefined' && b['isFlightConfirmation']) 
                && (typeof b['bookingWindow'] != 'undefined' && b['bookingWindow'])) {
                if (parseInt(b['bookingWindow']) <= 30) {
                    u.data.google_custom_params['flightBookersMembershipTTL'] = '10';
                } else if (parseInt(b['bookingWindow']) > 30) {
                    u.data.google_custom_params['flightBookersMembershipTTL'] = '20';
                }
            }
            // End Mapping

            // Pull E-Commerce extension values
            // Mappings override E-Commerce extension values
            u.data.order_id = u.data.order_id || b._corder || "";
            u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
            if (u.data.product_id.length === 0 && b._cprod !== undefined) { u.data.product_id = b._cprod.slice(0); }
            if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
            if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
            if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { u.data.product_unit_price = b._cprice.slice(0); }


            u.data.google_conversion_id = parseInt(u.data.google_conversion_id);
            g.google_conversion_id = u.data.google_conversion_id;

            u.data.prod = u.data.prod || u.data.product_id;
            u.data.value = u.data.value || u.data.order_subtotal;


            for (d in u.data.params) {
                u.data.google_custom_params[d + "_pagetype"] = u.data.pagetype;
                if (u.data.order_id || /purchase|conversion|cart|conversionintent/.test(u.data.pagetype)) {
                    u.data.google_custom_params[d + "_totalvalue"] = u.data.value;
                }
                for (f in u.data.params[d]) {
                    u.data.google_custom_params[d + "_" + f] = u.data.params[d][f];
                }
            }

            if (u.data.send_ecom === "yes") {
                if (u.data.order_id) {
                    u.data.pagetype = "purchase";
                }

                u.data.google_custom_params.ecomm_prodid = u.data.prod;
                u.data.google_custom_params.ecomm_pagetype = u.data.pagetype;
                u.data.google_custom_params.ecomm_totalvalue = u.data.value;
                u.data.google_custom_params.ecomm_category = u.data.google_custom_params.ecomm_category || u.data.product_category;
                u.data.google_custom_params.ecomm_pvalue = u.data.google_custom_params.ecomm_pvalue || u.data.product_unit_price;
                u.data.google_custom_params.ecomm_quantity = u.data.google_custom_params.ecomm_quantity || u.data.product_quantity;
            }

            g.google_custom_params = u.data.google_custom_params;

            if (u.data.google_remarketing_only) { g.google_remarketing_only = u.data.google_remarketing_only; }

            // Start Loader Callback
            u.loader_cb = function (g) {
                u.initialized = true;
                window.google_trackConversion(g);
            };
            // End Loader Callback

            u.callBack = function () {
                var data = {};
                while (data = u.queue.shift()) {
                    u.loader_cb(data.g);
                }
            };

            if (u.initialized) {
                u.loader_cb(g);
            } else {
                u.queue.push({"g": g});
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    u.loader({"type": "script",  "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": 'utag_##UTID##' });
                }
            }
            
            omg.pixel.fireTagPixel({id: id, name: 'google-rlsa', label: 'Google Adwords RLSA', context: { u: u, b: b }});
            //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
        }
    };
        utag.o[loader].loader.LOAD(id);
    }("##UTID##", "##UTLOADERID##"));
} catch (error) {
    utag.DB(error);
}
//end tealium universal tag
