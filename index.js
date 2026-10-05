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

track.addEventListener("transitionend", (event) =>
{
    if (event.propertyName !== "transform")
        return;

    if (current === 4)
    {
        // --------------------
        // ワープ前
        // --------------------

        // transformのアニメーション停止
        track.style.transition = "none";

        // opacityのアニメーションも停止
        images.forEach(image =>
        {
            image.style.transition = "none";
        });


        // --------------------
        // 本物の1へワープ
        // --------------------

        current = 1;

        setPosition(current);


        // activeを本物の1へ変更
        images.forEach(image =>
        {
            image.classList.remove("active");
        });

        images[current].classList.add("active");


        // ドットも更新
        buttons.forEach((button, i) =>
        {
            button.classList.toggle(
                "active",
                i === 0
            );
        });


        // --------------------
        // 変更を確定
        // --------------------

        track.offsetHeight;


        // --------------------
        // 次のフレームで元に戻す
        // --------------------

        requestAnimationFrame(() =>
        {
            track.style.transition =
                "transform 0.5s ease";

            images.forEach(image =>
            {
                image.style.transition =
                    "opacity 0.5s ease";
            });

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



<script>
function toggleDescription(image) {
    const description = image.nextElementSibling;
    description.classList.toggle("show");
}
</script>
