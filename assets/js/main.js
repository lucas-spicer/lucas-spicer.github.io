document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.horizontal-container');
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    // 1. WHEEL TO HORIZONTAL
    window.addEventListener('wheel', (e) => {
        container.scrollLeft += e.deltaY;
    });

    // 2. CURSOR TRACKING
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        outline.animate({
            transform: `translate(${posX - 20}px, ${posY - 20}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. INTERACTIVE EFFECTS
    const interactiveElements = document.querySelectorAll('a, .project-slide, button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform += ' scale(2.5)';
            outline.style.backgroundColor = 'rgba(255,255,255,0.1)';
            outline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = outline.style.transform.replace(' scale(2.5)', '');
            outline.style.backgroundColor = 'transparent';
            outline.style.borderColor = 'rgba(255,255,255,0.4)';
        });
    });

    // 4. NAV CLICK SCROLLING
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                container.scrollTo({
                    left: targetElement.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
    });
});
