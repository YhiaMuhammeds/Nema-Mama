// جلب بيانات المنتج من ملف JSON
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find((p) => p.id == productId);

    if (!product) {
      document.getElementById("product-container").innerText = "المنتج غير موجود.";
      return;
    }

    const container = document.getElementById("product-container");

    // إنشاء عناصر الصور والألوان
    const imageElements = product.images
      .map(
        (img, i) => `
      <img src="${img}" class="product-img ${i === 0 ? "active" : ""}" data-index="${i}">
    `
      )
      .join("");

    const colorFilters = product.colors
      .map((color, i) => {
        const name = color.name || `لون ${i + 1}`;
        return `<span class="color-filter" style="background-color: ${color.code}" data-color="${name}">${name}</span>`;
      })
      .join("");

    // عرض المنتج
    container.innerHTML = `
      <div class="product-details">
        <div class="images">
          <img id="main-img" src="${product.images[0]}" class="main-img">
          <div class="thumbnails">${imageElements}</div>
        </div>
        <div class="info">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <p><strong>السعر:</strong> ${product.price} جنيه</p>
          ${product.original_price ? `<p class="original-price">السعر الأصلي: ${product.original_price} جنيه</p>` : ""}
          <div class="colors">ألوان متاحة: ${colorFilters}</div>

          <div class="quantity">
            <label>الكمية:</label>
            <input type="number" id="quantity" min="1" value="1">
          </div>

          <br>
          <button id="order-btn" class="order-button">اطلب الآن</button>
        </div>
      </div>
    `;

    // التحكم في الصور المصغرة
    document.querySelectorAll(".product-img").forEach((img) => {
      img.addEventListener("click", (e) => {
        const src = e.target.getAttribute("src");
        document.getElementById("main-img").src = src;

        document.querySelectorAll(".product-img").forEach((img) => img.classList.remove("active"));
        e.target.classList.add("active");
      });
    });

    // اختيار اللون
    document.querySelectorAll(".color-filter").forEach((el) => {
      el.addEventListener("click", () => {
        document.querySelectorAll(".color-filter").forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
      });
    });

    // زر الطلب
    const orderBtn = document.getElementById("order-btn");
    orderBtn.addEventListener("click", () => {
      const selectedColor = document.querySelector(".color-filter.selected");
      const selected = selectedColor ? selectedColor.innerText : "";
      const selectedImage = document.getElementById("main-img").src;
      const quantity = document.getElementById("quantity").value;

      const url = `order.html?product=${encodeURIComponent(product.name)}&shape=${encodeURIComponent(selected)}&image=${encodeURIComponent(selectedImage)}&qty=${encodeURIComponent(quantity)}`;
      location.href = url;
    });
  })
  .catch((err) => {
    console.error("Error fetching product data:", err);
    document.getElementById("product-container").innerText = "حدث خطأ أثناء تحميل المنتج.";
  });
if (product.sizes) {
  const sizeContainer = document.getElementById("sizeOptions");
  product.sizes.forEach(size => {
    const sizeBtn = document.createElement("button");
    sizeBtn.textContent = size;
    sizeBtn.classList.add("size-button");
    
    sizeBtn.addEventListener("click", () => {
      document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("selected"));
      sizeBtn.classList.add("selected");
      selectedSize = size;
    });

    sizeContainer.appendChild(sizeBtn);
  });
}
