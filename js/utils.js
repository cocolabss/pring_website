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

export function galleryCarousel() {
	const modal = document.getElementById('projectModal');
	const carouselContent = document.getElementById('carouselContent');

	const projects = {
		1: [
			{ src: './img/gallery/gallery_1.png', alt: 'Imagen 1' },
			{ src: './img/gallery/gallery_1b.png', alt: 'Imagen 1B' },
			{ src: './img/gallery/gallery_1c.png', alt: 'Imagen 1C' }
		],
		2: [
			{ src: './img/gallery/gallery_2.png', alt: 'Imagen 2' },
			{ src: './img/gallery/gallery_2b.png', alt: 'Imagen 2B' }
		]
	};

	modal.addEventListener('show.bs.modal', (event) => {
		const button = event.relatedTarget;
		const projectId = button.getAttribute('data-project');
		const images = projects[projectId] || [];

		carouselContent.innerHTML = images
			.map(
				(img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img.src}" class="d-block w-100" alt="${img.alt}">
            </div>
        `
			)
			.join('');
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