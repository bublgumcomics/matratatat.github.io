// Map links to their windows
const windows = {
  openProjects: document.getElementById('projectsWindow'),
  openAbout: document.getElementById('aboutWindow'),
  openContact: document.getElementById('contactWindow'),
  openSocials: document.getElementById('socialsWindow')
};

// Open window on click
Object.keys(windows).forEach(linkId => {
  const win = windows[linkId];
  document.getElementById(linkId).addEventListener('click', () => {
    win.style.display = 'block';
    win.style.top = '50%';
    win.style.left = '50%';
    win.style.transform = 'translate(-50%, -50%)';
  });
});

// Close buttons
document.querySelectorAll('.close-button').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.popup-window').style.display = 'none';
  });
});

// Drag functionality
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let currentWindow = null;

document.querySelectorAll('.popup-header').forEach(header => {
  header.addEventListener('mousedown', (e) => {
    currentWindow = header.parentElement;
    isDragging = true;
    const rect = currentWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    header.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', e => {
  if (!isDragging || !currentWindow) return;
  currentWindow.style.left = `${e.clientX - offsetX}px`;
  currentWindow.style.top = `${e.clientY - offsetY}px`;
  currentWindow.style.transform = 'none'; // remove centering transform while dragging
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentWindow) {
    currentWindow.querySelector('.popup-header').style.cursor = 'grab';
    currentWindow = null;
  }
});