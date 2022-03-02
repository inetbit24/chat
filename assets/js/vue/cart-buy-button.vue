<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {

    var elements = document.querySelectorAll('.add-to-cart');

    if (elements) {
        for (id in elements) {
            var el = elements[id];
            if (typeof(el) == 'object') {

                var btn = new Vue({
                    el: el,
                    apolloProvider,
                    apollo: {
                        add_to_cart: {
                            query: gql `query add_to_cart($flat_id: Int!){
                                add_to_cart(flat_id: $flat_id) {
                                    items {
                                        id
                                        price
                                        thumb
                                        area_total
                                        deadline
                                        complex_name
                                    }
                                    current_item
                                    {
                                        id
                                        price
                                        thumb
                                        area_total
                                        deadline
                                        complex_name
                                    }
                                }
                            }`,
                            result({
                                data,
                                loading,
                                networkStatus
                            }) {
                                try
                                {
                                    this.shared.cart = data.add_to_cart.items;
                                    this.item = data.add_to_cart.current_item;
                                    this.openWindow();
                                } catch(e) {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Ошибка!',
                                        text: 'Произошла ошибка, пожалуйста свяжитесь с нами по телефону! Спасибо за понимание!',
                                    });
                                }
                                this.shared.pageloader = false;
                            },
                            fetchPolicy: 'no-cache',
                            skip: function() {
                                return this.skip_adding;
                            },
                            variables() {
                                return {
                                    flat_id: this.flat_id
                                }
                            }
                        }
                    },
                    data: function() {
                        return {
                            flat_id: null,
                            skip_adding: true,
                            shared: store.state
                        }
                    },
                    methods: {
                        prepareModalContent: function(){

                            var template = '<div class="item-cart">'+
                                '<div class="d-flex flex-sm-nowrap flex-wrap">'+
                                  '<div class="item-cart-img mb-sm-0 mb-1">' +
                                      '<img src="'+this.item.thumb+'" alt="img-mn-2">' +
                                  '</div>'+
                                  '<div class="item-cart-text">'+
                                    '<h4 class="fz160"><span>'+this.item.complex_name+'</span></h4>'+
                                    '<div class="item-cart-row">'+
                                      '<ul class="box-cart-tech box-cart-tech-long">'+
                                        '<li class="d-flex align-items-center pl-2 fz14">'+
                                            '<i class="icon-param-0"></i>'+
                                            '<span><span class="text-nowrap">Общая площадь</span></span>'+
                                            '<strong><span>'+this.item.area_total+' м<sup>2</sup></span></strong>'+
                                        '</li>'+
                                        '<li class="d-flex align-items-center pl-2 fz14">'+
                                        '<i class="icon-param-1"></i>'+
                                        '<span><span class="text-nowrap">Срок сдачи</span></span>'+
                                        '<strong><span>'+this.item.deadline+'</span></strong>'+
                                        '</li>'+
                                      '</ul>'+
                                    '</div>'+
                                    '<div class="item-cart-row">'+
                                      '<div class="box-cart-price">'+
                                        '<div class="label fz14 mb-0">Стоимость:</div>'+
                                        '<strong class="fz18">'+this.item.price+'</strong>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item-cart-row">'+
                                    '<a class="btn btn-orange w-100 d-block" href="/cart/"><strong class="fz16">Перейти в корзину</strong></a>'+
                                '</div>'+
                              '</div>';

                            this.shared.modals.cart.content = template;
                        },
                        openWindow: function(e) {
                            this.prepareModalContent();
                            this.shared.modals.cart.show = true;
                            this.skip_adding = true;
                        },
                        addToCart: function(id, e) {
                            this.skip_adding = false;
                            this.flat_id = id;
                            this.shared.pageloader = true;
                            e.preventDefault();
                        }
                    }
                });

            }
        }
    }

});
</script>
