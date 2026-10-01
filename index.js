let current = 0;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(".slider-buttons button");

const imageWidth = 600;
const gap = 20;
const sliderWidth = 800;

// 本物の画像は3枚
const imageCount = 3;


// 画像を移動
function moveSlider(index, animation = true) {

    const moveX =
        (sliderWidth - imageWidth) / 2
        - index * (imageWidth + gap);

    // アニメーションのON/OFF
    track.style.transition =
        animation ? "transform 0.5s ease" : "none";

    track.style.transform =
        `translateX(${moveX}px)`;

    // 現在の画像を明るくする
    images.forEach((image, i) => {

        image.classList.toggle(
            "active",
            i === index
        );

    });

    // ドットを更新
    buttons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === index % imageCount
        );

    });
}


// 次の画像へ
function nextSlide() {

    current++;

    moveSlider(current);


    // 複製側に入ったら、
    // アニメーション終了後に本物へ瞬間移動
    if (current >= imageCount) {

        setTimeout(() => {

            current = 0;

            moveSlider(current, false);

        }, 500);
    }
}


// ドットをクリック
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.slide);

        current = index;

        moveSlider(current);

    });

});


// 3秒ごと
setInterval(() => {

    nextSlide();

}, 3000);


// 初期位置
moveSlider(0, false);
