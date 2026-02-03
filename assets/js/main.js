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

// --- TOUCH HANDLING FIX ---
function handleTouchStart(evt) { 
    xDown = evt.touches[0].clientX; 
}

function handleTouchEnd(evt, projectId) {
    if (!xDown) return;
    let xUp = evt.changedTouches[0].clientX;
    let xDiff = xDown - xUp;
    
    if (Math.abs(xDiff) > 50) { 
        // If it's a swipe, prevent the "click" from firing afterward
        if (evt.cancelable) evt.preventDefault(); 
        
        const thumbs = Array.from(document.querySelector(`#${projectId} .vertical-thumbs`).querySelectorAll('img'));
        const featuredImg = document.getElementById(`featured-${projectId}`);
        let idx = thumbs.findIndex(t => t.src === featuredImg.src);
        
        if (xDiff > 0) { idx = (idx + 1) % thumbs.length; } 
        else { idx = (idx - 1 + thumbs.length) % thumbs.length; }
        lockImage(projectId, thumbs[idx]);
    }
    xDown = null;
}

// --- CORE NAVIGATION ---
function showSection(sectionId) {
    const newIndex = projectOrder.indexOf(sectionId);
    if (newIndex !== -1) {
        currentProjectIndex = newIndex;
    }

    // Close menu
    document.body.classList.remove('mobile-menu-open');

    // Switch visibility using a more robust method
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active-section');
        // Optional: Force display none if your CSS doesn't handle it
        // sec.style.display = 'none'; 
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active-section');
        // target.style.display = 'block';
    }

    // Update Nav Links
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    const nl = document.getElementById('link-' + sectionId);
    if (nl) nl.classList.add('active');

    // Project State
    const utilityPages = ['work', 'about', 'contact'];
    const isProject = !utilityPages.includes(sectionId);

    if (isProject) {
        document.body.classList.add('is-project-page');
        initDots(sectionId);
    } else {
        document.body.classList.remove('is-project-page');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
}

function nextProject() {
    let ni = (currentProjectIndex + 1) % projectOrder.length;
    if (projectOrder[ni] === 'work') { ni = 1; }
    showSection(projectOrder[ni]);
}

// --- DOTS LOGIC ---
function initDots(projectId) {
    const section = document.getElementById(projectId);
    if (!section) return;
    
    const thumbs = Array.from(section.querySelectorAll('.vertical-thumbs img'));
    const dotsContainer = document.getElementById(`dots-${projectId}`);
    const featuredImg = document.getElementById(`featured-${projectId}`);

    if (!dotsContainer) return;
    dotsContainer.innerHTML = ''; 

    thumbs.forEach((thumb, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to image ${idx + 1}`);
        
        // Use full URL comparison to avoid mismatch
        if (thumb.src === featuredImg.src) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            lockImage(projectId, thumb);
        });

        dotsContainer.appendChild(dot);
    });
}

// --- UTILITIES ---
function toggleMenu() { 
    document.body.classList.toggle('mobile-menu-open'); 
}

function handleNav(s) { 
    // Added a small delay to ensure the menu closing doesn't conflict with navigation
    document.body.classList.remove('mobile-menu-open'); 
    showSection(s); 
}

function previewImage(projectId, src) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured && featured.src !== src) {
        featured.src = src;
    }
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

// --- LIGHTBOX ---
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
    if (cgi.length === 0) return;
    cidx = (cidx + d + cgi.length) % cgi.length;
    updateLightbox();
}

function updateLightbox() {
    const lbImg = document.getElementById('lightbox-img');
    const lbCounter = document.getElementById('lightbox-counter');
    if (lbImg) lbImg.src = cgi[cidx];
    if (lbCounter) lbCounter.innerText = `${cidx + 1} / ${cgi.length}`;
}

function closeLightbox() { 
    document.getElementById('lightbox').classList.remove('active'); 
}

let xDown = null;
let yDown = null; // Add this to track vertical movement

function handleTouchStart(evt) { 
    xDown = evt.touches[0].clientX; 
    yDown = evt.touches[0].clientY; // Track starting Y position
}

function handleTouchEnd(evt, projectId) {
    if (!xDown || !yDown) return;

    let xUp = evt.changedTouches[0].clientX;
    let yUp = evt.changedTouches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // Check if the horizontal swipe is stronger than the vertical scroll
    // This is how Instagram decides to swipe instead of scroll
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (Math.abs(xDiff) > 50) { 
            const thumbs = Array.from(document.querySelector(`#${projectId} .vertical-thumbs`).querySelectorAll('img'));
            const featuredImg = document.getElementById(`featured-${projectId}`);
            let idx = thumbs.findIndex(t => t.src === featuredImg.src);
            
            if (xDiff > 0) { idx = (idx + 1) % thumbs.length; } 
            else { idx = (idx - 1 + thumbs.length) % thumbs.length; }
            
            lockImage(projectId, thumbs[idx]);
        }
    }
    
    // Reset values
    xDown = null;
    yDown = null;
}

// Keyboard Listeners
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (event.key === "ArrowLeft") changeImage(-1);
        else if (event.key === "ArrowRight") changeImage(1);
        else if (event.key === "Escape") closeLightbox();
    }
});
