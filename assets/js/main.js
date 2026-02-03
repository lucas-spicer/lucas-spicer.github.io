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
let yDown = null;
let lastSwipeTime = 0; 

// --- IMPROVED TOUCH HANDLING ---
function handleTouchStart(evt) { 
    xDown = evt.touches[0].clientX; 
    yDown = evt.touches[0].clientY;
}

function handleTouchEnd(evt, projectId) {
    if (!xDown || !yDown) return;

    let xUp = evt.changedTouches[0].clientX;
    let yUp = evt.changedTouches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // Swipe threshold: Horizontal must be greater than vertical
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 40) { 
        lastSwipeTime = Date.now(); // Mark the time of the swipe
        
        const thumbs = Array.from(document.querySelector(`#${projectId} .vertical-thumbs`).querySelectorAll('img'));
        const featuredImg = document.getElementById(`featured-${projectId}`);
        let idx = thumbs.findIndex(t => t.src === featuredImg.src);
        
        if (xDiff > 0) { idx = (idx + 1) % thumbs.length; } 
        else { idx = (idx - 1 + thumbs.length) % thumbs.length; }
        
        lockImage(projectId, thumbs[idx]);
    }
    xDown = null;
    yDown = null;
}

// --- LIGHTBOX FIX ---
function openLightbox(img) {
    // If we swiped in the last 300ms, this is a "ghost click" from the swipe. Kill it.
    if (Date.now() - lastSwipeTime < 300) return;

    const section = img.closest('.page-section');
    cgi = Array.from(section.querySelectorAll('.vertical-thumbs img')).map(i => i.src);
    cidx = cgi.indexOf(img.src);
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}

// --- CORE NAVIGATION ---
function showSection(sectionId) {
    const newIndex = projectOrder.indexOf(sectionId);
    if (newIndex !== -1) currentProjectIndex = newIndex;

    document.body.classList.remove('mobile-menu-open');

    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active-section'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active-section');

    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    const nl = document.getElementById('link-' + sectionId);
    if (nl) nl.classList.add('active');

    if (!['work', 'about', 'contact'].includes(sectionId)) {
        document.body.classList.add('is-project-page');
        initDots(sectionId);
    } else {
        document.body.classList.remove('is-project-page');
    }
    window.scrollTo(0, 0);
}

// --- DOTS (Fixed for Single Tap) ---
function initDots(projectId) {
    const section = document.getElementById(projectId);
    const dotsContainer = document.getElementById(`dots-${projectId}`);
    const featuredImg = document.getElementById(`featured-${projectId}`);
    if (!dotsContainer || !section) return;

    const thumbs = Array.from(section.querySelectorAll('.vertical-thumbs img'));
    dotsContainer.innerHTML = ''; 

    thumbs.forEach((thumb) => {
        const dot = document.createElement('button');
        dot.className = (thumb.src === featuredImg.src) ? 'dot active' : 'dot';
        
        // Use pointerdown for faster response than 'click'
        dot.onpointerdown = (e) => {
            e.preventDefault();
            lockImage(projectId, thumb);
        };
        dotsContainer.appendChild(dot);
    });
}

function nextProject() {
    let ni = (currentProjectIndex + 1) % projectOrder.length;
    if (projectOrder[ni] === 'work') ni = 1;
    showSection(projectOrder[ni]);
}

function toggleMenu() { document.body.classList.toggle('mobile-menu-open'); }
function handleNav(s) { showSection(s); }
function previewImage(projectId, src) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = src;
}

function lockImage(projectId, thumbElement) {
    lockedImages[projectId] = thumbElement.src;
    const thumbs = Array.from(thumbElement.parentElement.querySelectorAll('img'));
    thumbs.forEach(img => img.classList.remove('active-thumb'));
    thumbElement.classList.add('active-thumb');
    previewImage(projectId, thumbElement.src);
    initDots(projectId); 
}

function revertToClicked(projectId) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = lockedImages[projectId];
}

// --- LIGHTBOX CONTROLS ---
let cgi = []; let cidx = 0;
function changeImage(d) {
    cidx = (cidx + d + cgi.length) % cgi.length;
    updateLightbox();
}
function updateLightbox() {
    document.getElementById('lightbox-img').src = cgi[cidx];
    document.getElementById('lightbox-counter').innerText = `${cidx + 1} / ${cgi.length}`;
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

function handleLightboxTouchEnd(evt) {
    if (!xDown) return;
    let xUp = evt.changedTouches[0].clientX;
    let xDiff = xDown - xUp;
    if (Math.abs(xDiff) > 50) {
        if (xDiff > 0) changeImage(1); else changeImage(-1);
    }
    xDown = null;
}

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "Escape") closeLightbox();
});
