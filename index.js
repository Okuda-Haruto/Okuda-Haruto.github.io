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

// 画像1枚を動かす距離
const slideWidth = imageWidth + gap;

// 中央に置くための余白
const centerOffset =
    (sliderWidth - imageWidth) / 2;


// ====================
// スライド
// ====================

function moveSlider(index, animation = true)
{
    const moveX =
        centerOffset -
        index * slideWidth;

    // アニメーション
    track.style.transition =
        animation
            ? "transform 0.5s ease"
            : "none";

    track.style.transform =
        `translateX(${moveX}px)`;


    // 全部暗くする
    images.forEach(image => {
        image.classList.remove("active");
    });

    // 中央だけ明るくする
    images[index].classList.add("active");


    // ドット更新
    const dotIndex =
        (index - 1 + 3) % 3;

    buttons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === dotIndex
        );

    });

    if (animation)
    {
        isMoving = true;
    }
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

track.addEventListener("transitionend", (event) =>
{
    if (event.propertyName !== "transform")
        return;

    if (current === 4)
    {
        track.style.transition = "none";

        current = 1;

        moveSlider(current, false);

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
});


// ====================
// ドット
// ====================

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

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

setInterval(() => {

    nextSlide();

}, 3000);


// ====================
// 初期状態
// ====================

moveSlider(
    current,
    false
);
