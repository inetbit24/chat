import Vue from 'vue';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';
import Forms from './modules/forms.js';
import Helper from './modules/helper.js';
import $ from "jQuery";
import {infiniteScroll} from "infinite-scroll";

Vue.use(VueRouter);
Vue.use(LoadScript);


//Vue.component('modal-forms', require('./vue/modal-forms.vue').default);


var chat_form = new Vue({
	el: '#chat-form',
	data: function() {
        return {
            input_login: 'Введите логин',
			message: '',
			login: '',
			items: [],
			ritems: [],
			ditems: [],
        };
	},
    created: function() {
		
		// получаем массив данных сообщений
		   console.log("******************** no parse sessionStorage ******************");
		   console.log((sessionStorage.getItem('chat')));
		   console.log("******************** end no parse sessionStorage ******************");
		var draw = 0;
        if (sessionStorage.getItem('chat') != null)
		{
			this.ditems = JSON.parse( "[" + sessionStorage.getItem('chat') + "]");
			
			for (var prop in this.ditems) {
				this.ritems.push(JSON.stringify(this.ditems[prop]));
				draw++;
				if (draw<=5) this.items.push (this.ditems[prop]);
			}
			
		   console.log("******************** ritems ******************");
		   console.log(this.ritems);
		   console.log("******************** ritems ******************");
		   
			//this.items = this.ditems;
			
			$('#winchat').infiniteScroll({
			  path: function() {
				console.log(1);
			  },
			});
		}

    },
	methods: {

		isEmpty: function(str)
		{
			if (str.trim() == '') return true;
			return false;
		},
		
		getRDate: function()
		{
			let Data = new Date();
			let Hour = Data.getHours();
			let Minutes = Data.getMinutes();
			let Seconds = Data.getSeconds();
			return Hour+':'+Minutes;
		},
		
		listChatItem: function()
		{
			let destination = $('#winchat').height()+100000200;
			$('#winchat').animate( { scrollTop: destination }, 0 );
		},
		
		popupNessage: function()
		{
			alert("Введите обязательные поля");	
		},
		
		deleteMessage: function(index) {
			this.items.splice(index, 1);
			this.ritems.splice(index, 1);
			// внесем изменения
			sessionStorage.setItem('chat',this.ritems.join());
		},

        addMessage: function() {
           
		   // проверка на заполнение полей
		   console.log("message=" + this.message);
		   console.log("login="   + this.login);
		   
		   if (!this.isEmpty(this.message) && !this.isEmpty(this.login))
		   {
			   // записываем данные
			   this.ritems.push(JSON.stringify({
				   		login:this.login,
						message:this.message,
						rdate: this.getRDate(),
				   }));
			   sessionStorage.setItem('chat',this.ritems.join());

			   this.items.push({
				   		login:this.login,
						message:this.message,
						rdate: this.getRDate(),
				   });
				
				this.listChatItem();
		   }
		   else
		   {
			  this.popupNessage(); 
		   }
		   
		   console.log("******************** items ******************");
		   console.log(this.items);
		   console.log("******************** end items ******************");

		   console.log("******************** no parse sessionStorage ******************");
		   console.log((sessionStorage.getItem('chat')));
		   console.log("******************** end no parse sessionStorage ******************");
		   
        },
		
	},
});

