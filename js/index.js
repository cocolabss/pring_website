import { setupTabs, handleButtons, galleryCarousel, submitForm } from './utils.js';

baguetteBox.run('.tz-gallery');
baguetteBox.run('#carouselGallery');

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;
  setTimeout(() => {
    loadingScreen.classList.add('hidden-loader');
    setTimeout(() => {
      if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 600); 
  }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    handleButtons();
	  galleryCarousel();
});

document.getElementById("contactForm").addEventListener("submit", submitForm);