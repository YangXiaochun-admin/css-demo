var shine = new Shine(document.getElementById('headline'));

function handleMouseMove(event) {
  shine.light.position.x = event.clientX;
  shine.light.position.y = event.clientY;
  shine.draw();
}

window.addEventListener('mousemove', handleMouseMove, false);