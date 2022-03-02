<template>
    <div class="mob-block-cart d-flex pt-2 pb-2" v-if="shared.cart.length > 0">
        <a class="d-flex align-items-center" href="#" data-dismiss="modal" data-toggle="modal" data-target="#mCart">
            <i class="icon-svg mr-1">
                <em class="num">{{ shared.cart.length }}</em>
                <svg class="icon-icon-cart undefined" width="20" height="20" viewBox="0 0 20 20">
                    <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-cart"></use>
                </svg>
            </i>
            <strong>Ваша корзина</strong>
        </a>
    </div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {

    return new Vue({
        template: template,
        data: function() {
            return {
                shared: store.state
            };
        }
    });

});
</script>
