let current = 1;

// 画像
const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(".slider-buttons button");

const imageWidth = 600;
const gap = 20;
const sliderWidth = 800;


// スライド移動
function moveSlider(index, animation = true)
{
    // 中央に持ってくるための位置
    const centerOffset =
        (sliderWidth - imageWidth) / 2;

    const moveX =
        centerOffset
        - index * (imageWidth + gap);

    track.style.transition =
        animation
            ? "transform 0.5s ease"
            : "none";

    track.style.transform =
        `translateX(${moveX}px)`;


    // 全画像を暗くする
    images.forEach(image => {
        image.classList.remove("active");
    });

    // 現在の画像だけ明るくする
    images[index].classList.add("active");


    // ドット
    let dotIndex = (index - 1 + 3) % 3;

    buttons.forEach((button, i) => {
        button.classList.toggle(
            "active",
            i === dotIndex
        );
    });
}


// 次へ
function nextSlide()
{
    current++;

    moveSlider(current);


    // 3枚目の次の1枚目に到達
    if (current === 4)
    {
        setTimeout(() => {

            // 複製された1枚目
            // ↓
            // [3] [1] [2] [3] [1]
            //
            // これを本物の1枚目へ戻す

            current = 1;

            moveSlider(current, false);

        }, 500);
    }
}


// ドット
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.slide);

        current = index + 1;

        moveSlider(current);

    });

});


// 3秒ごと
setInterval(() => {

    nextSlide();

}, 3000);


// 初期表示
moveSlider(current, false);
