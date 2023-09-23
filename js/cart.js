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

// push cart onto local storage
pushProduct = (products) => localStorage.setItem("products", JSON.stringify(products))

// get cart from local storage 
getProduct = () => localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []

// get cart from local storage
getCart = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

// push cart onto local storage
pushCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart))

let cart = getCart() || []

// add product to cart
function addToCart(product) {
          cart.push(product)
          pushCart(cart)
          setQuantity()
}

// get cart
const getImageProduct = getProduct()

// find title of image
findTitle = () => getImageProduct.find(currentItem => currentItem.title.toLowerCase() == productName.textContent.toLowerCase())

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

function caculateTotalQuantity(cart) {
          return cart.reduce((accumulate, currentItem) => {
                    return accumulate += currentItem.amount
          }, 0)
}

let totalQuantity = caculateTotalQuantity(cart)
amountCart.textContent = totalQuantity + ''

// set quantity when clicking on the add to cart button
function setQuantity() {
          totalQuantity = caculateTotalQuantity(cart);
          amountCart.textContent = totalQuantity + '';
          localStorage.setItem('cartTotalQuantity', totalQuantity)
}

function updateCartOnPageLoad() {
          const storedTotalQuantity = localStorage.getItem('cartTotalQuantity')
          if (storedTotalQuantity !== null)
                    amountCart.textContent = storedTotalQuantity
}

updateCartOnPageLoad()

// open annouce-wrap
if (buyButton) {
          buyButton.addEventListener("click", (event) => {
                    event.preventDefault()

                    // open panel
                    annouceAddToCart.style.display = "block"
                    annouceAddToCart.style.opacity = "1"
                    annouceAddToCart.style.transition = "all 3s linear"
                    overlay.style.display = "block"

                    const name = document.querySelector(".annouce-head__body-name")
                    const amount = document.querySelector(".quantity")
                    const price = document.querySelector(".total")

                    name.textContent = productName.textContent
                    price.textContent = Number.parseFloat(productPrice.textContent) * Number.parseFloat(productAmount.value)
                    const initialQuantity = productAmount.value
                    amount.textContent = initialQuantity

                    setQuantity()

                    document.addEventListener("change", () => {
                              const updatedQuantity = productAmount.value
                              amount.textContent = updatedQuantity
                              setQuantity(Number.parseInt(updatedQuantity))
                    })

                    setImage()

                    // create object to accomodate product information
                    const productInfo = {
                              name: productName.textContent,
                              amount: Number.parseInt(productAmount.value),
                              price: Number.parseInt(price.textContent),
                              image: productImage.src,
                    }

                    addToCart(productInfo)
          })
} else {
          console.log("Buy button not found")
}

if (carryOnButton) {
          carryOnButton.addEventListener('click', () => {
                    annouceAddToCart.style.display = "none"
                    overlay.style.display = "none"
          })
} else
          console.log('Carry on button not found')


// close annouce-wrap
closeButton.addEventListener("click", () => {
          annouceAddToCart.style.display = "none"
          overlay.style.display = "none"
})

// remove product when clicking the trash button
if (yesButton) {
          yesButton.addEventListener("click", (event) => {
                    event.preventDefault() // prevent loading page from clicking the trash button

                    innerItem.style.display = "none"
                    overlay.style.display = "none"
                    annouce.style.display = "none"
          })
}

