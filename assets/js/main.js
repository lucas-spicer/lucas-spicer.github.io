const projectsData = {
    watermelon: {
        title: "Watermelon",
        category: "Brand Identity & UI",
        desc: "A fresh take on digital branding...",
        images: ["./assets/images/watermelon/watermelon-1.png", "./assets/images/watermelon/watermelon-2.png", "./assets/images/watermelon/watermelon-3.png", "./assets/images/watermelon/watermelon-4.png"]
    },
    calico: {
        title: "Calico",
        category: "Web Creation",
        desc: "Responsive web design and architecture...",
        images: ["./assets/images/calico/calico-1.png", "./assets/images/calico/calico-2.png", "./assets/images/calico/calico-3.png"]
    },
    canvas: {
        title: "Canvas",
        category: "Software Build",
        desc: "SaaS platform interface design...",
        images: ["./assets/images/canvas/canvas-1.png", "./assets/images/canvas/canvas-2.png", "./assets/images/canvas/canvas-3.png"]
    },
    design: {
        title: "Design",
        category: "Visual Explorations",
        desc: "A collection of ad-hoc visual projects...",
        images: ["./assets/images/design/design-1.png", "./assets/images/design/design-2.png", "./assets/images/design/design-3.png"]
    },
    board: {
        title: "Board",
        category: "Curation & Mood",
        desc: "Visual research and moodboard curation...",
        images: ["./assets/images/inspiration/inspiration-1.png", "./assets/images/inspiration/inspiration-2.png", "./assets/images/inspiration/inspiration-3.png"]
    }
};

function showProject(id) {
    const data = projectsData[id];
    const overlay = document.getElementById('project-detail-overlay');
    const content = document.getElementById('detail-content');

    content.innerHTML = `
        <div class="detail-info">
            <h2 class="serif-title">${data.title}</h2>
            <p class="category" style="opacity:0.4; text-transform:uppercase; font-size:0.7rem; margin-bottom:20px;">${data.category}</p>
            <p>${data.desc}</p>
        </div>
        <div class="detail-gallery">
            ${data.images.map(img => `<img src="${img}" onclick="openLightbox('${img}')">`).join('')}
        </div>
    `;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    document.getElementById('project-detail-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.classList.add('active');
}

// Global Cursor and Navigation
document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        outline.animate({ transform: `translate(${e.clientX - 20}px, ${e.clientY - 20}px)` }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => outline.style.transform += ' scale(2.5)');
        el.addEventListener('mouseleave', () => outline.style.transform = outline.style.transform.replace(' scale(2.5)', ''));
    });
});
