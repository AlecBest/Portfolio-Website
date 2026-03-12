const overlay = document.getElementById("popup-overlay");
const popupCards = document.querySelectorAll(".popup-card");
const popupButtons = document.querySelectorAll(".inventory-slot.filled[data-popup]");
const closeButtons = document.querySelectorAll(".close-popup");

function closePopups() {
    overlay.classList.add("hidden");
    popupCards.forEach(card => card.classList.add("hidden"));
}

popupButtons.forEach(button => {
    button.addEventListener("click", () => {
        const popupId = button.dataset.popup;
        const targetPopup = document.getElementById(popupId);

        if (!targetPopup) return;

        overlay.classList.remove("hidden");
        popupCards.forEach(card => card.classList.add("hidden"));
        targetPopup.classList.remove("hidden");
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", closePopups);
});

if (overlay) {
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closePopups();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePopups();
    }
});

const customCursor = document.getElementById("custom-cursor");
const customCursorImg = customCursor ? customCursor.querySelector("img") : null;

const resumeMFrame = document.querySelector(".resume-preview-frame");
const resumeMFrameWrap = document.querySelector(".resume-preview-frame-wrap");

const defaultCursorSrc = "Assets/images/UI_TravelBook_Cursor01c.png";
const clickFrames = [
    "Assets/images/UI_TravelBook_MouseCursorClick01a_1.png",
    "Assets/images/UI_TravelBook_MouseCursorClick01a_2.png",
    "Assets/images/UI_TravelBook_MouseCursorClick01a_3.png",
    "Assets/images/UI_TravelBook_MouseCursorClick01a_4.png"
];

let cursorFrameTimeouts = [];

function clearCursorAnimation() {
    cursorFrameTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    cursorFrameTimeouts = [];
}

function resetCursorToDefault() {
    if (!customCursorImg) return;
    customCursorImg.src = defaultCursorSrc;
}

function playCursorClickAnimation() {
    if (!customCursorImg) return;
    if (document.body.classList.contains("disable-custom-cursor")) return;

    clearCursorAnimation();

    clickFrames.forEach((frameSrc, index) => {
        const timeoutId = setTimeout(() => {
            customCursorImg.src = frameSrc;
        }, index * 38);

        cursorFrameTimeouts.push(timeoutId);
    });

    const resetTimeout = setTimeout(() => {
        resetCursorToDefault();
    }, clickFrames.length * 38 + 60);

    cursorFrameTimeouts.push(resetTimeout);
}

function enableNativeCursorMode() {
    document.body.classList.add("disable-custom-cursor");
}

function disableNativeCursorMode() {
    document.body.classList.remove("disable-custom-cursor");
    resetCursorToDefault();
}

if (customCursor && customCursorImg && window.matchMedia("(pointer: fine)").matches) {
    document.body.classList.add("has-custom-cursor");
    customCursorImg.src = defaultCursorSrc;

    window.addEventListener("mousemove", (event) => {
        customCursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });

    window.addEventListener("mousedown", () => {
        playCursorClickAnimation();
    });

    window.addEventListener("mouseup", () => {
        const resetTimeout = setTimeout(() => {
            resetCursorToDefault();
        }, 40);

        cursorFrameTimeouts.push(resetTimeout);
    });
} else if (customCursor) {
    customCursor.remove();
}

if (resumeMFrameWrap) {
    resumeMFrameWrap.addEventListener("mouseenter", enableNativeCursorMode);
    resumeMFrameWrap.addEventListener("mouseleave", disableNativeCursorMode);
}

if (resumeMFrame) {
    resumeMFrame.addEventListener("mouseenter", enableNativeCursorMode);
    resumeMFrame.addEventListener("mouseleave", disableNativeCursorMode);
}

const projectSpreads = document.querySelectorAll(".project-spread");
const prevProjectButton = document.querySelector(".prev-project");
const nextProjectButton = document.querySelector(".next-project");
const projectProgressFill = document.getElementById("project-progress-fill");

if (projectSpreads.length && prevProjectButton && nextProjectButton) {
    let currentProjectIndex = 0;

    function updateProjectProgress(index) {
        if (!projectProgressFill) return;
        const progressPercent = ((index + 1) / projectSpreads.length) * 100;
        projectProgressFill.style.width = `${progressPercent}%`;
    }

    function showProject(index) {
        projectSpreads.forEach((spread, i) => {
            spread.classList.toggle("active", i === index);
        });

        currentProjectIndex = index;
        updateProjectProgress(index);
    }

    prevProjectButton.addEventListener("click", () => {
        const newIndex = currentProjectIndex === 0 ? projectSpreads.length - 1 : currentProjectIndex - 1;
        showProject(newIndex);
    });

    nextProjectButton.addEventListener("click", () => {
        const newIndex = currentProjectIndex === projectSpreads.length - 1 ? 0 : currentProjectIndex + 1;
        showProject(newIndex);
    });

    showProject(0);
}

const resumeFrame = document.querySelector(".resume-preview-frame");
const resumeFrameWrap = document.querySelector(".resume-preview-frame-wrap");

function enableNativeCursorMode() {
    document.body.classList.add("disable-custom-cursor");
}

function disableNativeCursorMode() {
    document.body.classList.remove("disable-custom-cursor");
}

if (resumeFrameWrap) {
    resumeFrameWrap.addEventListener("mouseenter", enableNativeCursorMode);
    resumeFrameWrap.addEventListener("mouseleave", disableNativeCursorMode);
}

if (resumeFrame) {
    resumeFrame.addEventListener("mouseenter", enableNativeCursorMode);
    resumeFrame.addEventListener("mouseleave", disableNativeCursorMode);
}