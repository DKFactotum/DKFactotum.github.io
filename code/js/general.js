function getUrlParameter(r){for(var t,e=window.location.search.substring(1).split("?"),l=0;l<e.length;l++)if((t=e[l].split("="))[0]==r)return t[1];return"Null"}function setUrlParameter(r,t){var e;"Null"!=t&&(window.location.search.substring(1),e="Null"==(e=getUrlParameter(r))?window.location.href+"?"+r+"="+t:window.location.href.replace(r+"="+e,r+"="+t),window.history.replaceState("","",e))}function getLinkParameter(r,t){for(var e,l=$(r).attr("href").split("?"),a=0;a<l.length;a++)if((e=l[a].split("="))[0]==t)return e[1];return"Null"}function setLinkParameter(r,t,e){var l,a=$(r).attr("href");"Null"!=e&&null!=a&&(a="Null"==(l=getLinkParameter(r,t))?a+"?"+t+"="+e:a.replace(t+"="+l,t+"="+e),$(r).attr("href",a))}