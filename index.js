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
    // 中央画像だけ明るくする
    images.forEach(image =>
    {
        image.classList.remove("active");
    });

    images[index].classList.add("active");

    // ドット
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

        // 複製1まで来た
        if (current === 4)
        {
            /*
                ここで

                複製1
                   ↓
                本物1

                にワープする
            */

            track.style.transition = "none";

            current = 1;

            setPosition(current);
            updateDisplay(current);

            /*
                transition:none の状態で
                ブラウザに位置変更を確定させる
            */
            track.offsetHeight;

            /*
                次のフレームでtransitionを戻す
            */
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
