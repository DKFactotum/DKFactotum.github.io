
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

    if (valueCurrent == "Null") {
        newUrl = window.location.href +sign+param+"="+value;
     }
    else {
        newUrl = window.location.href.replace(param+"="+valueCurrent, param+"="+value);
    };

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
