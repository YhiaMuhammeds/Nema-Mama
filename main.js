fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");
    function renderProducts(filteredProducts) {
      container.innerHTML = "";
      filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");

        let limitedImages = product.images.slice(0, 2); // 👈 أول صورتين بس
imagesHTML = `<div class="preview-thumbs">` + limitedImages.map(img => `
  <img src="${img}" onclick="this.closest('.product').querySelector('img.main-img').src='${img}'">
`).join('') + `</div>`;


        div.innerHTML = `
  ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
  <img class="main-img" src="${product.images[0]}" alt="${product.name}" onclick="location.href='product.html?id=${product.id}'">
  <h3>${product.name}</h3>
  ${imagesHTML}
  <button onclick="location.href='product.html?id=${product.id}'">عرض التفاصيل</button>
`;

        container.appendChild(div);
      });
    }

    window.filterProducts = function(category) {
      if (category === "الكل") {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category.includes(category));
        renderProducts(filtered);
      }
    };

    renderProducts(products);
  });
  document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

