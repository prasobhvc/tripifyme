(function($) {
    'use strict';
    
    var portfolioGrid = $('#portfolio-grid-container');    
       

    /*----------------------------------------------------*/
    /*  One Page Portfolio Section
     /*----------------------------------------------------*/

    /*********************************
     init cubeportfolio
     *********************************/

    portfolioGrid.cubeportfolio({
        filters: '#filters-container',
        loadMore: '#loadMore-container',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        defaultFilter: '*',
        animationType: portfolioGrid.data('animationtype'),
        gapHorizontal: portfolioGrid.data('gaphorizontal'),
        gapVertical: portfolioGrid.data('gapvertical'),
        gridAdjustment: 'responsive',
        mediaQueries: [{
                width: 1100,
                cols: 3
            }, {
                width: 800,
                cols: 2
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
        caption: portfolioGrid.data('caption'),
        displayType: 'lazyLoading',
        displayTypeSpeed: 100,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 10000
            })
                    .done(function(result) {
                        t.updateSinglePage(result);
                        if($('.cbp-popup-navigation-wrap').find('.cube-header-logo').length==0) {                        
                            $('.cbp-popup-navigation-wrap').prepend('<div class="cube-header-logo hidden-xs"> <img alt="logo" src='+portfolioGrid.data('logo')+' class="img-responsive"></div>');
                        }
                    })
                    .fail(function() {
                        t.updateSinglePage('AJAX Error! Please refresh the page!');
                    });
        },
    });

    /*********************************
     add listener for load more
     *********************************/
    $('.cbp-l-loadMore-button-link').on('click.cbp', function(e) {
        e.preventDefault();
        var clicks, me = $(this),
                oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) {
            return;
        }

        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks) ? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        }).done(function(result) {
            var items, itemsNext;

            // find current container
            items = $(result).filter(function() {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            portfolioGrid.cubeportfolio('appendItems', items.html(),
                    function() {
                        // put the original message back
                        me.text(oMsg);

                        // check if we have more works
                        itemsNext = $(result).filter(function() {
                            return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                        });

                        if (itemsNext.length === 0) {
                            me.text('NO MORE WORKS');
                            me.addClass('cbp-l-loadMore-button-stop');
                        }

                    });  
          
           
        }).fail(function() {
            // error
        });

    });

})(jQuery);