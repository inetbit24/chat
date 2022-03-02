<div class="modal modal-nav-mob modal-simple p-0" id="mNav" tabindex="-1" role="dialog" aria-labelledby="mNav" aria-hidden="true">
    <div class="modal-dialog modal-w100" role="document">
        <div class="container">
            <div class="modal-content p-0">
                <div class="modal-nav-mob-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="module module__logo">
                            <a href="/"><img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/logo.svg" alt="logo" />
                            </a>
                        </div><!-- end module logo -->
                        <div class="module module__call text-center"><a href="#" data-dismiss="modal" data-toggle="modal" data-target="#mCall2"><strong class="fz18">+7 (812) 561-29-56</strong></a>
                        </div><!-- end module call text-center -->
                        <div class="module module__m-nav">
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <svg class="icon-icon-remove undefined" width="18" height="18" viewBox="0 0 18 18">
                                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-remove"></use>
                                </svg>
                            </button>
                        </div><!-- end module m-nav -->
                    </div>
                </div>
                <div class="modal-nav-mob-block bg-white">
                    <a class="btn btn-orange d-block" href="/kvartiry/">
                        <strong class="text-uppercase">Выбрать квартиру</strong>
                    </a>
                </div>
                <div class="modal-nav-mob-block bg-white">
                    <div class="mob-block-nav">
                        <ul>
                            <li>
                                <a class="link-toggle" href="#">
                                    <strong>Объекты в продаже</strong>
                                    <i>
                                        <svg class="icon-arrow-m-nav undefined" width="8" height="5" viewBox="0 0 8 5">
                                            <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#arrow-m-nav"></use>
                                        </svg>
                                    </i>
                                </a>
                                <ul class="d-none">
                                    <li>
                                        <a href="/kvartaly/yanila_drive/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>Янила Драйв</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/kvartaly/jaanila-country/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>Янила Кантри</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/kvartaly/jaanila-country-club/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>Янила Кантри Клаб</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/kvartaly/yutteri/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>Юттери</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/kvartaly/iq-gatchina/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>IQ Гатчина</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/kvartaly/novoorlovskiy/">
                                            <img src="<?php echo SITE_TEMPLATE_PATH; ?>/assets/images/icon-m-nav.png" alt="icon-m-nav" />
                                            <span>Новоорловский</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a class="link-toggle" href="#">
                                    <strong>Компания</strong>
                                    <i>
                                        <svg class="icon-arrow-m-nav undefined" width="8" height="5" viewBox="0 0 8 5">
                                            <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#arrow-m-nav"></use>
                                        </svg>
                                    </i>
                                </a>
                                <?php
                                    $APPLICATION->IncludeComponent(
                                        "bitrix:menu",
                                        "mobile",
                                        array(
                                            "ROOT_MENU_TYPE" => "left_about",
                                            "MAX_LEVEL" => "1",
                                            "CHILD_MENU_TYPE" => "left_about",
                                            "USE_EXT" => "Y",
                                            "DELAY" => "N",
                                            "ALLOW_MULTI_SELECT" => "Y",
                                            "MENU_CACHE_TYPE" => "N",
                                            "MENU_CACHE_TIME" => "3600",
                                            "MENU_CACHE_USE_GROUPS" => "N",
                                            "MENU_CACHE_GET_VARS" => "",
                                            "CACHE_TYPE" => "N",
                                        )
                                    );
                                ?>
                            </li>
                            <li>
                                <a class="link-toggle" href="#">
                                    <strong>Как купить</strong>
                                    <i>
                                        <svg class="icon-arrow-m-nav undefined" width="8" height="5" viewBox="0 0 8 5">
                                            <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#arrow-m-nav"></use>
                                        </svg>
                                    </i>
                                </a>

                                <?$APPLICATION->IncludeComponent(
                                    "bitrix:news.list",
                                    "modal_menulist_map",
                                    Array(
                                        "ACTIVE_DATE_FORMAT" => "d.m.Y",
                                        "ADD_SECTIONS_CHAIN" => "N",
                                        "AJAX_MODE" => "N",
                                        "AJAX_OPTION_ADDITIONAL" => "",
                                        "AJAX_OPTION_HISTORY" => "N",
                                        "AJAX_OPTION_JUMP" => "N",
                                        "AJAX_OPTION_STYLE" => "Y",
                                        "CACHE_FILTER" => "N",
                                        "CACHE_GROUPS" => "Y",
                                        "CACHE_TIME" => "36000000",
                                        "CACHE_TYPE" => "A",
                                        "CHECK_DATES" => "Y",
                                        "DETAIL_URL" => "",
                                        "DISPLAY_BOTTOM_PAGER" => "N",
                                        "DISPLAY_DATE" => "Y",
                                        "DISPLAY_NAME" => "Y",
                                        "DISPLAY_PICTURE" => "Y",
                                        "DISPLAY_PREVIEW_TEXT" => "Y",
                                        "DISPLAY_TOP_PAGER" => "N",
                                        "FIELD_CODE" => array("", ""),
                                        "FILTER_NAME" => "",
                                        "HIDE_LINK_WHEN_NO_DETAIL" => "N",
                                        "IBLOCK_ID" => "80",
                                        "IBLOCK_TYPE" => "main_menu",
                                        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                                        "INCLUDE_SUBSECTIONS" => "Y",
                                        "MESSAGE_404" => "",
                                        "NEWS_COUNT" => "20",
                                        "PAGER_BASE_LINK_ENABLE" => "N",
                                        "PAGER_DESC_NUMBERING" => "N",
                                        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                                        "PAGER_SHOW_ALL" => "N",
                                        "PAGER_SHOW_ALWAYS" => "N",
                                        "PAGER_TEMPLATE" => ".default",
                                        "PAGER_TITLE" => "Новости",
                                        "PARENT_SECTION" => "",
                                        "PARENT_SECTION_CODE" => "",
                                        "PREVIEW_TRUNCATE_LEN" => "",
                                        "PROPERTY_CODE" => array("OTDEL", "WORK_TIME_EVERYDAY", "WORK_TIME_BUDNI", "WORK_TIME_SUB", "WORK_TIME_VOS", "POINT", ""),
                                        "SET_BROWSER_TITLE" => "N",
                                        "SET_LAST_MODIFIED" => "N",
                                        "SET_META_DESCRIPTION" => "N",
                                        "SET_META_KEYWORDS" => "N",
                                        "SET_STATUS_404" => "N",
                                        "SET_TITLE" => "N",
                                        "SHOW_404" => "N",
                                        "SORT_BY1" => "SORT",
                                        "SORT_BY2" => "ID",
                                        "SORT_ORDER1" => "ASC",
                                        "SORT_ORDER2" => "DESC",
                                        "STRICT_SECTION_CHECK" => "N"
                                    )
                                );?>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-nav-mob-block">
                    <div class="mb-1">
                        <a class="link-border" href="#">
                            <span>Акции и спецпредложения</span>
                        </a>
                    </div>
                    <div>
                        <a class="link-border" href="#">
                            <span>Конфигуратор отделки</span>
                        </a>
                    </div>

                    <div id="cart-mobile-widget"></div>


                    <div class="mb-2">
                        <a class="btn btn-orange d-block" href="#" data-dismiss="modal" data-toggle="modal" data-target="#mCab">
                            <strong class="text-uppercase">Личный кабинет</strong>
                        </a>
                    </div>
                    <h6>Центральный офис</h6>
                    <div class="mb-2">
                        <a class="link-border" href="/kompaniya/ofisy_prodazh/">
                            <span class="fzm14">Все офисы продаж</span>
                        </a>
                    </div>

                    <div class="mob-nav-geo mob-nav-icon mb-2">
                        <a href="#">
                            <i class="icon-svg">
                                <svg class="icon-icon-geo icon-grey" width="16" height="20" viewBox="0 0 16 20">
                                    <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-geo"></use>
                                </svg>
                            </i>
                            <span class="fzm14">Санкт-Петербург ул. Миллионная, д. 8</span>
                        </a>
                    </div>


                    <div class="mob-nav-shedule mob-nav-icon d-flex mb-2"><i class="icon-svg">
                            <svg class="icon-icon-clock icon-grey" width="20" height="20" viewBox="0 0 20 20">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-clock"></use>
                            </svg></i>
                        <ul class="fzm14">
                            <li>Будни: с 9.00. до 20.00</li>
                            <li>Суббота: с 10.00 до 18.00</li>
                            <li>Воскресенье: с 11.00 до 18.00</li>
                        </ul>
                    </div>
                    <div class="mob-nav-share mb-2"><a href="https://vk.com/lst_spb">
                            <svg class="icon-icon-vk undefined" width="20" height="12" viewBox="0 0 20 12">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-vk"></use>
                            </svg></a><a href="https://www.facebook.com/lenstroytrest">
                            <svg class="icon-icon-fb undefined" width="8" height="18" viewBox="0 0 8 18">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-fb"></use>
                            </svg></a><a class="icon-inst" href="https://www.instagram.com/lenstroytrest/">
                            <svg class="icon-icon-inst undefined" width="18" height="18" viewBox="0 0 18 18">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-inst"></use>
                            </svg></a><a class="icon-youtube" href="http://www.youtube.com/channel/UCoJwBJEj27D-XFBT2H9Xo0g">
                            <svg class="icon-icon-youtube undefined" width="22" height="16" viewBox="0 0 22 16">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-youtube"></use>
                            </svg></a></div>
                    <div class="mob-nav-links">
                        <div><a class="link-border" href="/agreement/"><span class="fzm14">Согласие на обработку персональных данных</span></a></div>
                        <div><a class="link-border" href="/privacy_policy/"><span class="fzm14">Политика кофиденциальности</span></a></div>
                        <div><a class="link-border" href="/policy_cookies/"><span class="fzm14">Политика в отношении использования файлов «cookie»</span></a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
