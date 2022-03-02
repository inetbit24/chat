<div class="nav__main scrollBox-y d-lg-block d-none">
  <div class="pt-2 m-2">
    <div class="module module__logo text-center mb-5">
        <a href="/"><img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/logo.svg" alt="logo" /></a>
    </div><!-- end module logo text-center mb-5 -->
    <div class="module module__call text-center mb-5">
        <a class="btn btn-border-orange p-0 open-nav-modal link-open-call" data-index="0">
            <svg class="icon-icon-phone undefined" width="18" height="18" viewBox="0 0 18 18">
              <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-phone"></use>
            </svg>
        </a>
    </div><!-- end module call text-center mb-5 -->

    <div class="module module__choise text-center mb-2"><a class="btn btn-orange text-uppercase text-middle" href="/kvartiry/">Выбрать квартиру</a></div>
    <div class="module module__choise text-center mb-5"><a class="btn btn-orange text-uppercase text-middle tradein-button" data-toggle="modal" data-target="#modal-tradein" href="#">Трейд-ин.<br /> Узнайте за 10<br /> секунд</a></div>

    <!-- end module choise text-center mb-5 -->
    <div class="module module__nav text-center mb-3">
      <ul>
        <li class="mb-3">
          <a class="link-orange-circle" href="/nashi_obekty/">
              <i class="icon-svg icon-svg-stroke icon-svg-orange">
                  <svg class="icon-icon-nav0 undefined" width="22" height="22" viewBox="0 0 22 22">
                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-nav0"></use>
                  </svg>
              </i>
              <span class="text-nowrap pt-1">Наши объекты</span>
          </a>
         </li>
        <li class="mb-3">
            <a class="link-orange-circle" href="/kompaniya/">
                <i class="icon-svg icon-svg-fill icon-svg-orange">
                  <svg class="icon-icon-nav1 undefined" width="22" height="22" viewBox="0 0 22 22">
                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-nav1"></use>
                  </svg>
                </i>
                <span class="text-nowrap pt-1">Компания</span>
            </a>
        </li>
        <li class="mb-3">
            <a class="link-orange-circle" href="/kompaniya/kontakty/">
                <i class="icon-svg icon-svg-fill icon-svg-orange">
                  <svg class="icon-icon-geo undefined" width="22" height="22" viewBox="0 0 22 22">
                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-geo"></use>
                  </svg>
                </i>
                <span class="text-nowrap pt-1">Контакты</span>
            </a>
        </li>
        <li class="pt-1 mb-3">
            <a class="open-site-map" href="#">
                <i><span><em></em><em></em><em></em></span></i>
                <span class="text-nowrap fz14">Карта сайта</span>
            </a>
        </li>
        <li class="mb-3">
            <a class="open-nav-modal link-open-cab" data-index="1">
                <i class="icon-svg">
                  <svg class="icon-icon-user undefined" width="15" height="20" viewBox="0 0 15 20">
                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-user"></use>
                  </svg>
                </i>
                <span class="text-nowrap fz14">Личный кабинет</span>
            </a>
        </li>
        <li>
            <div id="sidebar-cart-widget"></div>
        </li>
      </ul>
    </div><!-- end module nav text-center mb-3 -->
  </div>
</div>


<div class="d-lg-block d-none">
<div class="block__module-phone-form bg-white p-4 d-none nav-modal-0"><a class="block-close">
    <svg class="icon-icon-close undefined" width="12" height="12" viewBox="0 0 12 12">
      <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-close"></use>
    </svg></a>
  <div class="pl-1 p-r1">
    <div class="list__phone mb-1">
      <div class="item">
        <div class="label pl-2 text-uppercase text-grey fz12">Телефон в Санкт-Петербурге</div>
        <div class="item-phone pl-2"><i class="icon-svg">
            <svg class="icon-icon-phone undefined" width="18" height="18" viewBox="0 0 18 18">
              <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-phone"></use>
            </svg></i><a href="tel:78125612956"><strong class="fz30">+7 (812) 561-29-56</strong></a></div>
      </div>
      <div class="item">
        <div class="label pl-2 text-uppercase text-grey fz12">Бесплатно по России</div>
        <div class="item-phone pl-2"><i class="icon-svg">
            <svg class="icon-icon-phone undefined" width="18" height="18" viewBox="0 0 18 18">
              <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-phone"></use>
            </svg></i><a href="tel:88005519185"><strong class="fz30">8 (800) 551-91-85</strong></a></div>
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

<div class="block__module-cabinet bg-white p-2 d-none nav-modal-1">
    <a class="block-close">
      <svg class="icon-icon-close undefined" width="12" height="12" viewBox="0 0 12 12">
        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-close"></use>
      </svg>
    </a>
    <div class="pt-2 pb-2">
      <div class="item-cab text-center mb-4">
        <h4 class="fz20 mb-2">Личный кабинет покупателя</h4>
        <p class="fz14">Возможность оформить покупку жилья полностью онлайн. Полная информация о Ваших договорах</p>
        <div class="item-cab-row"><a class="btn btn-orange w-100 d-block" href="https://cabinet.6543210.ru/cabinet/default/" target="_blank"><strong class="fz16">Войти в личный кабинет</strong></a></div>
      </div>
      <div class="item-cab text-center">
        <h4 class="fz20 mb-2">Агентский портал</h4>
        <p class="fz14">Радикально упрощает работу агентов недвижимости</p>
        <div class="item-cab-row"><a class="btn btn-orange w-100 d-block" href="https://cabinet.6543210.ru/" target="_blank"><strong class="fz16">Войти в кабинет агента</strong></a></div>
      </div>
    </div>
</div>
