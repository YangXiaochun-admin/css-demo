/*
/ Initialize the plugin.
/ You can set the opacity of the figcaption
/ You can also change the color of the
/ Light and dark text.
/ 
/ The light text will automatically appear
/ on a dark figcaption, and vice versa.
*/

$(function() {
  $('.adaptive-slider').adaptiveSlider({
    opacity: 0.7,
    normalizedTextColors: {
      light: '#f1f1f1',
      dark: '#222'
    }
  });
});