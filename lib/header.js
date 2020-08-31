window.onload = function() {
  var registerEl = document.getElementById("register-cta");
  registerEl.setAttribute("href", "https://analytics.vot-er.org/r/turbovote" + buildQueryString("?ref"))
  var absenteeEl = document.getElementById("absentee-cta");
  absenteeEl.setAttribute("href", "https://analytics.vot-er.org/r/voteorg" + buildQueryString("?ref"))
}

function buildQueryString(key) {
  var value = getQueryVariable("ref")
  if(!value) return "";
  return key + "=" + value
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null
}