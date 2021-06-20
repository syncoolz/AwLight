! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 41)
}([function(e, t, n) {
    "use strict";
    var r = n(4),
        o = Object.prototype.toString;

    function i(e) {
        return "[object Array]" === o.call(e)
    }

    function a(e) {
        return void 0 === e
    }

    function s(e) {
        return null !== e && "object" == typeof e
    }

    function c(e) {
        return "[object Function]" === o.call(e)
    }

    function u(e, t) {
        if (null != e)
            if ("object" != typeof e && (e = [e]), i(e))
                for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
            else
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
    }
    e.exports = {
        isArray: i,
        isArrayBuffer: function(e) {
            return "[object ArrayBuffer]" === o.call(e)
        },
        isBuffer: function(e) {
            return null !== e && !a(e) && null !== e.constructor && !a(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        },
        isFormData: function(e) {
            return "undefined" != typeof FormData && e instanceof FormData
        },
        isArrayBufferView: function(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNumber: function(e) {
            return "number" == typeof e
        },
        isObject: s,
        isUndefined: a,
        isDate: function(e) {
            return "[object Date]" === o.call(e)
        },
        isFile: function(e) {
            return "[object File]" === o.call(e)
        },
        isBlob: function(e) {
            return "[object Blob]" === o.call(e)
        },
        isFunction: c,
        isStream: function(e) {
            return s(e) && c(e.pipe)
        },
        isURLSearchParams: function(e) {
            return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        },
        isStandardBrowserEnv: function() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
        },
        forEach: u,
        merge: function e() {
            var t = {};

            function n(n, r) {
                "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n
            }
            for (var r = 0, o = arguments.length; r < o; r++) u(arguments[r], n);
            return t
        },
        deepMerge: function e() {
            var t = {};

            function n(n, r) {
                "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n
            }
            for (var r = 0, o = arguments.length; r < o; r++) u(arguments[r], n);
            return t
        },
        extend: function(e, t, n) {
            return u(t, (function(t, o) {
                e[o] = n && "function" == typeof t ? r(t, n) : t
            })), e
        },
        trim: function(e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        }
    }
}, function(e, t, n) {
    "use strict";
    t.a = {
        usd: {
            id: 2781,
            name: "United States Dollar",
            symbol: "usd",
            token: "$",
            space: ""
        },
        all: {
            id: 3526,
            name: "Albanian Lek",
            symbol: "all",
            token: "L",
            space: ""
        },
        dzd: {
            id: 3537,
            name: "Algerian Dinar",
            symbol: "dzd",
            token: "Ø¯.Ø¬",
            space: ""
        },
        ars: {
            id: 2821,
            name: "Argentine Peso",
            symbol: "ars",
            token: "$",
            space: ""
        },
        amd: {
            id: 3527,
            name: "Armenian Dram",
            symbol: "amd",
            token: "Ö",
            space: ""
        },
        aud: {
            id: 2782,
            name: "Australian Dollar",
            symbol: "aud",
            token: "$",
            space: ""
        },
        azn: {
            id: 3528,
            name: "Azerbaijani Manat",
            symbol: "azn",
            token: "â‚¼",
            space: ""
        },
        bhd: {
            id: 3531,
            name: "Bahraini Dinar",
            symbol: "bhd",
            token: ".Ø¯.Ø¨",
            space: ""
        },
        bdt: {
            id: 3530,
            name: "Bangladeshi Taka",
            symbol: "bdt",
            token: "à§³",
            space: ""
        },
        byn: {
            id: 3533,
            name: "Belarusian Ruble",
            symbol: "byn",
            token: "Br",
            space: ""
        },
        bmd: {
            id: 3532,
            name: "Bermudan Dollar",
            symbol: "bmd",
            token: "$",
            space: ""
        },
        bob: {
            id: 2832,
            name: "Bolivian Boliviano",
            symbol: "bob",
            token: "Bs.",
            space: ""
        },
        bam: {
            id: 3529,
            name: "Bosnia-Herzegovina Convertible Mark",
            symbol: "bam",
            token: "KM",
            space: ""
        },
        brl: {
            id: 2783,
            name: "Brazilian Real",
            symbol: "brl",
            token: "R$",
            space: ""
        },
        bgn: {
            id: 2814,
            name: "Bulgarian Lev",
            symbol: "bgn",
            token: "Ð»Ð²",
            space: ""
        },
        khr: {
            id: 3549,
            name: "Cambodian Riel",
            symbol: "khr",
            token: "áŸ›",
            space: ""
        },
        cad: {
            id: 2784,
            name: "Canadian Dollar",
            symbol: "cad",
            token: "$",
            space: ""
        },
        clp: {
            id: 2786,
            name: "Chilean Peso",
            symbol: "clp",
            token: "$",
            space: ""
        },
        cny: {
            id: 2787,
            name: "Chinese Yuan",
            symbol: "cny",
            token: "Â¥",
            space: ""
        },
        cop: {
            id: 2820,
            name: "Colombian Peso",
            symbol: "cop",
            token: "$",
            space: ""
        },
        crc: {
            id: 3534,
            name: "Costa Rican ColÃ³n",
            symbol: "crc",
            token: "â‚¡",
            space: ""
        },
        hrk: {
            id: 2815,
            name: "Croatian Kuna",
            symbol: "hrk",
            token: "kn",
            space: ""
        },
        cup: {
            id: 3535,
            name: "Cuban Peso",
            symbol: "cup",
            token: "$",
            space: ""
        },
        czk: {
            id: 2788,
            name: "Czech Koruna",
            symbol: "czk",
            token: "KÄ",
            space: ""
        },
        dkk: {
            id: 2789,
            name: "Danish Krone",
            symbol: "dkk",
            token: "kr",
            space: ". "
        },
        dop: {
            id: 3536,
            name: "Dominican Peso",
            symbol: "dop",
            token: "$",
            space: ""
        },
        egp: {
            id: 3538,
            name: "Egyptian Pound",
            symbol: "egp",
            token: "Â£",
            space: ""
        },
        eur: {
            id: 2790,
            name: "Euro",
            symbol: "eur",
            token: "â‚¬",
            space: ""
        },
        gel: {
            id: 3539,
            name: "Georgian Lari",
            symbol: "gel",
            token: "â‚¾",
            space: ""
        },
        ghs: {
            id: 3540,
            name: "Ghanaian Cedi",
            symbol: "ghs",
            token: "â‚µ",
            space: ""
        },
        gtq: {
            id: 3541,
            name: "Guatemalan Quetzal",
            symbol: "gtq",
            token: "Q",
            space: ""
        },
        hnl: {
            id: 3542,
            name: "Honduran Lempira",
            symbol: "hnl",
            token: "L",
            space: ""
        },
        hkd: {
            id: 2792,
            name: "Hong Kong Dollar",
            symbol: "hkd",
            token: "$",
            space: ""
        },
        huf: {
            id: 2793,
            name: "Hungarian Forint",
            symbol: "huf",
            token: "Ft",
            space: " "
        },
        isk: {
            id: 2818,
            name: "Icelandic KrÃ³na",
            symbol: "isk",
            token: "kr",
            space: ""
        },
        inr: {
            id: 2796,
            name: "Indian Rupee",
            symbol: "inr",
            token: "â‚¹",
            space: ""
        },
        idr: {
            id: 2794,
            name: "Indonesian Rupiah",
            symbol: "idr",
            token: "Rp",
            space: " "
        },
        irr: {
            id: 3544,
            name: "Iranian Rial",
            symbol: "irr",
            token: "ï·¼",
            space: ""
        },
        iqd: {
            id: 3543,
            name: "Iraqi Dinar",
            symbol: "iqd",
            token: "Ø¹.Ø¯",
            space: ""
        },
        ils: {
            id: 2795,
            name: "Israeli New Shekel",
            symbol: "ils",
            token: "â‚ª",
            space: ""
        },
        jmd: {
            id: 3545,
            name: "Jamaican Dollar",
            symbol: "jmd",
            token: "$",
            space: ""
        },
        jpy: {
            id: 2797,
            name: "Japanese Yen",
            symbol: "jpy",
            token: "Â¥",
            space: ""
        },
        jod: {
            id: 3546,
            name: "Jordanian Dinar",
            symbol: "jod",
            token: "Ø¯.Ø§",
            space: ""
        },
        kzt: {
            id: 3551,
            name: "Kazakhstani Tenge",
            symbol: "kzt",
            token: "â‚¸",
            space: ""
        },
        kes: {
            id: 3547,
            name: "Kenyan Shilling",
            symbol: "kes",
            token: "Sh",
            space: ""
        },
        kwd: {
            id: 3550,
            name: "Kuwaiti Dinar",
            symbol: "kwd",
            token: "Ø¯.Ùƒ",
            space: ""
        },
        kgs: {
            id: 3548,
            name: "Kyrgystani Som",
            symbol: "kgs",
            token: "Ñ",
            space: ""
        },
        lbp: {
            id: 3552,
            name: "Lebanese Pound",
            symbol: "lbp",
            token: "Ù„.Ù„",
            space: ""
        },
        mkd: {
            id: 3556,
            name: "Macedonian Denar",
            symbol: "mkd",
            token: "Ð´ÐµÐ½",
            space: ""
        },
        myr: {
            id: 2800,
            name: "Malaysian Ringgit",
            symbol: "myr",
            token: "RM",
            space: ""
        },
        mur: {
            id: 2816,
            name: "Mauritian Rupee",
            symbol: "mur",
            token: "â‚¨",
            space: ""
        },
        mxn: {
            id: 2799,
            name: "Mexican Peso",
            symbol: "mxn",
            token: "$",
            space: ""
        },
        mdl: {
            id: 3555,
            name: "Moldovan Leu",
            symbol: "mdl",
            token: "L",
            space: ""
        },
        mnt: {
            id: 3558,
            name: "Mongolian Tugrik",
            symbol: "mnt",
            token: "â‚®",
            space: ""
        },
        mad: {
            id: 3554,
            name: "Moroccan Dirham",
            symbol: "mad",
            token: "Ø¯.Ù….",
            space: ""
        },
        mmk: {
            id: 3557,
            name: "Myanma Kyat",
            symbol: "mmk",
            token: "Ks",
            space: ""
        },
        nad: {
            id: 3559,
            name: "Namibian Dollar",
            symbol: "nad",
            token: "$",
            space: ""
        },
        npr: {
            id: 3561,
            name: "Nepalese Rupee",
            symbol: "npr",
            token: "â‚¨",
            space: ""
        },
        twd: {
            id: 2811,
            name: "New Taiwan Dollar",
            symbol: "twd",
            token: "NT$",
            space: ""
        },
        nzd: {
            id: 2802,
            name: "New Zealand Dollar",
            symbol: "nzd",
            token: "$",
            space: ""
        },
        nio: {
            id: 3560,
            name: "Nicaraguan CÃ³rdoba",
            symbol: "nio",
            token: "C$",
            space: ""
        },
        ngn: {
            id: 2819,
            name: "Nigerian Naira",
            symbol: "ngn",
            token: "â‚¦",
            space: ""
        },
        nok: {
            id: 2801,
            name: "Norwegian Krone",
            symbol: "nok",
            token: "kr",
            space: " "
        },
        omr: {
            id: 3562,
            name: "Omani Rial",
            symbol: "omr",
            token: "Ø±.Ø¹.",
            space: ""
        },
        pkr: {
            id: 2804,
            name: "Pakistani Rupee",
            symbol: "pkr",
            token: "â‚¨",
            space: " "
        },
        pab: {
            id: 3563,
            name: "Panamanian Balboa",
            symbol: "pab",
            token: "B/.",
            space: ""
        },
        pen: {
            id: 2822,
            name: "Peruvian Sol",
            symbol: "pen",
            token: "S/.",
            space: ""
        },
        php: {
            id: 2803,
            name: "Philippine Peso",
            symbol: "php",
            token: "â‚±",
            space: ""
        },
        pln: {
            id: 2805,
            name: "Polish ZÅ‚oty",
            symbol: "pln",
            token: "zÅ‚",
            space: ""
        },
        gbp: {
            id: 2791,
            name: "Pound Sterling",
            symbol: "gbp",
            token: "Â£",
            space: ""
        },
        qar: {
            id: 3564,
            name: "Qatari Rial",
            symbol: "qar",
            token: "Ø±.Ù‚",
            space: ""
        },
        ron: {
            id: 2817,
            name: "Romanian Leu",
            symbol: "ron",
            token: "lei",
            space: ""
        },
        rub: {
            id: 2806,
            name: "Russian Ruble",
            symbol: "rub",
            token: "â‚½",
            space: ""
        },
        sar: {
            id: 3566,
            name: "Saudi Riyal",
            symbol: "sar",
            token: "Ø±.Ø³",
            space: ""
        },
        rsd: {
            id: 3565,
            name: "Serbian Dinar",
            symbol: "rsd",
            token: "Ð´Ð¸Ð½.",
            space: ""
        },
        sgd: {
            id: 2808,
            name: "Singapore Dollar",
            symbol: "sgd",
            token: "S$",
            space: ""
        },
        zar: {
            id: 2812,
            name: "South African Rand",
            symbol: "zar",
            token: "R",
            space: " "
        },
        krw: {
            id: 2798,
            name: "South Korean Won",
            symbol: "krw",
            token: "â‚©",
            space: ""
        },
        ssp: {
            id: 3567,
            name: "South Sudanese Pound",
            symbol: "ssp",
            token: "Â£",
            space: ""
        },
        ves: {
            id: 3573,
            name: "Sovereign Bolivar",
            symbol: "ves",
            token: "Bs.",
            space: ""
        },
        lkr: {
            id: 3553,
            name: "Sri Lankan Rupee",
            symbol: "lkr",
            token: "Rs",
            space: ""
        },
        sek: {
            id: 2807,
            name: "Swedish Krona",
            symbol: "sek",
            token: "kr",
            space: " "
        },
        chf: {
            id: 2785,
            name: "Swiss Franc",
            symbol: "chf",
            token: "Fr",
            space: ". "
        },
        thb: {
            id: 2809,
            name: "Thai Baht",
            symbol: "thb",
            token: "฿",
            space: ""
        },
        ttd: {
            id: 3569,
            name: "Trinidad and Tobago Dollar",
            symbol: "ttd",
            token: "$",
            space: ""
        },
        tnd: {
            id: 3568,
            name: "Tunisian Dinar",
            symbol: "tnd",
            token: "Ø¯.Øª",
            space: ""
        },
        try: {
            id: 2810,
            name: "Turkish Lira",
            symbol: "try",
            token: "â‚º",
            space: ""
        },
        ugx: {
            id: 3570,
            name: "Ugandan Shilling",
            symbol: "ugx",
            token: "Sh",
            space: ""
        },
        uah: {
            id: 2824,
            name: "Ukrainian Hryvnia",
            symbol: "uah",
            token: "â‚´",
            space: ""
        },
        aed: {
            id: 2813,
            name: "United Arab Emirates Dirham",
            symbol: "aed",
            token: "Ø¯.Ø¥",
            space: ""
        },
        uyu: {
            id: 3571,
            name: "Uruguayan Peso",
            symbol: "uyu",
            token: "$",
            space: ""
        },
        uzs: {
            id: 3572,
            name: "Uzbekistan Som",
            symbol: "uzs",
            token: "so'm",
            space: ""
        },
        vnd: {
            id: 2823,
            name: "Vietnamese Dong",
            symbol: "vnd",
            token: "â‚«",
            space: ""
        }
    }
}, function(e, t, n) {
    e.exports = n(15)
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", (function() {
        return i
    })), n.d(t, "a", (function() {
        return a
    }));
    var r = n(1),
        o = function(e) {
            return r.a[e.toLowerCase()].token
        },
        i = function(e, t) {
            return e < 1 ? o(t) + e.toFixed(6) : e > 0 ? o(t) + s(e.toFixed(2)) : void 0
        },
        a = function(e) {
            return Number(e.toFixed(3).slice(0, -1))
        },
        s = function(e) {
            return (e += "").includes(".") || (e += "."), e.replace(/(\d)(?=(\d{3})+\.)/g, (function(e, t) {
                return t + ","
            })).replace(/\.$/, "")
        }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return function() {
            for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
            return e.apply(t, n)
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);

    function o(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    e.exports = function(e, t, n) {
        if (!t) return e;
        var i;
        if (n) i = n(t);
        else if (r.isURLSearchParams(t)) i = t.toString();
        else {
            var a = [];
            r.forEach(t, (function(e, t) {
                null != e && (r.isArray(e) ? t += "[]" : e = [e], r.forEach(e, (function(e) {
                    r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), a.push(o(t) + "=" + o(e))
                })))
            })), i = a.join("&")
        }
        if (i) {
            var s = e.indexOf("#"); - 1 !== s && (e = e.slice(0, s)), e += (-1 === e.indexOf("?") ? "?" : "&") + i
        }
        return e
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return !(!e || !e.__CANCEL__)
    }
}, function(e, t, n) {
    "use strict";
    (function(t) {
        var r = n(0),
            o = n(24),
            i = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

        function a(e, t) {
            !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
        }
        var s, c = {
            adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== t && "[object process]" === Object.prototype.toString.call(t)) && (s = n(8)), s),
            transformRequest: [function(e, t) {
                return o(t, "Accept"), o(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (a(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
            }],
            transformResponse: [function(e) {
                if ("string" == typeof e) try {
                    e = JSON.parse(e)
                } catch (e) {}
                return e
            }],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function(e) {
                return e >= 200 && e < 300
            }
        };
        c.headers = {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }, r.forEach(["delete", "get", "head"], (function(e) {
            c.headers[e] = {}
        })), r.forEach(["post", "put", "patch"], (function(e) {
            c.headers[e] = r.merge(i)
        })), e.exports = c
    }).call(this, n(23))
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(25),
        i = n(5),
        a = n(27),
        s = n(30),
        c = n(31),
        u = n(9);
    e.exports = function(e) {
        return new Promise((function(t, l) {
            var d = e.data,
                p = e.headers;
            r.isFormData(d) && delete p["Content-Type"];
            var m = new XMLHttpRequest;
            if (e.auth) {
                var f = e.auth.username || "",
                    h = e.auth.password || "";
                p.Authorization = "Basic " + btoa(f + ":" + h)
            }
            var C = a(e.baseURL, e.url);
            if (m.open(e.method.toUpperCase(), i(C, e.params, e.paramsSerializer), !0), m.timeout = e.timeout, m.onreadystatechange = function() {
                    if (m && 4 === m.readyState && (0 !== m.status || m.responseURL && 0 === m.responseURL.indexOf("file:"))) {
                        var n = "getAllResponseHeaders" in m ? s(m.getAllResponseHeaders()) : null,
                            r = {
                                data: e.responseType && "text" !== e.responseType ? m.response : m.responseText,
                                status: m.status,
                                statusText: m.statusText,
                                headers: n,
                                config: e,
                                request: m
                            };
                        o(t, l, r), m = null
                    }
                }, m.onabort = function() {
                    m && (l(u("Request aborted", e, "ECONNABORTED", m)), m = null)
                }, m.onerror = function() {
                    l(u("Network Error", e, null, m)), m = null
                }, m.ontimeout = function() {
                    var t = "timeout of " + e.timeout + "ms exceeded";
                    e.timeoutErrorMessage && (t = e.timeoutErrorMessage), l(u(t, e, "ECONNABORTED", m)), m = null
                }, r.isStandardBrowserEnv()) {
                var y = n(32),
                    g = (e.withCredentials || c(C)) && e.xsrfCookieName ? y.read(e.xsrfCookieName) : void 0;
                g && (p[e.xsrfHeaderName] = g)
            }
            if ("setRequestHeader" in m && r.forEach(p, (function(e, t) {
                    void 0 === d && "content-type" === t.toLowerCase() ? delete p[t] : m.setRequestHeader(t, e)
                })), r.isUndefined(e.withCredentials) || (m.withCredentials = !!e.withCredentials), e.responseType) try {
                m.responseType = e.responseType
            } catch (t) {
                if ("json" !== e.responseType) throw t
            }
            "function" == typeof e.onDownloadProgress && m.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && m.upload && m.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function(e) {
                m && (m.abort(), l(e), m = null)
            })), void 0 === d && (d = null), m.send(d)
        }))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(26);
    e.exports = function(e, t, n, o, i) {
        var a = new Error(e);
        return r(a, t, n, o, i)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e, t) {
        t = t || {};
        var n = {},
            o = ["url", "method", "params", "data"],
            i = ["headers", "auth", "proxy"],
            a = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];
        r.forEach(o, (function(e) {
            void 0 !== t[e] && (n[e] = t[e])
        })), r.forEach(i, (function(o) {
            r.isObject(t[o]) ? n[o] = r.deepMerge(e[o], t[o]) : void 0 !== t[o] ? n[o] = t[o] : r.isObject(e[o]) ? n[o] = r.deepMerge(e[o]) : void 0 !== e[o] && (n[o] = e[o])
        })), r.forEach(a, (function(r) {
            void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
        }));
        var s = o.concat(i).concat(a),
            c = Object.keys(t).filter((function(e) {
                return -1 === s.indexOf(e)
            }));
        return r.forEach(c, (function(r) {
            void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
        })), n
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        this.message = e
    }
    r.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }, r.prototype.__CANCEL__ = !0, e.exports = r
}, function(e, t) {
    function n(e, t, n, r, o, i, a) {
        try {
            var s = e[i](a),
                c = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(r, o)
    }
    e.exports = function(e) {
        return function() {
            var t = this,
                r = arguments;
            return new Promise((function(o, i) {
                var a = e.apply(t, r);

                function s(e) {
                    n(a, o, i, s, c, "next", e)
                }

                function c(e) {
                    n(a, o, i, s, c, "throw", e)
                }
                s(void 0)
            }))
        }
    }
}, function(e, t, n) {
    e.exports = n(18)
}, function(e, t, n) {
    "use strict";
    t.a = {
        development: {
            url: {
                api: "api",
                widgetApi: "/widget-api"
            }
        },
        production: {
            url: {
                api: "https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/top",
                widgetApi: "https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget"
            }
        }
    }
}, function(e, t, n) {
    var r = function(e) {
        "use strict";
        var t, n = Object.prototype,
            r = n.hasOwnProperty,
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            s = o.toStringTag || "@@toStringTag";

        function c(e, t, n, r) {
            var o = t && t.prototype instanceof h ? t : h,
                i = Object.create(o.prototype),
                a = new E(r || []);
            return i._invoke = function(e, t, n) {
                var r = l;
                return function(o, i) {
                    if (r === p) throw new Error("Generator is already running");
                    if (r === m) {
                        if ("throw" === o) throw i;
                        return M()
                    }
                    for (n.method = o, n.arg = i;;) {
                        var a = n.delegate;
                        if (a) {
                            var s = q(a, n);
                            if (s) {
                                if (s === f) continue;
                                return s
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if (r === l) throw r = m, n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = p;
                        var c = u(e, t, n);
                        if ("normal" === c.type) {
                            if (r = n.done ? m : d, c.arg === f) continue;
                            return {
                                value: c.arg,
                                done: n.done
                            }
                        }
                        "throw" === c.type && (r = m, n.method = "throw", n.arg = c.arg)
                    }
                }
            }(e, n, a), i
        }

        function u(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = c;
        var l = "suspendedStart",
            d = "suspendedYield",
            p = "executing",
            m = "completed",
            f = {};

        function h() {}

        function C() {}

        function y() {}
        var g = {};
        g[i] = function() {
            return this
        };
        var v = Object.getPrototypeOf,
            b = v && v(v(S([])));
        b && b !== n && r.call(b, i) && (g = b);
        var k = y.prototype = h.prototype = Object.create(g);

        function w(e) {
            ["next", "throw", "return"].forEach((function(t) {
                e[t] = function(e) {
                    return this._invoke(t, e)
                }
            }))
        }

        function x(e, t) {
            var n;
            this._invoke = function(o, i) {
                function a() {
                    return new t((function(n, a) {
                        ! function n(o, i, a, s) {
                            var c = u(e[o], e, i);
                            if ("throw" !== c.type) {
                                var l = c.arg,
                                    d = l.value;
                                return d && "object" == typeof d && r.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                                    n("next", e, a, s)
                                }), (function(e) {
                                    n("throw", e, a, s)
                                })) : t.resolve(d).then((function(e) {
                                    l.value = e, a(l)
                                }), (function(e) {
                                    return n("throw", e, a, s)
                                }))
                            }
                            s(c.arg)
                        }(o, i, n, a)
                    }))
                }
                return n = n ? n.then(a, a) : a()
            }
        }

        function q(e, n) {
            var r = e.iterator[n.method];
            if (r === t) {
                if (n.delegate = null, "throw" === n.method) {
                    if (e.iterator.return && (n.method = "return", n.arg = t, q(e, n), "throw" === n.method)) return f;
                    n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return f
            }
            var o = u(r, e.iterator, n.arg);
            if ("throw" === o.type) return n.method = "throw", n.arg = o.arg, n.delegate = null, f;
            var i = o.arg;
            return i ? i.done ? (n[e.resultName] = i.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, f) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, f)
        }

        function L(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function _(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function E(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(L, this), this.reset(!0)
        }

        function S(e) {
            if (e) {
                var n = e[i];
                if (n) return n.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var o = -1,
                        a = function n() {
                            for (; ++o < e.length;)
                                if (r.call(e, o)) return n.value = e[o], n.done = !1, n;
                            return n.value = t, n.done = !0, n
                        };
                    return a.next = a
                }
            }
            return {
                next: M
            }
        }

        function M() {
            return {
                value: t,
                done: !0
            }
        }
        return C.prototype = k.constructor = y, y.constructor = C, y[s] = C.displayName = "GeneratorFunction", e.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === C || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, s in e || (e[s] = "GeneratorFunction")), e.prototype = Object.create(k), e
        }, e.awrap = function(e) {
            return {
                __await: e
            }
        }, w(x.prototype), x.prototype[a] = function() {
            return this
        }, e.AsyncIterator = x, e.async = function(t, n, r, o, i) {
            void 0 === i && (i = Promise);
            var a = new x(c(t, n, r, o), i);
            return e.isGeneratorFunction(n) ? a : a.next().then((function(e) {
                return e.done ? e.value : a.next()
            }))
        }, w(k), k[s] = "Generator", k[i] = function() {
            return this
        }, k.toString = function() {
            return "[object Generator]"
        }, e.keys = function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t.reverse(),
                function n() {
                    for (; t.length;) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n
                    }
                    return n.done = !0, n
                }
        }, e.values = S, E.prototype = {
            constructor: E,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(_), !e)
                    for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var n = this;

                function o(r, o) {
                    return s.type = "throw", s.arg = e, n.next = r, o && (n.method = "next", n.arg = t), !!o
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i],
                        s = a.completion;
                    if ("root" === a.tryLoc) return o("end");
                    if (a.tryLoc <= this.prev) {
                        var c = r.call(a, "catchLoc"),
                            u = r.call(a, "finallyLoc");
                        if (c && u) {
                            if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                            if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                        } else if (c) {
                            if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n];
                    if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, f) : this.complete(a)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), f
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), _(n), f
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var o = r.arg;
                            _(n)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, n, r) {
                return this.delegate = {
                    iterator: S(e),
                    resultName: n,
                    nextLoc: r
                }, "next" === this.method && (this.arg = t), f
            }
        }, e
    }(e.exports);
    try {
        regeneratorRuntime = r
    } catch (e) {
        Function("r", "regeneratorRuntime = r")(r)
    }
}, function(e, t, n) {
    "use strict";
    var r, o = function() {
            return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r
        },
        i = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var n = document.querySelector(t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (e) {
                        n = null
                    }
                    e[t] = n
                }
                return e[t]
            }
        }(),
        a = [];

    function s(e) {
        for (var t = -1, n = 0; n < a.length; n++)
            if (a[n].identifier === e) {
                t = n;
                break
            } return t
    }

    function c(e, t) {
        for (var n = {}, r = [], o = 0; o < e.length; o++) {
            var i = e[o],
                c = t.base ? i[0] + t.base : i[0],
                u = n[c] || 0,
                l = "".concat(c, " ").concat(u);
            n[c] = u + 1;
            var d = s(l),
                p = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                }; - 1 !== d ? (a[d].references++, a[d].updater(p)) : a.push({
                identifier: l,
                updater: C(p, t),
                references: 1
            }), r.push(l)
        }
        return r
    }

    function u(e) {
        var t = document.createElement("style"),
            r = e.attributes || {};
        if (void 0 === r.nonce) {
            var o = n.nc;
            o && (r.nonce = o)
        }
        if (Object.keys(r).forEach((function(e) {
                t.setAttribute(e, r[e])
            })), "function" == typeof e.insert) e.insert(t);
        else {
            var a = i(e.insert || "head");
            if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            a.appendChild(t)
        }
        return t
    }
    var l, d = (l = [], function(e, t) {
        return l[e] = t, l.filter(Boolean).join("\n")
    });

    function p(e, t, n, r) {
        var o = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (e.styleSheet) e.styleSheet.cssText = d(t, o);
        else {
            var i = document.createTextNode(o),
                a = e.childNodes;
            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
        }
    }

    function m(e, t, n) {
        var r = n.css,
            o = n.media,
            i = n.sourceMap;
        if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), e.styleSheet) e.styleSheet.cssText = r;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(r))
        }
    }
    var f = null,
        h = 0;

    function C(e, t) {
        var n, r, o;
        if (t.singleton) {
            var i = h++;
            n = f || (f = u(t)), r = p.bind(null, n, i, !1), o = p.bind(null, n, i, !0)
        } else n = u(t), r = m.bind(null, n, t), o = function() {
            ! function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e)
            }(n)
        };
        return r(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else o()
            }
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
        var n = c(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var r = 0; r < n.length; r++) {
                    var o = s(n[r]);
                    a[o].references--
                }
                for (var i = c(e, t), u = 0; u < n.length; u++) {
                    var l = s(n[u]);
                    0 === a[l].references && (a[l].updater(), a.splice(l, 1))
                }
                n = i
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "",
                        r = e[3];
                    if (!r) return n;
                    if (t && "function" == typeof btoa) {
                        var o = (a = r, s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s), "/*# ".concat(c, " */")),
                            i = r.sources.map((function(e) {
                                return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */")
                            }));
                        return [n].concat(i).concat([o]).join("\n")
                    }
                    var a, s, c;
                    return [n].join("\n")
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n
            })).join("")
        }, t.i = function(e, n, r) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            var o = {};
            if (r)
                for (var i = 0; i < this.length; i++) {
                    var a = this[i][0];
                    null != a && (o[a] = !0)
                }
            for (var s = 0; s < e.length; s++) {
                var c = [].concat(e[s]);
                r && o[c[0]] || (n && (c[2] ? c[2] = "".concat(n, " and ").concat(c[2]) : c[2] = n), t.push(c))
            }
        }, t
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(4),
        i = n(19),
        a = n(10);

    function s(e) {
        var t = new i(e),
            n = o(i.prototype.request, t);
        return r.extend(n, i.prototype, t), r.extend(n, t), n
    }
    var c = s(n(7));
    c.Axios = i, c.create = function(e) {
        return s(a(c.defaults, e))
    }, c.Cancel = n(11), c.CancelToken = n(33), c.isCancel = n(6), c.all = function(e) {
        return Promise.all(e)
    }, c.spread = n(34), e.exports = c, e.exports.default = c
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(5),
        i = n(20),
        a = n(21),
        s = n(10);

    function c(e) {
        this.defaults = e, this.interceptors = {
            request: new i,
            response: new i
        }
    }
    c.prototype.request = function(e) {
        "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
        var t = [a, void 0],
            n = Promise.resolve(e);
        for (this.interceptors.request.forEach((function(e) {
                t.unshift(e.fulfilled, e.rejected)
            })), this.interceptors.response.forEach((function(e) {
                t.push(e.fulfilled, e.rejected)
            })); t.length;) n = n.then(t.shift(), t.shift());
        return n
    }, c.prototype.getUri = function(e) {
        return e = s(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
    }, r.forEach(["delete", "get", "head", "options"], (function(e) {
        c.prototype[e] = function(t, n) {
            return this.request(r.merge(n || {}, {
                method: e,
                url: t
            }))
        }
    })), r.forEach(["post", "put", "patch"], (function(e) {
        c.prototype[e] = function(t, n, o) {
            return this.request(r.merge(o || {}, {
                method: e,
                url: t,
                data: n
            }))
        }
    })), e.exports = c
}, function(e, t, n) {
    "use strict";
    var r = n(0);

    function o() {
        this.handlers = []
    }
    o.prototype.use = function(e, t) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t
        }), this.handlers.length - 1
    }, o.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }, o.prototype.forEach = function(e) {
        r.forEach(this.handlers, (function(t) {
            null !== t && e(t)
        }))
    }, e.exports = o
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(22),
        i = n(6),
        a = n(7);

    function s(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }
    e.exports = function(e) {
        return s(e), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
            delete e.headers[t]
        })), (e.adapter || a.adapter)(e).then((function(t) {
            return s(e), t.data = o(t.data, t.headers, e.transformResponse), t
        }), (function(t) {
            return i(t) || (s(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
        }))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e, t, n) {
        return r.forEach(n, (function(n) {
            e = n(e, t)
        })), e
    }
}, function(e, t) {
    var n, r, o = e.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            n = i
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            r = a
        }
    }();
    var c, u = [],
        l = !1,
        d = -1;

    function p() {
        l && c && (l = !1, c.length ? u = c.concat(u) : d = -1, u.length && m())
    }

    function m() {
        if (!l) {
            var e = s(p);
            l = !0;
            for (var t = u.length; t;) {
                for (c = u, u = []; ++d < t;) c && c[d].run();
                d = -1, t = u.length
            }
            c = null, l = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new f(e, t)), 1 !== u.length || l || s(m)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function(e) {
        return []
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e, t) {
        r.forEach(e, (function(n, r) {
            r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
        }))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(9);
    e.exports = function(e, t, n) {
        var o = n.config.validateStatus;
        !o || o(n.status) ? e(n) : t(r("Request failed with status code " + n.status, n.config, null, n.request, n))
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r, o) {
        return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code
            }
        }, e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        o = n(29);
    e.exports = function(e, t) {
        return e && !r(t) ? o(e, t) : t
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function(e) {
        var t, n, i, a = {};
        return e ? (r.forEach(e.split("\n"), (function(e) {
            if (i = e.indexOf(":"), t = r.trim(e.substr(0, i)).toLowerCase(), n = r.trim(e.substr(i + 1)), t) {
                if (a[t] && o.indexOf(t) >= 0) return;
                a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ", " + n : n
            }
        })), a) : a
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = r.isStandardBrowserEnv() ? function() {
        var e, t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");

        function o(e) {
            var r = e;
            return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
            }
        }
        return e = o(window.location.href),
            function(t) {
                var n = r.isString(t) ? o(t) : t;
                return n.protocol === e.protocol && n.host === e.host
            }
    }() : function() {
        return !0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = r.isStandardBrowserEnv() ? {
        write: function(e, t, n, o, i, a) {
            var s = [];
            s.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(o) && s.push("path=" + o), r.isString(i) && s.push("domain=" + i), !0 === a && s.push("secure"), document.cookie = s.join("; ")
        },
        read: function(e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove: function(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
}, function(e, t, n) {
    "use strict";
    var r = n(11);

    function o(e) {
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise((function(e) {
            t = e
        }));
        var n = this;
        e((function(e) {
            n.reason || (n.reason = new r(e), t(n.reason))
        }))
    }
    o.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason
    }, o.source = function() {
        var e;
        return {
            token: new o((function(t) {
                e = t
            })),
            cancel: e
        }
    }, e.exports = o
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return function(t) {
            return e.apply(null, t)
        }
    }
}, , , , , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(2),
        o = n.n(r),
        i = n(12),
        a = n.n(i),
        s = (n(42), n(13)),
        c = n.n(s),
        u = n(3),
        l = n(14),
        d = n(1),
        p = function() {
            document.querySelector(".coin-marquee-container__skeleton").remove()
        },
        m = function(e, t) {
            var n = document.createElement("div");
            n.setAttribute("class", "coin-marquee-wrapper coin-marquee-wrapper--".concat(e, " ").concat(t ? "coin-marquee-wrapper--transparent" : ""));
            var r = "\n    <div class='coin-marquee-header'>\n      <div class='coin-marquee-header-signature'>\n        <a href='https://coinmarketcap.com/' target='_blank'>\n            <div class='coin-marquee-signature__power-by'>Powered by</div>\n            ".concat("dark" === e ? '<svg width="94" height="16" viewBox="0 0 94 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M13.7573 9.56098C13.4773 9.73737 13.1475 9.75922 12.8968 9.61834C12.5784 9.43922 12.4033 9.01971 12.4033 8.43629V6.69073C12.4033 5.84781 12.0688 5.248 11.5095 5.08605C10.5616 4.81093 9.84878 5.96644 9.58087 6.40039L7.90918 9.10088V5.8002C7.89038 5.04078 7.64284 4.58654 7.17283 4.44956C6.86183 4.35902 6.39652 4.39532 5.94452 5.08449L2.19928 11.0763C1.69788 10.1279 1.4365 9.0719 1.43785 8C1.43785 4.39063 4.34098 1.45444 7.90918 1.45444C11.4774 1.45444 14.3801 4.39063 14.3801 8C14.3801 8.00624 14.3817 8.01171 14.3821 8.01756C14.3821 8.0238 14.3809 8.02927 14.3813 8.03551C14.415 8.73444 14.1878 9.29054 13.7573 9.56137V9.56098ZM15.818 8.00039V8V7.98205L15.8176 7.9641C15.7976 3.56839 12.258 0 7.90879 0C3.54822 0 0 3.58868 0 8C0 12.4109 3.54822 16 7.90918 16C9.91027 16 11.8201 15.2421 13.2862 13.8665C13.5776 13.5934 13.5948 13.1333 13.3245 12.839C13.196 12.6978 13.0159 12.6141 12.8248 12.6068C12.6336 12.5995 12.4476 12.6691 12.3085 12.8C11.1202 13.9212 9.54576 14.5459 7.90918 14.5456C5.99857 14.5456 4.27949 13.703 3.09388 12.3668L6.47133 6.96351V9.45444C6.47133 10.6509 6.93704 11.0377 7.32754 11.1508C7.71844 11.264 8.31575 11.1867 8.94283 10.1721L10.8006 7.17151C10.8601 7.07473 10.9149 6.99122 10.9651 6.91902V8.43629C10.9651 9.55473 11.4147 10.4492 12.1985 10.8898C12.9051 11.287 13.7934 11.2511 14.5172 10.7961C15.3946 10.2439 15.8673 9.22654 15.818 8.00039ZM26.8293 5.26712C27.0192 5.38224 27.1837 5.63824 27.1837 5.86888C27.1837 6.24 26.8673 6.54712 26.5128 6.54712C26.4243 6.54712 26.3357 6.52176 26.2598 6.496C25.8418 6.18888 25.3103 5.984 24.7534 5.984C23.4373 5.984 22.5259 7.05912 22.5259 8.39024C22.5259 9.72176 23.4373 10.784 24.7534 10.784C25.4114 10.784 25.9938 10.5151 26.4368 10.1058C26.5512 10.0238 26.6883 9.97908 26.8293 9.97776C27.1837 9.97776 27.4622 10.2591 27.4622 10.6178C27.4622 10.848 27.3228 11.0529 27.1457 11.168C26.5128 11.7058 25.6523 12.064 24.7663 12.064C22.7413 12.064 21.0955 10.4 21.0955 8.352C21.0955 6.304 22.7409 4.64 24.7663 4.64C25.5258 4.64 26.2468 4.87024 26.8293 5.26712ZM30.5322 6.816C31.9117 6.816 33.0762 7.98088 33.0762 9.41424C33.0762 10.848 31.9117 12.064 30.5322 12.064C29.0893 12.064 27.8868 10.848 27.8868 9.41424C27.8868 7.98088 29.0893 6.816 30.5322 6.816ZM30.5193 10.784C31.1272 10.784 31.6457 10.208 31.6457 9.42712C31.6457 8.64663 31.1272 8.16 30.5193 8.16C29.8613 8.16 29.3168 8.63376 29.3168 9.42712C29.3168 10.208 29.8613 10.784 30.5193 10.784ZM33.9437 11.2702V7.60976C33.9437 7.21288 34.2602 6.88 34.6527 6.88C35.0451 6.88 35.3741 7.21288 35.3741 7.60976V11.2702C35.3741 11.6671 35.0451 12 34.6527 12C34.2602 12 33.9437 11.6671 33.9437 11.2702ZM33.8301 5.49776C33.8301 5.024 34.1968 4.64 34.6527 4.64C35.1207 4.64 35.5007 5.024 35.5007 5.49776C35.5007 5.95824 35.1207 6.32976 34.6527 6.32976C34.1968 6.32976 33.8301 5.95824 33.8301 5.49776ZM38.1151 9.28624V11.2702C38.1151 11.6671 37.7861 12 37.3932 12C37.0012 12 36.6843 11.6671 36.6843 11.2702V7.44312C36.6843 7.136 36.9377 6.88 37.2417 6.88C37.5452 6.88 37.7861 7.136 37.7861 7.44312C38.3681 6.90576 38.8742 6.816 39.3552 6.816C40.7856 6.816 41.4185 7.89112 41.4185 9.10712V11.2702C41.4185 11.6671 41.0895 12 40.6971 12C40.3046 12 39.9881 11.6671 39.9881 11.2702V9.28624C39.9881 8.65912 39.9121 8.13424 39.0136 8.13424C38.3807 8.13424 38.1147 8.65912 38.1147 9.28624H38.1151ZM46.0705 10.0418C45.906 10.0418 45.7924 9.96488 45.7035 9.86224L44.0326 8.05776V11.2702C44.0326 11.6671 43.7036 12 43.3111 12C42.9187 12 42.6022 11.6671 42.6022 11.2702V4.90927C42.6441 4.79948 42.7506 4.72767 42.8685 4.72971C42.9947 4.72971 43.0957 4.83239 43.1721 4.90927L45.83 7.89151C45.906 7.98127 46.0071 8.03239 46.058 8.03239C46.1085 8.03239 46.2096 7.98127 46.2855 7.8919L48.9439 4.90927C49.0199 4.83239 49.1209 4.72971 49.2474 4.72971C49.3739 4.72971 49.4754 4.80663 49.5134 4.90927V11.2702C49.5134 11.6671 49.1969 12 48.8044 12C48.412 12 48.083 11.6671 48.083 11.2702V8.05776L46.4125 9.86224C46.3235 9.96488 46.2096 10.0418 46.0705 10.0418ZM52.9504 10.784C53.5959 10.784 54.1399 10.208 54.1399 9.42712C54.1399 8.64663 53.5833 8.13424 52.9504 8.13424C52.3174 8.13424 51.811 8.65912 51.811 9.42712C51.811 10.1822 52.3174 10.784 52.9504 10.784ZM54.4693 11.4369L54.4434 11.2702C54.1654 11.8205 53.279 12.064 52.7095 12.064C51.3676 12.064 50.3806 10.848 50.3806 9.41424C50.3806 7.98088 51.393 6.816 52.7855 6.816C53.026 6.816 53.8234 6.88 54.4434 7.60976L54.4689 7.44312C54.4689 7.136 54.7094 6.88 55.0133 6.88C55.3169 6.88 55.5699 7.136 55.5699 7.44312V11.4369C55.5699 11.744 55.3169 12 55.0129 12C54.7094 12 54.4685 11.744 54.4685 11.4369H54.4693ZM59.5388 8.13424H59.3872C58.4883 8.18576 58.3113 8.69776 58.3113 9.28624V11.2702C58.3113 11.6671 57.9823 12 57.5898 12C57.1973 12 56.8809 11.6671 56.8809 11.2702V7.44312C56.8809 7.136 57.1339 6.88 57.4378 6.88C57.7418 6.88 57.9823 7.136 57.9823 7.44312C58.5138 6.944 58.9442 6.84176 59.3872 6.816H59.5263C59.8682 6.816 60.1843 7.11024 60.1843 7.48176C60.1843 7.82712 59.8807 8.13424 59.5388 8.13424ZM65.0517 10.9378C65.1152 11.04 65.1531 11.1551 65.1531 11.2831C65.1531 11.6542 64.8112 12 64.4442 12C64.1912 12 63.9757 11.808 63.8112 11.6031L62.1662 9.696V11.2702C62.1662 11.6671 61.8368 12 61.4443 12C61.0519 12 60.7354 11.6671 60.7354 11.2702V5.45951C60.7354 5.06224 61.0519 4.72976 61.4443 4.72976C61.8368 4.72976 62.1658 5.06224 62.1658 5.45951V9.08176L63.8112 7.264C63.9757 7.072 64.1782 6.88 64.4317 6.88C64.7861 6.88 65.1152 7.21288 65.1152 7.584C65.1152 7.69912 65.0897 7.81424 65.0262 7.91688L63.7227 9.33737L65.0517 10.9374V10.9378ZM66.8307 8.99592H68.8937C68.8937 8.3849 68.4093 8.08163 67.8622 8.08163C67.315 8.08163 66.8307 8.39771 66.8307 8.99592ZM69.7291 9.87512H66.8307C66.8307 10.7329 67.6532 10.8609 68.0202 10.8609C68.2866 10.8609 68.6661 10.8098 68.9571 10.6814C69.0456 10.6178 69.1976 10.5662 69.3241 10.5662C69.6406 10.5662 69.9062 10.8355 69.9062 11.1555C69.9062 11.3729 69.7671 11.5649 69.5901 11.6671C69.1471 11.9871 68.5772 12.064 68.0332 12.064C66.5902 12.064 65.3878 11.2835 65.3878 9.47824C65.3878 8.05776 66.1218 6.816 67.8307 6.816C69.2102 6.816 70.2606 7.712 70.2861 9.312C70.2861 9.61912 70.0331 9.87512 69.7291 9.87512ZM73.7105 12.064H73.3181C72.2292 12.064 71.5967 11.5902 71.5967 9.888V8.13424H71.2297C70.8877 8.13424 70.5842 7.82712 70.5842 7.48176C70.5842 7.11024 70.8877 6.816 71.2297 6.816H71.5967V5.45912C71.5967 5.06224 71.9131 4.72937 72.3056 4.72937C72.6977 4.72937 73.0271 5.06224 73.0271 5.45912V6.816H73.6216C73.9636 6.816 74.2675 7.11024 74.2675 7.48176C74.2675 7.82712 73.9636 8.13424 73.6216 8.13424H73.0271V9.60624C73.0271 10.5791 73.0776 10.784 73.5081 10.784H73.7105C74.0521 10.784 74.3431 11.0658 74.3431 11.424C74.3431 11.7698 74.0521 12.064 73.7105 12.064ZM80.6409 5.26712C80.8305 5.38224 80.9954 5.63824 80.9954 5.86888C80.9954 6.24 80.6789 6.54712 80.3244 6.54712C80.2359 6.54712 80.147 6.52176 80.0714 6.496C79.6535 6.18888 79.122 5.984 78.565 5.984C77.249 5.984 76.3372 7.05912 76.3372 8.39024C76.3372 9.72176 77.2486 10.784 78.565 10.784C79.223 10.784 79.8055 10.5151 80.2485 10.1058C80.3629 10.0238 80.5 9.97908 80.6409 9.97776C80.9954 9.97776 81.2735 10.2591 81.2735 10.6178C81.2735 10.848 81.1344 11.0529 80.9574 11.168C80.3245 11.7058 79.4635 12.064 78.5776 12.064C76.5526 12.064 74.9071 10.4 74.9071 8.352C74.9071 6.304 76.5522 4.64 78.5776 4.64C79.3374 4.64 80.0585 4.87024 80.6409 5.26712ZM84.2679 10.784C84.9134 10.784 85.4574 10.208 85.4574 9.42712C85.4574 8.64663 84.9004 8.13424 84.2675 8.13424C83.6349 8.13424 83.1285 8.65912 83.1285 9.42712C83.1285 10.1822 83.6349 10.784 84.2675 10.784H84.2679ZM85.7864 11.4369L85.7614 11.2702C85.4829 11.8205 84.5969 12.064 84.027 12.064C82.6855 12.064 81.6981 10.848 81.6981 9.41424C81.6981 7.98088 82.711 6.816 84.103 6.816C84.3435 6.816 85.1409 6.88 85.7614 7.60976L85.7864 7.44312C85.7864 7.136 86.0269 6.88 86.3309 6.88C86.6344 6.88 86.8878 7.136 86.8878 7.44312V11.4369C86.8878 11.744 86.6344 12 86.3309 12C86.0269 12 85.7864 11.744 85.7864 11.4369ZM90.8183 10.784C91.4513 10.784 91.9573 10.1822 91.9573 9.42712C91.9573 8.65912 91.4513 8.13424 90.8183 8.13424C90.1854 8.13424 89.6284 8.64624 89.6284 9.42712C89.6284 10.208 90.1728 10.784 90.8183 10.784ZM89.6284 11.6418V13.4591C89.6284 13.856 89.2994 14.1889 88.9069 14.1889C88.5149 14.1889 88.198 13.856 88.198 13.4591V7.44312C88.198 7.136 88.4514 6.88 88.7553 6.88C89.0589 6.88 89.2998 7.136 89.2998 7.49424C89.8309 6.944 90.4893 6.816 90.9828 6.816C92.3753 6.816 93.3877 7.98088 93.3877 9.41424C93.3877 10.848 92.4007 12.064 91.0588 12.064C90.6413 12.064 90.0209 11.936 89.6284 11.6418Z" fill="white"/>\n  </svg>' : '<svg width="94" height="16" viewBox="0 0 94 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M13.7573 9.56098C13.4773 9.73737 13.1475 9.75922 12.8968 9.61834C12.5784 9.43922 12.4033 9.01971 12.4033 8.43629V6.69073C12.4033 5.84781 12.0688 5.248 11.5095 5.08605C10.5616 4.81093 9.84878 5.96644 9.58087 6.40039L7.90918 9.10088V5.8002C7.89038 5.04078 7.64284 4.58654 7.17283 4.44956C6.86183 4.35902 6.39652 4.39532 5.94452 5.08449L2.19928 11.0763C1.69788 10.1279 1.4365 9.0719 1.43785 8C1.43785 4.39063 4.34098 1.45444 7.90918 1.45444C11.4774 1.45444 14.3801 4.39063 14.3801 8C14.3801 8.00624 14.3817 8.01171 14.3821 8.01756C14.3821 8.0238 14.3809 8.02927 14.3813 8.03551C14.415 8.73444 14.1878 9.29054 13.7573 9.56137V9.56098ZM15.818 8.00039V8V7.98205L15.8176 7.9641C15.7976 3.56839 12.258 0 7.90879 0C3.54822 0 0 3.58868 0 8C0 12.4109 3.54822 16 7.90918 16C9.91027 16 11.8201 15.2421 13.2862 13.8665C13.5776 13.5934 13.5948 13.1333 13.3245 12.839C13.196 12.6978 13.0159 12.6141 12.8248 12.6068C12.6336 12.5995 12.4476 12.6691 12.3085 12.8C11.1202 13.9212 9.54576 14.5459 7.90918 14.5456C5.99857 14.5456 4.27949 13.703 3.09388 12.3668L6.47133 6.96351V9.45444C6.47133 10.6509 6.93704 11.0377 7.32754 11.1508C7.71844 11.264 8.31575 11.1867 8.94283 10.1721L10.8006 7.17151C10.8601 7.07473 10.9149 6.99122 10.9651 6.91902V8.43629C10.9651 9.55473 11.4147 10.4492 12.1985 10.8898C12.9051 11.287 13.7934 11.2511 14.5172 10.7961C15.3946 10.2439 15.8673 9.22654 15.818 8.00039ZM26.8293 5.26712C27.0192 5.38224 27.1837 5.63824 27.1837 5.86888C27.1837 6.24 26.8673 6.54712 26.5128 6.54712C26.4243 6.54712 26.3357 6.52176 26.2598 6.496C25.8418 6.18888 25.3103 5.984 24.7534 5.984C23.4373 5.984 22.5259 7.05912 22.5259 8.39024C22.5259 9.72176 23.4373 10.784 24.7534 10.784C25.4114 10.784 25.9938 10.5151 26.4368 10.1058C26.5512 10.0238 26.6883 9.97908 26.8293 9.97776C27.1837 9.97776 27.4622 10.2591 27.4622 10.6178C27.4622 10.848 27.3228 11.0529 27.1457 11.168C26.5128 11.7058 25.6523 12.064 24.7663 12.064C22.7413 12.064 21.0955 10.4 21.0955 8.352C21.0955 6.304 22.7409 4.64 24.7663 4.64C25.5258 4.64 26.2468 4.87024 26.8293 5.26712ZM30.5322 6.816C31.9117 6.816 33.0762 7.98088 33.0762 9.41424C33.0762 10.848 31.9117 12.064 30.5322 12.064C29.0893 12.064 27.8868 10.848 27.8868 9.41424C27.8868 7.98088 29.0893 6.816 30.5322 6.816ZM30.5193 10.784C31.1272 10.784 31.6457 10.208 31.6457 9.42712C31.6457 8.64663 31.1272 8.16 30.5193 8.16C29.8613 8.16 29.3168 8.63376 29.3168 9.42712C29.3168 10.208 29.8613 10.784 30.5193 10.784ZM33.9437 11.2702V7.60976C33.9437 7.21288 34.2602 6.88 34.6527 6.88C35.0451 6.88 35.3741 7.21288 35.3741 7.60976V11.2702C35.3741 11.6671 35.0451 12 34.6527 12C34.2602 12 33.9437 11.6671 33.9437 11.2702ZM33.8301 5.49776C33.8301 5.024 34.1968 4.64 34.6527 4.64C35.1207 4.64 35.5007 5.024 35.5007 5.49776C35.5007 5.95824 35.1207 6.32976 34.6527 6.32976C34.1968 6.32976 33.8301 5.95824 33.8301 5.49776ZM38.1151 9.28624V11.2702C38.1151 11.6671 37.7861 12 37.3932 12C37.0012 12 36.6843 11.6671 36.6843 11.2702V7.44312C36.6843 7.136 36.9377 6.88 37.2417 6.88C37.5452 6.88 37.7861 7.136 37.7861 7.44312C38.3681 6.90576 38.8742 6.816 39.3552 6.816C40.7856 6.816 41.4185 7.89112 41.4185 9.10712V11.2702C41.4185 11.6671 41.0895 12 40.6971 12C40.3046 12 39.9881 11.6671 39.9881 11.2702V9.28624C39.9881 8.65912 39.9121 8.13424 39.0136 8.13424C38.3807 8.13424 38.1147 8.65912 38.1147 9.28624H38.1151ZM46.0705 10.0418C45.906 10.0418 45.7924 9.96488 45.7035 9.86224L44.0326 8.05776V11.2702C44.0326 11.6671 43.7036 12 43.3111 12C42.9187 12 42.6022 11.6671 42.6022 11.2702V4.90927C42.6441 4.79948 42.7506 4.72767 42.8685 4.72971C42.9947 4.72971 43.0957 4.83239 43.1721 4.90927L45.83 7.89151C45.906 7.98127 46.0071 8.03239 46.058 8.03239C46.1085 8.03239 46.2096 7.98127 46.2855 7.8919L48.9439 4.90927C49.0199 4.83239 49.1209 4.72971 49.2474 4.72971C49.3739 4.72971 49.4754 4.80663 49.5134 4.90927V11.2702C49.5134 11.6671 49.1969 12 48.8044 12C48.412 12 48.083 11.6671 48.083 11.2702V8.05776L46.4125 9.86224C46.3235 9.96488 46.2096 10.0418 46.0705 10.0418ZM52.9504 10.784C53.5959 10.784 54.1399 10.208 54.1399 9.42712C54.1399 8.64663 53.5833 8.13424 52.9504 8.13424C52.3174 8.13424 51.811 8.65912 51.811 9.42712C51.811 10.1822 52.3174 10.784 52.9504 10.784ZM54.4693 11.4369L54.4434 11.2702C54.1654 11.8205 53.279 12.064 52.7095 12.064C51.3676 12.064 50.3806 10.848 50.3806 9.41424C50.3806 7.98088 51.393 6.816 52.7855 6.816C53.026 6.816 53.8234 6.88 54.4434 7.60976L54.4689 7.44312C54.4689 7.136 54.7094 6.88 55.0133 6.88C55.3169 6.88 55.5699 7.136 55.5699 7.44312V11.4369C55.5699 11.744 55.3169 12 55.0129 12C54.7094 12 54.4685 11.744 54.4685 11.4369H54.4693ZM59.5388 8.13424H59.3872C58.4883 8.18576 58.3113 8.69776 58.3113 9.28624V11.2702C58.3113 11.6671 57.9823 12 57.5898 12C57.1973 12 56.8809 11.6671 56.8809 11.2702V7.44312C56.8809 7.136 57.1339 6.88 57.4378 6.88C57.7418 6.88 57.9823 7.136 57.9823 7.44312C58.5138 6.944 58.9442 6.84176 59.3872 6.816H59.5263C59.8682 6.816 60.1843 7.11024 60.1843 7.48176C60.1843 7.82712 59.8807 8.13424 59.5388 8.13424ZM65.0517 10.9378C65.1152 11.04 65.1531 11.1551 65.1531 11.2831C65.1531 11.6542 64.8112 12 64.4442 12C64.1912 12 63.9757 11.808 63.8112 11.6031L62.1662 9.696V11.2702C62.1662 11.6671 61.8368 12 61.4443 12C61.0519 12 60.7354 11.6671 60.7354 11.2702V5.45951C60.7354 5.06224 61.0519 4.72976 61.4443 4.72976C61.8368 4.72976 62.1658 5.06224 62.1658 5.45951V9.08176L63.8112 7.264C63.9757 7.072 64.1782 6.88 64.4317 6.88C64.7861 6.88 65.1152 7.21288 65.1152 7.584C65.1152 7.69912 65.0897 7.81424 65.0262 7.91688L63.7227 9.33737L65.0517 10.9374V10.9378ZM66.8307 8.99592H68.8937C68.8937 8.3849 68.4093 8.08163 67.8622 8.08163C67.315 8.08163 66.8307 8.39771 66.8307 8.99592ZM69.7291 9.87512H66.8307C66.8307 10.7329 67.6532 10.8609 68.0202 10.8609C68.2866 10.8609 68.6661 10.8098 68.9571 10.6814C69.0456 10.6178 69.1976 10.5662 69.3241 10.5662C69.6406 10.5662 69.9062 10.8355 69.9062 11.1555C69.9062 11.3729 69.7671 11.5649 69.5901 11.6671C69.1471 11.9871 68.5772 12.064 68.0332 12.064C66.5902 12.064 65.3878 11.2835 65.3878 9.47824C65.3878 8.05776 66.1218 6.816 67.8307 6.816C69.2102 6.816 70.2606 7.712 70.2861 9.312C70.2861 9.61912 70.0331 9.87512 69.7291 9.87512ZM73.7105 12.064H73.3181C72.2292 12.064 71.5967 11.5902 71.5967 9.888V8.13424H71.2297C70.8877 8.13424 70.5842 7.82712 70.5842 7.48176C70.5842 7.11024 70.8877 6.816 71.2297 6.816H71.5967V5.45912C71.5967 5.06224 71.9131 4.72937 72.3056 4.72937C72.6977 4.72937 73.0271 5.06224 73.0271 5.45912V6.816H73.6216C73.9636 6.816 74.2675 7.11024 74.2675 7.48176C74.2675 7.82712 73.9636 8.13424 73.6216 8.13424H73.0271V9.60624C73.0271 10.5791 73.0776 10.784 73.5081 10.784H73.7105C74.0521 10.784 74.3431 11.0658 74.3431 11.424C74.3431 11.7698 74.0521 12.064 73.7105 12.064ZM80.6409 5.26712C80.8305 5.38224 80.9954 5.63824 80.9954 5.86888C80.9954 6.24 80.6789 6.54712 80.3244 6.54712C80.2359 6.54712 80.147 6.52176 80.0714 6.496C79.6535 6.18888 79.122 5.984 78.565 5.984C77.249 5.984 76.3372 7.05912 76.3372 8.39024C76.3372 9.72176 77.2486 10.784 78.565 10.784C79.223 10.784 79.8055 10.5151 80.2485 10.1058C80.3629 10.0238 80.5 9.97908 80.6409 9.97776C80.9954 9.97776 81.2735 10.2591 81.2735 10.6178C81.2735 10.848 81.1344 11.0529 80.9574 11.168C80.3245 11.7058 79.4635 12.064 78.5776 12.064C76.5526 12.064 74.9071 10.4 74.9071 8.352C74.9071 6.304 76.5522 4.64 78.5776 4.64C79.3374 4.64 80.0585 4.87024 80.6409 5.26712ZM84.2679 10.784C84.9134 10.784 85.4574 10.208 85.4574 9.42712C85.4574 8.64663 84.9004 8.13424 84.2675 8.13424C83.6349 8.13424 83.1285 8.65912 83.1285 9.42712C83.1285 10.1822 83.6349 10.784 84.2675 10.784H84.2679ZM85.7864 11.4369L85.7614 11.2702C85.4829 11.8205 84.5969 12.064 84.027 12.064C82.6855 12.064 81.6981 10.848 81.6981 9.41424C81.6981 7.98088 82.711 6.816 84.103 6.816C84.3435 6.816 85.1409 6.88 85.7614 7.60976L85.7864 7.44312C85.7864 7.136 86.0269 6.88 86.3309 6.88C86.6344 6.88 86.8878 7.136 86.8878 7.44312V11.4369C86.8878 11.744 86.6344 12 86.3309 12C86.0269 12 85.7864 11.744 85.7864 11.4369ZM90.8183 10.784C91.4513 10.784 91.9573 10.1822 91.9573 9.42712C91.9573 8.65912 91.4513 8.13424 90.8183 8.13424C90.1854 8.13424 89.6284 8.64624 89.6284 9.42712C89.6284 10.208 90.1728 10.784 90.8183 10.784ZM89.6284 11.6418V13.4591C89.6284 13.856 89.2994 14.1889 88.9069 14.1889C88.5149 14.1889 88.198 13.856 88.198 13.4591V7.44312C88.198 7.136 88.4514 6.88 88.7553 6.88C89.0589 6.88 89.2998 7.136 89.2998 7.49424C89.8309 6.944 90.4893 6.816 90.9828 6.816C92.3753 6.816 93.3877 7.98088 93.3877 9.41424C93.3877 10.848 92.4007 12.064 91.0588 12.064C90.6413 12.064 90.0209 11.936 89.6284 11.6418Z" fill="black"/>\n  </svg>', "\n        </a>\n      </div>\n    </div>\n    <div id='coin-marquee-container' class='coin-marquee-container'>\n      ").concat(function() {
                var e = document.createElement("div");
                e.className = "coin-marquee-container__skeleton";
                for (var t = document.createDocumentFragment(), n = 0; n < 3; n++) {
                    var r = document.createElement("div");
                    r.setAttribute("class", "coin-marquee-item"), r.innerHTML = "\n      <div class='coin-marquee-item-inner coin-marquee-item--skeleton'>\n        <div class='coin-marquee-item__icon'></div>\n        <div class='coin-marquee-item-info'>\n          <div class='coin-marquee-item-info__row'></div>\n          <div class='coin-marquee-item-info__row'></div>\n        </div>\n      </div>\n    ", t.appendChild(r)
                }
                return e.appendChild(t), e.outerHTML
            }(), "\n    </div>\n  ");
            return n.innerHTML = r, n
        },
        f = function(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = arguments.length > 4 ? arguments[4] : void 0,
                i = document.createElement("div");
            i.className = "coin-marquee-container__inner";
            for (var a = document.createDocumentFragment(), s = r ? 2 * e.length : e.length, c = 0; c < s; c++) {
                var u = c < e.length ? c : c - e.length,
                    l = e[u],
                    d = h(l, t, n);
                a.appendChild(d)
            }
            return i.appendChild(a), r && (i.style.animationDuration = "".concat(o, "s"), i.style.animationName = "marquee-scroll", i.style.animationTimingFunction = "linear", i.style.animationIterationCount = "infinite"), i
        },
        h = function(e, t, n) {
            var r = e.id,
                o = e.name,
                i = e.symbol,
                a = e.slug,
                s = e.quote[t.id],
                c = Object(u.a)(s.percent_change_24h),
                l = Object(u.b)(s.price, t.symbol),
                d = document.createElement("div");
            d.setAttribute("class", "coin-marquee-item");
            var p = n ? "\n    <div class='coin-marquee-item__icon'>\n      <img src='https://s2.coinmarketcap.com/static/img/coins/32x32/".concat(r, ".png' />\n    </div>\n  ") : "",
                m = "\n    <a class='coin-marquee-item-inner' href='https://coinmarketcap.com/currencies/".concat(a, "' title='").concat(o, "' target='_blank'>\n      ").concat(p, "\n      <div class='coin-marquee-item-info'>\n        <div class='coin-marquee-item-info__row'>\n          <div class='coin-marquee-item-name'>").concat(o, "</div>\n          <div class='coin-marquee-item-price'>").concat(l, "</div>\n        </div>\n        <div class='coin-marquee-item-info__row'>\n          <div class='coin-marquee-item-symbol'>").concat(i, "</div>\n          <div class='coin-marquee-item-changes ").concat(c > 0 ? "coin-marquee-item-changes--up" : "coin-marquee-item-changes--down", "'>\n            <span class='coin-marquee-item-changes__icon'></span>").concat(c, "%\n          </div>\n        </div>\n      </div>\n    </a>\n  ");
            return d.innerHTML = m, d
        };

    function C() {
        return y.apply(this, arguments)
    }

    function y() {
        return (y = a()(o.a.mark((function e() {
            var t, n, r, i, a, s, u, h, C, y, g, v, b, k, w, x, q;
            return o.a.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return t = Object.values(d.a), n = document.getElementById("coinmarketcap-widget-marquee"), r = n.getAttribute("coins"), i = n.getAttribute("currency"), void 0 === (a = t.find((function(e) {
                            return e.symbol.toUpperCase() === i
                        }))) && (a = t[0]), s = n.getAttribute("theme"), u = "true" === n.getAttribute("transparent"), h = "true" === n.getAttribute("show-symbol-logo"), n.appendChild(m(s, u)), e.next = 12, c.a.get("".concat(l.a.production.url.widgetApi, "?id=").concat(r, "&convert_id=").concat(a.id));
                    case 12:
                        C = e.sent, y = Object.values(C.data.data), 110, g = y.length, 100, b = (v = 110 * g) / 100, k = n.querySelector("#coin-marquee-container"), w = k.getBoundingClientRect(), x = v >= w.width, q = f(y, a, h, x, b), k.appendChild(q), p();
                    case 25:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }
    window && (window.__WIDGET_INIT = C), document.addEventListener("DOMContentLoaded", (function() {
        C()
    }))
}, function(e, t, n) {
    var r = n(16),
        o = n(43);
    "string" == typeof(o = o.__esModule ? o.default : o) && (o = [
        [e.i, o, ""]
    ]);
    var i = {
        insert: "head",
        singleton: !1
    };
    r(o, i);
    e.exports = o.locals || {}
}, function(e, t, n) {
    (t = n(17)(!1)).push([e.i, '.coin-marquee{-webkit-text-size-adjust:none}.coin-marquee div{box-sizing:border-box}.coin-marquee-wrapper{display:flex;align-items:center;background:#fff;border-top:1px solid #eff2f5;border-bottom:1px solid #eff2f5;overflow:hidden}.coin-marquee-wrapper--dark{background:#171924;border-top:1px solid #222531;border-bottom:1px solid #222531}.coin-marquee-wrapper--dark .coin-marquee-header-signature{border-right:1px solid #40424e}.coin-marquee-wrapper--dark .coin-marquee-header-signature__power-by{color:#808a9d}.coin-marquee-wrapper--dark .coin-marquee-item::after{background-color:#40424e}.coin-marquee-wrapper--dark .coin-marquee-item-inner{color:#fff}.coin-marquee-wrapper--dark .coin-marquee-item-symbol{color:#a1a7bb}.coin-marquee-wrapper--dark .coin-marquee-item .coin-marquee-item--skeleton .coin-marquee-item__icon,.coin-marquee-wrapper--dark .coin-marquee-item .coin-marquee-item--skeleton .coin-marquee-item-info__row{background-color:#323546}.coin-marquee-wrapper--transparent{background:transparent !important}.coin-marquee-header{float:left;width:141px}.coin-marquee-header-signature{overflow:hidden;width:141px;padding:12px 16px;box-sizing:border-box;border-right:1px solid #eff2f5}.coin-marquee-header-signature svg,.coin-marquee-header-signature div{float:left}.coin-marquee-header-signature svg{height:18px}.coin-marquee-header-signature div{height:17px;display:inline-block;line-height:18x;font-weight:400;font-size:9px;line-height:18px;color:#808a9d}.coin-marquee-container{display:flex;width:calc(100% - 141px);overflow:hidden;white-space:nowrap}.coin-marquee-container__inner{position:relative;display:inline-block;font-size:0;line-height:0;-webkit-animation-play-state:running;animation-play-state:running}.coin-marquee-container__inner:hover{-webkit-animation-play-state:paused;animation-play-state:paused}.coin-marquee-item{position:relative;min-width:110px;display:inline-block;box-sizing:border-box;padding:0 16px}.coin-marquee-item:hover,.coin-marquee-item:focus{color:inherit}.coin-marquee-item::after{content:"";position:absolute;top:20px;right:0;display:inline-block;background-color:#eff2f5;width:1px;height:20px}.coin-marquee-item-inner{padding:16px 0;display:flex;width:100%;align-items:center;text-decoration:none;color:#000}.coin-marquee-item-inner:hover{color:inherit}.coin-marquee-item-inner:hover .coin-marquee-item-name{opacity:.6}.coin-marquee-item__icon{margin-right:8px;display:inline-block;line-height:1;min-width:20px;max-width:20px;height:20px}.coin-marquee-item__icon img{width:100%;height:100%}.coin-marquee-item-info{width:100%}.coin-marquee-item-info__row{display:flex;align-items:center;justify-content:space-between;line-height:1}.coin-marquee-item-info__row:last-of-type{margin-top:2px}.coin-marquee-item-name{margin-right:12px;transition:.1s}.coin-marquee-item-name,.coin-marquee-item-price{font-size:12px;line-height:1;font-weight:600}.coin-marquee-item-symbol{font-size:11px;color:#58667e;transform-origin:left;transform:scale(0.9)}.coin-marquee-item-changes{font-size:11px;font-weight:600}.coin-marquee-item-changes__icon{width:0;height:0;position:relative;margin-right:3px;border-left:4px solid transparent;border-right:4px solid transparent}.coin-marquee-item-changes--up{color:#16c784}.coin-marquee-item-changes--up .coin-marquee-item-changes__icon{top:-8px;border-bottom:5px solid #16c784}.coin-marquee-item-changes--down{color:#ea3943}.coin-marquee-item-changes--down .coin-marquee-item-changes__icon{top:10px;border-top:5px solid #ea3943}.coin-marquee-item--skeleton .coin-marquee-item__icon{background-color:#eaeff5;border-radius:50%}.coin-marquee-item--skeleton .coin-marquee-item-info__row{width:40px;height:10px;background-color:#eaeff5}.coin-marquee-item--skeleton .coin-marquee-item-info__row:first-of-type{width:80px}@-webkit-keyframes marquee-scroll{from{transform:translateX(0%)}to{transform:translateX(-50%)}}@keyframes marquee-scroll{from{transform:translateX(0%)}to{transform:translateX(-50%)}}', ""]), e.exports = t
}]);