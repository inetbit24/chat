function WinIb(options){return{btnOpen:".winib",btnClose:".winib_close",popupHeader:"",popupFooter:"</div></div></div></div>",param:{id:!1,autoclose:0,btnclose:!0,classmain:"",clickcloseall:!0,oneclose:!1,userClosePole:"",closefun:function(){}},open:function(html){var obj_winib=this;this.param.id=this.getId(html),"object"==typeof options&&(Object.assign(this.param,options),!1!==this.param.id&&(this.param.id="winib_"+this.param.id)),1==this.param.oneclose&&this.close();let _html=`<div id="${this.param.id}" class="popup_main ${this.param.classmain}"><div class="popup_main_1"><div class="popup_main_child"><div class="popup_main_child_1">`;1==this.param.btnclose&&(_html+='<div class="popup_main_close"><span></span></div>'),_html+=html,_html+=this.popupFooter,$("body").append(_html).addClass("popup_main_body"),0!=this.param.autoclose&&setTimeout(this.close(),this.param.autoclose),$("body").on("click",".popup_main_child_1",(function(i){i.stopPropagation()})),$("body").on("click","#"+this.param.id,(function(e){1==obj_winib.param.clickcloseall&&(""!=obj_winib.param.userClosePole?eval(obj_winib.param.userClosePole):obj_winib.close())})),$("body").on("click","#"+this.param.id+" .popup_main_close",(function(e){1==obj_winib.param.clickcloseall&&(""!=obj_winib.param.userClosePole?eval(obj_winib.param.userClosePole):obj_winib.close())})),$(document).keydown((function(i){27==i.which&&obj_winib.close()}))},close:function(){this.param.closefun(this.param.id),$("#"+this.param.id).remove(),1==$("body,html .popup_main").length&&$("body").removeClass("popup_main_body")},getId:function(i){return"winib_"+i.length+"_"+Math.floor(101*Math.random())}}}