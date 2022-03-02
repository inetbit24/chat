<template>
<div class="shop-geo" id="flat-map">
    <a class="d-flex align-items-center" href="#" v-on:click="openMap($event)">
        <i class="icon-svg">
            <svg class="icon-icon-geo-2 undefined" width="15" height="20" viewBox="0 0 15 20">
                <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-geo-2"></use>
            </svg>
        </i>
        <span>{{ this.modals.flat_map.address }}</span>
    </a>

</div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql', 'Forms'], function(Vue, apolloProvider, gql, forms) {

    if (document.getElementById('modalObject')) {
        require(['vue!../js/vue/flat_map'], function(theApp) {
            theApp.$mount('#modalObject');
        });
    }

    return new Vue({
        template: template,
        data: function() {
            return store.state;
        },
        methods: {
            openMap: function(event) {
                var _obj = this;

                if (typeof(ymaps) == 'object') {
                    this.modals.flat_map.loaded_map = true;
                    this.modals.flat_map.show_map=true;

                } else {
                    if (!this.modals.flat_map.loaded_map) {
                        this.$loadScript("https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU&apikey=28cc3b79-4fc3-4f3b-bdd5-7c36ba1035f9").then(function() {
                            _obj.modals.flat_map.loaded_map=true;
                            _obj.modals.flat_map.show_map=true;
                        });
                    } else {
                        this.modals.flat_map.show_map=true;
                    }
                }

                event.preventDefault();
            },
        }

    });

});
</script>
