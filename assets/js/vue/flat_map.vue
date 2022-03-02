<template>
<div class="modal modal-objects modal-simple p-0" id="modalObject" tabindex="-1" role="dialog" aria-labelledby="modalObject" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="container">
            <div class="modal-content rounded-0 p-lg-4 pt-4 pl-0 pr-0 pb-0">
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                        <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
                    </svg>
                </button>
                <div class="modal-body p-0">
                    <div v-if="modals.flat_map.loaded_map == false" class="text-center">
                        <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
                    </div>
                    <div v-else>
                        <div class="ymap" id="object-map"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql', 'Forms'], function(Vue, apolloProvider, gql, forms) {

    return new Vue({
        template: template,
        data: function() {
            return store.state;
        },
        watch: {
            'modals.flat_map.show_map': {
                handler: 'update',
                immediate: false,
                deep: true
            }
        },
        methods: {
            update: function() {
                if (this.modals.flat_map.show_map) {
                    $('#modalObject').modal('show');
                    this.initMap();

                } else {
                    $('#modalObject').modal('hide');
                }
            },
            initMap: function() {
                var _obj = this;
                ymaps.ready(function() {

                    var coords = _obj.modals.flat_map.coords.split(',');

                    if (_obj.modals.flat_map.map == false) {
                        _obj.modals.flat_map.map = new ymaps.Map("object-map", {
                            center: coords,
                            zoom: 10
                        });

                        myPlacemark = new ymaps.Placemark(coords,{}, {
                            iconLayout: 'default#image',
                            iconImageHref: '/local/templates/lst/assets/svg/logo-pin.svg',
                            iconImageSize: [90, 100],
                            iconImageOffset: [-45, -50]
                        });
                        _obj.modals.flat_map.map.geoObjects.removeAll();
                        _obj.modals.flat_map.map.geoObjects.add(myPlacemark);

                    }



                });
            }
        },
        mounted: function() {
            var _obj = this;
            $(this.$el).on('hidden.bs.modal', function(e) {
                _obj.modals.flat_map.show_map = false;
            });
        }

    });
});
</script>
