
let time = 0;

setInterval(() => {
    time++;
    document.getElementById("timer").textContent = time;
}, 1000);



let current = 0;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");

setInterval(() => {
    current++;

    // 3枚目の次は1枚目に戻す
    if (current >= images.length) {
        current = 0;
    }

    track.style.transform =
        `translateX(-${current * 600}px)`;

}, 3000);
