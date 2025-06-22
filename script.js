// script.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sake-list");
  const filterBtns = document.querySelectorAll(".filter-buttons button");
  let allSakes = [];

  // カードをレンダリング
  function renderCards(sakes) {
    container.innerHTML = "";
    sakes.forEach(sake => {
      const card = document.createElement("div");
      card.className = "sake-card";

      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";
      const img = document.createElement("img");
      img.src = `images/${sake.image}`;
      img.alt = `${sake.name}｜${sake.prefecture}・${sake.brewery}`;
      wrapper.appendChild(img);
      card.appendChild(wrapper);

      const h2 = document.createElement("h2");
      h2.textContent = sake.name;
      card.appendChild(h2);

      const pInfo = document.createElement("p");
      pInfo.textContent = `${sake.prefecture}・${sake.brewery}`;
      card.appendChild(pInfo);

      const pComment = document.createElement("p");
      pComment.className = "comment";
      pComment.textContent = sake.comment;
      card.appendChild(pComment);

      container.appendChild(card);
    });
  }

  // データ読み込み
  fetch("data/sakes.json")
    .then(res => res.json())
    .then(sakes => {
      allSakes = sakes;
      renderCards(allSakes);
    })
    .catch(err => {
      console.error(err);
      container.textContent = "日本酒データの読み込みに失敗しました。";
    });

  // フィルター機能
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const region = btn.dataset.region;
      const filtered = region === "all"
        ? allSakes
        : allSakes.filter(s => s.region === region);

      renderCards(filtered);
    });
  });
});
