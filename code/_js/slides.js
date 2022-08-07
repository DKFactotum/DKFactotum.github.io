// Scroll variables.
var xDown = null, yDown = null;

////////////////////////////////////////////////////////////////////////////////
//////////////////////Preparation functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Arrange generic content for specific pages.
$( window ).on("load", function() {
  watchHScroll();

  watchSlideButtons();
  watchDescriptionToggle();
  watchFullToggle();

  resetSlides();
});
////////////////////////////////////////////////////////////////////////////////
// Watch for scrolling.
function watchHScroll() {
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
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

  xDown = null;
  yDown = null;
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
