// Initialize products arrays
const accessories = JSON.parse(localStorage.getItem("accessory")) || [];
const male = JSON.parse(localStorage.getItem("male")) || [];
var additionalProducts = [];

function setAdditionalProducts(categoryName) {
  if (categoryName.toUpperCase() === "THỜI TRANG NAM") {
    additionalProducts = male;
  }
  if (categoryName.toUpperCase() === "PHỤ KIỆN") {
    additionalProducts = accessories;
  }
}

function start() {
  const listAdditionalItem = document.querySelectorAll(".nav-list__item-link");
  listAdditionalItem.forEach((element) => {
    element.addEventListener("click", function () {
      // Get the category name from the text content of the clicked link
      const categoryName = this.textContent ? this.textContent.trim() : "";
      setAdditionalProducts(categoryName);
      renderAdditionalProducts();
    });
  });
}

start();

// Render products based on additionalProducts
function renderAdditionalProducts() {
  var html = additionalProducts
    .map((item) => {
      const { id, image, title, price } = item;
      return `
                  <div onclick="goToDetailsPage(${id})" class="col l-4 m-6 c-12 item">
                            <a href="../details.html?productId=${id}" target="_self" class="product product--space">
                            <img src="${image}" alt="Image" class="product-img"/>
                            <span class="product-desc">${title}</span>
                            <span class="product-price">${price}</span>
                            </a>
                   </div>
    `;
    })
    .join("");
  document.querySelector(".list-items").innerHTML = html;
  document.querySelector(".content-cart__quantity-found").textContent = additionalProducts.length;
}

setAdditionalProducts("Phụ kiện");
renderAdditionalProducts();
