var noText = document.querySelector(".annouce-delete-product__footer-text")
var annouceProductPanel = document.querySelector(".annouce-delete-product")
var overlayPanel = document.querySelector(".overlay")

// Close annouce panel when click to the "Không" button
noText.addEventListener("click", () => {
          annouceProductPanel.style.display = "none"
          overlayPanel.style.display = "none"
})

// Open annouce panel when click to the trash icon
var trashIcon = document.querySelector(".content-cart-product__infor-wrap-icon-link")
trashIcon.addEventListener("click", () => {
          annouceProductPanel.style.display = "block"
          overlayPanel.style.display = "block"
})