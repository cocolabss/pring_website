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

    document.querySelectorAll('.button-group .col-4').forEach(col => {
        col.addEventListener('click', function () {
            const button = this.querySelector('button');
            if (button) button.click();
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
            { src: './img/gallery/category_2/3.jpg', alt: 'Imagen 2C' },
            { src: './img/gallery/category_2/2.jpg', alt: 'Imagen 2B' },
            { src: './img/gallery/category_2/1.jpg', alt: 'Imagen 2A' },
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

class StaticCarousel {
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
    this.images = projects[projectId].images;
    this.slidesContainer = container.querySelector('.carousel-slides');
    this.indicatorsContainer = container.querySelector('.carousel-indicators');
    this.currentPage = 0;
    this.autoSlideInterval = null;
    this.slidesPerView = this.getSlidesPerView();
    this.pageStarts = [];
    this.positions = [];
    this.widths = [];
    this.maxStart = 0;
    this.userInteracted = false;
    this.visibleCheckInterval = null;
    this.init();
    this.setupResize();
  }

  getSlidesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  isDesktop() {
    return window.innerWidth > 768;
  }

  getAutoInterval() {
    return 5000 * (this.isDesktop() ? 2 : 1);
  }

  init() {
    this.createSlides();
    this.waitForVisibleThenLayout();
    this.setupEventListeners();
  }

  createSlides() {
    this.slidesContainer.innerHTML = '';
    this.images.forEach((image) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = 'lazy';
      img.style.display = 'block';
      img.style.visibility = 'visible';
      slide.appendChild(img);
      this.slidesContainer.appendChild(slide);
    });
  }

  isVisible() {
    if (!this.container) return false;
    const rects = this.container.getClientRects();
    if (!rects || rects.length === 0) return false;
    const style = getComputedStyle(this.container);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    return this.container.clientWidth > 0 && this.container.clientHeight > 0;
  }

  waitForVisibleThenLayout() {
    const runLayout = () => {
      const imgs = Array.from(this.slidesContainer.querySelectorAll('img'));
      const promises = imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => { img.onload = img.onerror = res; });
      });
      Promise.all(promises).then(() => {
        requestAnimationFrame(() => {
          // aseguramos scroll-smooth por defecto
          this.slidesContainer.style.scrollBehavior = 'smooth';
          // estado inicial: overflow hidden (no scroll visible), usaremos scrollLeft para moverse
          this.slidesContainer.style.overflowX = 'hidden';
          this.computeLayoutWithRetries(4, 100);
        });
      });
    };

    if (this.isVisible()) {
      runLayout();
      return;
    }

    const tabPane = this.container.closest('.tab-pane');
    if (tabPane) {
      const id = tabPane.id;
      const onShown = (e) => {
        if (e && e.target && e.target.id === id) {
          runLayout();
          document.removeEventListener('shown.bs.tab', onShown);
          if (this.visibleCheckInterval) clearInterval(this.visibleCheckInterval);
        }
      };
      document.addEventListener('shown.bs.tab', onShown);
    }

    this.visibleCheckInterval = setInterval(() => {
      if (this.isVisible()) {
        clearInterval(this.visibleCheckInterval);
        runLayout();
      }
    }, 250);
  }

  computeLayoutWithRetries(retries = 3, delay = 120) {
    this.computeLayout();
    const anyZero = this.widths.some(w => !w || w === 0);
    if (anyZero && retries > 0) {
      setTimeout(() => this.computeLayoutWithRetries(retries - 1, delay), delay);
      return;
    }
    if (!this.pageStarts || this.pageStarts.length === 0) this.pageStarts = [0];
    this.createIndicators();
    this.showPage(0, false); // show immediately, sin smooth extra
    this.startAutoSlide();
  }

  computeLayout() {
    const slides = Array.from(this.slidesContainer.children);
    // positions relativas al inicio del slidesContainer
    const baseLeft = this.slidesContainer.getBoundingClientRect().left;
    this.positions = slides.map(s => {
      const r = s.getBoundingClientRect();
      // left relativo
      return Math.max(0, Math.round(r.left - baseLeft + this.slidesContainer.scrollLeft));
    });
    this.widths = slides.map(s => {
      const w = s.offsetWidth || Math.round(s.getBoundingClientRect().width) || 0;
      return w;
    });
    const totalWidth = this.slidesContainer.scrollWidth || (this.positions[this.positions.length - 1] + (this.widths[this.widths.length - 1] || 0));
    const containerWidth = this.container.clientWidth || this.slidesContainer.clientWidth || 0;
    this.totalWidth = totalWidth;
    this.containerWidth = containerWidth;
    this.maxStart = Math.max(0, totalWidth - containerWidth);

    // construir pageStarts: cada slide que pueda ser inicio de página (hasta maxStart)
    this.pageStarts = [];
    for (let i = 0; i < this.positions.length; i++) {
      if (this.positions[i] <= this.maxStart) this.pageStarts.push(i);
    }
    if (this.positions.length > 0) {
      const lastStartIndex = this.positions.findIndex(p => p >= this.maxStart);
      const fallback = lastStartIndex === -1 ? Math.max(0, this.positions.length - 1) : lastStartIndex;
      if (!this.pageStarts.includes(fallback)) this.pageStarts.push(fallback);
    }
    this.pageStarts = Array.from(new Set(this.pageStarts)).sort((a,b) => a-b);
    if (this.pageStarts.length === 0) this.pageStarts = [0];
  }

  createIndicators() {
	// limpiar contenedor de indicadores
	this.indicatorsContainer.innerHTML = '';

	const isMobile = window.innerWidth <= 480;

	// eliminar flechas antiguas en caso de re-render
	this.removeMobileArrows();

	if (isMobile) {
		// crear flechas y añadirlas AL CONTENEDOR PRINCIPAL (this.container)
		const left = document.createElement('button');
		left.className = 'carousel-arrow carousel-arrow-left';
		left.setAttribute('aria-label', 'Anterior');
		left.innerHTML = '&#10094;';

		const right = document.createElement('button');
		right.className = 'carousel-arrow carousel-arrow-right';
		right.setAttribute('aria-label', 'Siguiente');
		right.innerHTML = '&#10095;';

		// añadir al container (no al indicatorsContainer) para que se posicionen respecto al ancho total
		this.container.appendChild(left);
		this.container.appendChild(right);

		left.addEventListener('click', (e) => {
		e.stopPropagation();
		this.onUserInteraction();
		this.showPrev();
		});
		right.addEventListener('click', (e) => {
		e.stopPropagation();
		this.onUserInteraction();
		this.showNext();
		});

		// aún dejamos el area de indicadores para consistencia (puede quedar vacía o con estilo)
		// (si quieres ocultar por completo .carousel-indicators en mobile, lo hacemos por CSS)
	} else {
		const totalPages = Math.max(1, this.pageStarts.length);
		for (let i = 0; i < totalPages; i++) {
		const indicator = document.createElement('span');
		indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
		indicator.dataset.page = i;
		this.indicatorsContainer.appendChild(indicator);
		indicator.addEventListener('click', (e) => {
			e.stopPropagation();
			if (this.getSlidesPerView() === 1) this.onUserInteraction();
			this.showPage(i);
		});
		}
	}
	}

	// helper para eliminar flechas móviles previas
	removeMobileArrows() {
	const existingLeft = this.container.querySelector('.carousel-arrow-left');
	const existingRight = this.container.querySelector('.carousel-arrow-right');
	if (existingLeft) existingLeft.remove();
	if (existingRight) existingRight.remove();
	}

	showPrev() {
	const totalPages = this.pageStarts.length || 1;
	const prev = (this.currentPage - 1 + totalPages) % totalPages;
	this.showPage(prev);
	}

	showNext() {
	const totalPages = this.pageStarts.length || 1;
	const next = (this.currentPage + 1) % totalPages;
	this.showPage(next);
	}

  setupEventListeners() {
    // detener auto-slide en desktop al hover
    this.container.addEventListener('mouseenter', () => {
      if (this.isDesktop()) this.stopAutoSlide();
    });
    this.container.addEventListener('mouseleave', () => {
      if (this.isDesktop()) this.startAutoSlide();
    });

    // interacción táctil/pointer para mobile -> activar modo scroll
    this.slidesContainer.addEventListener('touchstart', () => this.onUserInteraction(), { passive: true });
    this.slidesContainer.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') this.onUserInteraction();
    });

    // click en imagen en mobile cuenta como interacción
    this.slidesContainer.addEventListener('click', (e) => {
      if (this.getSlidesPerView() === 1) this.onUserInteraction();
    });

    // si hay scroll nativo, actualizar indicadores
    this.slidesContainer.addEventListener('scroll', () => {
      if (this.slidesContainer.style.overflowX === 'auto') this.updateIndicatorsForScroll();
    }, { passive: true });
  }

  updateIndicatorsForScroll() {
    const scrollLeft = this.slidesContainer.scrollLeft || 0;
    let page = 0;
    for (let i = 0; i < this.pageStarts.length; i++) {
      const idx = this.pageStarts[i];
      if ((this.positions[idx] || 0) <= scrollLeft + (this.containerWidth * 0.2)) page = i;
    }
    const indicators = Array.from(this.indicatorsContainer.children);
    indicators.forEach((el, i) => el.classList.toggle('active', i === page));
    this.currentPage = page;
  }

  onUserInteraction() {
    if (this.userInteracted) return;
    if (this.getSlidesPerView() === 1) {
      this.userInteracted = true;
      this.stopAutoSlide();

      // convertir transform actual (si existiera) a scrollLeft de forma segura
      const transform = this.slidesContainer.style.transform || '';
      const m = transform.match(/translate3d\((-?\d+\.?\d*)px/);
      const px = m ? Math.abs(Math.round(parseFloat(m[1]))) : (this.slidesContainer.scrollLeft || 0);
      this.slidesContainer.style.transform = '';
      this.slidesContainer.scrollLeft = px;

      // activar scroll nativo y scroll-snap para swipes
      this.slidesContainer.style.transition = 'none';
      this.slidesContainer.style.overflowX = 'auto';
      this.slidesContainer.style.scrollSnapType = 'x mandatory';
      this.slidesContainer.style.webkitOverflowScrolling = 'touch';
      this.slidesContainer.classList.add('user-interacting');
      Array.from(this.slidesContainer.children).forEach(s => s.style.scrollSnapAlign = 'start');

      // recalcular layout para que positions correspondan al scrollLeft
      setTimeout(() => this.computeLayoutWithRetries(2, 80), 120);
    } else {
      // tablet/desktop -> solo pausamos auto-slide
      this.userInteracted = true;
      this.stopAutoSlide();
    }
  }

  // único lugar que mueve la vista: scrollToPosition
  scrollToPosition(px, smooth = true) {
    const left = Math.min(Math.max(0, Math.round(px)), this.maxStart || 0);
    try {
      this.slidesContainer.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
    } catch (e) {
      // fallback simple
      this.slidesContainer.scrollLeft = left;
    }
    // actualizar indicadores visualmente
    const indicators = Array.from(this.indicatorsContainer.children);
    // encontrar la página actual
    let page = 0;
    for (let i = 0; i < this.pageStarts.length; i++) {
      const idx = this.pageStarts[i];
      if ((this.positions[idx] || 0) <= left + (this.containerWidth * 0.2)) page = i;
    }
    indicators.forEach((el, i) => el.classList.toggle('active', i === page));
    this.currentPage = page;
  }

  showPage(pageIndex, smooth = true) {
    const totalPages = this.pageStarts.length || 1;
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex >= totalPages) pageIndex = totalPages - 1;
    const startSlideIndex = this.pageStarts[pageIndex] || 0;
    const targetPos = Math.min(this.positions[startSlideIndex] || 0, this.maxStart);
    this.scrollToPosition(targetPos, smooth);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    if (this.userInteracted && this.getSlidesPerView() === 1) return;
    const totalPages = this.pageStarts.length || 1;
    if (totalPages <= 1) return;
    const interval = this.getAutoInterval();
    this.autoSlideInterval = setInterval(() => {
      const next = (this.currentPage + 1) % totalPages;
      this.showPage(next);
    }, interval);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  setupResize() {
    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.slidesPerView = this.getSlidesPerView();
        if (!this.userInteracted) {
          this.slidesContainer.style.overflowX = 'hidden';
          this.slidesContainer.style.transition = '';
          this.slidesContainer.style.scrollSnapType = 'none';
          this.slidesContainer.classList.remove('user-interacting');
          Array.from(this.slidesContainer.children).forEach(s => s.style.scrollSnapAlign = '');
        }
        this.computeLayoutWithRetries(3, 100);
      }, 220);
    });
  }
}

export function galleryCarousel() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    carouselContainers.forEach(container => {
        const projectId = container.getAttribute('data-project');
        if (projects[projectId]) new StaticCarousel(container, projectId);
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

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_MAX = 30;
  let idCounter = 0;
  const nodes = Array.from(document.querySelectorAll('p.read-more'));

  nodes.forEach(p => {
    const raw = p.textContent.trim();
    const max = Number(p.dataset.maxWords) || DEFAULT_MAX;
    if (!raw) return;
    const words = raw.split(/\s+/);
    if (words.length <= max) return;

    const shortText = words.slice(0, max).join(' ') + '...';
    const fullText = raw;

    const shortSpan = document.createElement('span');
    shortSpan.className = 'short';
    shortSpan.textContent = shortText;

    const fullSpan = document.createElement('span');
    fullSpan.className = 'full';
    fullSpan.textContent = fullText;

    p.innerHTML = '';
    p.appendChild(shortSpan);
    p.appendChild(fullSpan);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'read-more-toggle';
    toggle.textContent = 'Ver más';
    const uid = `readmore-${++idCounter}`;
    toggle.id = uid;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', uid + '-txt');

    const hiddenSpan = document.createElement('span');
    hiddenSpan.id = uid + '-txt';
    hiddenSpan.style.display = 'none';
    p.appendChild(hiddenSpan);

    p.appendChild(toggle);

    toggle.addEventListener('click', () => {
      const expanded = p.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Ver menos' : 'Ver más';
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
});
