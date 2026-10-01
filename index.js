let current = 0;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(".slider-buttons button");

function slide(index) {
    current = index;

    const width = images[0].clientWidth;

    track.style.transform =
        `translateX(-${current * width}px)`;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.slide);

        slide(index);
    });
});
