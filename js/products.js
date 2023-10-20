// ============================================ GET PRODUCTS FROM THE JSON FILES ===========================================
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
const accessoryProduct = JSON.parse(localStorage.getItem("accessory")) || [];
const maleProducts = JSON.parse(localStorage.getItem("male")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let placedOrder = JSON.parse(localStorage.getItem("placedOrder")) || [];

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
allProducts.push(...products, ...outstandingProducts, ...bestsellerProducts, ...accessoryProduct, ...maleProducts);

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
                  <i class="ti-check annouce-head__check-icon"></i>Thêm vào giỏ hàng thành công
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

function displayConfirmDelete(productId) {
  const confirmDeletePanel = document.querySelector(".annouce-delete-product");
  const yesConfirm = document.querySelector(".annouce-delete-product__body-text");
  const noConfirm = document.querySelector(".annouce-delete-product__footer-text");

  if (confirmDeletePanel && yesConfirm && noConfirm) {
    if (confirmDeletePanel || overlay || confirmDeletePanel) {
      confirmDeletePanel.style.display = "block";
      overlay.style.display = "block";
      confirmDeletePanel.addEventListener("click", (e) => e.stopPropagation());
    }

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
      const confirmDeletePanel = document.querySelector(".annouce-delete-product");
      if (confirmDeletePanel) {
        confirmDeletePanel.style.display = "none";
      }
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
    if (item.totalPrice === "Liên Hệ") {
      return accumulate + 0;
    }
    return accumulate + item.totalPrice;
  }, 0);

  // Calculate the price customer has to pay (include the delivery fee)
  const finalTotalPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice + deliveryFee);

  let html = "";
  cart.forEach((item) => {
    const { title, image, price, quantity } = item;
    var formattedPrice;
    if (price === "Liên Hệ") {
      formattedPrice = "Liên Hệ";
    } else {
      formattedPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    }
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

  if (document.querySelector(".payment-right-body__estimate-delivery p:last-child")) {
    document.querySelector(".payment-right-body__estimate-delivery p:last-child").textContent = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(deliveryFee);
  }
  if (document.querySelector(".payment-right-body__estimate-price p:last-child")) {
    document.querySelector(".payment-right-body__estimate-price p:last-child").textContent = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice);
  }
  if (document.querySelector(".payment-right-body__total p:last-child")) {
    document.querySelector(".payment-right-body__total p:last-child").textContent = finalTotalPrice;
  }
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

// Auto fill phone number, email, name
function autoFillInfo() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const customerEmail = document.querySelector("input[name='email']");
  const customerName = document.querySelector("input[name='name']");
  const customerPhoneNumber = document.querySelector("input[name='phone-number']");

  if (user && customerEmail && customerName && customerPhoneNumber) {
    customerEmail.value = user.email;
    customerName.value = user.firstName + " " + user.lastName;
    customerPhoneNumber.value = user.phoneNumber;
  }
}

document.addEventListener("DOMContentLoaded", autoFillInfo);

// Validate and verify order for the customer
function validateInput() {
  const customerEmail = document.querySelector("input[name='email']");
  const customerName = document.querySelector("input[name='name']");
  const customerProvince = document.querySelector("select[name='provinces']");
  const customerDistrict = document.querySelector("select[name='districts']");
  const customerWard = document.querySelector("select[name=wards]");
  const deliveryMethod = document.querySelector("#radio-delivery-method");
  const deliveryMethodError = document.querySelector(".payment-customer-delivery-method-error");
  const errorMessage = document.querySelectorAll(".error-message");
  const orderBtn = document.querySelector(".payment-right-body__footer-order-btn");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function areAllFieldsValid() {
    const isValidEmail = validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
    const isValidName = validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
    const isProvince = validate(customerProvince, errorMessage[2], "Vui lòng chọn Tỉnh/Thành phố", null);
    const isDistrict = validate(customerDistrict, errorMessage[3], "Vui lòng chọn Quận/Huyện", null);
    const isWard = validate(customerWard, errorMessage[4], "Vui lòng chọn Phường/Xã", null);
    const isValidDeliveryMethod = deliveryMethod.checked || validateInputCheck(deliveryMethod, deliveryMethodError);

    return isValidEmail && isValidName && isProvince && isDistrict && isWard && isValidDeliveryMethod;
  }

  // Check if the user is logged in before allowing them to place an order
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      if (cart.length !== 0) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          alert("Please log in to place an order");
        } else {
          if (areAllFieldsValid()) {
            placeOrder();
          }
        }
      } else {
        alert("Sorry, your cart is empty!");
        return;
      }
    });
  }

  if (customerEmail && customerName && deliveryMethod) {
    customerEmail.addEventListener("blur", () => {
      validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
    });

    customerName.addEventListener("blur", () => {
      validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
    });

    deliveryMethod.addEventListener("change", () => {
      validateInputCheck(deliveryMethod, deliveryMethodError);
    });
  }

  // Check the input fields when the order button is clicked
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      validateInputCheck(deliveryMethod, deliveryMethodError);
      validate(customerEmail, errorMessage[0], "Vui lòng điền email", emailRegex);
      validate(customerName, errorMessage[1], "Vui lòng điền họ và tên", null);
    });
  }
}
// =================================================== PLACED ORDERS ======================================================
function getLastOrderId() {
  const lastOrderId = JSON.parse(localStorage.getItem("lastOrderId"));
  return lastOrderId ? parseInt(lastOrderId, 10) : 0;
}

function setLastOrderId(lastOrderId) {
  localStorage.setItem("lastOrderId", lastOrderId.toString());
}

// Get the order information
function gatherOrderInfo() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateAndTime = day + "/" + month + "/" + year;
  const customerAddress = `${document.querySelector("select[name='wards']").value}, ${document.querySelector("select[name='districts']").value}, ${document.querySelector("select[name='provinces']").value}`;
  console.log(customerAddress);
  const finalTotalPrice = document.querySelector(".payment-right-body__total p:last-child").textContent;
  const paymentStatus = "Chưa thu tiền";
  const deliveryStatus = "Chưa vận chuyển";
  const customerNote = document.querySelector("input[name='note']").value ? document.querySelector("input[name='note']").value : "Không có ghi chú";

  return {
    dateAndTime,
    customerAddress,
    finalTotalPrice,
    paymentStatus,
    deliveryStatus,
    customerNote,
  };
}

function placeOrder() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    const order = gatherOrderInfo();

    addPlaceOrder(user.email, order);
  }
}

function addPlaceOrder(userEmail, order) {
  const lastOrderId = getLastOrderId();
  const userPlacedOrdersKey = `placedOrders_${userEmail}`;
  const userPlacedOrders = JSON.parse(localStorage.getItem(userPlacedOrdersKey)) || [];

  // Increase the order id by one when the user clicks on the payment button
  const newOrderId = lastOrderId + 1;
  order.id = newOrderId;

  // Push the cart items into the order
  order.items = [...cart];

  // Add new order ID by incrementing the last order id
  userPlacedOrders.push(order);
  localStorage.setItem(userPlacedOrdersKey, JSON.stringify(userPlacedOrders));

  // Update the last order id
  setLastOrderId(newOrderId);

  // Clear the cart
  localStorage.removeItem("cart");

  alert("Your order is placed successfully!");
  window.location.href = "../account.html";
}

function displayPlacedOrdersTable(userEmail) {
  // const placedOrders = JSON.parse(localStorage.getItem("placedOrders")) || [];
  const userPlacedOrdersKey = `placedOrders_${userEmail}`;
  const userPlacedOrders = JSON.parse(localStorage.getItem(userPlacedOrdersKey)) || [];
  const tableBody = document.getElementById("placed-order-list");

  if (tableBody) {
    userPlacedOrders.forEach((order) => {
      const newRow = tableBody.insertRow();

      // Create cells for each column
      const placedOrderId = newRow.insertCell(0);
      const placedOrderDate = newRow.insertCell(1);
      const placedOrderAddress = newRow.insertCell(2);
      const placedOrderPrice = newRow.insertCell(3);
      const placedOrderGetMoney = newRow.insertCell(4);
      const placedOrderDelivery = newRow.insertCell(5);

      placedOrderId.textContent = "#" + order.id;
      placedOrderDate.textContent = order.dateAndTime;
      placedOrderAddress.textContent = order.customerAddress;
      placedOrderPrice.textContent = order.finalTotalPrice;
      placedOrderGetMoney.textContent = order.paymentStatus;
      placedOrderDelivery.textContent = order.deliveryStatus;

      placedOrderId.classList.add("table-row__body");
      placedOrderId.classList.add("table-row__body--id");
      placedOrderDate.classList.add("table-row__body");
      placedOrderAddress.classList.add("table-row__body");
      placedOrderPrice.classList.add("table-row__body");
      placedOrderGetMoney.classList.add("table-row__body");
      placedOrderDelivery.classList.add("table-row__body");
    });
  }
}

// Make sure the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  validateInput();
  convertInfo();
});

// ============================================ CHANGE PASSWORD FORM ============================================
function changePassword() {
  const formInputGroup = document.querySelectorAll(".form-input");
  const oldPasswordInput = document.getElementById("opassword");
  const newPasswordInput = document.getElementById("npassword");
  const verifyPasswordInput = document.getElementById("vpassword");
  const changePasswordBtn = document.querySelector(".change-password-btn");
  const errorMessage = document.querySelectorAll(".error-message");

  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const oldPassword = oldPasswordInput.value.trim();
      const newPassword = newPasswordInput.value.trim();
      const verifyPassword = verifyPasswordInput.value.trim();

      // Clear previous error messages
      errorMessage.forEach((message) => {
        message.textContent = "";
        message.classList.remove("invalid");
      });

      let isValid = true;

      if (!updatePassword(oldPassword, newPassword, verifyPassword)) {
        errorMessage[0].textContent = "Mật khẩu cũ không tồn tại";
        errorMessage[0].classList.add("invalid");
        isValid = false;
      }

      if (newPassword === "") {
        errorMessage[1].textContent = "Vui lòng nhập mật khẩu mới!";
        errorMessage[1].classList.add("invalid");
        isValid = false;
      }

      if (verifyPassword === "") {
        errorMessage[2].textContent = "Vui lòng xác nhận mật khẩu mới!";
        errorMessage[2].classList.add("invalid");
        isValid = false;
      } else if (verifyPassword !== newPassword) {
        errorMessage[2].textContent = "Xác nhận mật khẩu không khớp";
        errorMessage[2].classList.add("invalid");
        isValid = false;
      }

      if (isValid) {
        updatePassword(oldPassword, newPassword, verifyPassword);
      }
    });
  }

  // If the user goes on typing, hide the error message
  formInputGroup.forEach((form) => {
    form.querySelector("input").addEventListener("input", () => {
      form.querySelector(".error-message").textContent = "";
      form.querySelector(".error-message").classList.remove("invalid");
    });
  });
}

function updatePassword(oldPassword, newPassword, verifyPassword) {
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userToUpDate = users.find((user) => user.email === currentUser.email && user.password === oldPassword);

  if (userToUpDate) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === currentUser.email && user.password === oldPassword) {
        // Check if newPassword is not an empty string before updating
        if (newPassword.trim() !== "" && verifyPassword === newPassword) {
          user.password = newPassword;
          localStorage.setItem("users", JSON.stringify(users));
          alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại!");
          // Logout when changing password successfully
          localStorage.removeItem("currentUser");
          alert("Log out successfully!");
          window.location.href = "../";
        }
        return true; // Password updated successfully
      }
    }
  }

  return false; // password updated failed
}

// ============================================ ACCOUNT INFORMATION ============================================
function convertInfo() {
  const customerInfoList = document.querySelectorAll(".page-account-list__item");
  const customerContainer = document.querySelector(".page-account-right");
  const getCustomerInfo = JSON.parse(localStorage.getItem("currentUser"));

  customerInfoList.forEach((info) => {
    // Remove active class from all items
    info.addEventListener("click", () => {
      customerInfoList.forEach((item) => item.classList.remove("page-account-list__item--active"));

      // Add active class to the clicked item
      info.classList.add("page-account-list__item--active");

      // Clear the container
      customerContainer.innerHTML = "";

      if (info === customerInfoList[0]) {
        const html = `
        <p class="page-account-header">THÔNG TIN TÀI KHOẢN</p>
        <div class="page-account-info">
          <div class="page-account-info__item">Họ tên: <span>${getCustomerInfo.firstName + " " + getCustomerInfo.lastName}</span></div>
          <div class="page-account-info__item">Email: <span>${getCustomerInfo.email}</span></div>
          <div class="page-account-info__item">Phone number: <span>${getCustomerInfo.phoneNumber}</span></div>
        </div>
      `;
        customerContainer.innerHTML = html;
        document.querySelector(".content-navigation__link.content-navigation__link--active").textContent = "Thông tin khách hàng";
      } else if (info === customerInfoList[1]) {
        const html = `
          <p class="page-account-header">ĐƠN HÀNG CỦA BẠN</p>
          <table>
            <thead>
              <tr class="table-row">
                <th class="table-row__head">Đơn hàng</th>
                <th class="table-row__head">Ngày</th>
                <th class="table-row__head">Địa chỉ</th>
                <th class="table-row__head">Giá trị đơn hàng</th>
                <th class="table-row__head">Thanh toán</th>
                <th class="table-row__head">Vận chuyển</th>
              </tr>
            </thead>
            <tbody id="placed-order-list">
            </tbody>
          </table>
        `;
        customerContainer.innerHTML = html;
        // displayPlacedOrdersTable();
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
          displayPlacedOrdersTable(user.email);
        }
        document.querySelector(".content-navigation__link.content-navigation__link--active").textContent = "Đơn hàng";
        renderPlacedOrdersDetails();
      } else if (info === customerInfoList[2]) {
        const html = `
        <form action="" method="get" id="form-1">
          <p class="page-account-header">ĐỔI MẬT KHẨU</p>
          <div class="page-account-list__item">Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</div>
          <div class="form-input">
            <label for="opassword">Mật khẩu cũ *</label>
            <input id="opassword" class="old-password" type="password" placeholder="Nhập mật khẩu cũ" />
            <div class="error-message"></div>
          </div>
          <div class="form-input">
            <label for="npassword">Mật khẩu mới *</label>
            <input id="npassword" class="new-password" type="password" placeholder="Nhập mật khẩu mới" />
            <div class="error-message"></div>
          </div>
          <div class="form-input">
            <label for="vpassword">Xác nhận lại mật khẩu *</label>
            <input id="vpassword" class="verify-password" type="password" placeholder="Xác nhận mật khẩu mới" />
            <div class="error-message"></div>
          </div>
          <button type="button" class="change-password-btn btn btn--active">Đặt lại mật khẩu</button>
        </form>
      `;
        customerContainer.innerHTML = html;
        changePassword();
        document.querySelector(".content-navigation__link.content-navigation__link--active").textContent = "Thay đổi mật khẩu";
      } else if (info === customerInfoList[3]) {
        const html = `
        <p class="page-account-header">SỔ ĐỊA CHỈ</p>
        `;
        customerContainer.innerHTML = html;
        document.querySelector(".content-navigation__link.content-navigation__link--active").textContent = "Sổ địa chỉ";
      }
    });
  });
}

convertInfo();

// ============================================================ THE PLACED ORDERS DETAILS ============================================================

function renderPlacedOrdersDetails() {
  const placedProductsId = document.querySelectorAll(".table-row__body--id");
  const pageRightPanel = document.querySelector(".page-account-right");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = `placedOrders_${user.email}`;
  const placedOrdersList = JSON.parse(localStorage.getItem(currentUser));
  let elementId;

  if (pageRightPanel) {
    placedProductsId.forEach((element) => {
      element.addEventListener("click", () => {
        elementId = parseInt(element.textContent.slice(1));

        const placedOrderedClicked = placedOrdersList.find((product) => product.id === elementId);

        // Reset right panel before rendering
        pageRightPanel.textContent = "";
        const html = `
        <div class="page-account-right-details">
                
              <div class="row header-date-wrap">
                <div class="header-date header-common">Chi tiết đơn hàng: <span>${element.textContent}</span></div>
                <div class="placed-order-date header-common">Ngày tạo: <span>${placedOrderedClicked.dateAndTime}</span></div>
              </div>
              <div class="row wrap-status">
                <div class="payment-status not-status">Trạng thái thanh toán: <span>Chưa thanh toán</span></div>
                <div class="delivery-status not-status">Trạng thái vận chuyển: <span>Chưa vận chuyển</span></div>
              </div>
              <div class="row wrap-info">
                <div class="col l-6">
                  <div class="header-info">ĐỊA CHỈ GIAO HÀNG</div>
                  <div class="header-info__box">
                    <div class="header-info__box-content">
                      <div class="header-info__box-name">${user.firstName + " " + user.lastName}</div>
                      <div class="header-info__box-address">
                        Địa chỉ: <span>${placedOrderedClicked.customerAddress}</span>
                      </div>
                      <div class="header-info__box-phone">
                        Số điện thoại: <span>${user.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col l-3">
                  <div class="header-info">THANH TOÁN</div>
                    <div class="header-info__box">
                        <div class="header-info__box-method">Thanh toán khi giao hàng</div> 
                    </div>
                </div>
                <div class="col l-3">
                  <div class="header-info">GHI CHÚ</div>
                  <div class="header-info__box">
                    <div class="header-info__box-note">${placedOrderedClicked.customerNote}</div>
                  </div>
                </div>
              </div>

              <!-- THE PLACED ORDERS -->
              <div class="wrap-placed-products">
                <div class="row wrap-placed-products__row">
                  <div class="col l-5">Sản phẩm</div>
                  <div class="col l-3">Đơn giá</div>
                  <div class="col l-1">Số lượng</div>
                  <div class="col l-3">Tổng</div>
                </div>
                
                
                
              </div>
              <div class="row  placed-products-footer-wrap">
                <div class="col l-12 placed-products-footer">
                  <div class="placed-products-footer__top">
                    <div class="placed-products-footer__top-discount">Khuyến mại</div>
                    <div class="placed-products-footer__common-price">0đ</div>
                  </div>
                  <div class="placed-products-footer__middle">
                    <div class="placed-products-footer__middle-delivery">Phí vận chuyển</div>
                    <div class="placed-products-footer__common-price">40.000đ (Giao hàng tận nơi)</div>
                  </div>
                  <div class="placed-products-footer__bottom">
                    <div class="placed-products-footer__bottom-total">Tổng tiền</div>
                    <div class="placed-products-footer__common-price placed-products-footer__common-price--modify">${placedOrderedClicked.finalTotalPrice}</div>
                  </div>
                </div>
              </div>
              
              </div>
        `;
        pageRightPanel.innerHTML = html;

        const divElement = document.createElement("div");
        divElement.classList.add("wrap-placed-products__body");

        const htmlProducts = placedOrderedClicked.items
          .map((product) => {
            return `
          <div class="row wrap-product-list">
            <div class="col l-5">
              <div class="placed-products">
                <div class="placed-products_info">
                  <img src="${product.image}" alt="" class="placed-products_info-img">
                  <a href="../details.html?productId=${product.id}" class="placed-products_info-name">${product.title}</a>
                </div>
              </div>
            </div>
            <div class="col l-3">
              <div class="placed-products-price">${!isNaN(product.price) ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price) : "Liên hệ"}</div>
            </div>
            <div class="col l-1">
              <div class="placed-products-quantity">${product.quantity}</div>
            </div>
            <div class="col l-3">
              <div class="placed-products-total">${!isNaN(product.price) ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.totalPrice) : "Liên hệ"}</div>
            </div>
          </div>
          `;
          })
          .join("");
        divElement.innerHTML = htmlProducts;
        document.querySelector(".wrap-placed-products").appendChild(divElement);
      });
    });
  }
}
