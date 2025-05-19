// portalOverlay.js

// Global reference for the cube sketch
let cubeSketch = null;

function draw() {
    console.log("draw");

        // Draw in 2D on top of a 3D/WebGL sketch:
        resetMatrix();         // go back to screen‐space
        noStroke();
        fill(255, 0, 0);       // bright red
        ellipse(mouseX, mouseY, 30, 30);  // 10px diameter

}
// Initialize or reinitialize the rotating cube overlay
function initCubeOverlay() {
    const overlay = document.getElementById('portalOverlay');
    // Remove any existing cube container and sketch
    const existing = document.getElementById('cubeOverlayContainer');
    if (existing) {
        existing.remove();
        if (cubeSketch) {
        cubeSketch.remove();
        cubeSketch = null;
        }
    }

    // Create a new container for the cube canvas
    const container = document.createElement('div');
    container.id = 'cubeOverlayContainer';
    Object.assign(container.style, {
        position: 'absolute',
        width: '200px',    // 5× original size
        height: '200px',   // 5× original size
        top: '50%',
        left: '12.5%',     // center of left 25% area
        transform: 'translate(-50%, -50%)',
        zIndex: '1002',
        pointerEvents: 'auto',
        cursor: 'pointer'
      });
    container.classList.add('cube-overlay-container');
    container.style.pointerEvents = 'auto'; // ensure container handles clicks
    overlay.appendChild(container);

    // Add CSS to let canvas clicks pass through to container
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        #cubeOverlayContainer canvas {
        pointer-events: none;
        }
    `;
    document.head.appendChild(styleTag);

    
  // Click on cube returns to grid
    container.addEventListener('click', () => {
        const btn = document.getElementById('closeOverlay');
        if (btn) btn.click();
    });


    // Create a new p5 WebGL sketch
    cubeSketch = new p5(p => {
        p.setup = () => {
        p.createCanvas(200, 200, p.WEBGL).parent(container);
        p.noStroke();
        // No need to override mousePressed; CSS pointer-events handles click passthrough
        };
        p.draw = () => {
        p.clear();
        const angle = p.frameCount * 0.02;
        p.rotateX(angle);
        p.rotateY(angle);
        p.fill(255, 0, 0);
        p.box(100);
        };
    });
}


export function initPortalOverlay({ label, content }) {
    // Header title element
    const titleEl   = document.getElementById('portalTitle');
    // The scrolling panel container
    const panel     = document.querySelector('.overlay-panel');
    // Content insertion point
    const contentEl = document.getElementById('portalContent');
  
    // Set title and clear previous content
    titleEl.textContent = label;
    contentEl.innerHTML = '';
    panel.scrollTop = 0;
  
    // Recursive builder: wrap each item in a section so sticky headers stack
    function buildSections(items, level = 0) {
      return items.map(item => {
        const section = document.createElement('section');
        section.classList.add('portal-section', `level-${level}`, 'collapsed');
  
        // 1) Header
        const header = document.createElement('div');
        header.classList.add('portal-header', `level-${level}`, 'clickable');
        header.textContent = item.title;
        section.appendChild(header);
  
        // 2) Content block
        if (item.content) {
          const desc = document.createElement('div');
          desc.classList.add('portal-description');
          desc.innerHTML = item.content;
          section.appendChild(desc);
        }
  
        // 3) Children
        if (item.children?.length) {
          const childSections = buildSections(item.children, level + 1);
          childSections.forEach(childSec => section.appendChild(childSec));
        }
  
        // 4) Toggle collapse
        header.addEventListener('click', e => {
          e.stopPropagation();
          section.classList.toggle('collapsed');
          header.classList.toggle('expanded');
        });
  
        return section;
      });
    }
  
    // Build & inject sections into the panel
    const allSections = buildSections(content);
    allSections.forEach(sec => contentEl.appendChild(sec));
  
    // Reveal overlay & start cube
    const overlay = document.getElementById('portalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('portal-overlay-visible');
    initCubeOverlay();
  }