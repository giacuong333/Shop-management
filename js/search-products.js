const getProducts = JSON.parse(localStorage.getItem("products")) || [];
const getOutStandingProducts = JSON.parse(localStorage.getItem("outstanding")) || [];
const getBestellerProducts = JSON.parse(localStorage.getItem("bestseller")) || [];
const getAccessoryProducts = JSON.parse(localStorage.getItem("accessory")) || [];
const getMaleProducts = JSON.parse(localStorage.getItem("male")) || [];

let searchBox = document.querySelector(".header-search__input");
let header = document.querySelector(".header");
let containerSearchItem = document.querySelector(".header-search__items-list");
let productItem = document.querySelector(".header-search__items");

const getAllProducts = [...getProducts];
getAllProducts.push(...getOutStandingProducts);
getAllProducts.push(...getBestellerProducts);
getAllProducts.push(...getAccessoryProducts);
getAllProducts.push(...getMaleProducts);

// Create panel to contain the searched item (only create once)
const divElement = document.createElement("div");
divElement.className = "header-search__items-list";
header.appendChild(divElement);

function searchProduct() {
  let productName = searchBox.value.trim().toUpperCase();
  let html = "";

  if (productName === "") {
    divElement.innerHTML = "";
    divElement.style["boxShadow"] = "";
    divElement.style.setProperty("padding", "0");
    return;
  }

  getAllProducts.forEach((product) => {
    let { id, title, image, price } = product;
    if (image.charAt(1) !== ".") {
      image = "." + image;
    }
    if (title.toUpperCase().indexOf(productName) > -1) {
      html += `
                              <a href="../details.html?productId=${id}" class="header-search__items">
                                        <img src="${image}" alt="Image">
                                        <div class="header-search__items-details">
                                                  <h3>${title}</h3>
                                                  <h3>${price}</h3>
                                        </div>
                              </a>
                              `;
    }
    divElement.style["boxShadow"] = "0 4px 10px 2px rgba(0, 0, 0, .5)";
    divElement.style.setProperty("padding", "12px");
  });

  divElement.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => searchBox.addEventListener("keyup", () => searchProduct()));
