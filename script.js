// script.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sake-list");
  const regionMap = {
    "北海道":     ["北海道"],
    "東北":       ["青森県","岩手県","秋田県","宮城県","山形県","福島県"],
    "関東":       ["茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","山梨県"],
    "信越":       ["新潟県","長野県"],
    "中部":       ["静岡県","愛知県","岐阜県","三重県"],
    "北陸":       ["富山県","石川県","福井県"],
    "関西":       ["滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県"],
    "中国":       ["鳥取県","島根県","岡山県","広島県","山口県"],
    "四国":       ["香川県","徳島県","愛媛県","高知県"],
    "九州・沖縄": ["福岡県","佐賀県","長崎県","大分県","熊本県","宮崎県","鹿児島県","沖縄県"]
  };
  let allSakes = [];

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
  document.querySelectorAll(".filter-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      // ボタンの active 状態切り替え
      document.querySelectorAll(".filter-buttons button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const region = btn.dataset.region;
      const prefecture = btn.dataset.prefecture;
      let filtered;

      if (prefecture) {
        filtered = allSakes.filter(s => s.prefecture === prefecture);
      } else if (region === "all") {
        filtered = allSakes;
      } else {
        filtered = allSakes.filter(s => regionMap[region].includes(s.prefecture));
      }
      renderCards(filtered);
    });
  });
});
