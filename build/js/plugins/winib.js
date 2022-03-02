function WinIb(options)
{

    return {

        btnOpen: '.winib',
        btnClose: '.winib_close',
        popupHeader: '',
        popupFooter: '</div></div></div></div>',
        param : {
                id:false,
                autoclose:0,
                btnclose:true,
                classmain:'',
                clickcloseall:true,
                oneclose:false,
                userClosePole:'',
                closefun: function() { },
        },
        open: function(html)
        {
            var obj_winib = this;

            this.param.id = this.getId(html);

            if (typeof(options)=='object')
            {
                Object.assign(this.param,options);
                if (this.param.id!==false) this.param.id = "winib_"+this.param.id;
            }

            if (this.param.oneclose == true) this.close();
	
            let _html =  `<div id="${this.param.id}" class="popup_main ${this.param.classmain}"><div class="popup_main_1"><div class="popup_main_child"><div class="popup_main_child_1">`;
            
            if (this.param.btnclose == true) _html += '<div class="popup_main_close"><span></span></div>';
            
            _html += html;
            
            _html += this.popupFooter;
            
            $('body').append(_html).addClass('popup_main_body');
            
            if (this.param.autoclose != 0)
            {
              setTimeout(this.close(), this.param.autoclose);	
            }

            $('body').on('click','.popup_main_child_1',function(e)
            {
                e.stopPropagation();
            });
            
            $('body').on('click','#'+this.param.id,function(e)
            {
                 
                if (obj_winib.param.clickcloseall == true) 
                {
                    if (obj_winib.param.userClosePole != '') eval(obj_winib.param.userClosePole);
                    else obj_winib.close();
                }
            });
            
            $('body').on('click','#'+this.param.id+' .popup_main_close',function(e)
            {
                
                if (obj_winib.param.clickcloseall == true) 
                {
                    if (obj_winib.param.userClosePole != '') eval(obj_winib.param.userClosePole);
                    else obj_winib.close();
                }
            });
            
            $(document).keydown(function(eventObject){
                if( eventObject.which == 27 ){
                    obj_winib.close();
                };
            });
        },
        close: function()
        {
            
            this.param.closefun(this.param.id);

            //console.log("close1="+this.param.id);
            $('#'+this.param.id).remove();
            var len_popup = $('body,html .popup_main').length;
            
            if (len_popup == 1) $('body').removeClass('popup_main_body');
        },
        getId: function(html)
        {
            return 'winib_' + html.length + '_' + Math.floor(Math.random() * 101);
        }

    };
} 