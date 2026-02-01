const projectOrder = ['work', 'watermelon', 'calico', 'canvas', 'design', 'board'];
let currentProjectIndex = 0;

const lockedImages = {
    watermelon: "./assets/images/watermelon/watermelon-1.png",
    calico: "./assets/images/calico/calico-1.png",
    canvas: "./assets/images/canvas/canvas-1.png",
    design: "./assets/images/design/design-1.png",
    board: "./assets/images/inspiration/inspiration-1.png"
};

let xDown = null;

function handleTouchStart(evt) { 
    xDown = evt.touches[0].clientX; 
}

function handleTouchEnd(evt, projectId) {
    if (!xDown) return;
    let xUp = evt.changedTouches[0].clientX;
    let xDiff = xDown - xUp;
    if (Math.abs(xDiff) > 50) { 
        const thumbs = Array.from(document.querySelector(`#${projectId} .vertical-thumbs`).querySelectorAll('img'));
        const featuredImg = document.getElementById(`featured-${projectId}`);
        let idx = thumbs.findIndex(t => t.src === featuredImg.src);
        if (xDiff > 0) { idx = (idx + 1) % thumbs.length; } 
        else { idx = (idx - 1 + thumbs.length) % thumbs.length; }
        lockImage(projectId, thumbs[idx]);
    }
    xDown = null;
}

function showSection(sectionId) {
    // 1. Standard section switching logic
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active-section'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active-section');

    // 2. Identify utility pages
    const utilityPages = ['work', 'about', 'contact'];
    const isProject = !utilityPages.includes(sectionId);

    // 3. Toggle the class on the body
    if (isProject) {
        document.body.classList.add('is-project-page');
    } else {
        document.body.classList.remove('is-project-page');
    }

    // Initialize dots if we are entering a project section
    if (!['work', 'about', 'contact'].includes(sectionId)) {
        initDots(sectionId);
    }

    currentProjectIndex = projectOrder.indexOf(sectionId);
    window.scrollTo(0, 0);
}

function initDots(projectId) {
    const section = document.getElementById(projectId);
    const thumbs = Array.from(section.querySelectorAll('.vertical-thumbs img'));
    const dotsContainer = document.getElementById(`dots-${projectId}`);
    const featuredImg = document.getElementById(`featured-${projectId}`);

    if (!dotsContainer) return;
    dotsContainer.innerHTML = ''; 

    thumbs.forEach((thumb, idx) => {
        const dot = document.createElement('button'); // Changed to button for better accessibility
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to image ${idx + 1}`);
        
        if (thumb.src === featuredImg.src) {
            dot.classList.add('active');
        }

        // Add Click Event to the Dot
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents triggering lightbox if dots overlap image
            lockImage(projectId, thumb);
        });

        dotsContainer.appendChild(dot);
    });
}

function nextProject() {
    let ni = (currentProjectIndex + 1) % projectOrder.length;
    if (projectOrder[ni] === 'work') ni = 1;
    showSection(projectOrder[ni]);
}

function toggleMenu() { 
    document.body.classList.toggle('mobile-menu-open'); 
}

function handleNav(s) { 
    document.body.classList.remove('mobile-menu-open'); 
    showSection(s); 
}

function previewImage(projectId, src) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = src;
}

function lockImage(projectId, thumbElement) {
    lockedImages[projectId] = thumbElement.src;
    
    const parent = thumbElement.parentElement;
    const thumbs = Array.from(parent.querySelectorAll('img'));
    thumbs.forEach(img => img.classList.remove('active-thumb'));
    thumbElement.classList.add('active-thumb');
    
    previewImage(projectId, thumbElement.src);
    initDots(projectId); // Refresh dots to move active state
}

function revertToClicked(projectId) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = lockedImages[projectId];
}

// --- LIGHTBOX LOGIC ---
let cgi = []; 
let cidx = 0;

function openLightbox(img) {
    const section = img.closest('.page-section');
    cgi = Array.from(section.querySelectorAll('.vertical-thumbs img')).map(i => i.src);
    cidx = cgi.indexOf(img.src);
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}

function changeImage(d) {
    cidx = (cidx + d + cgi.length) % cgi.length;
    updateLightbox();
}

function updateLightbox() {
    document.getElementById('lightbox-img').src = cgi[cidx];
    document.getElementById('lightbox-counter').innerText = `${cidx + 1} / ${cgi.length}`;
}

function closeLightbox() { 
    document.getElementById('lightbox').classList.remove('active'); 
}

function handleLightboxTouchEnd(evt) {
    if (!xDown) return;
    let xUp = evt.changedTouches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 50) {
        if (xDiff > 0) { changeImage(1); } 
        else { changeImage(-1); }
    }
    xDown = null;
}

// Keyboard Listeners
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (event.key === "ArrowLeft") changeImage(-1);
        else if (event.key === "ArrowRight") changeImage(1);
        else if (event.key === "Escape") closeLightbox();
    }
});
