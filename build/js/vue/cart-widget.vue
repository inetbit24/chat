<template>
<div v-if="shared.cart.length > 0">
    <a class="open-nav-modal link-open-cart" data-index="2" v-on:click="onClick">
        <i class="icon-svg">
            <svg class="icon-icon-cart undefined" width="20" height="18" viewBox="0 0 20 18">
                <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-cart"></use>
            </svg></i>

        <span class="number" >{{ shared.cart.length }}</span>
    </a>
    <div class="block__module-cart bg-white p-2 d-none nav-modal-2"><a class="block-close">
            <svg class="icon-icon-close undefined" width="12" height="12" viewBox="0 0 12 12">
                <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-close"></use>
            </svg></a>

        <div class="item-cart" v-for="item in shared.cart">
            <div class="d-flex">
                <div class="item-cart-img"><img :src="item.thumb" alt="img-mn-2" />
                </div>
                <div class="item-cart-text">
                    <h4 class="fz160"><span>{{ item.complex_name }}</span></h4>
                    <div class="item-cart-row">
                        <ul class="box-cart-tech box-cart-tech-long">
                            <li class="d-flex align-items-center pl-2 fz14">
                                <i class="icon-param-0"></i>
                                <span><span class="text-nowrap">Общая площадь</span></span>
                                <strong><span>{{ item.area_total }} м<sup>2</sup></span></strong>
                            </li>
                            <li class="d-flex align-items-center pl-2 fz14">
                                <i class="icon-param-1"></i>
                                <span><span class="text-nowrap">Срок сдачи</span></span>
                                <strong><span>{{ item.deadline }}</span></strong>
                            </li>
                        </ul>
                    </div>
                    <div class="item-cart-row">
                        <div class="box-cart-price">
                            <div class="label fz14 mb-0">Стоимость:</div>
                            <strong class="fz18">{{ item.price }}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-cart-row">
            <a class="btn btn-orange w-100 d-block" href="/cart/">
                <strong class="fz16">Перейти в корзину</strong>
            </a>
        </div>
    </div>
</div>
</template>
<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {

    return new Vue({
        template: template,
        apolloProvider,
        apollo: {
            cart: {
                query: gql `query cart{
                    cart {
                        items {
                            id
                            price
                            thumb
                            area_total
                            deadline
                            complex_name
                            complex_code
                            building_number
                            section_number
                            floor_number
                            flat_number
                            rooms_number
                        }
                    }
                }`,
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.shared.cart = data.cart.items;
                    this.skip_cart = true;
                    this.shared.cart_loaded = true;
                },
                fetchPolicy: 'no-cache',
                skip: function() {
                    return this.skip_cart;
                }
            }
        },
        data: function() {
            return {
                skip_cart: false,
                shared: store.state
            }
        },
        methods: {
            onClick: function(e) {

                var el_left_offset, el_name, el_top_offset;
                e.preventDefault();
                el_name = $('.link-open-cart').data('index');
                el_top_offset = $('.link-open-cart').parent().position().top;
                el_left_offset = $('.link-open-cart').parent().position().left;
                $('.nav-modal-' + el_name).removeClass('d-none');
                $('.nav-modal-' + el_name).css({
                    // 'left': e.clientX + 80
                    // 'top': e.clientY
                    'left': el_left_offset + 160,
                    'top': el_top_offset - 50
                });

                $('.block__module-cart .block-close').on('click',function() {
                  event.preventDefault();
                  $(this).parent().addClass('d-none');
                });

            }
        }
    });
});
</script>
