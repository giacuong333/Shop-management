const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Using IIFE
(function renderInfo() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const ordersPlaced = JSON.parse(localStorage.getItem(`placedOrders_${currentUser.email}`));
  const productsPlaced = ordersPlaced[ordersPlaced.length - 1].items;

  const confirm = $(".info-confirm");
  const customerName = $$(".info-user__name");
  const customerEmail = $(".info-user__email");
  const customerPhoneNumber = $$(".info-user__phone");
  const customerAddress = $(".info-user__address");

  const productPlacedId = $(".info-products-placed__id");
  const productsPlacedContainer = $(".info-products-placed__items");
  const tempPrice = $(".info-products-placed__delivery-first-row span:last-child");
  const finalPrice = $(".info-products-placed__total-row span:last-child");

  confirm.textContent = `Một email xác nhận đã được gửi tới ${currentUser.email}.`;
  customerName[0].textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  customerName[1].textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  customerEmail.textContent = `${currentUser.email}`;
  customerPhoneNumber[0].textContent = `${currentUser.phoneNumber}`;
  customerPhoneNumber[1].textContent = `${ordersPlaced[ordersPlaced.length - 1].customerPhone}`;
  customerAddress.textContent = `${ordersPlaced[ordersPlaced.length - 1].customerAddress}`;
  productPlacedId.textContent = `Đơn hàng #${ordersPlaced[ordersPlaced.length - 1].id} (${productsPlaced.length})`;

  const html = productsPlaced.map((item) => {
    const { id, title, image, price, quantity, totalPrice } = item;
    const finalTotalPrice = price.toLowerCase() != "Liên hệ".toLowerCase() ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price) : "Liên hệ";

    return `
          <div class="info-products-placed__item">
                  <div class="info-products-placed__item-left">
                    <img src="${image}" alt="Image" />
                    <div class="info-products-placed__item-name">${title} (${quantity})</div>
                  </div>
                  <div class="info-products-placed__item-right">${finalTotalPrice}</div>
          </div>
    `;
  });
  productsPlacedContainer.innerHTML = html.join("");

  let tempPriceCaculate = productsPlaced.reduce((accum, item) => {
    if (item.price.toLowerCase() == "Liên hệ".toLowerCase()) {
      return accum + 0;
    }
    const temp = item.quantity * parseInt(item.price);
    return accum + temp;
  }, 0);

  tempPriceCaculate = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tempPriceCaculate);
  tempPrice.textContent = tempPriceCaculate;

  finalPrice.textContent = ordersPlaced[ordersPlaced.length - 1].finalTotalPrice;

  console.log(productsPlaced);
})();

// Navigate to the home page
$(".go-on-shopping-btn").onclick = function () {
  window.location.href = "../index.html";
};
