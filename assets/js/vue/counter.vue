<template>
    <div class="modal modal-counter  modal-simple p-0" id="modalCount" tabindex="-1" role="dialog" aria-labelledby="modalCount" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="container">
                <div class="modal-content rounded-0 p-lg-4 pt-4 pl-0 pr-0 pb-0">
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                            <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
                        </svg>
                    </button>
                    <div class="modal-body p-0 countdown-popup text-center">

                        <div class="title">Внимание!</div>

            			<div class="subtitle" v-html="text">
            			</div>

                        <div id="popup-countdown-start"></div>

            			<a href="/kvartiry/" class="btn btn-orange btn-cute d-block fz24">Выбрать квартиру</a>


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
                date: ''
            }
        },
        mounted: function(){

            $('#popup-countdown-start').countdown(this.date[2]+'/'+this.date[1]+'/'+this.date[0]+' 00:00:00', function(event) {
                var seconds = event.strftime('%S');
                var minutes = event.strftime('%M');
                var hours = event.strftime('%H');
                var days = event.strftime('%D');

                var html = '<div class="countdown-wrap">';

                html += '<div class="section"><div class="label">' + days + '</div><div class="value">' + helper.plural(days, ['день', 'дня', 'дней']) + '</div></div><div class="sep"></div>';
                html += '<div class="section"><div class="label">' + hours + '</div><div class="value">' + helper.plural(hours, ['часа', 'часа', 'часов']) + '</div></div><div class="sep"></div>';
                html += '<div class="section"><div class="label">' + minutes + '</div><div class="value">' + helper.plural(minutes, ['минута', 'минуты', 'минут']) + '</div></div><div class="sep"></div>';
                html += '<div class="section"><div class="label">' + seconds + '</div><div class="value">' + helper.plural(seconds, ['секунда', 'секунды', 'секунд']) + '</div></div>';

                html += '</div>';

                $(this).html(html);
            });

            $('#modalCount .close').on('click', function() {
              $.cookie('countdown-popup-shown', 'yes', { expires: 365, 'path': '/' });
            });

            $('#modalCount').modal('show');
        }
    });
});
</script>
