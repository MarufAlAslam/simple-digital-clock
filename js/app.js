function updateClock() {
    const now = new Date();

    // Convert to UTC+6 (Bangladesh Standard Time)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const bdTime = new Date(utc + (6 * 60 * 60 * 1000));

    const hours = String(bdTime.getHours()).padStart(2, '0');
    const minutes = String(bdTime.getMinutes()).padStart(2, '0');
    const seconds = String(bdTime.getSeconds()).padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call


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