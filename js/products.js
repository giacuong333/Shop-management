// ============================================ GET PRODUCTS FROM THE JSON FILES ============================================
async function fetchDataAndParse(url, key) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    localStorage.setItem(key, JSON.stringify(data));
    if (!JSON.parse(localStorage.getItem("cart"))) {
      localStorage.setItem("cart", "[]");
    }
  } catch (error) {
    console.log("Fetching data failed!");
  }
}

fetchDataAndParse("../JSON/products.json", "products");
fetchDataAndParse("../JSON/outstandingProduct.json", "outstanding");
fetchDataAndParse("../JSON/bestsellerProduct.json", "bestseller");
fetchDataAndParse("../JSON/accessoryProduct.json", "accessory");
fetchDataAndParse("../JSON/maleProduct.json", "male");

const products = JSON.parse(localStorage.getItem("products")) || [];
const outstandingProducts = JSON.parse(localStorage.getItem("outstanding")) || [];
const bestsellerProducts = JSON.parse(localStorage.getItem("bestseller")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const accessoryProduct = JSON.parse(localStorage.getItem("accessory")) || [];
const maleProducts = JSON.parse(localStorage.getItem("male")) || [];

// ============================================ RENDER PRODUCTS ============================================

const renderProducts = (category) => {
  const productList = document.querySelector("#products-area");
  productList.innerHTML = "";
  let productHTML = "";

  let categoryProducts;
  if (category === "new") {
    categoryProducts = products;
  } else if (category === "outstanding") {
    categoryProducts = outstandingProducts;
  } else {
    categoryProducts = bestsellerProducts;
  }

  categoryProducts.forEach((product) => {
    const { id, title, price, oldPrice, image, sale } = product;

    if (id === 11) productHTML += `<h2 class="product-name">SẢN PHẨM HOT</h2>`;

    let tempPrice = oldPrice || "";

    productHTML += `
        <div onclick="goToDetailsPage(${id})" class="col l-6 m-6 c-12 product-details">
            <a href="../details.html?productId=${id}" target="_self" class="product product--space ${sale}">
                <img src="${image}" alt="Image" class="product-img"/>
                <span class="product-desc">${title}</span>
                <span class="product-price">${price}</span>
                <span class="product-price-old">${tempPrice}</span>
            </a>
        </div>
        `;
  });

  productList.innerHTML = productHTML;
};

const outstandingButton = document.querySelector("#outstanding-btn");
const newButton = document.querySelector("#new-btn");
const bestSellerButton = document.querySelector("#best-seller-btn");

if (outstandingButton) {
  outstandingButton.addEventListener("click", () => {
    renderProducts("outstanding");
    outstandingButton.classList.add("btn--active");
    newButton.classList.remove("btn--active");
    bestSellerButton.classList.remove("btn--active");
  });
}

if (newButton) {
  newButton.addEventListener("click", () => {
    renderProducts("new");
    newButton.classList.add("btn--active");
    outstandingButton.classList.remove("btn--active");
    bestSellerButton.classList.remove("btn--active");
  });
}

if (bestSellerButton) {
  bestSellerButton.addEventListener("click", () => {
    renderProducts("bestseller");
    bestSellerButton.classList.add("btn--active");
    newButton.classList.remove("btn--active");
    outstandingButton.classList.remove("btn--active");
  });
}

// ============================================ GO TO THE DETAILS PAGE ============================================

function goToDetailsPage(productId) {
  const detailsPageUrl = `../details.html?productId=${productId}`;
  window.location.href = detailsPageUrl;
}

// Access the query string of the current page
const urlParams = new URLSearchParams(window.location.search);
// Get id from the query string
const productId = urlParams.get("productId");

function fetchProductDetails(productId) {
  let productCategory = productId >= 1 && productId <= 18 ? "new" : productId >= 19 && productId <= 28 ? "bestseller" : productId >= 39 && productId <= 52 ? "accessory" : productId >= 53 && productId <= 66 ? "male" : "outstanding";

  const categoryProducts = productCategory === "new" ? products : productCategory === "outstanding" ? outstandingProducts : productCategory === "accessory" ? accessoryProduct : productCategory === "male" ? maleProducts : bestsellerProducts;

  // Find the product with the matching ID
  const product = categoryProducts.find((product) => product.id === parseInt(productId));

  // Update the HTML content
  if (product) {
    document.querySelector(".ten").textContent = product.title;
    document.querySelector(".gia").textContent = product.price;
    document.querySelector(".chitiet").textContent = product.description;
    document.querySelector(".anh").src = product.image;
  } else {
    console.log("Product not found");
  }
}

fetchProductDetails(productId);

// ============================================ ADD PRODUCTS TO THE CART ============================================
const buyBtn = document.querySelector(".mua");
const quantityInput = document.querySelector(".soluong");
const productName = document.querySelector(".annouce-head__body-name");
const price = document.querySelector(".annouce-head__body-amount");
const total = document.querySelector(".annouce-head__body-total");
const overlay = document.querySelector(".overlay");
const body = document.querySelector(".than");
const closeBtn = document.querySelector(".annouce-head__close-icon");
const goOnShopping = document.querySelector(".annouce-middle__content");
const cartQuantity = document.querySelector(".header-nav__cart-count");
const noProductsPanel = document.querySelector(".content-cart__desc");
const productQuantityInCart = document.querySelector(".content-cart__amount-number");

const allProducts = [];
allProducts.push(...products);
allProducts.push(...outstandingProducts);
allProducts.push(...bestsellerProducts);
allProducts.push(...accessoryProduct);
allProducts.push(...maleProducts);

function addItemsToCart(product, quantity, totalPrice, image) {
  const existingItem = cart.findIndex((item) => item.id === product.id);

  // If products already exist in the cart, update their quantity
  if (existingItem !== -1) {
    cart[existingItem].quantity += quantity;
    cart[existingItem].totalPrice += parseFloat(totalPrice);
  } else {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      totalPrice,
    };
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = cart.reduce((accumulate, item) => accumulate + item.quantity, 0);
  if (cartQuantity) cartQuantity.textContent = cartCount;
  if (productQuantityInCart) productQuantityInCart.textContent = cartCount;
}

// Constantly update
updateCartCount();

function hideInformation() {
  body.removeChild(annouceWrap);
  overlay.style.display = "none";
  isInformationDisplayed = false;
}

// Initialize a flag keep track of whether the information is displayed
let isInformationDisplayed = false;
let annouceWrap;

function displayInformation(productId) {
  annouceWrap = document.createElement("div");
  annouceWrap.className = "annouce-wrap";

  if (annouceWrap.parentElement) {
    body.removeChild(annouceWrap);
  }

  // Get the selected product
  const product = allProducts.find((item) => item.id === parseInt(productId));

  if (!product) {
    console.log(`The product with the ID ${productId} not found!`);
    return;
  }

  // Get the quantity from the input field
  const quantity = parseInt(quantityInput.value);
  let totalPrice = 0;
  if (product.price !== "Liên Hệ") {
    totalPrice = parseFloat(product.price) * quantity;
  } else {
    totalPrice = "Liên Hệ";
  }

  const html = `
          <div class="annouce-head">
                    <div class="annouce-head__heading">
                              <p class="annouce-head__title">
                                        <i class="ti-check annouce-head__check-icon"></i>
                              Thêm vào giỏ hàng thành công
                              </p>
                              <i onclick="hideInformation()" class="ti-close annouce-head__close-icon"></i>
                    </div>
                    <div class="annouce-head__body">
                              <div class="annouce-head__body-img">
                                        <img src="${product.image}" alt="Image">
                              </div>
                              <div class="annouce-head__body-content">
                                        <div class="annouce-head__body-name">${product.title}</div>
                                        <div class="annouce-head__body-amount">Số lượng: <span class="quantity">${quantity}</span></div>
                                        <div class="annouce-head__body-total">Tổng tiền: <span class="total">${totalPrice}</span></div>
                              </div>
                    </div>
          </div>
          <div class="annouce-middle">
                    <button onclick="hideInformation()" type="button" class="annouce-middle__content">Tiếp tục mua hàng</button>
          </div>
          <div class="annouce-tail">
                    <a href="../cart.html" type="button" class="annouce-tail__check-cart">Kiểm tra giỏ hàng</a>
          </div>
          `;

  annouceWrap.innerHTML = html;
  body.appendChild(annouceWrap);
  overlay.style.display = "block";

  addItemsToCart(product, quantity, totalPrice, product.image);
  updateCartCount();

  isInformationDisplayed = true;
}

if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    displayInformation(productId);
  });
}

function displayProductCart() {
  const productPay = document.querySelector(".pay-product");
  const optionCart = document.querySelector(".option-cart");

  if (noProductsPanel) {
    if (parseInt(cartQuantity.textContent) <= 0) {
      noProductsPanel.innerHTML = `
            Không có sản phẩm nào trong giỏ hàng. Quay lại
            <a href="./store_page1.html" class="content-cart__link">cửahàng</a> để tiếp tục mua sắm
            `;
      productPay.style.display = "none";
      optionCart.style.display = "none";
    } else {
      let html = "";
      cart.forEach((item) => {
        const { id, title, image, totalPrice, quantity } = item;
        html += `
            <div class="content-cart-product">
                <div class="content-cart-product__img">
                    <a href="../details.html?productId=${id}" target="_self" class="content-cart-product__img-link">
                        <img src="${image}" alt="" >
                    </a>
                </div>
                <div class="content-cart-product__info">
                    <div class="content-cart-product__info-wrap-amout">
                        <span class="content-cart-product__info-title">${title}</span>
                        <span class="content-cart-product__info-price">${totalPrice}</span>
                    </div>
                    <div class="content-cart-product__info-wrap-icon">
                        <span>Số lượng: ${quantity}</span>
                        <div onclick="displayConfirmDelete(${id})" class="content-cart-product__infor-icon">
                            <i class="content-cart-product__infor-wrap-icon-link ti-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
        noProductsPanel.innerHTML = html;
      });

      let totalPrice = cart.reduce((accumulate, item) => {
        return item.totalPrice === "Liên Hệ" ? accumulate + 0 : accumulate + parseFloat(item.totalPrice);
      }, 0);

      totalPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice);

      productPay.innerHTML = `
            <div class="pay-product__total-product">
                <p class="pay-product__total-product-title">Thành tiền</p>
                <p class="pay-product__total-product-price">${totalPrice}</p>
            </div >
            <div class="pay-product__ship">
                <p class="pay-product__ship-title">Phí vận chuyển</p>
                <p class="pay-product__ship-price">Tính lúc thanh toán</p>
            </div>
            <div class="pay-product__total-bill">
                <p class="pay-product__total-bill-title">Tổng tiền</p>
                <p class="pay-product__total-bill-price">Tính lúc thanh toán</p>
            </div>
            `;
      optionCart.innerHTML = `
                <button onclick="carryOnShopping()" type="button" class="option-cart__btn go-on">Tiếp tục mua sắm</button>
                <button onclick="moveToPaymentpage()" type="button" class="option-cart__btn">Tiến hành thanh toán</button>
            `;
    }
  }
}

displayProductCart();

function carryOnShopping() {
  window.location.href = "../index.html";
}

function moveToPaymentpage() {
  window.location.href = "../payment.html";
}

// Move to the login and signin page
function loginPage() {
  const loginLink = document.querySelector(".btn.btn--sign-in");
  window.location.href = "../login/dean1.html";
}

function registerPage() {
  const registerLink = document.querySelector(".btn.btn--sign-out");
  window.location.href = "../login/dean2.html";
}

const confirmDeletePanel = document.querySelector(".annouce-delete-product");
const yesConfirm = document.querySelector(".annouce-delete-product__body-text");
const noConfirm = document.querySelector(".annouce-delete-product__footer-text");
function displayConfirmDelete(productId) {
  confirmDeletePanel.style.display = "block";
  overlay.style.display = "block";
  confirmDeletePanel.addEventListener("click", (e) => e.stopPropagation());
  if (yesConfirm) {
    yesConfirm.addEventListener("click", () => {
      confirmDeletePanel.style.display = "none";
      overlay.style.display = "none";
      removeProduct(productId);
    });
  }
  if (noConfirm) {
    noConfirm.addEventListener("click", () => {
      confirmDeletePanel.style.display = "none";
      overlay.style.display = "none";
    });
  }
}

function deleteItemFromCart(productId) {
  cart = cart.filter((product) => product.id !== parseInt(productId));
  localStorage.setItem("cart", JSON.stringify(cart));
  displayProductCart();
  updateCartCount();
}

function removeProduct(productId) {
  deleteItemFromCart(productId);
  displayProductCart();
  updateCartCount();
}

function removeAllProduct() {
  localStorage.removeItem("cart");
}

// ============================================ ADDITIONAL PRODUCTS ============================================
const menuIcon = document.querySelector(".header-nav__menu-icon");
const menuPanel = document.querySelector(".nav");

if (menuIcon) {
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menuPanel.style.transform = "translateX(0)";
    menuPanel.style.opacity = "1";
    overlay.style.display = "block";
  });
}

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target !== menuPanel && e.target !== menuIcon) {
      menuPanel.style.transform = "translateX(-100%)";
      menuPanel.style.opacity = "0";
      overlay.style.display = "none";
      confirmDeletePanel.style.display = "none";
    }
  });
}
if (menuPanel) {
  // prevent capturing phase in the Propagation event
  menuPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ============================================ PAYMENT PAGE ============================================
function loadPaymentPage() {
  const paymentQuantity = document.querySelector(".payment-right-header");
  const paymentContainProducts = document.querySelector(".payment-right-body-contain-products");

  // Set the total of product quantity
  let totalQuantity = cart.reduce((accumulate, item) => {
    return accumulate + item.quantity;
  }, 0);
  if (paymentQuantity) {
    paymentQuantity.innerText = `Đơn hàng (${totalQuantity} sản phẩm)`;
  }

  // The delivery fee is 40.000đ
  const deliveryFee = 40000;
  // Calculate total of all products in the cart
  let totalPrice = cart.reduce((accumulate, item) => {
    return accumulate + item.totalPrice;
  }, 0);

  // Calculate the price customer has to pay (include the delivery fee)
  const finalTotalPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice + deliveryFee);

  let html = "";
  cart.forEach((item) => {
    const { title, image, price, quantity } = item;
    const formattedPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    html += `
        <div class="payment-right-body__products">
            <div class="payment-right-body__products-wrap">
                <img src="${image}" alt="Image" class="payment-right-body__products-image">
                <p class="payment-right-body__products-name">${title} (${quantity})</p>
            </div>
            <p class="payment-right-body__products-price">${formattedPrice}</p>
        </div>
        `;
  });

  if (paymentContainProducts) {
    paymentContainProducts.innerHTML = html;
  }

  document.querySelector(".payment-right-body__estimate-delivery p:last-child").textContent = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(deliveryFee);
  document.querySelector(".payment-right-body__estimate-price p:last-child").textContent = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice);
  document.querySelector(".payment-right-body__total p:last-child").textContent = finalTotalPrice;
}

loadPaymentPage();

// ============================================ CUSTOMER FORM VALIDATION ============================================
function validate(inputValue, error, message, emailRegex) {
  if (inputValue) {
    const getValue = inputValue.value.trim();
    if (!getValue) {
      error.textContent = message;
      error.classList.add("invalid");
      inputValue.classList.add("input-error");
    } else if (emailRegex && !emailRegex.test(getValue)) {
      error.textContent = "Email không đúng định dạng!";
      error.classList.add("invalid");
      inputValue.classList.add("input-error");
      return; // Exit early if email is invalid
    } else {
      error.textContent = "";
      error.classList.remove("invalid");
      inputValue.classList.remove("input-error");
      return true;
    }

    // If the user goes on typing
    inputValue.addEventListener("input", () => {
      error.textContent = "";
      error.classList.remove("invalid");
      inputValue.classList.remove("input-error");
    });
  }
}

function validateInputCheck(inputValue, error) {
  if (inputValue.checked) {
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}

function validateInput() {
  const customerEmail = document.querySelector("input[name='email']");
  const customerName = document.querySelector("input[name='name']");
  const customerAddress = document.querySelector("input[name='province']");
  const deliveryMethod = document.querySelector("#radio-delivery-method");
  const deliveryMethodError = document.querySelector(".payment-customer-delivery-method-error");
  const errorMessage = document.querySelectorAll(".error-message");
  const orderBtn = document.querySelector(".payment-right-body__footer-order-btn");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function areAllFieldsValid() {
    const isValidEmail = validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
    const isValidName = validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
    const isValidAddress = validate(customerAddress, errorMessage[2], "Vui lòng điền địa chỉ", null);
    const isValidDeliveryMethod = deliveryMethod.checked || validateInputCheck(deliveryMethod, deliveryMethodError);

    return isValidEmail && isValidName && isValidAddress && isValidDeliveryMethod;
  }

  // Check if the user is logged in before allowing them to place an order
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user) {
        alert("Please log in to place an order");
      } else {
        if (areAllFieldsValid()) {
          alert("Your order is placed successfully!");
          removeAllProduct();
          window.location.href = "../";
        }
      }
    });
  }

  customerEmail.addEventListener("blur", () => {
    validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
  });

  customerName.addEventListener("blur", () => {
    validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
  });

  customerAddress.addEventListener("blur", () => {
    validate(customerAddress, errorMessage[2], "Vui lòng điền địa chỉ", null);
  });

  deliveryMethod.addEventListener("change", () => {
    validateInputCheck(deliveryMethod, deliveryMethodError);
  });

  // Check the input fields when the order button is clicked
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      validateInputCheck(deliveryMethod, deliveryMethodError);
      validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
      validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
      validate(customerAddress, errorMessage[2], "Vui lòng điền địa chỉ", null);
    });
  }
}

// Make sure the document is fully loaded
document.addEventListener("DOMContentLoaded", validateInput);
