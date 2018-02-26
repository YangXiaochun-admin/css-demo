document.addEventListener('click', function (ev) {
  var el = ev.target;
  
  if (el.tagName.toLowerCase() == 'a') {
    el.classList.toggle('active');
  }
});