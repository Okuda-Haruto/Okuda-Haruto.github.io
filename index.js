let current = 1;

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
}


// ====================
// 次へ
// ====================

function nextSlide()
{
    current++;

    moveSlider(current);
}

track.addEventListener("transitionend", () =>
{
    if (current === 4)
    {
        // アニメーションをOFF
        track.style.transition = "none";

        // 複製1 → 本物1へワープ
        current = 1;

        moveSlider(current, false);

        // ブラウザにワープ後の状態を確定させる
        track.offsetHeight;

        // 次のフレームからアニメーションを戻す
        requestAnimationFrame(() =>
        {
            track.style.transition =
                "transform 0.5s ease";
        });
    }
});


// ====================
// ドット
// ====================

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

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
