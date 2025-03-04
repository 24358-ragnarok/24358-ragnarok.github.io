const template = {
    head: `
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <!-- Analytics -->
        <script defer src="https://cloud.umami.is/script.js" data-website-id="17c922fe-9bee-4f77-afcf-dca4c73cada4"></script>
        
        <!-- Favicons -->
        <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        
        <!-- Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        
        <!-- Custom Styles -->
        <link rel="stylesheet" href="styles.css" />
        <script src="js/common.js"></script>
    `,

    nav: `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">
                    <span class="team-number">24358</span>
                    <span class="team-name">Ragnarok</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        ${["home", "about", "achievements", "robots", "contact"]
                            .map(
                                (section) => `
                            <li class="nav-item">
                                <a class="nav-link" href="${
                                    window.location.pathname.includes(
                                        "index.html"
                                    )
                                        ? `#${section}`
                                        : `index.html#${section}`
                                }">${
                                    section.charAt(0).toUpperCase() +
                                    section.slice(1)
                                }</a>
                            </li>
                        `
                            )
                            .join("")}
                        <li class="nav-item">
                            <a class="nav-link" href="members.html">Members</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="results.html">Results</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,

    footer: `
        <footer>
            <div class="container">
                <p>&copy; 2025 Ragnarok. All rights reserved.</p>
                <button type="button" class="btn btn-sm" id="btn-back-to-top">
                    <i class="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
        
        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    `,

    injectTemplates: function () {
        // Inject head elements
        const headContent = document
            .createRange()
            .createContextualFragment(this.head);
        document.head.appendChild(headContent);

        // Inject navigation
        const navPlaceholder = document.getElementById("nav-placeholder");
        if (navPlaceholder) {
            navPlaceholder.outerHTML = this.nav;
        }

        // Inject footer
        const footerPlaceholder = document.getElementById("footer-placeholder");
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = this.footer;
        }

        // Enhanced active link logic
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";
        const currentHash = window.location.hash;

        if (currentPage === "index.html" && currentHash) {
            const activeLink = document.querySelector(
                `.nav-link[href="${currentHash}"]`
            );
            if (activeLink) activeLink.classList.add("active-link");
        } else {
            const activeLink = document.querySelector(
                `.nav-link[href="${currentPage}"]`
            );
            if (activeLink) activeLink.classList.add("active-link");
        }

        // Initialize Bootstrap components after navbar injection
        const navbarToggler = document.querySelector(".navbar-toggler");
        if (navbarToggler) {
            navbarToggler.addEventListener("click", function () {
                const targetId =
                    this.getAttribute("data-bs-target").substring(1);
                const collapseElement = document.getElementById(targetId);
                if (collapseElement) {
                    collapseElement.classList.toggle("show");
                }
            });
        }

        // Close menu when clicking a link (mobile)
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
        const menuToggle = document.getElementById("navbarNav");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (menuToggle.classList.contains("show")) {
                    menuToggle.classList.remove("show");
                }
            });
        });
    },
};

// Initialize templates when DOM is loaded
document.addEventListener("DOMContentLoaded", () => template.injectTemplates());
