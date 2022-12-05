const menuIcon = document.querySelector('.menu-icon');
const menuNav = document.querySelector('.menu-nav');

menuIcon.addEventListener('click', () => {
  if (menuNav.style.display === 'block') {
    menuNav.style.display = 'none';
  } else {
    menuNav.style.display = 'block';
  }
});
