<template>
<div class="modal modal-objects modal-simple p-0" id="modalObjects" tabindex="-1" role="dialog" aria-labelledby="modalObjects" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="container">
            <div class="modal-content rounded-0 p-lg-4 pt-4 pl-0 pr-0 pb-0">
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                        <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
                    </svg>
                </button>
                <div class="modal-body p-0">
                    <div v-if="data.loaded_map == false" class="text-center">
                        <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
                    </div>
                    <div v-else>
                        <div class="ymap" id="realized-object-map"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql', 'Forms'], function(Vue, apolloProvider, gql, forms) {


    var objects = document.querySelectorAll('.realized-object');

    if (objects) {
        var r_objects_store = {
            debug: true,
            state: {
                loaded_map: false,
                show_map: false,
                coords: '',
                thumb: '',
                date: '',
                name: '',
                address: '',
                map: null
            },
            setMessageAction(newValue) {
                if (this.debug) console.log('setMessageAction triggered with', newValue)
                this.state.message = newValue
            },
            clearMessageAction() {
                if (this.debug) console.log('clearMessageAction triggered')
                this.state.message = ''
            }
        };

        var window_with_map = new Vue({
            el: '#modalObjects',
            template: template,
            data: function() {
                return {
                    data: r_objects_store.state
                }
            },
            watch: {
                'data.show_map': {
                    handler: 'update',
                    immediate: false,
                    deep: true
                }
            },
            methods: {
                update: function() {
                    if (this.data.show_map) {
                        $('#modalObjects').modal('show');
                        this.loadMap();
                    } else {
                        $('#modalObjects').modal('hide');
                    }
                },
                loadMap: function() {
                    var _obj = this;

                    if (!this.data.loaded_map) {
                        this.$loadScript("https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU&apikey=28cc3b79-4fc3-4f3b-bdd5-7c36ba1035f9").then(function() {
                            _obj.data.loaded_map = true;
                            _obj.initMap();
                        });
                    } else {
                        this.initMap();
                    }
                },
                initMap: function() {
                    var _obj = this;
                    ymaps.ready(function() {


                        if (_obj.data.map == null) {
                            _obj.data.map = new ymaps.Map("realized-object-map", {
                                center: _obj.data.coords.split(','),
                                zoom: 10
                            });
                        }

                        var html_content = '';

                        html_content += '<div class="item-obj box-shadow bg-white rounded">';
                        if(_obj.data.thumb)
                        {
                            html_content += '<div class="item-photo"><a class="d-block" href="#">'+
                            '<img class="img-fluid" src="'+_obj.data.thumb+'" alt="img-obj1">'+
                            '</a></div>';
                        }
                        html_content += '<div class="item-text p-md-2 p-1">'+
                        '<h4 class="fz24 mb-1"><a href="#"><strong>'+_obj.data.name+'</strong></a></h4>'+
                        '<p class="d-flex align-items-center"><i class="icon-svg">'+
                            '<svg class="icon-icon-time icon-grey" width="24" height="24" viewBox="0 0 24 24">'+
                                '<use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-time"></use>'+
                            '</svg></i>'+
                        '<span class="fz16 text-grey">'+_obj.data.date+'</span></p>'+

                        '<a class="d-flex align-items-center mb-1" href="#" data-toggle="modal" data-target="#modalObjects"><i class="icon-svg">'+
                        '<svg class="icon-icon-geo icon-grey" width="18" height="20" viewBox="0 0 18 20">'+
                          '<use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-geo"></use>'+
                        '</svg></i><span class="fz16">'+_obj.data.address+'</span></a>'+
                        '</div>'+
                        '</div>';

                        // myPlacemark = new ymaps.Placemark(_obj.data.coords.split(','), {
                        //     // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                        //     balloonContentHeader: "Балун метки",
                        //     balloonContentBody: html_content,
                        //     balloonContentFooter: "Подвал",
                        //     hintContent: "Хинт метки"
                        // });
                        //
                        // _obj.data.map.geoObjects.removeAll();
                        // _obj.data.map.geoObjects.add(myPlacemark);

                        // _obj.data.map.setCenter(_obj.data.coords.split(','));
                        // var position = _obj.data.map.getGlobalPixelCenter();
                        // _obj.data.map.setGlobalPixelCenter([position[0], position[1]]);

                        // Открываем балун на карте (без привязки к геообъекту).
                        _obj.data.map.balloon.open(_obj.data.coords.split(','),html_content, {
                            // Опция: не показываем кнопку закрытия.
                            closeButton: false
                        });

                        // console.log(_obj.data.coords.split(','));


                    });
                }
            },
            mounted: function() {
                var _obj = this;
                $(this.$el).on('hidden.bs.modal', function(e) {
                    _obj.data.show_map = false;
                });
            }
        });

        for (item in objects) {
            var _el = objects[item];
            if (typeof(_el) == 'object') {
                var object = new Vue({
                    el: _el,
                    data: function() {
                        return {
                            data: r_objects_store.state
                        }
                    },
                    methods: {
                        openMap: function(e, coords, name, thumb, date, address) {
                            e.preventDefault();
                            this.data.name = name;
                            this.data.date = date;
                            this.data.thumb = thumb;
                            this.data.address = address;
                            this.data.coords = coords;
                            this.data.show_map = true;
                        }
                    }
                });
            }
        }
    }
});
</script>
