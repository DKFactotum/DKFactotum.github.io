
////////////////////////////////////////////////////////////////////////////////
//////////////////////Preparation functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Arrange language related functionality content for specific pages.
$( window ).on("load", function() {
  // for some reason document.ready in explorer after window.load (in chrome - before)
  // => on explorer no language section initially sets to be active.
  watchLanguage();

  resetLanguage();
});

////////////////////////////////////////////////////////////////////////////////
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

    for (i = 0; i < links.length; i++) {
        var url = links.eq(i).attr("href");
        //console.log(url);
        if (url != null && url.startsWith("/"))
            setLinkParameter(links[i], 'lang', selector);
    };
    setUrlParameter('lang', selector);
  });
};
////////////////////////////////////////////////////////////////////////////////
// Add or extract language from URL.
function resetLanguage() {
  var lang = getUrlParameter('lang');

  if (lang == "Rus")                            { $('.lang-element.Rus').click(); }
  else if ((lang == "Eng") || (lang == "Null")) { $('.lang-element.Eng').click(); };
};
