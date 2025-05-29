export function setupTabs() {
    const $tabs = $(`.nav-pills a[data-toggle="pill"]`);

    $tabs.on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $tabs.on('shown.bs.tab', function (e) {
        const target = $(e.target).attr('href');
    });
}

export function handleButtons() {
    document.querySelectorAll('.button-group button').forEach(button => {
        button.addEventListener('click', function () {
            const contentId = this.getAttribute('data-content');

            document.querySelectorAll('.services-info-content .content').forEach(content => {
                content.classList.add('hidden');
            });

            const contentElement = document.getElementById(contentId);
            if (contentElement) {
                contentElement.classList.remove('hidden');
            }

            const container = document.getElementById("contentContainer");
            container.classList.remove("bg-color-1", "bg-color-2", "bg-color-3");

            switch (contentId) {
                case 'arquitectura':
                case 'arquitectura-mobile':
                    container.classList.add("bg-color-1");
                    break;
                case 'electrica':
                case 'electrica-mobile':
                    container.classList.add("bg-color-2");
                    break;
                case 'costos':
                case 'costos-mobile':
                    container.classList.add("bg-color-3");
                    break;
            }
        });
    });
}

export function handleScroll() {
	const scrollBackBtn = document.getElementById("scroll-back-btn");
	const scrollNextBtn = document.getElementById("scroll-next-btn");

	function isMobile() {
		return window.innerWidth <= 768;
	}

	if (isMobile()) {
		scrollBackBtn.style.display = "none";
		scrollNextBtn.style.display = "none";
		return;
	}

	function checkNavigationButtons() {
		const activeLink = document.querySelector('.nav-link.active');
		const nextLink = activeLink.closest('li').nextElementSibling;
		const prevLink = activeLink.closest('li').previousElementSibling;

		scrollNextBtn.style.visibility = nextLink ? "visible" : "hidden";
		scrollBackBtn.style.visibility = prevLink ? "visible" : "hidden";
	}

	function getNextSection() {
		const activeLink = document.querySelector('.nav-link.active');
		const nextLink = activeLink.closest('li').nextElementSibling;
		if (nextLink) {
			const nextTab = nextLink.querySelector('.nav-link');
			return nextTab.getAttribute('href').substring(1);
		}
		return null;
	}

	function getPreviousSection() {
		const activeLink = document.querySelector('.nav-link.active');
		const prevLink = activeLink.closest('li').previousElementSibling;
		if (prevLink) {
			const prevTab = prevLink.querySelector('.nav-link');
			return prevTab.getAttribute('href').substring(1);
		}
		return null;
	}

	scrollNextBtn.addEventListener("click", function () {
		const nextSectionId = getNextSection();
		if (nextSectionId) {
			const nextTab = document.querySelector(`#pills-tab a[href="#${nextSectionId}"]`);
			if (nextTab) {
				const tab = new bootstrap.Tab(nextTab);
				tab.show();
				checkNavigationButtons();
			}
		}
	});

	scrollBackBtn.addEventListener("click", function () {
		const prevSectionId = getPreviousSection();
		if (prevSectionId) {
			const prevTab = document.querySelector(`#pills-tab a[href="#${prevSectionId}"]`);
			if (prevTab) {
				const tab = new bootstrap.Tab(prevTab);
				tab.show();
				checkNavigationButtons();
			}
		}
	});

	checkNavigationButtons();
}


const projects = {
	1: {
		title: 'Juan Valdez - Plaza de las Américas',
		images: [
			{ src: './img/gallery/category_1/1.jpeg', alt: 'Imagen 1A' },
			{ src: './img/gallery/category_1/2.jpeg', alt: 'Imagen 1B' },
			{ src: './img/gallery/category_1/3.jpeg', alt: 'Imagen 1C' },
			{ src: './img/gallery/category_1/4.jpeg', alt: 'Imagen 1D' },
			{ src: './img/gallery/category_1/5.jpeg', alt: 'Imagen 1E' },
		]
	},
	2: {
		title: 'Tus Oficinas - Edificio Elemento',
		images: [
			{ src: './img/gallery/category_2/1.jpg', alt: 'Imagen 2A' },
			{ src: './img/gallery/category_2/2.jpg', alt: 'Imagen 2B' },
			{ src: './img/gallery/category_2/3.jpg', alt: 'Imagen 2C' },
			{ src: './img/gallery/category_2/4.jpg', alt: 'Imagen 2D' },
			{ src: './img/gallery/category_2/5.jpg', alt: 'Imagen 2E' },
		]
	},
	3: {
		title: 'La Hipotecaria - Av El Dorado',
		images: [
			{ src: './img/gallery/category_3/1.jpeg', alt: 'Imagen 3A' },
			{ src: './img/gallery/category_3/2.jpeg', alt: 'Imagen 3B' },
			{ src: './img/gallery/category_3/3.jpg', alt: 'Imagen 3C' }
		]
	},
	4: {
		title: 'López & Sohm - Edificio Coasmedas',
		images: [
			{ src: './img/gallery/category_4/1.jpeg', alt: 'Imagen 4A' },
			{ src: './img/gallery/category_4/2.jpeg', alt: 'Imagen 4B' },
			{ src: './img/gallery/category_4/3.jpeg', alt: 'Imagen 4C' },
			{ src: './img/gallery/category_4/4.jpeg', alt: 'Imagen 4D' },
			{ src: './img/gallery/category_4/5.jpeg', alt: 'Imagen 4E' },
			{ src: './img/gallery/category_4/6.jpeg', alt: 'Imagen 4F' },
			{ src: './img/gallery/category_4/7.jpeg', alt: 'Imagen 4G' },
		]
	}
};

class InfiniteCarousel {
            constructor(container, projectId) {
                this.container = container;
                this.projectId = projectId;
                this.images = projects[projectId].images;
                this.track = container.querySelector('.carousel-track');
                this.indicatorsContainer = container.querySelector('.carousel-indicators');
                
                this.init();
            }

            init() {
                this.createInfiniteSlides();
                this.createIndicators();
                this.setAnimationDuration();
            }

            createInfiniteSlides() {
                this.track.innerHTML = '';
                
                // Duplicar las imágenes para crear el efecto infinito
                const allImages = [...this.images, ...this.images];
                
                allImages.forEach((image, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'carousel-slide';
                    slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
                    this.track.appendChild(slide);
                });
            }

            createIndicators() {
                this.indicatorsContainer.innerHTML = '';
                this.images.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    this.indicatorsContainer.appendChild(indicator);
                });
            }

            setAnimationDuration() {
                // Ajustar la duración basada en el número de imágenes
                const duration = this.images.length * 3; // 3 segundos por imagen
                this.track.style.animationDuration = `${duration}s`;
            }
        }


export function galleryCarousel() {
	const carouselContainers = document.querySelectorAll('.carousel-container');
            
            carouselContainers.forEach(container => {
                const projectId = container.getAttribute('data-project');
                if (projects[projectId]) {
                    new InfiniteCarousel(container, projectId);
                }
            });
}


export function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;

    console.log("Formulario enviado:", { name, email, phone, country });

    document.getElementById("contactForm").reset();
    alert("Formulario enviado con éxito.");
}