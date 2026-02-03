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

// Use this to bind the events properly in your script
function setupTouchListeners(projectId) {
    const stage = document.querySelector(`#${projectId} .featured-stage`);
    if (!stage) return;

    // 'passive: true' allows the browser to keep buttons clickable while swiping
    stage.addEventListener('touchstart', (e) => {
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
        if (!xDown || !yDown) return;

        let xUp = e.changedTouches[0].clientX;
        let yUp = e.changedTouches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        // Check if horizontal swipe is dominant
        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
            const thumbs = Array.from(document.querySelector(`#${projectId} .vertical-thumbs`).querySelectorAll('img'));
            const featuredImg = document.getElementById(`featured-${projectId}`);
            let idx = thumbs.findIndex(t => t.src === featuredImg.src);

            if (xDiff > 0) { idx = (idx + 1) % thumbs.length; } 
            else { idx = (idx - 1 + thumbs.length) % thumbs.length; }
            
            lockImage(projectId, thumbs[idx]);
        }
        xDown = null;
        yDown = null;
    }, { passive: true });
}

function showSection(sectionId) {
    // 1. Force the browser to blur any active focus
    if (document.activeElement) document.activeElement.blur();

    // 2. Standard navigation logic
    const newIndex = projectOrder.indexOf(sectionId);
    if (newIndex !== -1) currentProjectIndex = newIndex;

    document.body.classList.remove('mobile-menu-open');

    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active-section');
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active-section');
        
        // 3. Re-initialize touch listeners specifically for this section
        const utilityPages = ['work', 'about', 'contact'];
        if (!utilityPages.includes(sectionId)) {
            setupTouchListeners(sectionId); 
            initDots(sectionId);
        }
    }

    window.scrollTo(0, 0);
}

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
        dot.onclick = (e) => { 
            e.preventDefault();
            e.stopPropagation(); 
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

function lockImage(projectId, thumbElement) {
    lockedImages[projectId] = thumbElement.src;
    const thumbs = Array.from(thumbElement.parentElement.querySelectorAll('img'));
    thumbs.forEach(img => img.classList.remove('active-thumb'));
    thumbElement.classList.add('active-thumb');
    
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = thumbElement.src;
    
    initDots(projectId); 
}

function toggleMenu() { document.body.classList.toggle('mobile-menu-open'); }
function handleNav(s) { showSection(s); }
function revertToClicked(projectId) {
    const featured = document.getElementById(`featured-${projectId}`);
    if (featured) featured.src = lockedImages[projectId];
}

// --- LIGHTBOX ---
function openLightbox(img) {
    const section = img.closest('.page-section');
    cgi = Array.from(section.querySelectorAll('.vertical-thumbs img')).map(i => i.src);
    cidx = cgi.indexOf(img.src);
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}
function changeImage(d) { cidx = (cidx + d + cgi.length) % cgi.length; updateLightbox(); }
function updateLightbox() {
    document.getElementById('lightbox-img').src = cgi[cidx];
    document.getElementById('lightbox-counter').innerText = `${cidx + 1} / ${cgi.length}`;
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }
