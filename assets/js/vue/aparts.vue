<template>
<div>

    <div v-if="typeof(caparts) == 'object'">

        <div class="d-xl-flex justify-content-between align-items-end mb-xl-3 mb-2">
            <div class="mb-xl-0 mb-1 without-wrapping">
                <h2 class="fz30">НАЙДЕНО <span class="text-orange">{{ caparts.items.length+' '+helper.plural(caparts.items.length,['КВАРТИРА','КВАРТИРЫ','КВАРТИР']) }}</span> ИЗ {{ caparts.total_count }}</h2>
            </div>
            <div class="ml-xl-2 d-xl-flex justify-content-xl-end">
                <div class="module module__filter-after-search">
                    <div class="label text-uppercase fz14 text-grey">Визуальный выбор квартиры в</div>
                    <div class="d-sm-flex justify-content-xl-end">
                        <select class="select" id="sl001" name="sl001">
                            <option value="0">Выбрать</option>
                            <option value="yanila_drive">Янила Драйв</option>
                            <option value="jaanila-country">Янила Кантри</option>
                            <option value="jaanila-country-club">Янила Кантри Клаб</option>
                            <option value="yutteri">Юттери</option>
                            <option value="iq-gatchina">IQ-Гатчина</option>
                        </select>
                        <a class="btn btn-border-orange btn-border-orange-more d-sm-inline-block d-block mt-sm-0 mt-1" href="#" v-on:click="goToVisual">
                            <strong class="fz14 text-nowrap">Перейти к подбору</strong>
                        </a>
                    </div>
                </div><!-- end module filter-after-search -->
            </div>
        </div>

        <div v-if="cfilter.loading_aparts">
            <div class="widget-loader">
                <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
            </div>
        </div>


        <div v-else class="table-simple table-simple-2 scrollBoxTable">
            <div v-if="caparts.items.length > 0">

                <simplebar data-simplebar="init" class="flats-results-cont" data-simplebar-auto-hide="false">
                    <table class="fz16 b-search-results__table b-search-results-b">
                        <thead>
                            <tr class="">
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Жилой квартал</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Очередь</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Корпус</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Срок сдачи</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Этаж</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">№ кв</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Кол-во комнат</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">S общ, м2</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">S кухни, м2</strong></th>
                                <th class="bg-yellow border-bottom"><strong class="text-nowrap">Цена, руб.</strong></th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-on="{ mouseover: apartRowMouseOver, mouseleave: apartRowMouseLeave }" v-for="apart in caparts.items" v-on:click="goToApartPage('/kvartaly/'+apart.complex_code+'/vibor-kvartiry/'+apart.id+'/')" class="d-lg-table-row d-flex flex-wrap"
                              :data-link="'/kvartiry/'+apart.complex_code+'/vibor-kvartiry/'+apart.id+'/'" :data-thumb=" apart.thumb_name !== null ?'/upload/'+apart.thumb_dir+'/'+apart.thumb_name : '' ">
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Жилой квартал</strong><span>{{ apart.complex }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Очередь</strong><span>{{ apart.line }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Корпус</strong><span>{{ apart.building }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Срок сдачи</strong><span>{{ apart.deadline }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Этаж</strong><span>{{ apart.floor }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">№ кв</strong><span>{{ apart.number }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">Кол-во комнат</strong><span>{{ apart.rooms_num }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">S общ, м2</strong><span>{{ apart.area_total }}</span></td>
                                <td class="text-nowrap"><strong class="d-lg-none d-block">S кухни, м2</strong><span>{{ apart.area_kitchen }}</span></td>
                                <td><strong class="d-lg-none d-block">Цена, руб.</strong><span><strong class="text-orange">{{ helper.number_format(apart.price,0,'.',' ') }}</strong></span></td>
                            </tr>

                        </tbody>
                    </table>
                </simplebar>

            </div>
            <div v-else>
                <div class="text-center fz24">
                    По указанным параметам нет подходящих вариантов квартир.<br /> Попробуйте выбрать другие параметры в фильтре.
                </div>
            </div>
            <div class="flat-plan-preview">
                <span></span>
                <img class="p-3 img-fluid" src="" alt="image" />
            </div>
        </div>

    </div>

    <div v-if="typeof(caparts) !== 'object'">
        <div class="widget-loader">
            <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
        </div>
    </div>

</div>
</template>


<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {

    return new Vue({
        template: template,
        watch: {
            'cfilter': {
                handler: 'filterChanged',
                immediate: false,
                deep: true
            },
        },
        methods: {
            goToVisual: function(message, event) {
                if(typeof(this.visual_object_code) !== 'undefined')
                {
                    window.location.href = '/kvartaly/'+this.visual_object_code+'/visual-kvartiry/';
                    this.pageloader = true;
                }

                event.preventDefault();
            },
            apartRowMouseLeave: function(e) {
                $('.flat-plan-preview').hide();
            },
            apartRowMouseOver: function(e) {
                var thumb_src = e.currentTarget.getAttribute('data-thumb');
                if (thumb_src !== '') {
                    $('.flat-plan-preview img').attr('src', thumb_src);
                    $('.flat-plan-preview').css({
                        'left': e.clientX - 50,
                        'top': e.clientY - 50 - $('.flat-plan-preview').height()
                    }).show();
                }
            },
            filterChanged: function() {

            },
            goToApartPage: function(url) {
                window.open(url);
            }
        },
        updated: function() {

            // SimpleBar($('.b-search-results__table', $(this))[0], {
            //   autoHide: false
            // });
            var _obj = this;
            $(".module__filter-after-search .select").on('select2:select', function(e) {
                _obj.visual_object_code = $(this).val();

                // switch ($(this).val()) {
                //     case 'yanila-drive':
                //         window.location.href = '/kvartaly/yanila_drive/visual-kvartiry/';
                //         break;
                // }

            });

            $(".module__filter-after-search .select").select2({
                "width": "100%",
                minimumResultsForSearch: 100
            });
            setTimeout(function() {
                $('.module__filter-after-search .select2').trigger('click');
            }, 200);
            // console.log('ok!');
        },
        data: function() {
            return store.state;
        },
        mounted: function() {
            // console.log(store.state);
        }
    });
});
</script>
