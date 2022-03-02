<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {


    return new Vue({
        created: function() {
            $('.tabs-sw .btn-orange').removeClass('btn-orange').addClass('btn-border-orange');
        },
        data: function() {
            return {
                thumb: 'plan',
                shared: store.state
            }
        },
        methods: {
            toggleApartPlan: function(btn, e) {
                this.thumb = btn;
                e.preventDefault()
            }
        }
    });

});
</script>
