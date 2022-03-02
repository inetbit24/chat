<div class="modal modal-m-call modal-simple p-0" id="mCall2" tabindex="-1" role="dialog" aria-labelledby="mCall2" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="container">
      <div class="modal-content p-0">
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <svg class="icon-icon-remove undefined" width="10" height="10" viewBox="0 0 10 10">
            <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg//symbols.svg#icon-remove"></use>
          </svg>
        </button>
        <div class="modal-body pt-3 pb-1 pl-1 pr-1">
          <div class="block__module-phone-form">
              <div class="list__phone mb-1">
                <div class="item mb-2">
                  <div class="label pl-2 text-uppercase text-grey fz12">Телефон в Санкт-Петербурге</div>
                  <div class="item-phone pl-2"><i class="icon-svg">
                      <svg class="icon-icon-phone undefined" width="16" height="16" viewBox="0 0 16 16">
                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg//symbols.svg#icon-phone"></use>
                      </svg></i><a href="#"><strong class="fz30">+7 (812) 561-29-56</strong></a></div>
                </div>
                <div class="item">
                  <div class="label pl-2 text-uppercase text-grey fz12">Бесплатно по России</div>
                  <div class="item-phone pl-2"><i class="icon-svg">
                      <svg class="icon-icon-phone undefined" width="16" height="16" viewBox="0 0 16 16">
                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg//symbols.svg#icon-phone"></use>
                      </svg></i><a href="#"><strong class="fz30">8 (800) 551-91-85</strong></a></div>
                </div>
              </div>


            <?php
                $APPLICATION->IncludeComponent(
                  "bitrix:form.result.new",
                  'web_form_request_call',
                  array(
                      "SEF_MODE" => "N",
                      "WEB_FORM_ID" => 24,
                      "LIST_URL" => "",
                      "SUCCESS_URL" => "",
                      "CHAIN_ITEM_TEXT" => "",
                      "CHAIN_ITEM_LINK" => "",
                      "IGNORE_CUSTOM_TEMPLATE" => "Y",
                      "USE_EXTENDED_ERRORS" => "Y",
                      "CACHE_TYPE" => "N",
                      "CACHE_TIME" => "3600",
                      "VARIABLE_ALIASES" => Array("RESULT_ID"=>"RESULT_ID","WEB_FORM_ID"=>"WEB_FORM_ID"),
                  )
                );
            ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
