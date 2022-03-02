<template>
<div :class="cfilter.only_count?'box-shadow-2 p-2 w-100':''" style="opacity:0;">
    <div class="module module__filter" >

        <div :class="!cfilter.only_count?'bg-grey box-shadow-2 rounded p-2':''">

            <h3 class="fz30 mb-lg-3 mb-2">Подбор по параметрам</h3>

            <div class="fz20 mb-lg-3 mb-2" v-if="!cfilter.only_count">Задайте параметры, чтобы подобрать оптимальный вариант квартиры</div>

            <form action="#" class="filter-form" v-on:submit.prevent>
                <div class="form-group mb-2">
                    <div class="label d-block fz14 text-grey text-uppercase">Количество комнат</div>
                    <div class="d-flex flex-sm-wrap labels-check">
                        <div class="checkBox" v-for="room in cfilter.data.rooms">
                            <div class="icheckbox">
                                <input :disabled="room.active ? false : true" :id="'room-'+room.id" type="checkbox" :value="room.id" class="iCheck" v-model="cfilter.selected.rooms" style="position: absolute; opacity: 0;" />
                                <label :for="'room-'+room.id">{{ room.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label class="d-block fz14 text-grey text-uppercase">Стоимость, <span class="rub">&#8381;</span></label>
                    <div id="slider-snap"></div>
                    <div class="slider-snap-value d-flex justify-content-between pt-1">
                        <div class="d-flex"><span>от</span>
                            <div id="slider-snap-value-lower"></div><span>млн.</span>
                        </div>
                        <div class="d-flex"><span>до</span>
                            <div id="slider-snap-value-upper"></div><span>млн.</span>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label class="d-block fz14 text-grey text-uppercase">Площадь квартиры</label>
                    <div id="slider-snap2"></div>
                    <div class="slider-snap-value d-flex justify-content-between pt-1">
                        <div class="d-flex"><span>от</span>
                            <div id="slider-snap-value-lower2"></div><span>м<sup>2</sup></span>
                        </div>
                        <div class="d-flex"><span>до</span>
                            <div id="slider-snap-value-upper2"></div><span>м<sup>2</sup></span>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label class="d-block fz14 text-grey text-uppercase">Срок сдачи</label>
                    <div class="d-flex flex-wrap">
                        <div class="checkBox" v-for="year in cfilter.data.years">
                            <div class="icheckbox">
                                <input :disabled="year.active ? false : true" class="iCheck" :id="'year-'+year.name" type="checkbox" :value="year.name" v-model="cfilter.selected.years" style="position: absolute; opacity: 0;" />
                                <label :for="'year-'+year.name">{{ year.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label class="d-block fz14 text-grey text-uppercase">Жилой квартал</label>
                    <div class="m-select">
                        <select class="select-m" id="sl0" multiple="multiple" v-model="cfilter.selected.complexes">
                            <option :disabled="complex.active ? false : true" v-for="complex in cfilter.data.complexes" :value="complex.id">{{ complex.name }}</option>
                        </select>
                    </div>
                </div>
                <div v-if="cfilter.only_count">
                    <div class="form-group mb-0" v-if="caparts.total_count > 0">
                        <a class="btn btn-orange rounded fz18 w-100" :href="'/kvartiry/?'+this.getUrlQuery()">Показать {{ caparts.total_count+' '+helper.plural(caparts.total_count,['вариант','варианта','вариантов']) }}</a>
                    </div>
                    <div class="form-group mb-0" v-else>
                        По указанным параметрам нет подходящих вариантов
                    </div>
                </div>
                <div class="form-group mb-0" v-else>
                    <button class="btn btn-border-orange rounded fz18 w-100" v-on:click="resetFilter"><span class="text-clr-title">Сбросить параметры</span></button>
                </div>
            </form>

        </div>
    </div>
</div>
</template>


<script>
define(['Vue', 'apolloProvider', 'gql', 'router', 'Helper'], function(Vue, apolloProvider, gql, router, helper) {

    return new Vue({
        template: template,
        apolloProvider,
        router,
        apollo: {
            aparts: {
                query: gql `query aparts(
                        $years: [String!],
                        $price_max: String!,
                        $price_min: String!,
                        $area_max: String!,
                        $area_min: String!,
                        $complexes: [Int!],
                        $rooms: [Int!],
                        $only_count: Boolean!
                    ) {
                    aparts(
                        years: $years,
                        price_max: $price_max,
                        price_min: $price_min,
                        area_min: $area_min,
                        area_max: $area_max,
                        complexes: $complexes,
                        rooms: $rooms,
                        only_count: $only_count
                    ) {
                        items{
                            id
                            complex
                            complex_code
                            line
                            building
                            deadline
                            floor
                            number
                            rooms_num
                            area_total
                            area_kitchen
                            price
                            thumb_dir
                            thumb_name
                        }
                        total_count

                    }
                }`,
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.cfilter.loading_aparts = false;
                    this.caparts = data.aparts;

                    if (!this.cfilter.only_count) {
                        this.$router.push({
                            path: window.location.pathname,
                            query: this.getPathObject()
                        }).catch(() => {});
                    }

                },
                fetchPolicy: 'no-cache',
                skip: function() {
                    return this.cfilter.skip_aparts;
                },
                variables() {
                    return {
                        years: this.cfilter.selected.years,
                        price_max: this.cfilter.selected.price_max,
                        price_min: this.cfilter.selected.price_min,
                        area_max: this.cfilter.selected.area_max,
                        area_min: this.cfilter.selected.area_min,
                        complexes: this.cfilter.selected.complexes,
                        rooms: this.cfilter.selected.rooms,
                        only_count: this.cfilter.only_count
                    }
                }
            },
            filter: {
                query: gql `query filter {
                filter {
                  years {
                    name
                    active
                  }
                  price_max
                  price_min
                  area_min
                  area_max
                  complexes {
                    name
                    id
                    active
                  }
                  rooms {
                    name
                    id
                    active
                  }
                }
            }
            `,
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.cfilter.data.years = data.filter.years;
                    this.cfilter.data.complexes = data.filter.complexes;
                    this.cfilter.data.rooms = data.filter.rooms;
                    this.cfilter.data.price_min = data.filter.price_min;
                    this.cfilter.data.price_max = data.filter.price_max;
                    this.cfilter.data.area_max = data.filter.area_max;
                    this.cfilter.data.area_min = data.filter.area_min;
                },
            }
        },
        data: function() {
            return store.state;
        },
        watch: {
            'cfilter.selected': {
                handler: 'filterChanged',
                immediate: false,
                deep: true
            },
        },
        methods: {
            initUrlParams: function() {
                if (!this.aparts_url_set) {
                    var url_selected = {};

                    for (_name in this.$router.history.current.query) {

                        var _val = this.$router.history.current.query[_name];

                        if (_val !== '' && _val !== null) {
                            if (_name == 'complexes' || _name == 'rooms') {
                                url_selected[_name] = _val.split(',').map(x => parseInt(x));
                            } else if(_name == 'years')
                            {
                                url_selected[_name] = _val.split(',').map(x => ''+x);
                            }
                            else
                                url_selected[_name] = _val;
                        }
                    }
                    this.$set(this.cfilter, 'selected', Object.assign(this.cfilter.selected, url_selected));
                    this.aparts_url_set = true;
                }
            },
            getPathObject: function() {
                return {
                    'price_min': this.cfilter.selected.price_min,
                    'price_max': this.cfilter.selected.price_max,
                    'area_min': this.cfilter.selected.area_min,
                    'area_max': this.cfilter.selected.area_max,
                    'rooms': this.cfilter.selected.rooms.length > 0 ? this.cfilter.selected.rooms.join(',') : '',
                    'complexes': this.cfilter.selected.complexes.length > 0 ? this.cfilter.selected.complexes.join(',') : '',
                    'years': this.cfilter.selected.years.length > 0 ? this.cfilter.selected.years.join(',') : ''
                };
            },
            getUrlQuery: function() {
                var params = this.getPathObject();
                var query = '';
                for (_el in params) {
                    query += _el + '=' + params[_el]+'&';
                }
                return query;
            },
            resetFilter: function(e) {

                this.$set(this.cfilter.selected, 'price_min', this.cfilter.data.price_min.toString());
                this.$set(this.cfilter.selected, 'price_max', this.cfilter.data.price_max.toString());
                this.$set(this.cfilter.selected, 'price_max', this.cfilter.data.price_max.toString());
                this.$set(this.cfilter.selected, 'area_min', this.cfilter.data.area_min.toString());
                this.$set(this.cfilter.selected, 'area_max', this.cfilter.data.area_max.toString());
                this.$set(this.cfilter.selected, 'years', []);
                this.$set(this.cfilter.selected, 'complexes', []);
                this.$set(this.cfilter.selected, 'rooms', []);
                this.$forceUpdate();

            },
            filterChanged: function(e) {
                this.cfilter.loading_aparts = true;
            }
        },
        updated: function() {


            this.$nextTick(function() {

                this.initUrlParams();

                var _obj = this;

                $(".module__filter .select-m").on('change', function(e) {
                    if ($(this).val() !== null)
                        var _values = $(this).val().map(x => parseInt(x));
                    else
                        var _values = [];
                    _obj.$set(_obj.cfilter.selected, 'complexes', _values);
                    _obj.$forceUpdate();
                });

                $(".module__filter .select-m").select2({
                    "width": "100%",
                    minimumResultsForSearch: 100,
                    placeholder: {
                        text: 'Все дома'
                    },
                    dropdownCssClass: 'drop-multy'
                });


                if (typeof(this.cfilter.sliders.snapSlider) == 'object') {
                    this.cfilter.sliders.snapSlider.noUiSlider.destroy();
                }

                this.cfilter.sliders.snapSlider = document.getElementById('slider-snap');

                noUiSlider.create(this.cfilter.sliders.snapSlider, {
                    start: [
                        this.cfilter.selected.price_min ? this.cfilter.selected.price_min : this.cfilter.data.price_min,
                        this.cfilter.selected.price_max ? this.cfilter.selected.price_max : this.cfilter.data.price_max
                    ],
                    range: {
                        'min': this.cfilter.data.price_min,
                        'max': this.cfilter.data.price_max
                    },
                    format: wNumb({
                        decimals: 1
                    })
                });


                this.cfilter.sliders.snapValues = [document.getElementById('slider-snap-value-lower'), document.getElementById('slider-snap-value-upper')];


                this.cfilter.sliders.snapSlider.noUiSlider.on('start', function() {
                    _obj.cfilter.skip_aparts = true;
                });

                this.cfilter.sliders.snapSlider.noUiSlider.on('end', function() {
                    _obj.cfilter.skip_aparts = false;
                });

                this.cfilter.sliders.snapSlider.noUiSlider.on('update', function(values, handle) {

                    _obj.cfilter.sliders.snapValues[handle].innerHTML = helper.number_format( (values[handle]/1000000),2,'.',' ');

                    switch (handle) {
                        case 0:
                            _obj.cfilter.selected.price_min = values[0];
                            break;

                        case 1:
                            _obj.cfilter.selected.price_max = values[1];
                            break;
                    }

                });


                if (typeof(this.cfilter.sliders.snapSlider2) == 'object') {
                    this.cfilter.sliders.snapSlider2.noUiSlider.destroy();
                }

                this.cfilter.sliders.snapSlider2 = document.getElementById('slider-snap2');

                noUiSlider.create(this.cfilter.sliders.snapSlider2, {
                    start: [
                        this.cfilter.selected.area_min ? this.cfilter.selected.area_min : this.cfilter.data.area_min,
                        this.cfilter.selected.area_max ? this.cfilter.selected.area_max : this.cfilter.data.area_max
                    ],
                    range: {
                        'min': this.cfilter.data.area_min,
                        'max': this.cfilter.data.area_max
                    }
                });

                this.cfilter.sliders.snapValues2 = [document.getElementById('slider-snap-value-lower2'), document.getElementById('slider-snap-value-upper2')];

                this.cfilter.sliders.snapSlider2.noUiSlider.on('start', function() {
                    _obj.cfilter.skip_aparts = true;
                });

                this.cfilter.sliders.snapSlider2.noUiSlider.on('end', function() {
                    _obj.cfilter.skip_aparts = false;
                });

                this.cfilter.sliders.snapSlider2.noUiSlider.on('update', function(values, handle) {
                    _obj.cfilter.sliders.snapValues2[handle].innerHTML = values[handle];

                    switch (handle) {
                        case 0:
                            _obj.cfilter.selected.area_min = values[0];
                            break;

                        case 1:
                            _obj.cfilter.selected.area_max = values[1];
                            break;
                    }
                });

                this.cfilter.skip_aparts = false;

                $(this.$el).animate({'opacity':1},100);
            });


        },
        created: function() {


        },
        mounted: function() {



        }
    });

});
</script>
