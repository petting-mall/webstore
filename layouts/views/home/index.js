document.getElementById('radio1').checked = true;
let counter = 1;

setInterval(() => {
  nextImage();
}, 4000);

function nextImage () {
  counter++;
  if (counter > 5) {
    counter = 1;
  }
  document.getElementById('radio' + counter).checked = true;
}