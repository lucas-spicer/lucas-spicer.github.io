document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.horizontal-container');
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    // 1. CONVERT VERTICAL SCROLL TO HORIZONTAL
    window.addEventListener('wheel', (e) => {
        // This makes your mouse wheel move the page sideways
        container.scrollLeft += e.deltaY;
    }, { passive: true });

    // 2. NAVIGATION LINK LOGIC (The fix for your clicks)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll the container to the left position of the target section
                container.scrollTo({
                    left: targetSection.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. CURSOR MOVEMENT
    window.addEventListener('mousemove', (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        outline.animate({
            transform: `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
        }, { duration: 400, fill: "forwards" });
    });

    // 4. CURSOR HOVER EFFECTS
    document.querySelectorAll('a, .project-slide').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform += ' scale(2.5)';
            outline.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = outline.style.transform.replace(' scale(2.5)', '');
            outline.style.backgroundColor = 'transparent';
        });
    });
});
