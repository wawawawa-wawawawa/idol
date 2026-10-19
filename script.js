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

    const categoryButtons = document.querySelectorAll(".categories [data-category]");
    const newsItems = document.querySelectorAll(".news-list[data-category]");

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.category;

            categoryButtons.forEach((categoryButton) => {
                categoryButton.setAttribute(
                    "aria-pressed",
                    String(categoryButton === button)
                );
            });

            newsItems.forEach((item) => {
                item.hidden = selectedCategory !== "ALL" && item.dataset.category !== selectedCategory;
            });
        });
    });

    const memberTrack = document.querySelector(".member-track");
    const memberCards = memberTrack ? memberTrack.querySelectorAll(".member-card") : [];

    if (memberTrack && memberCards.length > 0) {
        let currentMember = 0;

        const showMember = (activeIndex) => {
            memberCards.forEach((card, index) => {
                const isActive = index === activeIndex;
                card.classList.toggle("is-active", isActive);
                card.setAttribute("aria-hidden", String(!isActive));
            });
        };

        showMember(currentMember);

        if (memberCards.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.setInterval(() => {
                currentMember = (currentMember + 1) % memberCards.length;
                showMember(currentMember);
            }, 4000);
        }
    }

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