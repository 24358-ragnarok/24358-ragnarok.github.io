document.addEventListener("DOMContentLoaded", function () {
    // Scroll to top button functionality
    const scrollButton = document.getElementById("btn-back-to-top");
    if (scrollButton) {
        window.onscroll = function () {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                scrollButton.style.display = "block";
            } else {
                scrollButton.style.display = "none";
            }
        };

        scrollButton.addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(51, 51, 51, 0.95)";
        } else {
            navbar.style.background = "var(--gear-gray)";
        }
    });

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
    });
});
