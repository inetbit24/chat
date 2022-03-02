<script>
define(['Vue', 'apolloProvider', 'gql','Helper'], function(Vue, apolloProvider, gql, helper) {

    return new Vue({
        apolloProvider,
        apollo: {
            complex_prices: {
                query: gql `query complex_prices{
                    complex_prices {
                        complexes {
                            id
                            price
                            count
                            buildings
                        }
                    }
                }`,
                result({
                    data,
                    loading,
                    networkStatus
                }) {

                    if(typeof(data.complex_prices.complexes) == 'object')
                    {
                        var tmp = {};
                        for(var num in data.complex_prices.complexes)
                        {
                            var complex = data.complex_prices.complexes[num];
                            tmp[complex.id] = {
                                'price':complex.price,
                                'count': complex.count,
                                'buildings': complex.buildings
                            };
                        }

                        this.shared.complex_prices = tmp;

                    }
                },
                fetchPolicy: 'no-cache',
                skip: false
            }
        },
        data: function() {
            return {
                shared: store.state
            }
        },
        watch: {
            'shared.complex_prices': {
                handler: 'pricesUpdated',
                immediate: false,
                deep: true
            }
        },
        methods: {
            pricesUpdated: function() {

                var _obj = this;

                $('[data-cnt="complex-price"]').each(function(){
                    var complex_id = $(this).data('id');
                    if(typeof(_obj.shared.complex_prices[complex_id]) == 'object')
                    {
                        var price = _obj.shared.complex_prices[complex_id].price;
                        price = 'от '+helper.number_format(price,0,'.',' ')+' руб.';
                        $(this).addClass('loaded');
                        $('span:not(.p-loader)',this).html(price);
                        $('span:not(.p-loader)',this).animate({
                            'opacity':1
                        },200);
                    }

                });

                $('[data-cnt="complex-count"]').each(function(){
                    var complex_id = $(this).data('id');
                    if(typeof(_obj.shared.complex_prices[complex_id]) == 'object')
                    {
                        var count = _obj.shared.complex_prices[complex_id].count;
                        $('span.count',this).html(count);
                        $(this).animate({
                            'opacity':1
                        },200);
                    }
                });


                $('[data-cnt="building-list"]').each(function(){
                    var complex_id = $(this).data('id');
                    if(typeof(_obj.shared.complex_prices[complex_id]) == 'object')
                    {
                        var buildings = _obj.shared.complex_prices[complex_id].buildings;
                        $('div.buildings',this).html(buildings);
                        $(this).addClass('loaded');
                        $('div.buildings',this).animate({
                            'opacity':1
                        },200);
                    }
                });

            }
        }
    });

});
</script>
