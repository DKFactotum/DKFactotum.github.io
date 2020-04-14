// Scroll variables.
var xDown = null, yDown = null;
////////////////////////////////////////////////////////////////////////////////
//////////////////////Preparation functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Arrange generic content for specific pages.
$( window ).on("load", function() {
  // for some reason document.ready in explorer after window.load (in chrome - before)
  // => on explorer no language section initially sets to be active.
  watchLanguage();
  watchScroll();
  watchButtons();
  watchSlideButtons();
  watchDescriptionToggle();
  watchFullToggle();

  resetLanguage();
  resetNavigation();
  resetButtons();
  resetSlides();
  // moveScroll();

  loadContent();
  watchTime();
});
// On unload.
$( window ).on("beforeunload", function() {
  unloadContent();
});
function watchTime(){
  setInterval(checkDOMChange, 100);
  setTimeout(hideFooter, 5000);
  setTimeout(hideLoader, 3000);
  setTimeout(loadContent, 3000);
}
// STUPID BUG IN CHROME - ADDS STRANGE BIG SPANS ON MOUSE MOVE.
function checkDOMChange(){
  $('span').remove();
  clearInterval();
  // $('span').css({'top' : '0px', 'borrom' : '0px', 'left' : '0px', 'right' : '0px'});
      // call the function again after 100 milliseconds
}
function hideFooter(){
  var footer = $('.page-footer');
  footer.addClass('hiding');
}
function hideLoader(){
  var loader = $( ".loader" );
  loader.addClass('is-hidden');
}
////////////////////////////////////////////////////////////////////////////////

// function watchSpan(){
//   var elements = $('span');
//   // for (i = 0; i < elements.length; i++){
//   //   console.log(elements.eq(i));
//   //   // if (elements.eq(i).attr("class").length == 0){
//   //   //
//   //   // };
//   // };
// };
// Watch for toggling of language switch.
function watchLanguage() {
  var lang_element = $('.lang-element');
  var links = $('a');
  lang_element.on('click', function toggle_language() {
    var $this = $(this), selector, target_section;

    $this.addClass('active');
    $this.siblings().removeClass('active');
    selector = $('.lang-element.active').text();
    target_section = $('.lang-section.'+selector);

    target_section.addClass('lang-active');
    target_section.siblings().removeClass('lang-active');

    for (i = 0; i < links.length; i++) { setLinkParameter(links[i], 'lang', selector); };
    setUrlParameter('lang', selector);
  });
};
// Watch for scrolling.
function watchScroll() {
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('wheel', scroll);
};
// Swipe detection handlers.
function handleTouchStart(event) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
};
function handleTouchMove(event) {
  if ( !xDown || !yDown ) { return; }

  var xUp = event.touches[0].clientX, yUp = event.touches[0].clientY,
    xDiff = xDown - xUp, yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0)  { scrollLeft(); }
      else            { scrollRight(); }
  }
  else {
      if (yDiff > 0)  { scrollUp(); }
      else            { scrollDown(); }
  };

  resetButtons()
  xDown = null;
  yDown = null;
};
// Watch for buttons UP and DOWN and direct to further transformations.
function watchButtons() {
  var arrow_up    = $('.arrow_up');
  var arrow_down  = $('.arrow_down');
  arrow_up.on('click', function scroll_up_init() {
    scrollUp();
    resetButtons();
  });
  arrow_down.on('click', function scroll_down_init() {
    scrollDown();
    resetButtons();
  });
  $(window).bind('keydown', function(e) {
    if (e.keyCode == 38) {
      scrollUp();
      resetButtons();
    }
    else if (e.keyCode == 40) {
      scrollDown();
      resetButtons();
    };
  });
};
function scroll(event) {
  var wScroll = event.deltaY;
  // console.log(wScroll);
  if (wScroll < 0){
    scrollUp();
    resetButtons();
  }
  else if (wScroll > 0) {
    scrollDown();
    resetButtons();
  }
}
function scrollUp() {
  var box_1 = $('.cube-container.cube-1'),
    box_2 = $('.cube-container.cube-2'),
    box_3 = $('.cube-container.cube-3'),
    box_4 = $('.cube-container.cube-4'),
    box_5 = $('.cube-container.cube-5'),
    box_6 = $('.cube-container.cube-6'),
    box_7 = $('.cube-container.cube-7'),
    box_8 = $('.cube-container.cube-8'),
    box_9 = $('.cube-container.cube-9'),
    box_13 = $('.cube-container.cube-13'),
    box_14 = $('.cube-container.cube-14'),
    box_15 = $('.cube-container.cube-15'),
    box_13_amount = box_13.length/2,
    box_14_amount = box_14.length/2,
    box_15_amount = box_15.length/2;

  if (box_13_amount > 0 || box_14_amount > 0 || box_15_amount > 0 ) {
    box_1.children().addClass('cube-10').removeClass('cube-1');
    box_1.addClass('cube-10').removeClass('cube-1');
    box_2.children().addClass('cube-11').removeClass('cube-2');
    box_2.addClass('cube-11').removeClass('cube-2');
    box_3.children().addClass('cube-12').removeClass('cube-3');
    box_3.addClass('cube-12').removeClass('cube-3');
    box_4.children().addClass('cube-1').removeClass('cube-4');
    box_4.addClass('cube-1').removeClass('cube-4');
    box_5.children().addClass('cube-2').removeClass('cube-5');
    box_5.addClass('cube-2').removeClass('cube-5');
    box_6.children().addClass('cube-3').removeClass('cube-6');
    box_6.addClass('cube-3').removeClass('cube-6');
    box_7.children().addClass('cube-4').removeClass('cube-7');
    box_7.addClass('cube-4').removeClass('cube-7');
    box_8.children().addClass('cube-5').removeClass('cube-8');
    box_8.addClass('cube-5').removeClass('cube-8');
    box_9.children().addClass('cube-6').removeClass('cube-9');
    box_9.addClass('cube-6').removeClass('cube-9');

    box_13.eq(0).children().addClass('cube-7').removeClass('cube-13');
    box_13.eq(0).addClass('cube-7').removeClass('cube-13');
    box_14.eq(0).children().addClass('cube-8').removeClass('cube-14');
    box_14.eq(0).addClass('cube-8').removeClass('cube-14');
    box_15.eq(0).children().addClass('cube-9').removeClass('cube-15');
    box_15.eq(0).addClass('cube-9').removeClass('cube-15');

    box_13.eq(box_13_amount).children().addClass('cube-7').removeClass('cube-13');
    box_13.eq(box_13_amount).addClass('cube-7').removeClass('cube-13');
    box_14.eq(box_14_amount).children().addClass('cube-8').removeClass('cube-14');
    box_14.eq(box_14_amount).addClass('cube-8').removeClass('cube-14');
    box_15.eq(box_15_amount).children().addClass('cube-9').removeClass('cube-15');
    box_15.eq(box_15_amount).addClass('cube-9').removeClass('cube-15');
  };
};
function scrollDown() {
  var box_1 = $('.cube-container.cube-1'),
    box_2 = $('.cube-container.cube-2'),
    box_3 = $('.cube-container.cube-3'),
    box_4 = $('.cube-container.cube-4'),
    box_5 = $('.cube-container.cube-5'),
    box_6 = $('.cube-container.cube-6'),
    box_7 = $('.cube-container.cube-7'),
    box_8 = $('.cube-container.cube-8'),
    box_9 = $('.cube-container.cube-9'),
    box_10 = $('.cube-container.cube-10'),
    box_11 = $('.cube-container.cube-11'),
    box_12 = $('.cube-container.cube-12'),
    box_10_amount = box_10.length/2,
    box_11_amount = box_11.length/2,
    box_12_amount = box_12.length/2;

  if (box_10_amount > 0  || box_11_amount > 0  || box_12_amount > 0 ) {
    box_1.children().addClass('cube-4').removeClass('cube-1');
    box_1.addClass('cube-4').removeClass('cube-1');
    box_2.children().addClass('cube-5').removeClass('cube-2');
    box_2.addClass('cube-5').removeClass('cube-2');
    box_3.children().addClass('cube-6').removeClass('cube-3');
    box_3.addClass('cube-6').removeClass('cube-3');
    box_4.children().addClass('cube-7').removeClass('cube-4');
    box_4.addClass('cube-7').removeClass('cube-4');
    box_5.children().addClass('cube-8').removeClass('cube-5');
    box_5.addClass('cube-8').removeClass('cube-5');
    box_6.children().addClass('cube-9').removeClass('cube-6');
    box_6.addClass('cube-9').removeClass('cube-6');
    box_7.children().addClass('cube-13').removeClass('cube-7');
    box_7.addClass('cube-13').removeClass('cube-7');
    box_8.children().addClass('cube-14').removeClass('cube-8');
    box_8.addClass('cube-14').removeClass('cube-8');
    box_9.children().addClass('cube-15').removeClass('cube-9');
    box_9.addClass('cube-15').removeClass('cube-9');

    box_10.eq(box_10_amount-1).children().addClass('cube-1').removeClass('cube-10');
    box_10.eq(box_10_amount-1).addClass('cube-1').removeClass('cube-10');
    box_11.eq(box_11_amount-1).children().addClass('cube-2').removeClass('cube-11');
    box_11.eq(box_11_amount-1).addClass('cube-2').removeClass('cube-11');
    box_12.eq(box_12_amount-1).children().addClass('cube-3').removeClass('cube-12');
    box_12.eq(box_12_amount-1).addClass('cube-3').removeClass('cube-12');

    box_10.eq(box_10_amount*2-1).children().addClass('cube-1').removeClass('cube-10');
    box_10.eq(box_10_amount*2-1).addClass('cube-1').removeClass('cube-10');
    box_11.eq(box_11_amount*2-1).children().addClass('cube-2').removeClass('cube-11');
    box_11.eq(box_11_amount*2-1).addClass('cube-2').removeClass('cube-11');
    box_12.eq(box_12_amount*2-1).children().addClass('cube-3').removeClass('cube-12');
    box_12.eq(box_12_amount*2-1).addClass('cube-3').removeClass('cube-12');
  };
};
// Slide button watchers.
function watchDescriptionToggle() {
  var descriptionButton = $('.description').children();
  descriptionButton.bind('click', toggle_description);
};
function watchFullToggle() {
  var fullButton = $('.full-window').children(),
    image = $('.image_container');
  fullButton.on('click', toggle_full);
};
function toggle_description() {
  var descriptionButton = $('.description').children(),
    decriptionIcon = descriptionButton.children(),
    description = $('.description_container'),
    containers = $('.container'),
    bg = $('.details-bg');
  decriptionIcon.toggleClass('hidden');
  description.toggleClass('hidden');
  bg.toggleClass('hidden');
  containers.toggleClass('expanded');
  // console.log();
};
function toggle_full() {
  var image = $('.image_container'),
    contentWrapper = $('.content-wrapper'),
    wrapper = $('.wrapper'),
    navigation = $('.navigation_container'),
    description = $('.description_container'),
    bg = $('.details-bg'),
    descriptionButton = $('.description').children(),
    decriptionIcons = descriptionButton.children(),
    full = getUrlParameter('full');
  image.toggleClass('full');
  contentWrapper.toggleClass('full');
  wrapper.toggleClass('full');
  navigation.toggleClass('full');
  description.toggleClass('full');
  decriptionIcons.toggleClass('full');
  bg.toggleClass('full');
  if (full == 'true') {
    full = 'false';
  }
  else {
    full = 'true';
  };
  setUrlParameter('full', full);
};
// Watch for buttons LEFT and RIGHT and direct find appropriate slide.
function watchSlideButtons() {
  var arrow_left = $('.arrow_left'), arrow_down = $('.arrow_right'),
    full = getUrlParameter('full');

  arrow_left.on('click', function scroll_left_init()  { scrollLeft(); });
  arrow_down.on('click', function scroll_right_init() { scrollRight(); });

  $(window).bind('keydown', function(event) {
    if      (event.keyCode == 37)                     { scrollLeft(); }
    else if (event.keyCode == 39)                     { scrollRight(); }
    else if ((full != "true") && ((event.keyCode == 38) || (event.keyCode == 40)))  {toggle_description(); };
  });
};
function scrollLeft() {
  var leftArrow = $('.arrow_left'), rightArrow = $('.arrow_right'),
    lastNumber = parseInt($('.projectlength').attr('text')), slideNumber, activeSlide,
    slides = $('.content-slides'),
    detailsBG = $('.details-bg');
  slides.removeClass('active');
  detailsBG.removeClass('active');
  slideNumber = getUrlParameter('slide');
  if (slideNumber == "Null")  { slideNumber = 1; }
  else                        { slideNumber = parseInt(slideNumber); };
  slideNumber -= 1;

  if (slideNumber == 0)               { slideNumber = 1; };
  if (slideNumber == 1)               { leftArrow.addClass('hidden'); }
  else                                { leftArrow.removeClass('hidden'); };
  if (slideNumber == lastNumber)      { rightArrow.addClass('hidden'); }
  else                                { rightArrow.removeClass('hidden'); };

  activeSlide = $('.slide' + slideNumber);
  activeSlide.addClass('active');
  // console.log(detailsBG, (slideNumber-1)*2, (slideNumber-1)*2+lastNumber);
  detailsBG.eq(slideNumber-1).addClass('active');
  detailsBG.eq(slideNumber-1+lastNumber).addClass('active');
  setUrlParameter('slide', slideNumber);
  lazyLoad();
};
function scrollRight() {
  var leftArrow = $('.arrow_left'), rightArrow = $('.arrow_right'),
    lastNumber = parseInt($('.projectlength').attr('text')), slideNumber, activeSlide,
    slides = $('.content-slides'),
    detailsBG = $('.details-bg');

  slides.removeClass('active');
  detailsBG.removeClass('active');
  slideNumber = getUrlParameter('slide');
  if (slideNumber == "Null")  { slideNumber = 1; }
  else                        { slideNumber = parseInt(slideNumber); };
  slideNumber += 1;

  if (slideNumber == lastNumber + 1) { slideNumber = lastNumber; };
  if (slideNumber == 1)           { leftArrow.addClass('hidden'); }
  else                            { leftArrow.removeClass('hidden'); };
  if (slideNumber == lastNumber)  { rightArrow.addClass('hidden'); }
  else                            { rightArrow.removeClass('hidden'); };

  activeSlide = $('.slide' + slideNumber);
  activeSlide.addClass('active');
  // console.log(detailsBG, (slideNumber-1)*2, (slideNumber-1)*2+lastNumber);
  detailsBG.eq(slideNumber-1).addClass('active');
  detailsBG.eq(slideNumber-1+lastNumber).addClass('active');
  setUrlParameter('slide', slideNumber);
  lazyLoad();
};
function lazyLoad() {
  var lastNumber, slideNumber, slideNumberMin, slideNumberMax, slideToLoad, img;

  lastNumber = parseInt($('.projectlength').attr('text'));
  slideNumber = getUrlParameter('slide');
  if (slideNumber == 1) {slideNumberMin = 1;}
  else                  {slideNumberMin = slideNumber - 1;};
  if (slideNumber == lastNumber) {slideNumberMax = lastNumber;}
  else                           {slideNumberMax = slideNumber + 1;};
  // console.log(lastNumber, slideNumber, slideNumberMin, slideNumberMax);

  for (i = slideNumberMin; i < slideNumberMax+1; i++) {
    slideToLoad = $('.slide' + i);
    img = slideToLoad.find("img.lazy");
    // console.log(img);
    img.removeClass("lazy");
    img.attr("src", img.attr("data-src"));
  };
}
////////////////////////////////////////////////////////////////////////////////
// Add or extract language from URL.
function resetLanguage() {
  var lang = getUrlParameter('lang');

  if (lang == "Ru")                            { $('.lang-element.Ru').click(); }
  else if ((lang == "En") || (lang == "Null")) { $('.lang-element.En').click(); };
};
// Unhide levels in navigation bar.
function resetNavigation() {
  var uncutID = window.location.pathname,
    targetID = uncutID.substr(1, uncutID.length - 6),
    targetClass, targetSection;
  // console.log(targetID);

  if (targetID != "") { // Level 2.
    var levelCheckPosition = targetID.search("slides"),
      home = $("home");
    if (levelCheckPosition != -1) { // Level 3.
      // Activate by searching for "slides" in page name.
      var parentID = targetID.substr(0, levelCheckPosition - 1),
        parentClass = '.title .' + parentID,
        parentSection = $(parentClass);
      // console.log(parentID, parentClass, parentSection);
      parentSection.removeClass('is-hidden');
      parentSection.siblings().addClass('is-hidden');
    };

    home.addClass('active');
    targetClass = '.title .' + targetID;
    targetSection = $(targetClass);
    targetSection.removeClass('is-hidden').removeAttr('href').addClass('active');
    targetSection.siblings().addClass('is-hidden');
  }
  else { // Base Level.
    targetClass = '.title .' + 'home';
    targetSection = $(targetClass);
    targetSection.removeClass('is-hidden').removeAttr('href').addClass('active');
    targetSection.siblings().addClass('is-hidden');
  };
};
// Prepare the necessary slide in view.
function resetSlides() {
  var slide1 = $('.slide1');
  if (slide1.length != 0) {
    var leftArrow = $('.arrow_left'), rightArrow = $('.arrow_right'),
      lastNumber = parseInt($('.projectlength').attr('text')),
      slides = $('.content-slides'), slideNumber, activeSlide,
      detailsBG = $('.details-bg');

    slides.removeClass('active');
    detailsBG.removeClass('active');
    slideNumber = getUrlParameter('slide');
    if (slideNumber == "Null")      { slideNumber = 1; }
    else                            { slideNumber = Number(slideNumber); };

    if (slideNumber == 1)           { leftArrow.addClass('hidden'); }
    else                            { leftArrow.removeClass('hidden'); };
    if (slideNumber == lastNumber)  { rightArrow.addClass('hidden'); }
    else                            { rightArrow.removeClass('hidden'); };

    activeSlide = $('.slide' + slideNumber);
    activeSlide.addClass('active');
    detailsBG.eq(slideNumber-1).addClass('active');
    detailsBG.eq(slideNumber-1+lastNumber).addClass('active');

    setUrlParameter('slide', slideNumber);
    lazyLoad();
  };
};
// Prepare Up and down buttons for grod pages.
function resetButtons() {
  var arrow_up = $('.arrow_up'), arrow_down = $('.arrow_down'),
    box_10 = $('.cube-container.cube-10'), box_11 = $('.cube-container.cube-11'),
    box_12 = $('.cube-container.cube-12'), box_13 = $('.cube-container.cube-13'),
    box_14 = $('.cube-container.cube-14'), box_15 = $('.cube-container.cube-15'),
    box_10_amount = box_10.length/2, box_11_amount = box_11.length/2,
    box_12_amount = box_12.length/2, box_13_amount = box_13.length/2,
    box_14_amount = box_14.length/2, box_15_amount = box_15.length/2;

  if ((box_13_amount != 0) || (box_14_amount != 0) || (box_15_amount != 0)) {
    arrow_up.removeClass("hidden");   }
  else if ((box_13_amount == 0) && (box_14_amount == 0) && (box_15_amount == 0)) {
    arrow_up.addClass("hidden");      };
  if ((box_10_amount != 0) || (box_11_amount != 0) || (box_12_amount != 0)) {
    arrow_down.removeClass("hidden"); }
  else if ((box_10_amount == 0) && (box_11_amount == 0) && (box_12_amount == 0)) {
    arrow_down.addClass("hidden");    };
};

////////////////////////////////////////////////////////////////////////////////
// Animate in the pages.
function loadContent() {
  var object = $( ".content-wrapper" ),
    totalObject = $( ".page-wrapper" );
  totalObject.removeClass("load").addClass('loading');
  object.removeClass("load").addClass('loading');
};
// Animate out the pages.
function unloadContent() {
  var object = $( ".content-wrapper" );
  var totalObject = $( ".page-wrapper" );
  object.removeClass("loading").addClass("unloading");
  totalObject.removeClass("loading").addClass("unloading");
  // Delay.
  var start = +new Date;
  while ((+new Date - start) < 500);
};

////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Universal functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Get value of given parametr from URL.
function getUrlParameter(param) {
  var query = window.location.search.substring(1),
    variables = query.split('?'),
    pair,
    i;
  for (i = 0; i < variables.length; i++) {
    pair = variables[i].split('=');
    if (pair[0] == param) { return pair[1];}
  };
  return "Null";
};
// Set given value of given parametr in URL.
function setUrlParameter(param, value) {
  if (value != "Null") {
    var query = window.location.search.substring(1),
      valueCurrent = getUrlParameter(param),
      sign = '?',
      newUrl;

    if (valueCurrent == "Null") { newUrl = window.location.href +sign+param+"="+value; }
    else { newUrl = window.location.href.replace(param+"="+valueCurrent, param+"="+value); };

    window.history.replaceState("","", newUrl);
  };
};

// Get value of given parametr from URL.
function getLinkParameter(object, param) {
  var query = $(object).attr('href'),
    variables = query.split('?'),
    pair,
    i;
  for (i = 0; i < variables.length; i++) {
    pair = variables[i].split('=');
    // console.log(pair);
    if (pair[0] == param) { return pair[1];}
  };
  return "Null";
};
// Set given value of given parametr in URL.
function setLinkParameter(object, param, value) {
  var query = $(object).attr('href');
  // console.log(query);
  if (value != "Null" && query != null) {
    var valueCurrent = getLinkParameter(object, param),
      sign = '?',
      newUrl;

    if (valueCurrent == "Null") { newUrl = query +sign+param+"="+value; }
    else { newUrl = query.replace(param+"="+valueCurrent, param+"="+value); };

    $(object).attr('href', newUrl);
  };
};
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Finish later ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// // Watch for scrolling and direct to further transformations/
// function moveScroll() {
//   addEventListener('wheel', function (event) {
//     animate_in_scroll( event, '.cube-container.cube-10');
//     animate_in_scroll( event, '.cube-container.cube-11');
//     animate_in_scroll( event, '.cube-container.cube-12');
//     animate_in_scroll( event, '.cube-container.cube-13');
//     animate_in_scroll( event, '.cube-container.cube-14');
//     animate_in_scroll( event, '.cube-container.cube-15');
//   });
// };
// //Scroll each cube according to the global scroll value.
// function animateInScroll(event, element_name) {
//   var element =             $( element_name );
//   if ( element.length > 0 ) {
//     var wScroll =       event.deltaY / 5,
//       lang =            getActiveLanguageI,
//       offsetElement =   $( '.wrapper:eq('+lang+')' ,
//       offsetPosition =  offsetElement.offset().top,
//       currentPosition = $( element_name + ':eq('+lang+')' ).offset().top,
//       elementclass =    element[0].attributes.class.value,
//       elementlen =      elementclass.length,
//       elementnum =      elementclass.substr(elementlen - 2, elementlen - 1),
//       children =        $( element_name+' .box' ),
//       newelementnum, upLimitPosition, newPosition, downLimitPosition,
//       childPosition, newChildPosition,
//       nextelclass, reelname, nextelname,
//       childclass, childlen, newelementclass, newchildclass, rechildclass;
//
//     if (elementnum > 12) {
//       newelementnum =         elementnum - 6;
//       upLimitPosition =       2*offsetElement.height()/3;
//       newPosition =           currentPosition + wScroll - offsetPosition;
//       downLimitPosition =     600 + (newelementnum - 3) * 150;
//     }
//     else if (elementnum > 9) {
//       newelementnum =         elementnum - 9;
//       upLimitPosition =       - 600 - newelementnum * 150;
//       newPosition =           currentPosition + wScroll - offsetPosition;
//       downLimitPosition =     0;
//     }
//     else {
//       elementnum =                elementnum.substr(1, 2) * 1;
//       if (elementnum > 6) {
//         newelementnum =         elementnum + 3;
//         upLimitPosition =       1*offsetElement.height() / 3;
//         newPosition =           currentPosition + wScroll - offsetPosition;
//         downLimitPosition =     3*offsetElement.height() / 3;
//         childPosition =         children.position().top;
//         if (childPosition <= (offsetElement.height() / 3) * 0.25) { newChildPosition = childPosition + wScroll / 2; }
//         else                                                      { newChildPosition = childPosition; };
//       }
//       else if (elementnum > 3) {
//         newelementnum =         elementnum + 3;
//         upLimitPosition =       0*offsetElement.height()/3;
//         newPosition =           currentPosition + wScroll - offsetPosition;
//         downLimitPosition =     2*offsetElement.height()/3;
//         childPosition =         children.position().top;
//         newChildPosition =      childPosition + wScroll/2;
//         if (childPosition <= (offsetElement.height() / 3) * 0.25) { newChildPosition = childPosition + wScroll / 2;}
//         else                                                      { newChildPosition = childPosition;};
//       }
//       else if (elementnum > 0) {
//         newelementnum =         elementnum + 3;
//         upLimitPosition =       -1*offsetElement.height() / 3;
//         newPosition =           currentPosition + wScroll - offsetPosition;
//         downLimitPosition =     1*offsetElement.height() / 3;
//         childPosition =         children.position().top;
//         newChildPosition =      childPosition + wScroll / 2;
//         if (childPosition <= (offsetElement.height() / 3) * 0.125)  { newChildPosition =    childPosition + wScroll / 2;         }
//         else if (childPosition <= 0)                                { newChildPosition =    0         }
//         else                                                        { newChildPosition =    childPosition         };
//       };
//     };
//     if (newPosition < downLimitPosition) {
//       if (newPosition > upLimitPosition) {
//         if (elementnum > 12) {
//           element.css({ 'top' : newPosition });
//           if (newPosition < offsetElement.height() + 5) {
//             nextelclass =   newelementnum - 6;
//             reelname =      element_name.substr(0, element_name.length - 2);
//             nextelname =    reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//
//             nextelclass =   nextelclass + 3;
//             nextelname =    reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//
//             nextelclass =   nextelclass + 3;
//             nextelname =    reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//           };
//         }
//         else if (elementnum > 9) {
//           element.css({'top' : newPosition});
//           if (newPosition > -offsetElement.height() / 3 - 5) {
//             nextelclass = newelementnum + 6;
//             reelname = element_name.substr(0, element_name.length - 2);
//             nextelname = reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//
//             nextelclass = nextelclass - 3;
//             nextelname = reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//
//             nextelclass = nextelclass - 3;
//             nextelname = reelname + nextelclass;
//             animate_in_scroll(event, nextelname);
//             // console.log(nextelname);
//           }
//         }
//         else if (elementnum > 6) {
//           element.css({ 'top' : newPosition });
//           children.css({ 'top' : newChildPosition });
//         }
//         else if (elementnum > 3) {
//           element.css({ 'top' : newPosition });
//           children.css({ 'top' : newChildPosition });
//         }
//         else if (elementnum > 0) {
//           element.css({ 'top' : newPosition });
//           children.css({ 'top' : newChildPosition });
//         };
//       }
//       else {
//         childclass =          children[0].attributes.class.value;
//         childlen =            childclass.length;
//         if (elementnum < 10) {
//           newelementclass =   elementclass.substr(0, elementlen - 1) + newelementnum;
//           newchildclass =     childclass.substr(0, childlen - 1) + newelementnum;
//         }
//         else {
//           newelementclass =   elementclass.substr(0, elementlen - 2) + newelementnum;
//           newchildclass =     childclass.substr(0, childlen - 2) + newelementnum;
//         };
//
//         rechildclass =        '.'+childclass.replace(' ', '.')
//
//         element.find( rechildclass ).removeClass( childclass ).addClass( newchildclass );
//         element.removeAttr( 'style' ).removeClass( elementclass ).addClass( newelementclass );
//       };
//     }
//     else {
//       childclass =          children[0].attributes.class.value;
//       childlen =            childclass.length;
//       if (elementnum < 10) {
//         newelementclass =   elementclass.substr(0, elementlen - 1) + newelementnum;
//         newchildclass =     childclass.substr(0, childlen - 1) + newelementnum;
//       }
//       else {
//         newelementclass =   elementclass.substr(0, elementlen - 2) + newelementnum;
//         newchildclass =     childclass.substr(0, childlen - 2) + newelementnum;
//       };
//
//       rechildclass =        '.'+childclass.replace(' ', '.')
//
//       element.find( rechildclass ).removeClass( childclass ).addClass( newchildclass );
//       element.removeAttr( 'style' ).removeClass( elementclass ).addClass( newelementclass );
//     };
//   };
// };
// // Get subjective number of section (in terms of introduced languages)
// function getActiveLanguageI() {
//   var lang_element = $('.lang-element.active');
//   if (lang_element.text() == 'En')  { return 0; }
//   else                              { return 1; };
// };
