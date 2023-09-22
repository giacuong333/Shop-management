// push cart onto local storage
pushCart = (products) => localStorage.setItem("products", JSON.stringify(products))

// get cart from local storage 
getCart = () => localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []

// To make sure that every elemetns in DOM is loaded
let item = document.querySelector(".content-cart__desc")
let innerItem = document.querySelector(".content-cart-product")
let yesButton = document.querySelector(".annouce-delete-product__body-text")
let trashButton = document.querySelector(".content-cart-product__infor-icon")
let annouce = document.querySelector(".annouce-delete-product")
let closeButton = document.querySelector(".annouce-head__close-icon")
let overlay = document.querySelector(".overlay")
let carryOnButton = document.querySelector('.annouce-middle__content')

let buyButton = document.querySelector(".mua")
let productName = document.querySelector(".ten")
let productImage = document.querySelector(".annouce-head__body-img img")
let productAmount = document.querySelector(".soluong")
let productPrice = document.querySelector(".gia")
let annouceAddToCart = document.querySelector(".annouce-wrap")

// remove product when clicking the trash button
if (yesButton) {
          yesButton.addEventListener("click", (event) => {
                    event.preventDefault() // prevent loading page from clicking the trash button

                    innerItem.style.display = "none"
                    overlay.style.display = "none"
                    annouce.style.display = "none"
          })
}

// get cart
let cart = getCart()

// find title of image
findTitle = () => cart.find(currentItem => currentItem.title.toLowerCase() == productName.textContent.toLowerCase())

// set image
setImage = () => {
          let imageLink = findTitle()
          if (imageLink && imageLink.image) {
                    productImage.onerror = () => console.error("Image not found or URL is incorrect")
                    if (imageLink.image[0] === '.' && imageLink.image[1] === '.')
                              productImage.src = imageLink.image
                    else
                              productImage.src = '.' + imageLink.image
          } else
                    console.log('Image not found')
}

// open annouce-wrap
if (buyButton) {
          buyButton.addEventListener("click", (event) => {
                    event.preventDefault()

                    annouceAddToCart.style.display = "block"
                    annouceAddToCart.style.opacity = "1"
                    annouceAddToCart.style.transition = "all 3s linear"
                    overlay.style.display = "block"

                    let name = document.querySelector(".annouce-head__body-name")
                    let amount = document.querySelector(".quantity")
                    let price = document.querySelector(".total")

                    name.textContent = productName.textContent
                    price.textContent = Number.parseFloat(productPrice.textContent) * Number.parseFloat(productAmount.value)
                    document.addEventListener("input", () => amount.textContent = productAmount.value)
                    setImage()
          })
} else {
          console.log("Buy button not found")
}

if (carryOnButton) {
          carryOnButton.addEventListener('click', event => {
                    annouceAddToCart.style.display = "none"
                    overlay.style.display = "none"
          })
} else {
          console.log('Carry on button not found')
}

// close annouce-wrap
closeButton.addEventListener("click", () => {
          annouceAddToCart.style.display = "none"
          overlay.style.display = "none"
})


