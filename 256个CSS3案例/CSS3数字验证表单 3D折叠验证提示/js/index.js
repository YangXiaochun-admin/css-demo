/**
* Credits
*
* http://google.com/fonts
** Thanks for supplying the beautiful fonts!
*
* http://subtlepatterns.com/
** Thanks for the texture!
*/
var ADION = (function( $, exports, window, document, undefined ) {
  
  exports.InlineValidator = function( selector ) {
    var
      DEFAULT_REGEX = /^\S+$/, // non-whitespace
      selector = selector || '.validate-me',
      $fields = $(selector),
      $form = $($fields[0].form); // !!! assumes all field belong to the same form
 
    // listen for 'submit' and validate
    $form.on('submit', function( e ) {
      e.preventDefault();

      $fields.each(function() {
        var
          $field = $(this).removeClass('valid invalid validated'),
          $pseudo = $field.next('.pseudo-input'),
          $pseudoContent = $pseudo.find('.pseudo-content'),
          regex = $field.data('pattern') ? new RegExp($field.data('pattern')) : DEFAULT_REGEX,
          validTimeoutId = $field.data('timeoutId');

        // regex matches; mark as valid
        if( regex.test($field.val()) ) {
          $field.addClass('valid');
          $pseudoContent.text('All good, playa\'!');
          
          window.clearTimeout(validTimeoutId);
          
          // dismiss automatically after X seconds
          $field.data('timeoutId', window.setTimeout(function() {
            $field.removeClass('validated');
          }, 3000));
        }
        
        // regex doesn't match; mark as invalid
        else {
          $field.addClass('invalid');
          $pseudoContent.text('Please fix your input!');
          
          // dismiss manually
          $pseudo.one('click', function() {
            $field.removeClass('validated').focus();
          });
        }
        
        // mark as validated
        $field.addClass('validated');
      });
    });
  };
  
  // auto-init
  $(function() { new exports.InlineValidator(); });  
  
  return exports;
}(Zepto, ADION || {}, this, document));