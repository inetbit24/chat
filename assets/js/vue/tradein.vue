<template>
    <div class="modal modal-tradein  modal-simple p-0" id="modalTradein" tabindex="-1" role="dialog" aria-labelledby="modalTradein" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="container">
                <div class="modal-content rounded-0 p-lg-4 pt-4 pl-0 pr-0 pb-0">
                    <span class="left-top-border"></span>
                    <span class="right-top-border"></span>
                    <span class="right-bottom-border"></span>
                    <span class="left-bottom-border"></span>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                            <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
                        </svg>
                    </button>
                    <div class="modal-body p-0 countdown-popup text-center">
                        <div class="">

                            <div class="tradein-icon text-center">
                                <img src="/local/templates/lst/assets/images/trade-in-icon.png" />
                            </div>

                            <div v-html="text" class="modal-text"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql', 'router', 'Helper'], function(Vue, apolloProvider, gql, router, helper) {

    return new Vue({
        template: template,
        data: function(){
            return {
                text: '',
                interval_id: null
            }
        },
        methods: {
            show_modal: function() {

                if(!$('.modal-counter').hasClass('show'))
                {
                    $('#modalTradein').modal('show');
                    clearInterval(this.interval_id);
                }
            }
        },
        mounted: function(){

            console.log('tradein mounted!!!');

            $('#modalTradein a.btn-tradein').on('click',function() {
                $.cookie('tradein-shown', 'yes', { expires: 365, 'path': '/' });
            });

            $('#modalTradein .close').on('click', function() {
              $.cookie('tradein-shown', 'yes', { expires: 365, 'path': '/' });
            });

            this.interval_id = setInterval(this.show_modal, 20);

        }
    });
});
</script>
