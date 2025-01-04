//after window is loaded completely 
window.onload = function(){
    //hide the preloader
    document.querySelector(".preloader").style.display = "none";
}




// Header fixed to down scroll
// When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the header
    var header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
    }


    // Back to top scroll
    jQuery(document).ready(function(){ 
        jQuery(window).scroll(function(){ 
        if (jQuery(this).scrollTop() > 100) { 
            jQuery('#scroll').fadeIn(); 
        } else { 
            jQuery('#scroll').fadeOut(); 
        } 
    }); 
    jQuery('#scroll').click(function(){ 
        jQuery("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});



// Footer collapse script
jQuery(document).ready(function(){
    jQuery('<i class="fa fa-chevron-down" aria-hidden="true"></i>').prependTo('.footer-main-block .footer-link');
    jQuery('.footer-main-block .footer-link i').click(function(){
        jQuery(this).next('.footer-link ul').slideToggle();
    });
});


/**** Header background color add to jquery ****/
jQuery(document).ready(function(){
    jQuery('.navbar-toggler').click(function(){
        jQuery('#myHeader').toggleClass('active_responsive');
    });
});



(function ($) {
    var $WIN = $(window);
    var BREAKPOINTS = { xs: 480, sm: 768, md: 992, lg: 1200, xl: 1600 };
    var winW = null;
    var winH = null;
    var swipers = [];
    function calcWinSizes() {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }
    $WIN.on("resize", function () {
        $('.swiper-container.initialized[data-slidesperview="responsive"]').each(function () {
            var thisSwiper = swipers["swiper-" + $(this).attr("id")],
                $t = $(this),
                slidesPerViewVal = updateSlidesPerView($t),
                centerVar = thisSwiper.params.centeredSlides;
            thisSwiper.params.slidesPerView = slidesPerViewVal;
            thisSwiper.update();
        });
    });
    $WIN.on("load resize", function () {
        calcWinSizes();
    });
    function changeImgToBg(imgSel, parentSel) {
        if (!imgSel) {
            console.info("no img selector");
            return false;
        }
        let $parent, _this;
        $(imgSel).each(function () {
            _this = $(this);
            if ("none" == _this.css("display")) {
                return true;
            }
            $parent = _this.closest(parentSel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css("background-image", "url(" + _this.attr("src") + ")");
            _this.hide();
        });
    }
    $(window).on("load", function () {
        changeImgToBg(".js-bg");
    });
    function isTouchDevice() {
        return "ontouchstart" in document.documentElement;
    }
    function initSwiper() {
        var initIterator = 0;
        $(".swiper-container").each(function () {
            var $t = $(this);
            var index = "swiper-unique-id-" + initIterator;
            $t.addClass("swiper-" + index + " initialized").attr("id", index);
            $t.parent()
                .find(".swiper-pagination")
                .addClass("swiper-pagination-" + index);
            var autoPlayVar = "true" == $t.attr("data-autoplay");
            var delayVal = parseInt($t.attr("data-delay"), 10);
            if (delayVal) {
                autoPlayVar = { delay: delayVal };
            }
            var modeVal = $t.attr("data-mode");
            var spaceBetweenVal = parseInt($t.attr("data-spaceBetween"));
            var modehorizontalVal = $t.attr("data-modehorizontal");
            var slidesPerViewVal = $t.attr("data-slidesPerView");
            if ("responsive" == slidesPerViewVal) {
                slidesPerViewVal = updateSlidesPerView($t);
            } else if ("auto" == slidesPerViewVal) {
            } else {
                slidesPerViewVal = parseInt(slidesPerViewVal, 10);
            }
            var loopVal = $t.attr("data-loop");
            var slideToClickedSlideVal = $t.attr("data-slideToClickedSlide");
            var speedVal = parseInt($t.attr("data-speed"), 10);
            if (!speedVal) {
                speedVal = 500;
            }
            var centeredSlidesVal = $t.attr("data-centeredSlides");
            var effectVal = $t.attr("data-effect");
            var initialSlideVal = parseInt($t.attr("data-initialSlide"), 10);
            if (!initialSlideVal) {
                initialSlideVal = 0;
            }
            var progBarVal = $t.attr("data-progBar");
            var paginationVal = false;
            if (progBarVal !== "custom") {
                paginationVal = {
                    el: ".swiper-pagination-" + index,
                    type: progBarVal || "bullets",
                    clickable: true,
                    renderBullet: function (index, className) {
                        if ($t.find(".swiper-pagination--numeric").length) {
                            if (9 > index) {
                                var zero = "0";
                            }
                            return '<span class="' + className + '">' + zero + (index + 1) + "</span>";
                        }
                        if ($t.find(".swiper-pagination--numeric2").length) {
                            return '<span class="' + className + '">' + (index + 1) + "</span>";
                        }
                        return '<span class="' + className + '"></span>';
                    },
                };
            }
            swipers["swiper-" + index] = new Swiper(".swiper-" + index, {
                observer: true,
                observeParents: true,
                speed: speedVal,
                pagination: paginationVal,
                loop: loopVal,
                effect: effectVal,
                slideToClickedSlide: slideToClickedSlideVal,
                spaceBetween: spaceBetweenVal,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVal,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: true,
                roundLengths: true,
                centeredSlides: centeredSlidesVal,
                cssWidthAndHeight: true,
                initialSlide: initialSlideVal,
                direction: modeVal || "horizontal",
                noSwiping: true,
                noSwipingClass: "swiper-no-swiping",
                on: {
                    init: function () {
                        if (progBarVal === "custom") {
                            $(".swiper-pagination-" + index)
                                .addClass("swiper-pagination-custom")
                                .append($('<div class="swiper-pagination-custom-line" style="transition-duration: ' + speedVal + 'ms"></div>'));
                        }
                    },
                    progress: function (progress) {
                        progress = progress > 1 ? 1 : progress;
                        if (progBarVal === "custom") {
                            $(".swiper-pagination-" + index)
                                .find(".swiper-pagination-custom-line")
                                .css("width", progress * 100 + "%");
                        }
                    },
                },
                breakpoints: { 991: { direction: modehorizontalVal || "horizontal" } },
            });
            swipers["swiper-" + index].update();
            if ("responsive" == $t.attr("data-slidesperview")) {
                var paginationSpan = $t.find(".pagination span");
                var paginationSlice = paginationSpan.hide().slice(0, paginationSpan.length + 1 - slidesPerViewVal);
                if (1 >= paginationSlice.length || slidesPerViewVal >= $t.find(".swiper-slide").length) {
                    $t.addClass("pagination-hidden");
                } else {
                    $t.removeClass("pagination-hidden");
                }
                paginationSlice.show();
            }
            initIterator++;
        });
        if ($(".swiper .gallery-thumbs").length & $(".swiper .gallery-top").length) {
            var galTopId = document.querySelector(".gallery-top").id;
            var galThumbsId = document.querySelector(".gallery-thumbs").id;
            swipers["swiper-" + galTopId].controller.control = swipers["swiper-" + galThumbsId];
            swipers["swiper-" + galThumbsId].controller.control = swipers["swiper-" + galTopId];
        }
    }
    initSwiper();
    $(".filter-construction .hmu-pf__filter").on("click", function () {
        var filter = $(this).data("filter");
        var slides = $(this).closest(".hmu-pf").find(".swiper-slide");
        var swiper_id = $(this).closest(".hmu-pf").find(".swiper-container").attr("id");
        var swiper = swipers["swiper-" + swiper_id];
        slides.show();
        if (filter != "all") {
            slides.not("[data-filter='" + filter + "']").hide();
        }
        swiper.update();
    });
    function updateSlidesPerView(swiperContainer) {
        if (winW >= BREAKPOINTS.xl) {
            return parseInt(swiperContainer.attr("data-add-slides"), 10);
        } else if (winW >= BREAKPOINTS.lg) {
            return parseInt(swiperContainer.attr("data-lg-slides"), 10);
        } else if (winW >= BREAKPOINTS.md) {
            return parseInt(swiperContainer.attr("data-md-slides"), 10);
        } else if (winW >= BREAKPOINTS.sm) {
            return parseInt(swiperContainer.attr("data-sm-slides"), 10);
        } else {
            return parseInt(swiperContainer.attr("data-xs-slides"), 10);
        }
    }
    $(window).trigger("resize");
    $(".swiper-button-prev").on("click", function () {
        swipers["swiper-" + $(this).parent().find(".swiper-container").attr("id")].slidePrev();
    });
    $(".swiper-button-next").on("click", function () {
        swipers["swiper-" + $(this).parent().find(".swiper-container").attr("id")].slideNext();
    });
    $(document).ready(function () {
        let $search = $(".site-search");
        $(".js-open-search").on("click", function () {
            $search.addClass("open");
        });
        $(".js-close-search").on("click", function (ev) {
            ev.stopPropagation();
            $search.addClass("closing");
            setTimeout(function () {
                $search.removeClass("open closing");
            }, 300);
        });
    });
})(jQuery);


const mySwiper = new Swiper ('.about_slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 300,
   mousewheel: true,
   pagination: true,
   autoplay: true,
   coverflowEffect: {
    rotate: 30,
    slideShadows: true
  },

    autoplay: {
        delay: 3000,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
  
// Homepage logo slider
  $(document).ready(function() {
    // Swiper: Slider
        new Swiper('.paartner_slider', {
            loop: true,
            slidesPerView: 6,
            autoplay: true,
            pagination: true,
            spaceBetween: 20,
            breakpoints: {
                1920: {
                    slidesPerView: 6,
                    spaceBetween: 0
                },
                1028: {
                    slidesPerView: 6,
                    spaceBetween: 0
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 0
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 0
                }
            },
            autoplay: {
                delay: 3000,
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
  
        });
    });
    

    
    $('.services').owlCarousel({
    loop: true,
    nav: true,
    margin:30,
    dots: true,
    autoplay: true,
    items: 1,
    navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>"
    ]
});


jQuery(function($) {
    $('a[href*="#"]:not([href="#"])').click(function() {
        var target = $(this.hash);
          $('html,body').stop().animate({
            scrollTop: target.offset().top - 150
          }, 'linear');   
    });    
      if (location.hash){
      var id = $(location.hash);
      }
      $(window).on('load', function() {
      if (location.hash){
          $('html,body').animate({scrollTop: id.offset().top -150}, 'linear')
      };
      });
  });