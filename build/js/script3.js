/**

*

*  Base64 encode / decode

*  http://www.webtoolkit.info/

**/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

require({
        urlArgs: "bust=v3",
        paths: {
            'Vue': '/local/templates/lst/assets/js/app',
            'vue': '/local/templates/lst/assets/js/requirejs-vue',
            'hammerjs': '/local/templates/lst/assets/vendors/lst/hammerjs/hammer.min',
            'VisualSearch': '/local/templates/lst/assets/vendors/lst/visual_search',
            // 'jquery.countdown': '/local/templates/lst/assets/vendors/jquery.countdown/dist/jquery.countdown.min',
            // 'jquery':'/local/templates/lst/build/js/base/jquery.min'
        }
    },
    ['Vue', 'vue'],
    function(Vue, vue) {


        //firefox fix!
        setTimeout(function() {
            if (document.querySelector('.genplan') || document.querySelector('.building-plan')) {
                require(['VisualSearch'], function(VisualSearch) {
                    new VisualSearch().init();
                });
            }

            if (document.getElementById('filter-widget')) {
                require(['vue!../js/vue/filter'], function(theApp) {

                    var element = document.getElementById('filter-widget');
                    var only_count = (element.getAttribute('data-only-count') == 'true');
                    var complexes = element.getAttribute('data-complexes');
                    var rooms = element.getAttribute('data-rooms');
                    var years = element.getAttribute('data-years');
                    var price_from = element.getAttribute('data-price-from');
                    var price_to = element.getAttribute('data-price-to');
                    var area_from = element.getAttribute('data-area-from');
                    var area_to = element.getAttribute('data-area-to');


                    console.log(price_from);

                    if (price_from !== null) {
                        theApp.$data.cfilter.selected.price_min = price_from;
                    }
                    if (price_to !== null) {
                        theApp.$data.cfilter.selected.price_max = price_to;
                    }

                    if (area_from !== null) {
                        theApp.$data.cfilter.selected.area_min = area_from;
                    }
                    if (area_to !== null) {
                        theApp.$data.cfilter.selected.area_max = area_to;
                    }


                    if (complexes !== null) {
                        theApp.$data.cfilter.selected.complexes = complexes.split(',').map(x => parseInt(x));
                    }

                    if (rooms !== null) {
                        theApp.$data.cfilter.selected.rooms = rooms.split(',').map(x => parseInt(x));
                    }

                    if (years !== null) {
                        theApp.$data.cfilter.selected.years = years.split(',');
                    }

                    theApp.$data.cfilter.only_count = only_count;
                    theApp.$mount('#filter-widget');

                });
            }

            if (document.getElementById('commercial-aparts-widget')) {

                require(['vue!../js/vue/commercial_aparts'], function(theApp) {

                    var element = document.getElementById('commercial-aparts-widget');
                    var object_id = element.getAttribute('data-object-id');

                    theApp.$data.object_id = object_id;
                    theApp.$mount('#commercial-aparts-widget');
                });
            }

            if (document.getElementById('aparts-widget')) {
                require(['vue!../js/vue/aparts'], function(theApp) {
                    theApp.$mount('#aparts-widget');
                });
            }

            if (document.getElementById('flat-plane')) {
                require(['vue!../js/vue/flat_plane'], function(theApp) {
                    theApp.$mount('#flat-plane');
                });
            }

            if (document.getElementById('cart-block')) {
                require(['vue!../js/vue/cart'], function(theApp) {
                    theApp.$mount('#cart-block');
                });
            }

            if (document.getElementById('cart-mobile-widget')) {
                require(['vue!../js/vue/cart-mobile-widget'], function(theApp) {
                    theApp.$mount('#cart-mobile-widget');
                });
            }

            if (document.getElementById('modalMobileCart')) {
                require(['vue!../js/vue/cart-mobile-window'], function(theApp) {
                    theApp.$mount('#modalMobileCart');
                });
            }

            if (document.getElementById('sidebar-cart-widget')) {
                require(['vue!../js/vue/cart-widget'], function(theApp) {
                    theApp.$mount('#sidebar-cart-widget');
                });
            }

            if (document.querySelector('[data-cnt="complex-price"]')) {
                require(['vue!../js/vue/complex-price']);
            }

            if (document.getElementById('flat-map-link')) {
                require(['vue!../js/vue/flat_map_link'], function(theApp) {
                    var coords = document.getElementById('flat-map-link').getAttribute('data-coords');
                    var address = document.getElementById('flat-map-link').getAttribute('data-address');
                    theApp.$data.modals.flat_map.coords = coords;
                    theApp.$data.modals.flat_map.address = address;
                    theApp.$mount('#flat-map-link');
                });
            }

            if (document.getElementById('mortgage-calc')) {
                require(['vue!../js/vue/mortgage-calc'], function(theApp) {
                    var element = document.getElementById('mortgage-calc');
                    theApp.$data.flat_id = element.getAttribute('data-flat-id');
                    theApp.$data.price = element.getAttribute('data-price');
                    theApp.$data.object_code = element.getAttribute('data-object-code');
                    theApp.$mount('#mortgage-calc');
                });
            }

            // if (document.querySelector('.carousel')) {
            //     require(['vue!../js/vue/carousels']);
            // }

            if (document.querySelector('.add-to-cart')) {
                require(['vue!../js/vue/cart-buy-button']);
            }


            if (document.querySelector('[data-toggle="modal"]')) {
                require(['vue!../js/vue/modal-buttons']);
            }
            if (document.querySelector('.feedback-page-form')) {
                require(['vue!../js/vue/page-forms']);
            }

            if (document.querySelector('.list__objects')) {
                require(['vue!../js/vue/realized-objects']);
            }

            if ($.cookie('countdown-popup-shown') !== 'yes') {
                var element = document.getElementById('modalCount');
                var modal_date = element.getAttribute('data-date').split('.');
                var modal_text = Base64.decode(element.getAttribute('data-text'));

                var today = new Date();
                var final_date = new Date(modal_date[1] + '/' + modal_date[0] + '/' + modal_date[2] + ' 00:00:00');
                if (today.getTime() < final_date.getTime()) {
                    require(['vue!../js/vue/counter'], function(theApp) {
                        theApp.$data.date = modal_date;
                        theApp.$data.text = modal_text;
                        theApp.$mount('#modalCount');
                    });
                }
            }

            if ($.cookie('tradein-shown') !== 'yes') {
                console.log('okkk!!!');
                var element = document.getElementById('modalTradeIn');
                var modal_tradein_enabled = element.getAttribute('data-enabled');
                var modal_tradein_text = Base64.decode(element.getAttribute('data-text'));
                if(modal_tradein_enabled == 'yes')
                {
                    console.log(modal_tradein_enabled);
                    require(['vue!../js/vue/tradein'], function(theApp) {
                        theApp.$data.text = modal_tradein_text;
                        theApp.$mount('#modalTradeIn');
                    });
                }
            }


        }, 50);
    }
);
