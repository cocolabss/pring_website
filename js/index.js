import { setupTabs, handleButtons, submitForm } from './utils.js';

baguetteBox.run('.tz-gallery');
baguetteBox.run('#carouselGallery');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden-loader');
    }, 5000); 
});

document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    handleButtons();
});

document.getElementById("contactForm").addEventListener("submit", submitForm);