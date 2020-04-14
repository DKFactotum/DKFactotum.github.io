function watchTime(){setInterval(checkDOMChange,100),setTimeout(hideFooter,5e3),setTimeout(hideLoader,3e3),setTimeout(loadContent,3e3)}function checkDOMChange(){$("span").remove(),clearInterval()}function hideFooter(){var e=$(".page-footer");e.addClass("hiding")}function hideLoader(){var e=$(".loader");e.addClass("is-hidden")}function watchLanguage(){var e=$(".lang-element"),a=$("a");e.on("click",function(){var e,s,l=$(this);for(l.addClass("active"),l.siblings().removeClass("active"),e=$(".lang-element.active").text(),s=$(".lang-section."+e),s.addClass("lang-active"),s.siblings().removeClass("lang-active"),i=0;i<a.length;i++)setLinkParameter(a[i],"lang",e);setUrlParameter("lang",e)})}function watchScroll(){document.addEventListener("touchstart",handleTouchStart,!1),document.addEventListener("touchmove",handleTouchMove,!1),document.addEventListener("wheel",scroll)}function handleTouchStart(e){xDown=e.touches[0].clientX,yDown=e.touches[0].clientY}function handleTouchMove(e){if(xDown&&yDown){var a=e.touches[0].clientX,s=e.touches[0].clientY,l=xDown-a,c=yDown-s;Math.abs(l)>Math.abs(c)?l>0?scrollLeft():scrollRight():c>0?scrollUp():scrollDown(),resetButtons(),xDown=null,yDown=null}}function watchButtons(){var e=$(".arrow_up"),a=$(".arrow_down");e.on("click",function(){scrollUp(),resetButtons()}),a.on("click",function(){scrollDown(),resetButtons()}),$(window).bind("keydown",function(e){38==e.keyCode?(scrollUp(),resetButtons()):40==e.keyCode&&(scrollDown(),resetButtons())})}function scroll(e){var a=e.deltaY;a<0?(scrollUp(),resetButtons()):a>0&&(scrollDown(),resetButtons())}function scrollUp(){var e=$(".cube-container.cube-1"),a=$(".cube-container.cube-2"),s=$(".cube-container.cube-3"),l=$(".cube-container.cube-4"),c=$(".cube-container.cube-5"),n=$(".cube-container.cube-6"),r=$(".cube-container.cube-7"),t=$(".cube-container.cube-8"),d=$(".cube-container.cube-9"),o=$(".cube-container.cube-13"),i=$(".cube-container.cube-14"),u=$(".cube-container.cube-15"),b=o.length/2,C=i.length/2,v=u.length/2;(b>0||C>0||v>0)&&(e.children().addClass("cube-10").removeClass("cube-1"),e.addClass("cube-10").removeClass("cube-1"),a.children().addClass("cube-11").removeClass("cube-2"),a.addClass("cube-11").removeClass("cube-2"),s.children().addClass("cube-12").removeClass("cube-3"),s.addClass("cube-12").removeClass("cube-3"),l.children().addClass("cube-1").removeClass("cube-4"),l.addClass("cube-1").removeClass("cube-4"),c.children().addClass("cube-2").removeClass("cube-5"),c.addClass("cube-2").removeClass("cube-5"),n.children().addClass("cube-3").removeClass("cube-6"),n.addClass("cube-3").removeClass("cube-6"),r.children().addClass("cube-4").removeClass("cube-7"),r.addClass("cube-4").removeClass("cube-7"),t.children().addClass("cube-5").removeClass("cube-8"),t.addClass("cube-5").removeClass("cube-8"),d.children().addClass("cube-6").removeClass("cube-9"),d.addClass("cube-6").removeClass("cube-9"),o.eq(0).children().addClass("cube-7").removeClass("cube-13"),o.eq(0).addClass("cube-7").removeClass("cube-13"),i.eq(0).children().addClass("cube-8").removeClass("cube-14"),i.eq(0).addClass("cube-8").removeClass("cube-14"),u.eq(0).children().addClass("cube-9").removeClass("cube-15"),u.eq(0).addClass("cube-9").removeClass("cube-15"),o.eq(b).children().addClass("cube-7").removeClass("cube-13"),o.eq(b).addClass("cube-7").removeClass("cube-13"),i.eq(C).children().addClass("cube-8").removeClass("cube-14"),i.eq(C).addClass("cube-8").removeClass("cube-14"),u.eq(v).children().addClass("cube-9").removeClass("cube-15"),u.eq(v).addClass("cube-9").removeClass("cube-15"))}function scrollDown(){var e=$(".cube-container.cube-1"),a=$(".cube-container.cube-2"),s=$(".cube-container.cube-3"),l=$(".cube-container.cube-4"),c=$(".cube-container.cube-5"),n=$(".cube-container.cube-6"),r=$(".cube-container.cube-7"),t=$(".cube-container.cube-8"),d=$(".cube-container.cube-9"),o=$(".cube-container.cube-10"),i=$(".cube-container.cube-11"),u=$(".cube-container.cube-12"),b=o.length/2,C=i.length/2,v=u.length/2;(b>0||C>0||v>0)&&(e.children().addClass("cube-4").removeClass("cube-1"),e.addClass("cube-4").removeClass("cube-1"),a.children().addClass("cube-5").removeClass("cube-2"),a.addClass("cube-5").removeClass("cube-2"),s.children().addClass("cube-6").removeClass("cube-3"),s.addClass("cube-6").removeClass("cube-3"),l.children().addClass("cube-7").removeClass("cube-4"),l.addClass("cube-7").removeClass("cube-4"),c.children().addClass("cube-8").removeClass("cube-5"),c.addClass("cube-8").removeClass("cube-5"),n.children().addClass("cube-9").removeClass("cube-6"),n.addClass("cube-9").removeClass("cube-6"),r.children().addClass("cube-13").removeClass("cube-7"),r.addClass("cube-13").removeClass("cube-7"),t.children().addClass("cube-14").removeClass("cube-8"),t.addClass("cube-14").removeClass("cube-8"),d.children().addClass("cube-15").removeClass("cube-9"),d.addClass("cube-15").removeClass("cube-9"),o.eq(b-1).children().addClass("cube-1").removeClass("cube-10"),o.eq(b-1).addClass("cube-1").removeClass("cube-10"),i.eq(C-1).children().addClass("cube-2").removeClass("cube-11"),i.eq(C-1).addClass("cube-2").removeClass("cube-11"),u.eq(v-1).children().addClass("cube-3").removeClass("cube-12"),u.eq(v-1).addClass("cube-3").removeClass("cube-12"),o.eq(2*b-1).children().addClass("cube-1").removeClass("cube-10"),o.eq(2*b-1).addClass("cube-1").removeClass("cube-10"),i.eq(2*C-1).children().addClass("cube-2").removeClass("cube-11"),i.eq(2*C-1).addClass("cube-2").removeClass("cube-11"),u.eq(2*v-1).children().addClass("cube-3").removeClass("cube-12"),u.eq(2*v-1).addClass("cube-3").removeClass("cube-12"))}function watchDescriptionToggle(){var e=$(".description").children();e.bind("click",toggle_description)}function watchFullToggle(){var e=$(".full-window").children();$(".image_container");e.on("click",toggle_full)}function toggle_description(){var e=$(".description").children(),a=e.children(),s=$(".description_container"),l=$(".container"),c=$(".details-bg");a.toggleClass("hidden"),s.toggleClass("hidden"),c.toggleClass("hidden"),l.toggleClass("expanded")}function toggle_full(){var e=$(".image_container"),a=$(".content-wrapper"),s=$(".wrapper"),l=$(".navigation_container"),c=$(".description_container"),n=$(".details-bg"),r=$(".description").children(),t=r.children(),d=getUrlParameter("full");e.toggleClass("full"),a.toggleClass("full"),s.toggleClass("full"),l.toggleClass("full"),c.toggleClass("full"),t.toggleClass("full"),n.toggleClass("full"),d="true"==d?"false":"true",setUrlParameter("full",d)}function watchSlideButtons(){var e=$(".arrow_left"),a=$(".arrow_right"),s=getUrlParameter("full");e.on("click",function(){scrollLeft()}),a.on("click",function(){scrollRight()}),$(window).bind("keydown",function(e){37==e.keyCode?scrollLeft():39==e.keyCode?scrollRight():"true"==s||38!=e.keyCode&&40!=e.keyCode||toggle_description()})}function scrollLeft(){var e,a,s=$(".arrow_left"),l=$(".arrow_right"),c=parseInt($(".projectlength").attr("text")),n=$(".content-slides"),r=$(".details-bg");n.removeClass("active"),r.removeClass("active"),e=getUrlParameter("slide"),e="Null"==e?1:parseInt(e),e-=1,0==e&&(e=1),1==e?s.addClass("hidden"):s.removeClass("hidden"),e==c?l.addClass("hidden"):l.removeClass("hidden"),a=$(".slide"+e),a.addClass("active"),r.eq(e-1).addClass("active"),r.eq(e-1+c).addClass("active"),setUrlParameter("slide",e),lazyLoad()}function scrollRight(){var e,a,s=$(".arrow_left"),l=$(".arrow_right"),c=parseInt($(".projectlength").attr("text")),n=$(".content-slides"),r=$(".details-bg");n.removeClass("active"),r.removeClass("active"),e=getUrlParameter("slide"),e="Null"==e?1:parseInt(e),e+=1,e==c+1&&(e=c),1==e?s.addClass("hidden"):s.removeClass("hidden"),e==c?l.addClass("hidden"):l.removeClass("hidden"),a=$(".slide"+e),a.addClass("active"),r.eq(e-1).addClass("active"),r.eq(e-1+c).addClass("active"),setUrlParameter("slide",e),lazyLoad()}function lazyLoad(){var e,a,s,l,c,n;for(e=parseInt($(".projectlength").attr("text")),a=getUrlParameter("slide"),s=1==a?1:a-1,l=a==e?e:a+1,i=s;i<l+1;i++)c=$(".slide"+i),n=c.find("img.lazy"),n.removeClass("lazy"),n.attr("src",n.attr("data-src"))}function resetLanguage(){var e=getUrlParameter("lang");"Ru"==e?$(".lang-element.Ru").click():"En"!=e&&"Null"!=e||$(".lang-element.En").click()}function resetNavigation(){var e,a,s=window.location.pathname,l=s.substr(1,s.length-6);if(""!=l){var c=l.search("slides"),n=$("home");if(c!=-1){var r=l.substr(0,c-1),t=".title ."+r,d=$(t);d.removeClass("is-hidden"),d.siblings().addClass("is-hidden")}n.addClass("active"),e=".title ."+l,a=$(e),a.removeClass("is-hidden").removeAttr("href").addClass("active"),a.siblings().addClass("is-hidden")}else e=".title .home",a=$(e),a.removeClass("is-hidden").removeAttr("href").addClass("active"),a.siblings().addClass("is-hidden")}function resetSlides(){var e=$(".slide1");if(0!=e.length){var a,s,l=$(".arrow_left"),c=$(".arrow_right"),n=parseInt($(".projectlength").attr("text")),r=$(".content-slides"),t=$(".details-bg");r.removeClass("active"),t.removeClass("active"),a=getUrlParameter("slide"),a="Null"==a?1:Number(a),1==a?l.addClass("hidden"):l.removeClass("hidden"),a==n?c.addClass("hidden"):c.removeClass("hidden"),s=$(".slide"+a),s.addClass("active"),t.eq(a-1).addClass("active"),t.eq(a-1+n).addClass("active"),setUrlParameter("slide",a),lazyLoad()}}function resetButtons(){var e=$(".arrow_up"),a=$(".arrow_down"),s=$(".cube-container.cube-10"),l=$(".cube-container.cube-11"),c=$(".cube-container.cube-12"),n=$(".cube-container.cube-13"),r=$(".cube-container.cube-14"),t=$(".cube-container.cube-15"),d=s.length/2,o=l.length/2,i=c.length/2,u=n.length/2,b=r.length/2,C=t.length/2;0!=u||0!=b||0!=C?e.removeClass("hidden"):0==u&&0==b&&0==C&&e.addClass("hidden"),0!=d||0!=o||0!=i?a.removeClass("hidden"):0==d&&0==o&&0==i&&a.addClass("hidden")}function loadContent(){var e=$(".content-wrapper"),a=$(".page-wrapper");a.removeClass("load").addClass("loading"),e.removeClass("load").addClass("loading")}function unloadContent(){var e=$(".content-wrapper"),a=$(".page-wrapper");e.removeClass("loading").addClass("unloading"),a.removeClass("loading").addClass("unloading");for(var s=+new Date;+new Date-s<500;);}function getUrlParameter(e){var a,s,l=window.location.search.substring(1),c=l.split("?");for(s=0;s<c.length;s++)if(a=c[s].split("="),a[0]==e)return a[1];return"Null"}function setUrlParameter(e,a){if("Null"!=a){var s,l=(window.location.search.substring(1),getUrlParameter(e)),c="?";s="Null"==l?window.location.href+c+e+"="+a:window.location.href.replace(e+"="+l,e+"="+a),window.history.replaceState("","",s)}}function getLinkParameter(e,a){var s,l,c=$(e).attr("href"),n=c.split("?");for(l=0;l<n.length;l++)if(s=n[l].split("="),s[0]==a)return s[1];return"Null"}function setLinkParameter(e,a,s){var l=$(e).attr("href");if("Null"!=s&&null!=l){var c,n=getLinkParameter(e,a),r="?";c="Null"==n?l+r+a+"="+s:l.replace(a+"="+n,a+"="+s),$(e).attr("href",c)}}var xDown=null,yDown=null;$(window).on("load",function(){watchLanguage(),watchScroll(),watchButtons(),watchSlideButtons(),watchDescriptionToggle(),watchFullToggle(),resetLanguage(),resetNavigation(),resetButtons(),resetSlides(),loadContent(),watchTime()}),$(window).on("beforeunload",function(){unloadContent()});