$(document).ready(function() {
  var preText = $('#paperTempleText').text();
  var newText;
  
  for (char in preText) {
    preText = '';
  }
  
  setTimeout(function() {
    $('#paperTempleText').fadeIn(500);
  },4000);
});