let current = 0;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(".slider-buttons button");

const imageWidth = 600;
const gap = 20;
const sliderWidth = 800;

function slide(index) {

    current = index;

    // 中央に画像を持ってくるための位置
    const moveX =
        (sliderWidth - imageWidth) / 2
        - current * (imageWidth + gap);

    track.style.transform =
        `translateX(${moveX}px)`;

    // 中央画像を明るくする
    images.forEach((image, i) => {
        image.classList.toggle("active", i === current);
    });

    // 下のボタンを更新
    buttons.forEach((button, i) => {
        button.classList.toggle("active", i === current);
    });
}


// 下のボタンをクリック
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.slide);

        slide(index);

    });

});


// 3秒ごとに自動スライド
setInterval(() => {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    slide(current);

}, 3000);


// 最初の状態
slide(0);
