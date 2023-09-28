// To make sure that every elemetns in DOM is loaded
const item = document.querySelector(".content-cart__desc")
const innerItem = document.querySelector(".content-cart-product")
const yesButton = document.querySelector(".annouce-delete-product__body-text")
const trashButton = document.querySelector(".content-cart-product__infor-icon")
const annouce = document.querySelector(".annouce-delete-product")
const closeButton = document.querySelector(".annouce-head__close-icon")
const overlay = document.querySelector(".overlay")
const carryOnButton = document.querySelector('.annouce-middle__content')
const amountCart = document.querySelector('.header-nav__cart-count')

const buyButton = document.querySelector(".mua")
const productName = document.querySelector(".ten")
const productImage = document.querySelector(".annouce-head__body-img img")
const productAmount = document.querySelector(".soluong")
const productPrice = document.querySelector(".gia")
const annouceAddToCart = document.querySelector(".annouce-wrap")

// set localStorage
function setCart(cart) {
          localStorage.setItem("cart", JSON.stringify(cart))
}

// get localStorage
function getCart() {
          return JSON.parse(localStorage.getItem("cart"))
}

let cart = getCart() || []

// add product to cart
function addToCart(product) {
          cart.push(product)
          setCart(cart)
}

// delete product from cart 
function deleteFromCart(productId) {
          cart = cart.filter(product => productId === product.id)
          setCart(cart)
}

