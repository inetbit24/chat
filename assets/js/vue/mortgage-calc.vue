<template>
<div class="module module__calc">
    <div class="bg-grey p-xl-5 p-md-2 p-1">
        <div class="pt-2 pb-2 pl-1 pr-1">
            <div class="block__calc pb-lg-4 pb-2">
                <div class="block__calc--row mb-5">
                    <div class="label text-uppercase text-grey fz16 mb-2">Стоимость квартиры, руб.</div>
                    <div id="calcSlider1"></div>
                </div>
                <div class="block__calc--row mb-5 pt-2">
                    <div class="label text-uppercase text-grey fz16 mb-2">Первоначальный взнос, руб.</div>
                    <div id="calcSlider2"></div>
                </div>
                <div class="block__calc--row row-years mb-5 pt-2">
                    <div class="label text-uppercase text-grey fz16 mb-2">Срок кредита в годах</div>
                    <div id="calcSlider3"></div>
                </div>
            </div>

            <h3 class="fz30 mb-lg-2 mb-1">Результаты предварительного расчета</h3>
            <p class="fz18">Расчет по калькулятору является предварительным, для получения индивидуального расчета, оставьте заявку по кнопке ниже</p>
            <div class="block__calc-result">
                <div class="bg-white box-shadow-3 mb-lg-4 mb-2">

                        <table class="w-100" v-if="banks.length>0">

                            <tr>
                                <th class="text-grey border-bottom fz16 pt-2 pb-1 text-md-center text-nowrap pl-md-0 p-2">Банк</th>
                                <th class="text-grey border-bottom fz16 pt-2 pb-1 text-center text-nowrap">Процентная<br class="d-md-none d-block"> ставка</th>
                                <th class="text-grey border-bottom fz16 pt-2 pb-1 text-center text-nowrap">Ежемесячный<br class="d-md-none d-block"> платеж</th>
                            </tr>

                            <tr v-for="bank in banks">
                                <td class="text-center border-bottom pt-3 pb-3 pl-md-0 pr-md-0 pl-1 pr-1">
                                    <span class="box-img" v-if="bank.thumb !== null">
                                        <img class="img-fluid" :src="bank.thumb" :alt="bank.name" />
                                    </span>
                                    <span v-else>
                                        {{ bank.name }}
                                    </span>
                                </td>
                                <td class="text-center border-bottom pt-3 pb-3 pl-md-0 pr-md-0 pl-1 pr-1">
                                    <strong class="fz24">{{ bank.rate }} %</strong>
                                </td>
                                <td class="text-center border-bottom pt-3 pb-3 pl-md-0 pr-md-0 pl-1 pr-1">
                                    <strong class="fz24">{{ bank.pay }}</strong>
                                </td>
                            </tr>


                        </table>

                        <div style="padding: 10px;" v-if="banks.length == 0">
                            Банковских предложений по выбранным параметрам нет.
                        </div>

                </div>
            </div>

            <a class="btn btn-orange btn-cute d-block fz20" href="#" data-modal-type="modal-form" :data-flat-id="this.flat_id" data-toggle="modal" :data-object-code="this.object_code" data-form-name="mortgage-form">
                <span>Получить точный расчет</span>
            </a>
        </div>
    </div>
    <div class="loader" v-bind:class="loader?'show':''">
        <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
    </div>
</div>
</template>

<script>
define(['Vue', 'apolloProvider', 'gql', 'Forms'], function(Vue, apolloProvider, gql, forms) {

    return new Vue({
        template: template,
        apolloProvider,
        apollo: {
            mortgage_calc: {
                query: gql `query mortgage_calc($flat_id: String, $price: String!, $time: String, $payment_from: String) {
                    mortgage_calc(flat_id: $flat_id, price: $price, time: $time, payment_from: $payment_from)
                    {
                        banks {
                            id
                            rate
                            name
                            pay
                            thumb
                        }
                        data {
                            payment_max
                            payment_from
                            time_min
                            time_max
                            time_from
                            all_price_max
                        }
                    }
                }`,
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.banks = data.mortgage_calc.banks;
                    this.data = data.mortgage_calc.data;
                    this.initSlider();
                    this.loader = false;
                },
                fetchPolicy: 'no-cache',
                skip: function() {
                    return this.skip_bank;
                },
                variables() {
                    return {
                        flat_id: this.flat_id,
                        price: this.price,
                        time: this.time,
                        payment_from: this.payment_from
                    }
                }

            }
        },
        created: function() {

        },
        watch: {
            'price': {
                handler: 'dataUpdate',
                immediate: false,
                deep: false
            }
        },
        updated: function() {
            // this.initSlider();
        },
        mounted: function() {
            // this.initSlider();

            forms.init_modals_buttons_and_forms(Vue, apolloProvider, gql);
            var _obj = this;
            this.shared.modals.forms.callbacks['update_price'] = function() {
                $('[name="form_text_226"]').val(_obj.payment_from);
            }
        },
        methods: {
            dataUpdate: function(e) {
                if (this.price !== '' && Object.keys(this.data).length == 0 ) {
                    this.skip_bank = false;
                }
            },
            initSlider: function(e) {

                var _obj = this;

                // slider 1

                if (typeof(this.sliders.calcSlider1) == 'object') {
                    this.sliders.calcSlider1.noUiSlider.destroy();
                }

                this.sliders.calcSlider1 = document.getElementById('calcSlider1');

                noUiSlider.create(this.sliders.calcSlider1, {
                    start: [this.price],
                    tooltips: [
                        wNumb({
                            decimals: 0,
                            thousand: ' ',
                            prefix: ' ',
                            suffix: ' p.p.'
                        })
                    ],
                    range: {
                        'min': 0,
                        'max': parseInt(this.data.all_price_max)
                    }
                });


                this.sliders.calcSlider1.noUiSlider.on('start', function() {
                    _obj.skip_bank = true;
                });

                this.sliders.calcSlider1.noUiSlider.on('end', function() {
                    _obj.skip_bank = false;
                    _obj.loader = true;
                });

                this.sliders.calcSlider1.noUiSlider.on('update', function(values, handle) {
                    _obj.price = values[0];
                });


                // slider 2

                if (typeof(this.sliders.calcSlider2) == 'object') {
                    this.sliders.calcSlider2.noUiSlider.destroy();
                }

                this.sliders.calcSlider2 = document.getElementById('calcSlider2');

                noUiSlider.create(this.sliders.calcSlider2, {
                    start: [this.payment_from !== '0'? parseInt(this.payment_from) :parseInt(this.data.payment_from)],
                    tooltips: [
                        wNumb({
                            decimals: 0,
                            thousand: ' ',
                            prefix: ' ',
                            suffix: ' p.p.'
                        })
                    ],
                    range: {
                        'min': 0,
                        'max': parseInt(this.data.payment_max)
                    }
                });

                this.sliders.calcSlider2.noUiSlider.on('start', function() {
                    _obj.skip_bank = true;
                });

                this.sliders.calcSlider2.noUiSlider.on('end', function() {
                    _obj.skip_bank = false;
                    _obj.loader = true;
                });

                this.sliders.calcSlider2.noUiSlider.on('update', function(values, handle) {
                    _obj.payment_from = values[0];
                });


                // slider 3

                if (typeof(this.sliders.calcSlider3) == 'object') {
                    this.sliders.calcSlider3.noUiSlider.destroy();
                }

                this.sliders.calcSlider3 = document.getElementById('calcSlider3');

                noUiSlider.create(this.sliders.calcSlider3, {
                    start: [parseInt(this.data.time_from)],
                    tooltips: [
                        wNumb({
                            decimals: 0,
                            thousand: ' ',
                            prefix: ' ',
                            suffix: ' p.p.'
                        })
                    ],
                    range: {
                        'min': 0,
                        'max': parseInt(this.data.time_max)
                    }
                });

                this.sliders.calcSlider3.noUiSlider.on('start', function() {
                    _obj.skip_bank = true;
                });

                this.sliders.calcSlider3.noUiSlider.on('end', function() {
                    _obj.skip_bank = false;
                    _obj.loader = true;
                });

                this.sliders.calcSlider3.noUiSlider.on('update', function(values, handle) {
                    _obj.time = values[0];
                });

            }
        },
        data: function(e) {
            return {
                flat_id: '',
                time: '0',
                price: '',
                banks: [],
                data: {},
                payment_from: '0',
                skip_bank: true,
                loader: true,
                object_code: '',
                sliders: {
                    calcSlider1:'',
                    calcSlider2:'',
                    calcSlider3:''
                },
                shared: store.state
            }
        }
    });
});
</script>
