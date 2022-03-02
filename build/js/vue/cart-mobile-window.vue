<template>
    <div class="modal modal-m-cart modal-simple p-0" id="mCart" tabindex="-1" role="dialog" aria-labelledby="mCart" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="container">
          <div class="modal-content p-0">
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <svg class="icon-icon-remove undefined" width="10" height="10" viewBox="0 0 10 10">
                <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
              </svg>
            </button>

            <div class="modal-body pt-2 pb-2 pl-2 pr-2">

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
        </div>
      </div>
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
