var $last = $('.progress-radial').last();

setInterval(function(){
  var currentClass = $last.attr('class').split(' ')[1];
  var currentPercentage = currentClass.substring(9,12);
  var newPercentage = (parseInt(currentPercentage) + 1);
  if (newPercentage > 100) {
    newPercentage = 1;
  }
  var newClass = 'progress-' + newPercentage;
  $last.removeClass(currentClass).addClass(newClass);
},1000);