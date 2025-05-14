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

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function startClock() {
    updateClock();
    setTimeout(startClock, 1000 - (Date.now() % 1000)); // Adjust for exact timing
}
startClock();


const fullscreentoggle = document.getElementById('fullscreen-btn');

fullscreentoggle.addEventListener('click', function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
);