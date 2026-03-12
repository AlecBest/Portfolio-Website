const overlay = document.getElementById('window-overlay')
const windows = document.querySelectorAll('.desktop-window')
const openButtons = document.querySelectorAll('[data-window]')
const closeButtons = document.querySelectorAll('.window-close')

const clickSound = document.getElementById('click-sound')
const closeSound = document.getElementById('close-sound')

const themeToggle = document.getElementById('theme-toggle')
const soundToggle = document.getElementById('sound-toggle')
const soundToggleLabel = document.getElementById('sound-toggle-label')

const savedTheme = localStorage.getItem('alec-theme')
const savedSound = localStorage.getItem('alec-sound')

let soundEnabled = savedSound !== 'off'

if (clickSound) {
    clickSound.playbackRate = 1.5
}

if (closeSound) {
    closeSound.playbackRate = 1.15
}

if (savedTheme === 'dark' && themeToggle) {
    document.body.classList.add('dark-mode')
    themeToggle.setAttribute('aria-pressed', 'true')
}

if (soundToggle && soundToggleLabel) {
    soundToggle.setAttribute('aria-pressed', String(!soundEnabled))
    soundToggleLabel.textContent = soundEnabled ? 'Sound On' : 'Sound Off'
}

function playSound(audio) {
    if (!audio || !soundEnabled) return
    const soundClone = audio.cloneNode()
    soundClone.playbackRate = audio.playbackRate || 1
    soundClone.volume = audio.volume ?? 1
    soundClone.play().catch(() => {})
}

function closeAllWindows(playCloseSound = true) {
    if (!overlay) return

    windows.forEach(windowEl => windowEl.classList.add('hidden'))
    overlay.classList.add('hidden')
    document.body.classList.remove('no-scroll')

    if (playCloseSound) {
        playSound(closeSound)
    }
}

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.window)
        if (!target || !overlay) return

        windows.forEach(windowEl => windowEl.classList.add('hidden'))
        target.classList.remove('hidden')
        overlay.classList.remove('hidden')
        document.body.classList.add('no-scroll')
        playSound(clickSound)
    })
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeAllWindows(true)
    })
})

if (overlay) {
    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            closeAllWindows(true)
        }
    })
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
        closeAllWindows(true)
    }
})

document.querySelectorAll('a.game-btn, .window-open-btn, .inventory-slot.filled').forEach(element => {
    element.addEventListener('click', () => {
        playSound(clickSound)
    })
})

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode')
        themeToggle.setAttribute('aria-pressed', String(isDark))
        localStorage.setItem('alec-theme', isDark ? 'dark' : 'light')
        playSound(clickSound)
    })
}

if (soundToggle && soundToggleLabel) {
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled
        soundToggle.setAttribute('aria-pressed', String(!soundEnabled))
        soundToggleLabel.textContent = soundEnabled ? 'Sound On' : 'Sound Off'
        localStorage.setItem('alec-sound', soundEnabled ? 'on' : 'off')
    })
}

/*document.querySelectorAll('.shot-flip-card').forEach(card => {
    card.addEventListener('click', event => {
        event.stopPropagation()
        const shot = card.closest('.window-shot')
        if (!shot) return
        shot.classList.toggle('is-flipped')
        playSound(clickSound)
    })
}) */

const lightbox = document.getElementById('image-lightbox')
const lightboxImg = document.getElementById('image-lightbox-img')
const lightboxCaption = document.getElementById('image-lightbox-caption')
const lightboxClose = document.getElementById('image-lightbox-close')

document.querySelectorAll('.window-shot-image img').forEach(img => {
    img.addEventListener('click', event => {
        event.stopPropagation()
        if (!lightbox || !lightboxImg || !lightboxCaption) return

        lightboxImg.src = img.src
        lightboxImg.alt = img.alt

        const label = img.closest('.shot-front')?.querySelector('.window-shot-label')?.textContent?.trim()
        lightboxCaption.textContent = label || img.alt || ''

        lightbox.classList.remove('hidden')
        document.body.classList.add('no-scroll')
        playSound(clickSound)
    })
})

function closeLightbox() {
    if (!lightbox) return
    lightbox.classList.add('hidden')
    lightboxImg.src = ''
    lightboxCaption.textContent = ''
    document.body.classList.remove('no-scroll')
    playSound(closeSound)
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox)
}

if (lightbox) {
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox()
        }
    })
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
        closeLightbox()
    }
})