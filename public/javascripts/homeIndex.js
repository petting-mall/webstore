// Import
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

// Functions
function resetCarouselStyle() {
  // Reset Images Style
  carouselImages.forEach(image => {
    image.style.opacity = 0;
    image.style.zIndex = 0;
  });
  // Reset Button Style
  carouselButtons.forEach(button => {
    button.style.backgroundColor = 'transparent';
  });
}

function carouselImageSelector() {
  resetCarouselStyle();
  if (carouselIndex < 0 || carouselIndex >= carouselImages.length) carouselIndex = 0;
  carouselImages[carouselIndex].style.opacity = 1;
  carouselImages[carouselIndex].style.zIndex = 1;
  carouselButtons[carouselIndex].style.backgroundColor = 'var(--primary-color)';
}

function carouselAutoShow() {
  carouselIntervalId = setInterval(function () {
    carouselIndex++;
    carouselImageSelector();
  }, 3000);
}

// Control variables
let carouselIndex = 0;
let carouselIntervalId;
// Set carousel control buttons
const carouselImages = document.querySelectorAll('.carousel-img');
const carouselButtonContainer = document.querySelector('.carousel-btn-container');
for (let i = 0; i < carouselImages.length; i++) {
  carouselButtonContainer.innerHTML += `<li><span>${i}</span></li>`;
}
const carouselButtons = document.querySelectorAll('.carousel-btn-container li');
carouselButtons.forEach(button => {
  button.addEventListener('click', function () {
    carouselIndex = Number(this.firstElementChild.textContent) || 0;
    carouselImageSelector();
  });
});
// Start carousel auto show
carouselImageSelector();
carouselAutoShow();
// Stop-restart auto show
const carouselSlider = document.querySelector('.carousel-slider');
carouselSlider.addEventListener('mouseover', () => {
  clearInterval(carouselIntervalId);
});
carouselSlider.addEventListener('mouseout', () => {
  carouselAutoShow();
});

// Swiper
const swiper = new Swiper('.slide-content', {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 2
    },
    950: {
      slidesPerView: 3
    }
  }
});
