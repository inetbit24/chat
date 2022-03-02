<div class="section-nav scrollBox-y d-lg-block d-none">
    <div class="s s-nav">
        <div class="container">
            <div class="s-nav-header pt-4 mb-3">
                <div class="row align-items-end">
                    <div class="col-12">
                        <div class="module module__close-nav"><a class="d-inline-flex align-items-center section-nav-close" href="#"><i class="icon-svg mr-1">
                                    <svg class="icon-icon-close undefined" width="10" height="10" viewBox="0 0 10 10">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-close"></use>
                                    </svg></i><span class="fz14 text-uppercase">Свернуть карту сайта</span></a>
                        </div><!-- end module close-nav -->
                    </div>
                    <div class="col-12">
                        <div class="module module__call text-right"><a class="d-inline-flex align-items-center" href="#"><i class="icon-svg mr-1">
                                    <svg class="icon-icon-phone undefined" width="16" height="16" viewBox="0 0 16 16">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-phone"></use>
                                    </svg></i><strong class="fz24">+7 (812) 561-29-56</strong><em class="arrow"></em></a>
                        </div><!-- end module call text-right -->
                    </div>
                </div>
            </div>
            <div class="s-nav-body">
                <div class="module module__objects-nav mb-3">
                    <h3 class="fz30 mb-1">Объекты в продаже</h3>
                    <div class="row">
                        <?$APPLICATION->IncludeComponent(
                            'kelnik:estate.objects.slider',
                            'projects_main_map',
                            array(
                                'IMG' => 'UF_SLIDER_PHOTO',
                                'PLACE' => 'UF_PLACE',
                                'TEXT' => 'UF_PREVIEW_TEXT',
                                'PATH_TO_OBJECTS' => '/kvartaly/',
                                'SEARCH' => '/kvartiry/'
                            )
                        );?>
                        <div class="col-xl-6 col-lg-12">
                            <div class="block__link-btn">
                                <div class="mb-1"><a href="/aktsii-i-skidki/"><span class="fz24">Акции и спецпредложения</span></a></div>
                                <div class="mb-3"><a href="/configurator/"><span class="fz24">Конфигуратор отделки</span></a></div>
                                <div class="mb-1"><a class="btn btn-orange d-block w-100" href="/kvartiry/"><strong class="fz20 text-uppercase">Выбрать квартиру</strong></a></div>
                                <div><a class="btn btn-orange d-block w-100" href="https://cabinet.6543210.ru/" target="_blank"><strong class="fz20 text-uppercase">Личный кабинет</strong></a></div>
                            </div>
                        </div>
                    </div>
                </div><!-- end module objects-nav mb-3 -->
                <div class="module module__nav-1 mb-2">
                    <h3 class="fz30 mb-1">Как купить</h3>
                        <?$APPLICATION->IncludeComponent(
                            "bitrix:news.list",
                            "menulist_map",
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
                </div><!-- end module nav-1 mb-2 -->
                <div class="module module__nav-2 mb-2">
                    <h3 class="fz30 mb-1">Компания</h3>
                    <?$APPLICATION->IncludeComponent(
                        "bitrix:menu",
                        "about_company_main",
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
                    );?>
                </div><!-- end module nav-2 mb-2 -->
                <div class="module module__contacts-nav mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <h3 class="fz30 mr-5">Центральный офис</h3>
                        <div><a href="/kompaniya/ofisy_prodazh/"><span>Все офисы продаж</span></a></div>
                    </div>
                    <div class="row">
                        <div class="col-xl-13 mb-xl-0 mb-2">
                            <div class="row-geo row-icon d-flex align-items-center fz16 mb-2"><i class="icon-svg mr-2">
                                    <svg class="icon-icon-geo icon-grey" width="15" height="20" viewBox="0 0 15 20">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-geo"></use>
                                    </svg></i><span>Санкт-Петербург ул. Миллионная, д. 8</span></div>
                            <div class="row-contact row-icon d-flex flex-wrap align-items-center fz16"><i class="icon-svg mr-2">
                                    <svg class="icon-icon-clock icon-grey" width="20" height="20" viewBox="0 0 20 20">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-clock"></use>
                                    </svg></i><span class="mr-4 text-nowrap">Будни: с 9.00. до 20.00</span><span class="mr-4 text-nowrap">Суббота: с 10.00 до 18.00</span><span>Воскресенье: с 11.00 до 18.00</span></div>
                        </div>
                        <div class="col-xl-11">
                            <div class="block__share"><span class="label d-block">Мы в соц. сетях:</span><a class="mr-1" href="https://vk.com/lst_spb">
                                    <svg class="icon-icon-vk undefined" width="20" height="12" viewBox="0 0 20 12">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-vk"></use>
                                    </svg></a><a class="mr-1" href="https://www.facebook.com/lenstroytrest">
                                    <svg class="icon-icon-fb undefined" width="8" height="18" viewBox="0 0 8 18">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-fb"></use>
                                    </svg></a><a class="mr-1 icon-inst" href="https://www.instagram.com/lenstroytrest/">
                                    <svg class="icon-icon-inst undefined" width="18" height="18" viewBox="0 0 18 18">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-inst"></use>
                                    </svg></a><a href="http://www.youtube.com/channel/UCoJwBJEj27D-XFBT2H9Xo0g" class="icon-youtube" href="#">
                                    <svg class="icon-icon-youtube undefined" width="22" height="16" viewBox="0 0 22 16">
                                        <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-youtube"></use>
                                    </svg></a></div>
                        </div>
                    </div>
                </div><!-- end module contacts-nav mb-3 -->
                <div class="module module__search-nav mb-2">
                    <form class="form-search" action="/search/">
                        <input class="form-control w-100 border fz16" type="text" placeholder="Поиск по сайту" name="q" />
                        <button class="border-0">
                            <svg class="icon-icon-loupe undefined" width="24" height="24" viewBox="0 0 24 24">
                                <use xlink:href="<?php echo SITE_TEMPLATE_PATH; ?>/assets/svg/symbols.svg#icon-loupe"></use>
                            </svg>
                        </button>
                    </form>
                </div><!-- end module search-nav mb-2 -->
            </div>
            <div class="s-nav-footer fz16">
                <a class="mr-4" href="/agreement/"><span>Согласие на обработку персональных данных</span></a>
                <a class="mr-4" href="/privacy_policy/"><span>Политика кофиденциальности</span></a>
                <a href="/policy_cookies/"><span>Политика в отношении использования файлов «cookie»</span></a>
            </div>
        </div>
    </div>
</div>
