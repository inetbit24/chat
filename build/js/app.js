import Vue from 'vue';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';
import $ from "jQuery";
import InfiniteScroll from 'v-infinite-scroll'
import 'v-infinite-scroll/dist/v-infinite-scroll.css'

Vue.use(VueRouter);
Vue.use(LoadScript);
Vue.use(InfiniteScroll);

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
			loading: false,
			page: 1,
			navPage: new Map(),
        };
	},
    created: function() {
		
		// получаем массив данных сообщений
		var draw = 1;
		var page = 1;
		var arPage = [];
        if (sessionStorage.getItem('chat') != null)
		{
			this.ditems = JSON.parse( "[" + sessionStorage.getItem('chat') + "]");
			
			for (var prop in this.ditems) {
				this.ritems.push(JSON.stringify(this.ditems[prop]));
				
				// делим на постранички
				
				if (draw<=5) 
				{
					arPage.push(this.ditems[prop]);
				}
				
				draw++;
				
				if (arPage.length == 5) 
				{
					this.navPage.set(page, arPage);	
					arPage = [];
					page++;
					draw = 1;
				}
			}
			
			if (arPage.length < 5 && arPage.length > 0)
			{
				
				this.navPage.set(page, arPage);	
				arPage = [];
			}
			
			
			this.items = this.navPage.get(this.page);
		   
			//this.items = this.ditems;
			
		}

    },
	methods: {
		
		prevPage: function() 
		{
			if (this.page == 1) return
			--this.page
			this.loadPage()
		},
		
		nextPage: function() 
		{
			++this.page
			this.loadPage()
		},
		
		loadPage: function() 
		{
			this.loading = true

			if (this.navPage.has(this.page) == true) 
			{
				let ar = this.navPage.get(this.page);

				for (var prop in ar) {
					this.items.push(ar[prop]);
				}
				
				this.loading = false
			}
		},
		
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
			setTimeout(function(){   
				$('#winchat > div').animate({scrollTop: $('#winchat > div').get(0).scrollHeight}, 1000);
			}, 300);
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
		   
        },
		
	},
});

