document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        outline.animate({
            transform: `translate(${posX - 20}px, ${posY - 20}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // Add magnetic hover effect to all links and projects
    const interactive = document.querySelectorAll('a, .project-card');
    interactive.forEach(el => {
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
