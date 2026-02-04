const projectsData = {
    watermelon: {
        title: "Watermelon",
        images: ["./assets/images/watermelon/watermelon-1.png", "./assets/images/watermelon/watermelon-2.png", "./assets/images/watermelon/watermelon-3.png"]
    },
    calico: {
        title: "Calico",
        images: ["./assets/images/calico/calico-1.png", "./assets/images/calico/calico-2.png"]
    },
    canvas: {
        title: "Canvas",
        images: ["./assets/images/canvas/canvas-1.png", "./assets/images/canvas/canvas-2.png"]
    },
    design: {
        title: "Design",
        images: ["./assets/images/design/design-1.png", "./assets/images/design/design-2.png"]
    },
    board: {
        title: "Board",
        images: ["./assets/images/inspiration/inspiration-1.png", "./assets/images/inspiration/inspiration-2.png"]
    }
};

function showProject(id) {
    const data = projectsData[id];
    const overlay = document.getElementById('project-overlay');
    const content = document.getElementById('overlay-content');

    content.innerHTML = `
        <h2 style="font-family: 'Crimson Text', serif; font-size: 5rem; font-style: italic; margin-bottom: 40px;">${data.title}</h2>
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
