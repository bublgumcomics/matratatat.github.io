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

// Drag functionality for desktop & mobile
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let currentWindow = null;

document.querySelectorAll('.popup-header').forEach(header => {

  // --- Desktop dragging ---
  header.addEventListener('mousedown', (e) => {
    currentWindow = header.parentElement;
    isDragging = true;
    const rect = currentWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    header.style.cursor = 'grabbing';
  });

  // --- Mobile dragging ---
  header.addEventListener('touchstart', (e) => {
    currentWindow = header.parentElement;
    isDragging = true;
    const rect = currentWindow.getBoundingClientRect();
    const touch = e.touches[0];
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
  });

  header.addEventListener('touchmove', (e) => {
    if (!isDragging || !currentWindow) return;
    const touch = e.touches[0];
    currentWindow.style.left = `${touch.clientX - offsetX}px`;
    currentWindow.style.top = `${touch.clientY - offsetY}px`;
    currentWindow.style.transform = 'none'; // remove centering
    e.preventDefault(); // prevents scrolling while dragging
  });

  header.addEventListener('touchend', () => {
    isDragging = false;
    currentWindow = null;
  });
});

// --- Desktop mouse move ---
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentWindow) return;
  currentWindow.style.left = `${e.clientX - offsetX}px`;
  currentWindow.style.top = `${e.clientY - offsetY}px`;
  currentWindow.style.transform = 'none';
});

// --- Desktop mouse up ---
document.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentWindow) {
    currentWindow.querySelector('.popup-header').style.cursor = 'grab';
    currentWindow = null;
  }
});


// --- Custom cursor system ---
const cursor = document.getElementById('customCursor');

document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Shrink cursor on click
document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});
