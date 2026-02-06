const projectsData = {
    watermelon: {
        title: "Watermelon",
        category: "Brand Identity & UI",
        desc: "Visual identity refresh for Watermelon. The project involved completely overhauling the brand, with a new website, logo and visual style across all templates and systems.",
        link: "https://www.watermelonresearch.com/",
        images: [
            "./assets/images/watermelon/watermelon-1.png",
            "./assets/images/watermelon/watermelon-2.png",
            "./assets/images/watermelon/watermelon-3.png",
            "./assets/images/watermelon/watermelon-4.png",
            "./assets/images/watermelon/watermelon-5.png",
            "./assets/images/watermelon/watermelon-6.png"
        ]
    },
    canvas: {
        title: "Canvas",
        category: "Software Build",
        desc: "Full UI / UX and software design for Canvas, our software platform. Responsible for all deisgn decisions and direction of the software, with 3000 users across 30+ markets.",
        link: "https://www.watermelonresearch.com/canvas/",
        images: [
            "./assets/images/canvas/canvas-1.png",
            "./assets/images/canvas/canvas-2.png",
            "./assets/images/canvas/canvas-3.png",
            "./assets/images/canvas/canvas-4.png",
            "./assets/images/canvas/canvas-5.png",
            "./assets/images/canvas/canvas-6.png"
        ]
    },
    calico: {
        title: "Calico",
        category: "Web Creation",
        desc: "Full-scale development and architectural design for the Calico brand. This included brand creation, website build and design templates.",
        link: "https://www.calicoservices.com/",
        images: [
            "./assets/images/calico/calico-1.png",
            "./assets/images/calico/calico-2.png",
            "./assets/images/calico/calico-3.png",
            "./assets/images/calico/calico-4.png",
            "./assets/images/calico/calico-5.png",
            "./assets/images/calico/calico-6.png"
        ]
    },
    motion: {
        title: "Motion",
        category: "Video Render",
        desc: "High-fidelity motion graphics and video renders developed with Adobe After Effects.",
        link: "#",
        images: [], 
        videos: ["1162143854"]
    },
    design: {
        title: "Design",
        category: "Visual Explorations",
        desc: "A collection of ad-hoc visual designs across print and digital media.",
        link: "#",
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
        link: "#",
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
    if (!data) return;

    const overlay = document.getElementById('project-overlay');
    
    // 1. Setup Content
    const linkHTML = (data.link && data.link !== "#") 
        ? `<a href="${data.link}" target="_blank" class="learn-more-link">Learn More</a>` 
        : "";

    const videosHTML = data.videos ? data.videos.map(vId => `
        <div class="video-stage">
            <iframe 
                src="https://player.vimeo.com/video/${vId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                style="width:100%; height:100%;">
            </iframe>
        </div>
    `).join('') : "";

    const imagesHTML = data.images ? data.images.map(img => `
        <img src="${img}" class="gallery-img">
    `).join('') : "";

    // 2. Inject HTML
    overlay.innerHTML = `
        <div class="overlay-sticky-header">
            <div class="sticky-left">
                <h2 class="overlay-title">${data.title}</h2>
                <p class="overlay-category">${data.category}</p>
            </div>
            <button class="close-project-btn" onclick="closeProject()">Back</button>
        </div>

        <div class="overlay-body">
            <div class="project-description">
                <p>${data.desc}</p>
                ${linkHTML}
            </div>
            <div class="gallery">
                ${videosHTML} 
                ${imagesHTML}
            </div>
        </div>
    `;
    
    // 3. Show Overlay & Lock Background Scroll
    overlay.classList.add('active');
    document.body.classList.add('no-scroll'); 
    
    // 4. Reset scroll position of the overlay to top
    overlay.scrollTop = 0;
}

function closeProject() {
    const overlay = document.getElementById('project-overlay');
    overlay.classList.remove('active');
    
    // Unlock background scroll
    document.body.classList.remove('no-scroll');
}
