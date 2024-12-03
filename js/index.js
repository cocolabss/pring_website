import { setupTabs, initializeButtonGroupHandler, submitForm } from './utils.js';

baguetteBox.run('.tz-gallery');
baguetteBox.run('#carouselGallery');

document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
});

document.addEventListener('DOMContentLoaded', () => {
    initializeButtonGroupHandler();
});

// document.getElementById("contactForm").addEventListener("submit", submitForm);