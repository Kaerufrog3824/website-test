// script.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sake-list");

  fetch("data/sakes.json")
    .then(response => response.json())
    .then(sakes => {
      sakes.forEach(sake => {
        // カード要素の作成
        const card = document.createElement("div");
        card.className = "sake-card";

        // 画像ラッパー
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";
        const img = document.createElement("img");
        img.src = `images/${sake.image}`;
        img.alt = `${sake.name}｜${sake.prefecture}・${sake.brewery}`;
        wrapper.appendChild(img);
        card.appendChild(wrapper);

        // 銘柄名
        const h2 = document.createElement("h2");
        h2.textContent = sake.name;
        card.appendChild(h2);

        // 蔵元・都道府県
        const pInfo = document.createElement("p");
        pInfo.textContent = `${sake.prefecture}・${sake.brewery}`;
        card.appendChild(pInfo);

        // コメント
        const pComment = document.createElement("p");
        pComment.className = "comment";
        pComment.textContent = sake.comment;
        card.appendChild(pComment);

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("データの読み込みに失敗しました:", err);
      container.textContent = "日本酒データの読み込みに失敗しました。";
    });
});
