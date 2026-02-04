const projectsData = {
    watermelon: {
        title: "Watermelon",
        category: "Brand Identity & UI",
        desc: "Visual identity refresh for Watermelon. The project involved completely overhauling the brand, with a new website, logo and visual style across all templates and systems.",
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
        desc: "Full-scale development and architectural design for the Calico brand. This included brand creation, website build and design templates.",
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
        desc: "Full UI / UX and software design for Canvas, our software platform. Responsible for all deisgn decisions and direction of the software, with 3000 users across 30+ markets.",
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
        desc: "A collection of ad-hoc visual designs across print and digital media.",
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
        desc: "Visual research and moodboard curation.",
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
