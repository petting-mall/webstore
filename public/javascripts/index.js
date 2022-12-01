document.getElementById('radio1').checked = true;
let counter = 1;
const menuIcon = document.querySelector('#menu-icon');
const menunav = document.getElementById('menunav');

setInterval(() => {
  nextImage();
}, 4000);

function nextImage() {
  counter++;
  if (counter > 5) {
    counter = 1;
  }
  document.getElementById('radio' + counter).checked = true;
}

menuIcon.addEventListener('click', () => {
  if (menunav.style.display === 'block') {
    menunav.style.display = 'none';
  } else {
    menunav.style.display = 'block';
  }
});

// function onClickMenu(){
//   document.getElementById("menu").classList.toggle("change");
//   document.getElementById("menunav").classList.toggle("change");
//   document.getElementById("menu-bg").classList.toggle("change-bg");
// }
