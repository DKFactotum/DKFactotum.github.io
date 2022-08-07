////////////////////////////////////////////////////////////////////////////////
//////////////////////Preparation functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Arrange generic content for specific pages.
$( window ).on("load", function() {
  resetNavigation();

  loadContent();
  watchTime();
  watchMenu();
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
function watchMenu(){
    var menuButtons = $('.menuButton');

    for (i = 0; i < menuButtons.length; i++) {
        menuButtons.eq(i).on('click', function toggle_menu() {
            var menu = $('.menu');
            menu.toggleClass('hidden');
        });
    }
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
