// fetch("../JSON/products.json")
//     .then(response => response.json())
//     .then(data => {
//         localStorage.setItem("products", JSON.stringify(data))
//         if (!localStorage.getItem("cart")) {
//             localStorage.setItem("cart", "[]")
//         }
//     })
//     .catch(error => alert("Fetching data failed!"))

async function fetchDataAndParse(url, key) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.log("Fetching data failed!")
    }
}

fetchDataAndParse("../JSON/products.json", "products")
fetchDataAndParse("../JSON/outstandingProduct.json", "outstanding")
fetchDataAndParse("../JSON/bestsellerProduct.json", "bestseller")

const products = JSON.parse(localStorage.getItem("products"))
const outstandingProducts = JSON.parse(localStorage.getItem("outstanding"))
const bestsellerProducts = JSON.parse(localStorage.getItem("bestseller"))

// Render new products
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