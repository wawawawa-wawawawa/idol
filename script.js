function openMenu() {
    const menu = document.getElementById("menu");
    if (menu) menu.classList.add("active");
}

function closeMenu() {
    const menu = document.getElementById("menu");
    if (menu) menu.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const menuLinks = menu ? menu.querySelectorAll("a") : [];

    menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    const revealItems = document.querySelectorAll(
        ".section-title, .news-item, .news-list, .member-card, .music-card, .goods-card, .schedule-item, .next-live, .concept-section, .page-hero"
    );

    revealItems.forEach((item) => {
        item.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
});