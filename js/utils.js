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