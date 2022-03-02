<script>
define(['Vue', 'apolloProvider', 'gql'], function(Vue, apolloProvider, gql) {

    return new Vue({
        created: function() {
            this.carousel_more_flats();
        },
        methods: {
            carousel_more_flats: function(){
                var arrowNavPrev3 =
                    '<svg x="0px" y="0px" viewBox="0 0 26.058 18.054" style="enable-background:new 0 0 26.058 18.054;" xml:space="preserve"><polyline style="fill:none;stroke-miterlimit:10;" points="9.573,17.027 2.058,9.027 9.573,1.027 "/><line style="fill:none;stroke-miterlimit:10;" x1="2.058" y1="9.027" x2="26.058" y2="9.027"/></svg>';
                var arrowNavNext3 =
                    '<svg x="0px" y="0px" viewBox="0 0 26.058 18.054" style="enable-background:new 0 0 26.058 18.054;" xml:space="preserve"><polyline style="fill:none;stroke-miterlimit:10;" points="16.485,1.027 24,9.027 16.485,17.027 "/><line style="fill:none;stroke-miterlimit:10;" x1="24" y1="9.027" x2="0" y2="9.027"/></svg>';


                // $('.carousel-shem').slick({
                //     slidesToShow: 4,
                //     slidesToScroll: 1,
                //     rows: 0,
                //     prevArrow: "<span class='slick-prev'><i>" + arrowNavPrev3 + "</i></span>",
                //     nextArrow: "<span class='slick-next'><i>" + arrowNavNext3 + "</i></span>",
                //     responsive: [{
                //             breakpoint: 1380,
                //             settings: {
                //                 slidesToShow: 3
                //             }
                //         },
                //         {
                //             breakpoint: 1200,
                //             settings: {
                //                 slidesToShow: 2
                //             }
                //         },
                //         {
                //             breakpoint: 992,
                //             settings: {
                //                 slidesToShow: 2,
                //                 arrows: false,
                //                 dots: true
                //             }
                //         },
                //         {
                //             breakpoint: 700,
                //             settings: {
                //                 slidesToShow: 1,
                //                 arrows: false,
                //                 dots: true
                //             }
                //         }
                //     ]
                // });

            }
        }
    });

});
</script>
