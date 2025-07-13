fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");
    const productsPerPage = 12; // عدد المنتجات في الصفحة
    let currentPage = 1;
    let currentProducts = products;

    function renderProducts() {
      container.innerHTML = "";
      const start = (currentPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      const paginatedProducts = currentProducts.slice(start, end);

      paginatedProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");

        let limitedImages = product.images.slice(0, 2);
        let imagesHTML = `<div class="preview-thumbs">` + limitedImages.map(img => `
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

      updatePagination();
    }

    function updatePagination() {
      const totalPages = Math.ceil(currentProducts.length / productsPerPage);
      document.getElementById("page-info").textContent = `صفحة ${currentPage} من ${totalPages}`;
      document.getElementById("prev-btn").disabled = currentPage === 1;
      document.getElementById("next-btn").disabled = currentPage === totalPages;
    }

    // التصفية بناءً على الفئة
    window.filterProducts = function(category) {
      if (category === "الكل") {
        currentProducts = products;
      } else {
        currentProducts = products.filter(p => p.category.includes(category));
      }
      currentPage = 1;
      renderProducts();
    };

    // التحكم في أزرار التنقل
    document.getElementById("prev-btn").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
      }
    });

    document.getElementById("next-btn").addEventListener("click", () => {
      const totalPages = Math.ceil(currentProducts.length / productsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
      }
    });

    renderProducts();
  });

  // Toggle للأسئلة الشائعة
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      item.classList.toggle('active');
    });
  });
window.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("popupShown")) {
    document.getElementById("popup").style.display = "flex";
    sessionStorage.setItem("popupShown", "true");
  }

  document.getElementById("closePopup").onclick = function() {
    document.getElementById("popup").style.display = "none";
  };
});
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const featured = products.slice(23, 31); // أول 5 منتجات فقط كمثال
    const slider = document.getElementById("featured-slider");

    featured.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>${product.price} جنيه</p>
      `;
      div.onclick = () => location.href = `product.html?id=${product.id}`;
      slider.appendChild(div);
    });
  });
