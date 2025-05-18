const clock = document.getElementById('clock');
const colorPicker = document.getElementById('colorPicker');
const themeToggle = document.getElementById('themeToggle');
const fullscreenBtn = document.getElementById('fullscreen-btn');

let darkTheme = true;

function updateClock() {
    const now = new Date();

    // Convert to UTC+6 (Bangladesh Standard Time)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const bdTime = new Date(utc + (6 * 60 * 60 * 1000));

    let hours = bdTime.getHours();
    const minutes = String(bdTime.getMinutes()).padStart(2, '0');
    const seconds = String(bdTime.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, '0');

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function startClock() {
    updateClock();
    setTimeout(startClock, 1000 - (Date.now() % 1000)); // Precise 1-sec interval
}

// Load saved settings or use defaults
function loadSettings() {
    const savedColor = localStorage.getItem('clockColor');
    const savedTheme = localStorage.getItem('themeDark');

    if (savedColor) {
        colorPicker.value = savedColor;
        document.documentElement.style.setProperty('--text-color', savedColor);
    } else {
        // default clock color
        document.documentElement.style.setProperty('--text-color', colorPicker.value);
    }

    if (savedTheme !== null) {
        darkTheme = savedTheme === 'true';
        if (darkTheme) {
            document.documentElement.style.setProperty('--bg-color', '#111');
            document.documentElement.style.setProperty('--text-color', colorPicker.value);
        } else {
            document.documentElement.style.setProperty('--bg-color', '#fff');
            document.documentElement.style.setProperty('--text-color', '#333');
        }
    } else {
        // default theme
        document.documentElement.style.setProperty('--bg-color', '#111');
    }
}

loadSettings();
startClock();

// Fullscreen toggle
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Fullscreen error: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Change clock color dynamically & save
colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--text-color', color);
    localStorage.setItem('clockColor', color);
});

// Toggle light/dark theme & save
// themeToggle.addEventListener('click', () => {
//     darkTheme = !darkTheme;
//     if (darkTheme) {
//         document.documentElement.style.setProperty('--bg-color', '#111');
//         document.documentElement.style.setProperty('--text-color', colorPicker.value);
//     } else {
//         document.documentElement.style.setProperty('--bg-color', '#fff');
//         document.documentElement.style.setProperty('--text-color', '#333');
//     }
//     localStorage.setItem('themeDark', darkTheme);
// });
