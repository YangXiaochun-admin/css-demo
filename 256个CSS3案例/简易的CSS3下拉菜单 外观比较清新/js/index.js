$(document).ready(function()
{
  var cog = $('#cog'),
      menu = $('.menu');

  cog.on('click', function()
  {
    menu.fadeToggle('fast');
  });
});