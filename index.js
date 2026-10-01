let current = 1;
let isMoving = false;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(
    ".slider-buttons button"
);

const imageWidth = 600;
const gap = 20;
const sliderWidth = 800;

const slideWidth = imageWidth + gap;

const centerOffset =
    (sliderWidth - imageWidth) / 2;


// ====================
// スライド位置
// ====================

function setPosition(index)
{
    const moveX =
        centerOffset -
        index * slideWidth;

    track.style.transform =
        `translateX(${moveX}px)`;
}


// ====================
// 表示更新
// ====================

function updateDisplay(index)
{
    images.forEach(image =>
    {
        image.classList.remove("active");
    });

    images[index].classList.add("active");

    const dotIndex =
        (index - 1 + 3) % 3;

    buttons.forEach((button, i) =>
    {
        button.classList.toggle(
            "active",
            i === dotIndex
        );
    });
}


// ====================
// スライド
// ====================

function moveSlider(index)
{
    isMoving = true;

    track.style.transition =
        "transform 0.5s ease";

    setPosition(index);

    updateDisplay(index);
}


// ====================
// 次へ
// ====================

function nextSlide()
{
    if (isMoving)
        return;

    current++;

    moveSlider(current);
}


// ====================
// アニメーション終了
// ====================

track.addEventListener(
    "transitionend",
    (event) =>
    {
        if (event.propertyName !== "transform")
            return;

        if (current === 4)
        {
            // アニメーションを停止
            track.style.transition = "none";

            // 位置だけ本物の1へ戻す
            current = 1;

            const moveX =
                centerOffset -
                current * slideWidth;

            track.style.transform =
                `translateX(${moveX}px)`;

            /*
                ここでは
                updateDisplay() を呼ばない

                すでに中央にある複製1の
                見た目をそのまま維持する
            */

            track.offsetHeight;

            requestAnimationFrame(() =>
            {
                track.style.transition =
                    "transform 0.5s ease";

                isMoving = false;
            });
        }
        else
        {
            isMoving = false;
        }
    }
);


// ====================
// ドット
// ====================

buttons.forEach(button =>
{
    button.addEventListener(
        "click",
        () =>
        {
            if (isMoving)
                return;

            const index =
                Number(
                    button.dataset.slide
                );

            current = index + 1;

            moveSlider(current);
        }
    );
});


// ====================
// 自動スライド
// ====================

setInterval(() =>
{
    nextSlide();

}, 3000);


// ====================
// 初期状態
// ====================

track.style.transition = "none";

setPosition(current);
updateDisplay(current);
