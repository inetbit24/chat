<template>
<div>
    <div v-if="!skip_aparts">
        <div class="widget-loader">
            <img src="/local/templates/lst/assets/svg/widget_loader.svg" />
        </div>
    </div>

    <div v-else>
        <div v-if="commercial_aparts.length > 0">
            <div class="table-simple" >
                <table class="w-100 fz16 b-search-results__table table-4">
                    <thead>
                        <tr>
                            <th class="bg-yellow border-bottom"><strong>Очередь</strong></th>
                            <th class="bg-yellow border-bottom"><strong>Корпус</strong></th>
                            <th class="bg-yellow border-bottom"><strong>Срок сдачи</strong></th>
                            <th class="bg-yellow border-bottom"><strong>Этаж</strong></th>
                            <th class="bg-yellow border-bottom"><strong>S общ, м<sup>2</sup></strong></th>
                            <th class="bg-yellow border-bottom"><strong>Цена, руб.</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="apart in commercial_aparts" v-on="{ mouseover: apartRowMouseOver, mouseleave: apartRowMouseLeave }" :data-thumb=" apart.thumb_name !== null ?'/upload/'+apart.thumb_dir+'/'+apart.thumb_name : '' ">
                            <td>{{ apart.line }} очередь</td>
                            <td>{{ apart.building }}</td>
                            <td>{{ apart.deadline }}</td>
                            <td>{{ apart.floor }}</td>
                            <td>{{ apart.area_total }}</td>
                            <td>{{ helper.number_format(apart.price,0,'.',' ') }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flat-plan-preview">
                    <span></span>
                    <img class="p-3 img-fluid" src="" alt="image" />
                </div>
            </div>
        </div>
        <div v-else>
            Коммерческих помещений нет в продаже.
        </div>
    </div>
</div>
</template>

<script>
define(['Vue', 'apolloProvider', 'gql', 'Helper'], function(Vue, apolloProvider, gql, helper) {
    return new Vue({
        template: template,
        apolloProvider,
        apollo: {
            commercial_aparts: {
                query: gql `query commercial_aparts($object_id: Int!) {
                    commercial_aparts(object_id: $object_id) {
                        id
                        price
                        area_total
                        line
                        building
                        deadline
                        floor
                        thumb_dir
                        thumb_name
                        thumb_id
                    }
                }`,
                result({
                    data,
                    loading,
                    networkStatus
                }) {
                    this.skip_aparts = true;
                },
                fetchPolicy: 'no-cache',
                skip: function() {
                    return this.skip_aparts;
                },
                variables() {
                    return {
                        object_id: parseInt(this.object_id)
                    }
                }
            },

        },
        methods: {
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

        },
        data: function() {
            return {
                commercial_aparts: [],
                helper: helper,
                skip_aparts: false,
                object_id: 0
            }
        }
    });

});
</script>
