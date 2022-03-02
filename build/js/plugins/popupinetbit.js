var setingIb = {
    autoclose: 0,
    btnclose: true,
    classmain: '',
    clickcloseall: true,
}

var popupHeader = '';
var popupFooter = '</div></div></div></div>';

function setDefaulParam() {
    setingIb = {
        autoclose: 0,
        btnclose: true,
        classmain: '',
        clickcloseall: true,
    }
}

function popupIBOpen(html, set) {
    setDefaulParam();
    //console.log(set);
    if (set == undefined) {
        set = setingIb;
    } else {
        for (key in setingIb) {
            //console.log(key+"="+set[key]);
            if (set[key] == undefined) set[key] = setingIb[key];
        }

        setingIb = set;
    }

    console.log(setingIb);
    popupIBClose();

    var _html = '<div class="popup_main ' + set.classmain + '"><div class="popup_main_1"><div class="popup_main_child"><div class="popup_main_child_1">';

    if (set.btnclose == true) _html += '<a onclick="popupIBClose()" class="block-close popup_main_close"><svg class="icon-icon-close undefined" width="12" height="12" viewBox="0 0 12 12"><use xlink:href="/local/templates/lst/assets/svg/symbols.svg#icon-close"></use></svg></a>';

    _html += html;

    _html += popupFooter;

    $('body').append(_html);
    $('body').addClass('popup_main_body');

    if (set.autoclose != 0) {
        setTimeout(popupIBClose, set.autoclose);
    }

}

function popupIBClose() {
    if ($('body').hasClass('popup_main_body') == true) {
        $('body').removeClass('popup_main_body');
        $('.popup_main').remove();
    }
}

$(document).ready(function(e) {

    $('body').on('click', '.popup_main_child_1', function(e) {
        e.stopPropagation();
    });

    $('body').on('click', '.popup_main', function(e) {
        if (setingIb.clickcloseall == true) popupIBClose();
    });

});

$(document).keydown(function(eventObject) {
    if (eventObject.which == 27) {
        popupIBClose();
    };
});
