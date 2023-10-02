// ============================================ GET PRODUCTS FROM THE JSON FILES ============================================
async function fetchDataAndParse(url, key) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        localStorage.setItem(key, JSON.stringify(data))
        if (!JSON.parse(localStorage.getItem("cart"))) {
            localStorage.setItem("cart", "[]")
        }
    } catch (error) {
        console.log("Fetching data failed!")
    }
}

fetchDataAndParse("../JSON/products.json", "products")
fetchDataAndParse("../JSON/outstandingProduct.json", "outstanding")
fetchDataAndParse("../JSON/bestsellerProduct.json", "bestseller")

const products = JSON.parse(localStorage.getItem("products")) || []
const outstandingProducts = JSON.parse(localStorage.getItem("outstanding")) || []
const bestsellerProducts = JSON.parse(localStorage.getItem("bestseller")) || []
let cart = JSON.parse(localStorage.getItem("cart")) || []

// ============================================ RENDER PRODUCTS ============================================

const renderProducts = (category) => {
    const productList = document.querySelector("#products-area")
    productList.innerHTML = ""
    let productHTML = ""

    let categoryProducts;
    if (category === "new") {
        categoryProducts = products
    } else if (category === "outstanding") {
        categoryProducts = outstandingProducts
    } else {
        categoryProducts = bestsellerProducts
    }

    categoryProducts.forEach(product => {
        const { id, title, price, oldPrice, image, sale } = product

        if (id === 11)
            productHTML += `<h2 class="product-name">SẢN PHẨM HOT</h2>`

        let tempPrice = oldPrice || ""

        productHTML += `
        <div onclick="goToDetailsPage(${id})" class="col l-6 m-6 c-12 product-details">
            <a href="../details.html?productId=${id}" target="_self" class="product product--space ${sale}">
                <img src="${image}" alt="Image" class="product-img"/>
                <span class="product-desc">${title}</span>
                <span class="product-price">${price}</span>
                <span class="product-price-old">${tempPrice}</span>
            </a>
        </div>
        `
    })

    productList.innerHTML = productHTML
}

const outstandingButton = document.querySelector("#outstanding-btn")
const newButton = document.querySelector("#new-btn")
const bestSellerButton = document.querySelector("#best-seller-btn")

if (outstandingButton) {
    outstandingButton.addEventListener('click', () => {
        renderProducts("outstanding")
        outstandingButton.classList.add("btn--active")
        newButton.classList.remove("btn--active")
        bestSellerButton.classList.remove("btn--active")
    })
}

if (newButton) {
    newButton.addEventListener('click', () => {
        renderProducts("new")
        newButton.classList.add("btn--active")
        outstandingButton.classList.remove("btn--active")
        bestSellerButton.classList.remove("btn--active")
    })
}

if (bestSellerButton) {
    bestSellerButton.addEventListener('click', () => {
        renderProducts("bestseller")
        bestSellerButton.classList.add("btn--active")
        newButton.classList.remove("btn--active")
        outstandingButton.classList.remove("btn--active")
    })
}

// ============================================ GO TO THE DETAILS PAGE ============================================

function goToDetailsPage(productId) {
    const detailsPageUrl = `../details.html?productId=${productId}`
    window.location.href = detailsPageUrl
}

// Access the query string of the current page
const urlParams = new URLSearchParams(window.location.search)
// Get id from the query string
const productId = urlParams.get("productId")

function fetchProductDetails(productId) {
    let productCategory = productId >= 1 && productId <= 18 ? "new" : productId >= 19 && productId <= 28 ? "bestseller" : "outstanding"

    const categoryProducts = productCategory === "new" ? products : productCategory === "outstanding" ? outstandingProducts : bestsellerProducts

    // Find the product with the matching ID
    const product = categoryProducts.find(product => product.id === parseInt(productId))

    // Update the HTML content
    if (product) {
        document.querySelector(".ten").textContent = product.title
        document.querySelector(".gia").textContent = product.price
        document.querySelector(".chitiet").textContent = product.description
        document.querySelector(".anh").src = product.image
    } else {
        console.log("Product not found")
    }
}

fetchProductDetails(productId)

// ============================================ ADD PRODUCTS TO THE CART ============================================
const buyBtn = document.querySelector(".mua")
const quantityInput = document.querySelector(".soluong")

const productName = document.querySelector(".annouce-head__body-name")
const price = document.querySelector(".annouce-head__body-amount")
const total = document.querySelector(".annouce-head__body-total")

const overlay = document.querySelector(".overlay")
const body = document.querySelector(".than")

const closeBtn = document.querySelector(".annouce-head__close-icon")
const goOnShopping = document.querySelector(".annouce-middle__content")

const cartQuantity = document.querySelector(".header-nav__cart-count")

// 
const noProductsPanel = document.querySelector(".content-cart__desc")
const productQuantityInCart = document.querySelector(".content-cart__amount-number")

const allProducts = []
allProducts.push(...products)
allProducts.push(...outstandingProducts)
allProducts.push(...bestsellerProducts)

function addItemsToCart(product, quantity, totalPrice, image) {
    const existingItem = cart.findIndex(item => item.id === product.id)

    // If products already exist in the cart, update their quantity
    if (existingItem !== -1) {
        cart[existingItem].quantity += quantity
        cart[existingItem].totalPrice += parseFloat(totalPrice)
    } else {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity,
            totalPrice,
        }
        cart.push(item)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}

function updateCartCount() {
    const cartCount = cart.reduce((accumulate, item) => accumulate + item.quantity, 0)
    cartQuantity.textContent = cartCount
    if (productQuantityInCart)
        productQuantityInCart.textContent = cartCount
}

// Constantly update
updateCartCount()

function hideInformation() {
    body.removeChild(annouceWrap)
    overlay.style.display = "none"
    isInformationDisplayed = false
}

if (overlay) {
    overlay.style.display = "None"
}

// Initialize a flag keep track of whether the information is displayed
let isInformationDisplayed = false
let annouceWrap

function displayInformation(productId) {
    annouceWrap = document.createElement("div")
    annouceWrap.className = "annouce-wrap"

    if (annouceWrap.parentElement) {
        body.removeChild(annouceWrap)
    }

    // Get the selected product
    const product = allProducts.find((item) => item.id === parseInt(productId))
    console.log(product)

    if (!product) {
        console.log(`The product with the ID ${productId} not found!`)
        return
    }

    // Get the quantity from the input field
    const quantity = parseInt(quantityInput.value)
    let totalPrice = 0
    if (product.price !== "Liên Hệ") {
        totalPrice = parseFloat(product.price) * quantity
    } else {
        totalPrice = "Liên Hệ"
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
          `

    annouceWrap.innerHTML = html
    body.appendChild(annouceWrap)
    overlay.style.display = "block"

    addItemsToCart(product, quantity, totalPrice, product.image)
    updateCartCount()

    isInformationDisplayed = true
}

if (buyBtn) {
    buyBtn.addEventListener("click", () => {
        displayInformation(productId)
    })
}

function displayProductCart() {
    const productPay = document.querySelector(".pay-product")
    const optionCart = document.querySelector(".option-cart")

    if (parseInt(cartQuantity.textContent) <= 0) {
        noProductsPanel.innerHTML = `
            Không có sản phẩm nào trong giỏ hàng. Quay lại
            <a href="./store_page1.html" class="content-cart__link">cửahàng</a> để tiếp tục mua sắm
            `
        productPay.style.display = "none"
        optionCart.style.display = "none"
    } else {
        let html = ""
        cart.forEach(item => {
            const { id, title, image, totalPrice, quantity } = item
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
            `
            noProductsPanel.innerHTML = html
        })

        let totalPrice = cart.reduce((accumulate, item) => {
            return item.totalPrice === "Liên Hệ" ? accumulate + 0 : accumulate + parseFloat(item.totalPrice)
        }, 0)

        totalPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)

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
        `
        optionCart.innerHTML = `
            <button onclick="carryOnShopping()" type="button" class="option-cart__btn go-on">Tiếp tục mua sắm</button>
            <button type="button" class="option-cart__btn">Tiến hành thanh toán</button>
        `
    }
}

displayProductCart()

function carryOnShopping() {
    window.location.href = "../index.html"
}

function displayConfirmDelete(productId) {
    const confirmDeletePanel = document.querySelector(".annouce-delete-product")
    const yesConfirm = document.querySelector(".annouce-delete-product__body-text")
    const noConfirm = document.querySelector(".annouce-delete-product__footer-text")

    confirmDeletePanel.style.display = "block"
    overlay.style.display = "block"

    if (yesConfirm) {
        yesConfirm.addEventListener("click", () => {
            confirmDeletePanel.style.display = "none"
            overlay.style.display = "none"
            removeProduct(productId)
        })
    }

    if (noConfirm) {
        noConfirm.addEventListener("click", () => {
            confirmDeletePanel.style.display = "none"
            overlay.style.display = "none"
        })
    }
}

function deleteItemFromCart(productId) {
    cart = cart.filter(product => product.id !== parseInt(productId))
    localStorage.setItem("cart", JSON.stringify(cart))
    displayProductCart()
    updateCartCount()
}

function removeProduct(productId) {
    deleteItemFromCart(productId)
    displayProductCart()
    updateCartCount()
}



