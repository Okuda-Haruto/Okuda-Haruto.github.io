let current = 1;
let isMoving = false;

const track = document.getElementById("slider-track");
const images = track.querySelectorAll("img");
const buttons = document.querySelectorAll(
    ".slider-buttons button"
);

const imageWidth = 600;
const gap = 20;
const sliderWidth = 840;

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

// ====================
// 作品詳細モーダル
// ====================

const workModal = document.getElementById("workModal");
const workModalBody = document.getElementById("workModalBody");
const closeWorkModalButton = document.getElementById("closeWorkModal");
const workItems = document.querySelectorAll(".gif-item");
let lastFocusedWorkItem = null;

function openWorkModal(item) {
    const description = item.querySelector(".gif-description");
    const thumbnail = item.querySelector(".work-thumbnail");
    if (!description || !thumbnail) return;

    workModalBody.innerHTML = "";

    // YouTube動画を説明の一番上に配置する
const videoUrl = item.dataset.videoUrl;

if (videoUrl) {
    const videoSection = document.createElement("section");
    videoSection.className = "work-video-section";

    const videoHeading = document.createElement("h4");
    videoHeading.className = "work-section-heading";
    videoHeading.textContent = "プレイ動画";

    const iframe = document.createElement("iframe");
    iframe.className = "work-video";
    iframe.src = videoUrl;
    iframe.title = "作品のプレイ動画";
    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    videoSection.append(videoHeading, iframe);
    workModalBody.appendChild(videoSection);
}

    // 元の説明からタイトル・担当・概要・アピールポイントを整理して配置する
    const title = description.querySelector("h3");
    const metaHeadings = Array.from(description.querySelectorAll("h4"));
    const paragraphs = Array.from(description.querySelectorAll("p"));

    if (title) {
        const titleClone = title.cloneNode(true);
        titleClone.id = "workModalTitle";
        titleClone.className = "work-modal-title";
        workModalBody.appendChild(titleClone);
    }

    const period = metaHeadings.find((heading) => heading.textContent.includes("製作期間"));
    const role = metaHeadings.find((heading) => heading.textContent.includes("担当"));

    const meta = document.createElement("div");
    meta.className = "work-modal-meta";
    if (period) {
        const periodNode = document.createElement("p");
        periodNode.className = "work-modal-meta-item";
        const label = document.createElement("strong");
        label.textContent = "製作期間";
        const value = document.createElement("span");
        value.textContent = period.textContent.replace(/^製作期間[:：]\s*/, "");
        periodNode.append(label, value);
        meta.appendChild(periodNode);
    }
    if (role) {
        const roleNode = document.createElement("p");
        roleNode.className = "work-modal-meta-item";
        const label = document.createElement("strong");
        label.textContent = "担当したこと";
        const value = document.createElement("span");
        value.textContent = role.textContent.replace(/^担当[:：]\s*/, "");
        roleNode.append(label, value);
        meta.appendChild(roleNode);
    }
    if (meta.childElementCount > 0) workModalBody.appendChild(meta);

    if (paragraphs.length > 0) {
        const overviewSection = document.createElement("section");
        overviewSection.className = "work-description-section";
        const overviewHeading = document.createElement("h4");
        overviewHeading.className = "work-section-heading";
        overviewHeading.textContent = "どんなゲーム？";
        overviewSection.appendChild(overviewHeading);

        // 最初の2段落をゲームの説明としてまとめる
        paragraphs.slice(0, Math.max(1, paragraphs.length - 1)).forEach((paragraph) => {
            overviewSection.appendChild(paragraph.cloneNode(true));
        });
        workModalBody.appendChild(overviewSection);

        // 最後の段落を、特に伝えたい工夫・アピールポイントとして表示
        if (paragraphs.length >= 2) {
            const appealSection = document.createElement("section");
            appealSection.className = "work-description-section work-appeal-section";
            const appealHeading = document.createElement("h4");
            appealHeading.className = "work-section-heading";
            appealHeading.textContent = "こだわった点・アピールポイント";
            appealSection.appendChild(appealHeading);
            appealSection.appendChild(paragraphs[paragraphs.length - 1].cloneNode(true));
            workModalBody.appendChild(appealSection);
        }
    }

    workModal.classList.add("active");
    workModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    lastFocusedWorkItem = item;
    closeWorkModalButton.focus();
}
function closeWorkModal() {
    // 閉じた後に動画の再生が続かないようにする
    workModalBody.querySelectorAll("video").forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
    });
    workModal.classList.remove("active");
    workModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedWorkItem) lastFocusedWorkItem.focus({ preventScroll: true });
}

workItems.forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.addEventListener("click", (event) => {
        // タグをクリックした場合は詳細を開かず、絞り込みだけを切り替える
        if (event.target.closest(".work-card-tag")) return;
        openWorkModal(item);
    });
    item.addEventListener("keydown", (event) => {
        if (event.target !== item) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openWorkModal(item);
        }
    });
});

closeWorkModalButton.addEventListener("click", closeWorkModal);
workModal.addEventListener("click", (event) => {
    if (event.target === workModal) closeWorkModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && workModal.classList.contains("active")) {
        closeWorkModal();
    }
});

// ====================
// 作品検索・タグ絞り込み
// ====================
const workSearchInput = document.getElementById("workSearch");
const workFilterButtons = document.querySelectorAll(".tag-filter");
const clearWorkFiltersButton = document.getElementById("clearWorkFilters");
const workResultCount = document.getElementById("workResultCount");
const selectedWorkTags = new Set();

function toggleWorkTag(tag) {
    if (selectedWorkTags.has(tag)) selectedWorkTags.delete(tag);
    else selectedWorkTags.add(tag);

    workFilterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(selectedWorkTags.has(button.dataset.tag)));
    });
    document.querySelectorAll(".work-card-tag").forEach((tagElement) => {
        tagElement.setAttribute("aria-pressed", String(selectedWorkTags.has(tagElement.textContent.trim())));
    });
    filterWorks();
}

// 一覧カード内のタグも、上部のタグボタンと同じ絞り込みを操作する
 document.querySelectorAll(".work-card-tag").forEach((tagElement) => {
    tagElement.setAttribute("role", "button");
    tagElement.setAttribute("aria-pressed", "false");
    tagElement.tabIndex = 0;
    tagElement.setAttribute("aria-label", `${tagElement.textContent}で絞り込む`);
    tagElement.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleWorkTag(tagElement.textContent.trim());
    });
    tagElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            toggleWorkTag(tagElement.textContent.trim());
        }
    });
});

function filterWorks() {
    const keyword = (workSearchInput?.value || "").trim().toLocaleLowerCase();
    let visibleCount = 0;
    workItems.forEach((item) => {
        const tags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
        const searchableText = `${item.innerText} ${tags.join(" ")}`.toLocaleLowerCase();
        const matchesKeyword = !keyword || searchableText.includes(keyword);
        const matchesTags = [...selectedWorkTags].every((tag) => tags.includes(tag));
        const visible = matchesKeyword && matchesTags;
        item.hidden = !visible;
        if (visible) visibleCount++;
    });
    if (workResultCount) workResultCount.textContent = `${visibleCount} / ${workItems.length} 作品を表示中`;
}

workFilterButtons.forEach((button) => {
    button.addEventListener("click", () => toggleWorkTag(button.dataset.tag));
});
workSearchInput?.addEventListener("input", filterWorks);
clearWorkFiltersButton?.addEventListener("click", () => {
    if (workSearchInput) workSearchInput.value = "";
    selectedWorkTags.clear();
    workFilterButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    filterWorks();
});
filterWorks();


// ====================
// ヘッダーショートカット：イージング付きスクロール
// ====================
document.querySelectorAll('.header-shortcuts a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();

        const startY = window.scrollY;
        const targetY = target.getBoundingClientRect().top + window.scrollY - 18;
        const distance = targetY - startY;
        const duration = Math.min(1000, Math.max(450, Math.abs(distance) * 0.45));
        let startTime = null;

        const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animateScroll = (time) => {
            if (startTime === null) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            window.scrollTo(0, startY + distance * easeInOutCubic(progress));
            if (progress < 1) {
                window.requestAnimationFrame(animateScroll);
            } else {
                history.replaceState(null, "", link.getAttribute("href"));
            }
        };
        window.requestAnimationFrame(animateScroll);
    });
});

// 就職作品の「詳細を見る」から、一覧にあるGunKidの説明を開く
document.getElementById("openGunKidDetails")?.addEventListener("click", () => {
    const gunKidItem = Array.from(document.querySelectorAll(".gif-item")).find((item) =>
        item.querySelector(".work-card-title")?.textContent.trim() === "GunKid"
    );
    if (gunKidItem) openWorkModal(gunKidItem);
});
