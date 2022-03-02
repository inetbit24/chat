<template>
<div v-html="shared.modals.forms.content" ref="cont"></div>
</template>
<script>
import Forms from '../modules/forms.js';
import gql from 'graphql-tag';
import {
    ApolloClient
} from 'apollo-client';
import {
    createHttpLink
} from 'apollo-link-http';
import {
    createUploadLink
} from 'apollo-upload-client';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';

const httpLink = createHttpLink({
    uri: '/graphql/index.php',
});

const uploadLink = createUploadLink({
    uri: '/graphql/index.php',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    defaultOptions: {
        fetchPolicy: 'no-cache'
    }

});
const apolloUploadClient = new ApolloClient({
    link: uploadLink,
    cache,
    defaultOptions: {
        fetchPolicy: 'no-cache'
    }
});

const apolloProvider = new VueApollo({
    defaultClient: apolloUploadClient
});


export default {
    apolloProvider,
    apollo: {
        send_form: {
            query: gql `mutation send_form($data: String!, $files: [Upload]) {
                    send_form(data: $data, files: $files) {
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
                    this.shared.modals.forms.show_loader = false;
                    this.shared.pageloader = false;
                } else {
                    if (this.shared.modals.forms.redirect !== '') {
                        window.location.href = this.shared.modals.forms.redirect;
                    }
                }
            },
            fetchPolicy: 'no-cache',
            skip: function() {
                return this.skip_sending_form;
            },
            variables() {
                return {
                    data: this.data,
                    files: this.files
                }
            }
        }
    },
    data: function() {
        return {
            data: {},
            files: [],
            result: false,
            skip_sending_form: true,
            shared: store.state
        }
    },
    updated: function() {
        this.FormsUpdated();
        if (this.result == 'ok') {
            _obj.shared.modals.forms.show_loader = false;
        }
    },
    created: function() {
        this.FormsUpdated();
    },
    mounted: function() {
        this.FormsUpdated();
    },
    watch: {
        'shared.modals.forms': {
            handler: 'FormsUpdated',
            immediate: false,
            deep: true
        }
    },
    methods: {
        // cleanForm: function(e) {
        //     $('form', this.$refs.cont).find('input[type="text"],input[type="file"],select,textarea').val('');
        // },
        RedirectAfterSend: function(e) {

        },
        FormsUpdated: function(e) {

            $('.iCheck').iCheck();

            var _obj = this;

            if(Object.keys(this.shared.modals.forms.callbacks).length>0)
            {
                for(id in this.shared.modals.forms.callbacks)
                {
                    var callback = this.shared.modals.forms.callbacks[id];
                    callback();
                }
            }

            $('form:not(.feedback-page-form), form.feedback-page-form, form:not(.form-search)', this.$refs.cont).on('submit', function() {

                var _form = this;

                if($(_form).hasClass('form-search'))
                {
                    $('.page-loader').show();
                    return true;
                }

                $('[data-id="url"]', _form).val(window.location.href);
                var thank_page_url = $(_form).data('thank-page-url');
                _obj.shared.modals.forms.redirect = thank_page_url;
                var _form_data = Forms().get_form_data(_form);
                _obj.files = [];
                _form_data.data_object['files'] = new Array();

                $(_form).find('input[type="file"]').each(function() {
                    var _file = $(this).prop('files')[0];
                    var _name = $(this).attr('name');
                    _obj.files.push(_file);
                    _form_data.data_object.files.push(_name);
                });

                console.log(_form_data.data_object);

                if (!$('input[name="agreement"]', _form).is(':checked')) {
                    Swal.fire({
                        type: 'error',
                        title: 'Ошибка!',
                        text: 'Вам необходимо подтвердить своё согласие с политикой конфиденциальности и пользовательским соглашением! ',
                    });
                    return false;
                }

                if (_form_data.errors.length > 0)
                    return false;


                if($('.loader',_form).length == 0 && $(_form).hasClass('feedback-page-form'))
                {
                    _obj.shared.pageloader = true;
                }

                _form_data.data_object['stop_spam'] = 'true';
                _form_data.data_object['url'] = window.location.href;
                _obj.data = JSON.stringify(_form_data.data_object);
                _obj.shared.modals.forms.show_loader = true;
                _obj.skip_sending_form = false;


                return false;
            });
        }
    },
}
</script>
