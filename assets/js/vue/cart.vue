<template>
<div>
    <div v-if="shared.cart_loaded">
        <div v-if="shared.cart.length > 0">
            <div class="list__cart mb-lg-5 mb-2">

                <div class="item box-card pt-lg-5 pb-lg-5 pt-2 pb-1 mb-2" v-for="item in shared.cart">
                    <a class="item-remove" href="#" v-on:click="removeItem(item.id,$event)">
                        <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                            <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-remove"></use>
                        </svg>
                    </a>
                    <div class="row">
                        <div class="col-lg-22 mx-auto">
                            <div class="d-md-flex align-items-center">
                                <div class="pl-lg-0 pl-md-2 pt-md-0 pr-md-0 pt-3 pl-2">
                                    <div class="pr-lg-4 pr-md-2">
                                        <a class="d-block" :href="'/kvartaly/'+item.complex_code+'/vibor-kvartiry/'+item.id+'/'">
                                            <img class="img-fluid" :src="item.thumb" alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="p-md-0 pt-2 pl-2 pr-2">
                                    <h4 class="fz30 mb-2"><a :href="'/kvartaly/'+item.complex_code+'/vibor-kvartiry/'+item.id+'/'"><span>{{ item.complex_name }}</span></a></h4>
                                    <div class="d-md-flex flex-wrap align-items-center">
                                        <div class="mb-2 mr-lg-4 mr-md-2">
                                            <div class="list__cart-params d-flex">
                                                <div class="item text-center bg-grey rounded">
                                                    <strong class="d-block fz30">{{ item.building_number }}</strong>
                                                    <span class="d-block fz12 text-grey">корпус</span>
                                                </div>
                                                <div class="item text-center bg-grey rounded">
                                                    <strong class="d-block fz30">{{ item.section_number }}</strong>
                                                    <span class="d-block fz12 text-grey">секция</span>
                                                </div>
                                                <div class="item text-center bg-grey rounded">
                                                    <strong class="d-block fz30">{{ item.floor_number }}</strong>
                                                    <span class="d-block fz12 text-grey">этаж</span>
                                                </div>
                                                <div class="item text-center bg-grey rounded">
                                                    <strong class="d-block fz30">{{ item.flat_number }}</strong>
                                                    <span class="d-block fz12 text-grey">№ квартиры</span>
                                                </div>
                                                <div class="item text-center bg-grey rounded">
                                                    <strong class="d-block fz30">{{ item.rooms_number }}</strong>
                                                    <span class="d-block fz12 text-grey">комнаты</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-2 mr-lg-4 mr-md-2">
                                            <ul class="box-cart-tech">
                                                <li class="d-flex align-items-center pl-3 fz18">
                                                    <i class="icon-param-0"></i>
                                                    <span><span class="text-nowrap">Общая площадь</span></span>
                                                    <strong><span class="text-nowrap">{{ item.area_total }} м2</span></strong>
                                                </li>
                                                <li class="d-flex align-items-center pl-3 fz18">
                                                    <i class="icon-param-1"></i>
                                                    <span><span class="text-nowrap">Срок сдачи</span></span>
                                                    <strong><span class="text-nowrap">{{ item.deadline }}</span></strong>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="mb-2">
                                            <div class="box-cart-price">
                                                <div class="label fz16">Стоимость:</div><strong class="fz24">{{ item.price }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-html="form_html" ref="form">
                <div class="loader text-center">
                    <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="cart-message cart-message-emty mb-5">
                <div class="d-flex align-items-center">
                  <div class="box-icon-sheme mr-4">
                      <i class="icon-svg">
                          <svg class="icon-icon-sheme icon-grey-2" width="62" height="62" viewBox="0 0 62 62">
                            <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-sheme"></use>
                          </svg>
                      </i>
                      <i class="icon-close">
                          <svg class="icon-icon-close icon-grey-2" width="12" height="12" viewBox="0 0 12 12">
                            <use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-close"></use>
                          </svg>
                      </i>
                  </div>
                  <span class="fz36 fz-m-18">Вы еще не добавили ни одной квартиры</span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-8 col-md-12 col-sm-14">
                    <a class="btn btn-orange btn-cute d-block fz24" href="/kvartiry/">
                        <span>Выбрать квартиру</span>
                    </a>
                </div>
              </div>
        </div>
    </div>
    <div v-else>
        <div class="text-center" style="min-height:184px;">
            <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
        </div>
    </div>
</div>
</template>

<script>
define(['Vue', 'apolloProvider', 'gql', 'Forms'], function(Vue, apolloProvider, gql, forms) {
    return new Vue({
        template: template,
        apolloProvider,
        apollo: {
            send_form: {
                query: gql `mutation send_form($data: String!) {
                        send_form(data: $data) {
                            status
                        }
                    }
                `,
                context: {
                    hasUpload: true
                },
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.result = data.send_form.status;
                    if (this.result !== 'ok') {
                        Swal.fire({
                            type: 'error',
                            title: 'Ошибка!',
                            text: 'Произошла ошибка, сообщение не отправлено, пожалуйста свяжитесь с нами по телефону! Спасибо за понимание!',
                        });
                        this.shared.pageloader = false;
                    } else {
                        if (this.thank_page_url !== '') {
                            window.location.href = this.thank_page_url;
                        }
                    }
                },
                fetchPolicy: 'no-cache',
                skip: function() {
                    return this.skip_sending_form;
                },
                variables() {
                    return {
                        data: this.form_data
                    }
                }
            },
            get_form: {
                query: gql `query get_form($name: String!) {
                    get_form(name: $name) {
                        html
                    }
                }
                `,
                fetchPolicy: 'no-cache',
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.form_html = data.get_form.html;
                },
                skip: function() {
                    return this.skip_load_form;
                },
                variables: function() {
                    return {
                        name: 'cart-form'
                    };
                }
            },
            remove_from_cart: {
                query: gql `query remove_from_cart($flat_id: Int!){
                    remove_from_cart(flat_id: $flat_id) {
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
                fetchPolicy: 'no-cache',
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.shared.cart = data.remove_from_cart.items;
                    this.shared.pageloader = false;
                },
                skip: function() {
                    return this.skip_remove;
                },
                variables: function() {
                    return {
                        flat_id: this.flat_id_to_remove
                    }
                }
            }
        },
        data: function() {
            return {
                form_html: '',
                flat_id_to_remove: 0,
                skip_remove: true,
                skip_load_form:false,
                skip_sending_form: true,
                form_data: {},
                thank_page_url: '',
                shared: store.state
            }
        },
        methods: {
            removeItem: function(id, e) {
                this.flat_id_to_remove = id;
                this.skip_remove = false;
                this.shared.pageloader = true;
                e.preventDefault();
            }
        },
        updated: function() {

            var _obj = this;

            $('.iCheck').iCheck();

            $('form .checkbox-fields input[type="checkbox"]',this.$refs.form).on('ifClicked',function(){
                $('form .checkbox-fields input[type="checkbox"]',_obj.$refs.form).iCheck('uncheck');
                $('form .checkbox-fields input[type="checkbox"]:checked',_obj.$refs.form).prop('checked',false);
            });

            $('form .form-group-check input[type="radio"]',this.$refs.form).on('ifClicked',function() {
                $('[data-id="info"]').val($(this).val());
            });

            $('form .form-group-check input[type="text"]',this.$refs.form).on('keyup',function() {
                $('[data-id="info"]').val($(this).val());
            });

            $('form',this.$refs.form).on('submit',function(){

                var _form = this;
                var _form_data = forms.get_form_data(_form);

                var thank_page_url = $(_form).data('thank-page-url');
                _obj.thank_page_url = thank_page_url;
                $('[data-id="url"]', _form).val(window.location.href);

                if (!$('input[name="agreement"]', _form).is(':checked') && !$('input[name="agreement_policy"]', _form).is(':checked')) {
                    Swal.fire({
                        type: 'error',
                        title: 'Ошибка!',
                        text: 'Вам необходимо подтвердить своё согласие с политикой конфиденциальности и пользовательским соглашением!',
                    });
                    return false;
                }

                if (!$('input[name="3days_booking_agreement"]', _form).is(':checked')) {
                    Swal.fire({
                        type: 'error',
                        title: 'Ошибка!',
                        text: 'Вам необходимо подтвердить своё согласие на заключение договора бронирования!',
                    });
                    return false;
                }

                if (_form_data.errors.length > 0)
                    return false;


                _obj.shared.pageloader = true;
                _form_data.data_object['stop_spam'] = 'true';
                _form_data.data_object['url'] = window.location.href;
                _obj.form_data = JSON.stringify(_form_data.data_object);
                _obj.skip_sending_form = false;


                return false;
            });

        }
    })
});
</script>
