function Forms() {
    return {
        init: function() {
            console.log('init!');
        },
        init_modals_buttons_and_forms: function(Vue, apolloProvider, gql) {
            var elements = document.querySelectorAll('[data-toggle="modal"]');
            if (elements) {
                for (id in elements) {
                    var el = elements[id];
                    if (typeof(el) == 'object') {
                        var vue = new Vue({
                            el: el,
                            apolloProvider,
                            apollo: {
                                get_form: {
                                    query: gql `query get_form($name: String!,$data: String) {
                                        get_form(name: $name, data: $data) {
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
                                        this.content = data.get_form.html;
                                    },
                                    variables() {
                                        return {
                                            name: this.form_name,
                                            data: this.data
                                        };
                                    },
                                    skip: function() {
                                        return this.skip_load_form;
                                    }
                                }
                            },
                            data: function() {
                                return {
                                    content: '',
                                    form_name: '',
                                    data: '',
                                    skip_load_form: true,
                                    type: 'modal-form',
                                    shared: store.state
                                };
                            },
                            created: function() {
                                this.mount();
                            },
                            updated: function() {
                                this.mount();
                            },
                            mounted: function() {
                                this.mount();
                            },
                            destroy: function() {
                                this.$el.removeEventListener('click', this.onClick);
                            },
                            methods: {
                                mount: function() {

                                    if (typeof(this.$el) == 'object') {

                                        var form_name = this.$el.getAttribute('data-form-name');
                                        var modal_type = this.$el.getAttribute('data-modal-type');
                                        var flat_id = this.$el.getAttribute('data-flat-id');
                                        var object_code = this.$el.getAttribute('data-object-code');

                                        switch (modal_type) {
                                            default:
                                            case 'modal-form':
                                                this.data = JSON.stringify({
                                                    'flat_id': flat_id,
                                                    'object_code': object_code
                                                });
                                                break;
                                        }

                                        if (form_name) {
                                            this.form_name = form_name;
                                            this.skip_load_form = false;
                                            this.$el.removeEventListener('click', this.onClick);
                                            this.$el.addEventListener('click', this.onClick);
                                        }
                                    }

                                },
                                onClick: function(event) {
                                    var _obj = this;
                                    switch (this.type) {
                                        default:
                                        case 'modal-form':
                                            _obj.shared.modals.forms.content = this.content;
                                            _obj.shared.modals.forms.show = true;

                                            break;
                                    }

                                    console.log('open window!');
                                }
                            }
                        });
                    }
                }
            }
        },
        get_form_data: function(form) {
            var data_to_send = new FormData();
            var data_object = {};
            var errors = [];

            $(form).find('select,input,textarea').each(function() {

                if ($(this).not('.value-if-disable').attr('disabled'))
                    return;

                $(this).removeClass('error');
                $(this).parent().removeClass('error');

                if ($(this).data('required') == true && $(this).val() == '') {
                    errors.push($(this).attr('name'));
                    $(this).addClass('error');
                    $(this).parent().addClass('error');
                }

                    // if ($(this).attr('type') == 'file') {
                    //     var files = $(this).prop('files-advanced');
                    //
                    //     if (files == undefined)
                    //         files = $(this).prop('files');
                    //
                    //     if (files !== undefined) {
                    //         for (file in files) {
                    //             if (files[file] instanceof File)
                    //                 data_to_send.append('files[]', files[file]);
                    //         }
                    //     }
                    // } else {

                    if (($(this).hasClass('mask-tel') || $(this).hasClass("mask-email")) && $(this).data('required') == true && !$(this).inputmask("isComplete")) {
                        errors.push($(this).attr('name'));
                        $(this).addClass('error');
                        $(this).parent().parent().addClass('error').removeClass('done');
                    }


                    if ($(this).attr('type') == 'file') {
                        for (file in $(this).prop('files')) {
                            data_to_send.append($(this).attr('name'), $(this).prop('files')[file]);
                        }
                    } else if ($(this).attr('type') == 'radio') {
                        if ($(this).is(':checked')) {
                            data_to_send.append($(this).attr('name'), $(this).val());
                            data_object[$(this).attr('name')] = $(this).val();
                        }
                    } else if ($(this).attr('type') == 'checkbox') {
                        if ($(this).is(':checked')) {
                            data_to_send.append($(this).attr('name'), $(this).val());
                            if (typeof(data_object[$(this).attr('name')]) !== 'object') {
                                data_object[$(this).attr('name')] = new Array();
                            }
                            data_object[$(this).attr('name')].push($(this).val());
                        }
                    } else {
                        data_to_send.append($(this).attr('name'), $(this).val());
                        data_object[$(this).attr('name')] = $(this).val();
                    }
            });

            return {
                data: data_to_send,
                data_object: data_object,
                errors: errors
            };
        },

    }
}

module.exports = Forms;
