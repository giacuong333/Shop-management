// Initialize products arrays
const accessories = JSON.parse(localStorage.getItem("accessory")) || [];
const male = JSON.parse(localStorage.getItem("male")) || [];

let additionalProducts = [];
function setAdditionalProducts(categoryName) {
  if (categoryName.toUpperCase() === "THỜI TRANG NAM") {
    additionalProducts = male;
  } else if (categoryName.toUpperCase() === "PHỤ KIỆN") {
    additionalProducts = accessories;
  }
}
const listAdditionalItem = document.querySelectorAll(".nav-list__item-link");
listAdditionalItem.forEach((element) => {
  element.addEventListener("click", function (event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Get the category name from the text content of the clicked link
    const getCategoryName = this.textContent ? this.textContent.trim() : "";
    setAdditionalProducts(getCategoryName);
    renderAdditionalProducts();
  });
});

// Render products based on additionalProducts
function renderAdditionalProducts() {
  let html = "";
  additionalProducts.forEach((item) => {
    const { id, image, title, price } = item;
    html += `
                    <div onclick="goToDetailsPage(${id})" class="col l-4 m-6 c-12 item">
                              <a href="../details.html?productId=${id}" target="_self" class="product product--space">
                              <img src="${image}" alt="Image" class="product-img"/>
                              <span class="product-desc">${title}</span>
                              <span class="product-price">${price}</span>
                              </a>
                    </div>
                    `;
  });
  document.querySelector(".list-items").innerHTML = html;
}

setAdditionalProducts("Phụ kiện");
renderAdditionalProducts();
