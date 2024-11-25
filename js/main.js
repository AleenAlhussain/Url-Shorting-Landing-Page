(function($) {
  
  "use strict";
  
  /* Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  /* Testimonials Carousel 
  ========================================================*/
  var owl = $("#client-testimonial");
    owl.owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      items: 1,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      addClassActive: true,
      itemsDesktop : [1199,1],
      itemsDesktopSmall : [980,1],
      itemsTablet: [768,1],
      itemsTablet: [767,1],
      itemsTabletSmall: [480,1],
      itemsMobile : [479,1],
    });   
    $('#client-testimonial').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
    $('#client-testimonial').find('.owl-next').html('<i class="lni-chevron-right"></i>');


    /* showcase Slider
    =============================*/
     var owl = $(".showcase-slider");
      owl.owlCarousel({
        navigation: false,
        pagination: true,
        slideSpeed: 1000,
        margin:10,
        stopOnHover: true,
        autoPlay: true,
        items: 5,
        itemsDesktopSmall: [1024, 3],
        itemsTablet: [600, 1],
        itemsMobile: [479, 1]
      });



  /* 
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

  /* 
 VIDEO POP-UP
 ========================================================================== */
  $('.video-popup').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
  });

  /* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

  /* 
   One Page Navigation
   ========================================================================== */


    $(window).on('load', function() {
       
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });

  /* Auto Close Responsive Navbar on Click
  ========================================================*/
  function close_toggle() {
      if ($(window).width() <= 768) {
          $('.navbar-collapse a').on('click', function () {
              $('.navbar-collapse').collapse('hide');
          });
      }
      else {
          $('.navbar .navbar-inverse a').off('click');
      }
  }
  close_toggle();
  $(window).resize(close_toggle);

  /* Nivo Lightbox
  ========================================================*/   
   $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });

}(jQuery));

let menuBtn = document.getElementById('menu');
let menuView = document.getElementById('menu-view');
let dim = document.getElementById('dim');
let message = document.getElementById('message');
let body = document.querySelector('body')

let userInput = document.getElementById('user-input');
let inputWarning = document.getElementById('input-warning');
let shortenedLinkContainer = document.getElementById('shortened-link-container');
let shortenBtn = document.getElementById('shorten-btn');

let copyBtn = document.getElementsByClassName('copy-btn');


let state = true;
//--------------------- MENU TOGGLE -----------------------
menuBtn.addEventListener('click', () => {
    if (state){
        menuView.style.display = 'flex';
        menuView.classList.remove('slide-out')
        menuView.classList.add('slide-in');
        dim.style.display = 'block';
        body.classList.add('no-scroll')
        state = !state;
    }
    else {
        menuView.classList.add('slide-out');
        menuView.classList.remove('slide-in');
        body.classList.remove('no-scroll')
        state = !state;
        setTimeout(() => {
            menuView.style.display = 'none';
            dim.style.display = 'none';
        }, 400);
    }
});


//--------------------- MESSAGE INFO ----------------------
function logMessage(state){
    if(state){
        message.style.display = 'block';
        message.classList.remove('slide-down');
        message.classList.add('slide-up');
    }
    else{
        message.classList.add('slide-down');
        message.classList.remove('slide-up');
    }
}


//----------------- API REQUEST (OLD API) ------------------
async function postUrl(link){
    try{
        const requestObj = {
            "url": link
        };
        await fetch("https://url-shortener-service.p.rapidapi.com/shorten",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
                "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
		        "x-rapidapi-key": "04a1f72586mshc6316760c3ac7c2p168b5cjsn6034ad522b33",
            },
            body: JSON.stringify(requestObj)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            processData(data);
        })
    }
    catch(error){
        message.innerText = "Failed to shorten Link, Please check your internet";
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 2000);
        shortenBtn.innerHTML = "Shorten it!";
    }
}


function processData(data){
    if (data.result_url){
        createShortenedLink(userInput.value, data.result_url);
        userInput.value = "";
    }
    else {
        message.innerText = "Link not valid, please insert a valid link";
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 2000);
    }
    shortenBtn.innerHTML = "Shorten it!";
}

//--------------------- INPUT VALIDATION ------------------
userInput.addEventListener('input', () => {
    if(userInput.value.includes(" ")) userInput.value = userInput.value.replace(/\s/g, "");
    inputWarning.style.visibility = 'hidden';
    userInput.style.border = 'none';
});

//-------------------- Shorten Button is clicked --------------------
shortenBtn.addEventListener('click', () => {
    if(userInput.value == ""){
        inputWarning.style.visibility = 'visible';
        userInput.style.border = '2px solid rgb(201, 89, 89)';
    }
    shortenBtn.innerHTML = `<div class="dots"><span></span><span></span><span></span><span></span></div>`;
    postUrl(userInput.value); //call the API function when shorten button is clicked
});

//when user hit the enter key
document.addEventListener('keydown', (e) => {
    if(e.key == "Enter") shortenBtn.click();
});


//--------------------- PROCESS AND CREATE OUTPUT DATA  ----------------
function createShortenedLink(originalLink, shortenedLink){
    let linkInfo = document.createElement("div");
    linkInfo.setAttribute("class", "main__cutter-shortened-links");
    linkInfo.innerHTML =
        `
          <p id="original-link">${originalLink}</p>
          <hr />
          <p class="shortened-link"><a href="${originalLink}" target="_blank" id="shortened-link">${shortenedLink}</a></p>
          <button class="main__cutter-shortened-btn copy-btn">Copy</button>
        `
    ;
    shortenedLinkContainer.insertBefore(linkInfo, shortenedLinkContainer.children[0]);

    //--------------------- COPY BUTTON IS CLICKED --------------
    for (i = 0; i < copyBtn.length; i++){
        let btn = copyBtn[i];
        btn.addEventListener('click', () => {
            btn.innerText = 'Copied';
            btn.classList.add('copied');
            navigator.clipboard.writeText(btn.previousElementSibling.innerText);
            setTimeout(() => {
                btn.innerText = 'Copy';
                btn.classList.remove('copied');
            }, 4000);
        });
    }
}
