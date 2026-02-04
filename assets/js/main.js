const projectsData = {
    watermelon: {
        title: "Watermelon",
        category: "Brand Identity & UI",
        desc: "Visual identity for a digital-first platform focused on vibrant, organic growth. The project involved creating a modular design system that could scale across web and mobile interfaces.",
        images: [
            "./assets/images/watermelon/watermelon-1.png",
            "./assets/images/watermelon/watermelon-2.png",
            "./assets/images/watermelon/watermelon-3.png",
            "./assets/images/watermelon/watermelon-4.png",
            "./assets/images/watermelon/watermelon-5.png",
            "./assets/images/watermelon/watermelon-6.png"
        ]
    },
    calico: {
        title: "Calico",
        category: "Web Creation",
        desc: "Full-scale development and architectural design for the Calico ecosystem. This included a custom CMS integration and a highly responsive front-end built for speed and accessibility.",
        images: [
            "./assets/images/calico/calico-1.png",
            "./assets/images/calico/calico-2.png",
            "./assets/images/calico/calico-3.png",
            "./assets/images/calico/calico-4.png",
            "./assets/images/calico/calico-5.png",
            "./assets/images/calico/calico-6.png"
        ]
    },
    canvas: {
        title: "Canvas",
        category: "Software Build",
        desc: "Interface architecture and user flow design for the Canvas SaaS platform. Focused on reducing cognitive load for power users while maintaining a minimalist aesthetic.",
        images: [
            "./assets/images/canvas/canvas-1.png",
            "./assets/images/canvas/canvas-2.png",
            "./assets/images/canvas/canvas-3.png",
            "./assets/images/canvas/canvas-4.png",
            "./assets/images/canvas/canvas-5.png",
            "./assets/images/canvas/canvas-6.png"
        ]
    },
    design: {
        title: "Design",
        category: "Visual Explorations",
        desc: "A collection of ad-hoc visual experiments across print and digital media, exploring typography, grid systems, and color theory.",
        images: [
            "./assets/images/design/design-1.png",
            "./assets/images/design/design-2.png",
            "./assets/images/design/design-3.png",
            "./assets/images/design/design-4.png",
            "./assets/images/design/design-5.png"
        ]
    },
    board: {
        title: "Board",
        category: "Curation & Mood",
        desc: "Visual research and moodboard curation for upcoming 2024-2025 design trends. This board serves as the foundational inspiration for multiple active projects.",
        images: [
            "./assets/images/inspiration/inspiration-1.png",
            "./assets/images/inspiration/inspiration-2.png",
            "./assets/images/inspiration/inspiration-3.png",
            "./assets/images/inspiration/inspiration-4.png",
            "./assets/images/inspiration/inspiration-5.png",
            "./assets/images/inspiration/inspiration-6.png",
            "./assets/images/inspiration/inspiration-7.png"
        ]
    }
};

function showProject(id) {
    const data = projectsData[id];
    const overlay = document.getElementById('project-overlay');
    const content = document.getElementById('overlay-content');

    content.innerHTML = `
        <div style="margin-bottom: 60px;">
            <h2 style="font-family: 'Crimson Text', serif; font-size: 4rem; font-style: italic; font-weight: 400;">${data.title}</h2>
            <p style="text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; opacity: 0.4; margin: 10px 0 20px;">${data.category}</p>
            <p style="font-size: 1.1rem; line-height: 1.6; max-width: 600px;">${data.desc}</p>
        </div>
        <div class="gallery">
            ${data.images.map(img => `<img src="${img}" class="gallery-img">`).join('')}
        </div>
    `;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    document.getElementById('project-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}
