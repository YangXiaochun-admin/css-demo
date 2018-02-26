$(document).ready(function()
{
  var settings = $('#settings'),
      menu = $('#menu');

  settings.on('click', function()
  {
    menu.fadeToggle('fast');
  });
});