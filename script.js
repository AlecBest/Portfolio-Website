const mainWindow = document.querySelector('main');
const closeBtn = document.querySelector('.win-btn.close');
const minimizeBtn = document.querySelector('.win-btn.minimize');
const maximizeBtn = document.querySelector('.win-btn.maximize');
const taskbarApp = document.getElementById('taskbarApp');

let isMinimized = false;
let isMaximized = false;

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        mainWindow.style.display = 'none';
        if (taskbarApp) {
            taskbarApp.classList.add('inactive');
            taskbarApp.classList.remove('active');
        }
    });
}

if (taskbarApp) {
    taskbarApp.addEventListener('click', () => {
        if (mainWindow.style.display === 'none') {
            mainWindow.style.display = 'block';
            taskbarApp.classList.add('active');
            taskbarApp.classList.remove('inactive');
        }
        else {
            if (!isMinimized) {
                mainWindow.style.height = '40px';
                mainWindow.style.overflow = 'hidden';
                isMinimized = true;
                taskbarApp.classList.add('inactive');
            }
            else {
                mainWindow.style.height = isMaximized ? 'calc(85vh - 60px)' : '85vh';
                mainWindow.style.overflow = 'auto';
                isMinimized = false;
                taskbarApp.classList.remove('inactive');
            }
        }
    });
}

if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            mainWindow.style.height = '40px';
            mainWindow.style.overflow = 'hidden';
            isMinimized = true;
        }
        else {
            mainWindow.style.height = isMaximized ? 'calc(85vh - 60px)' : '85vh';
            mainWindow.style.overflow = 'auto';
            isMinimized = false;
        }
    });
}

if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
        if (!isMaximized) {
            mainWindow.style.width = '100%';
            mainWindow.style.height = 'calc(100% - 60px)';
            mainWindow.style.borderRadius = '0';
            mainWindow.style.marginTop = '0px';
            isMaximized = true;
        }
        else {
            mainWindow.style.width = '80%';
            mainWindow.style.height = '85vh';
            mainWindow.style.borderRadius = '10px';
            mainWindow.style.marginTop = '3vh';
            isMaximized = false;
        }
    });
}

const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let initialX, initialY;
let currentX = 0, currentY = 0;
let xOffset = 0, yOffset = 0;

if (titleBar) {
    titleBar.addEventListener('mousedown', (e) => {
        if (isMaximized) return; 

        e.preventDefault();

        isDragging = true;

        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        titleBar.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        mainWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        titleBar.style.cursor = 'default';
    });
}


