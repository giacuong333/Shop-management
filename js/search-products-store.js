const productList = document.querySelectorAll(".product-container")

// Render products by default 
const renderProducts = () => {
          productList.forEach((product) => {
                    product.style.display = "block"
          })
}

// Search products by name 
const searchProducts = (searchName) => {
          let count = productList.length
          let productHTML = ""

          productList.forEach((product) => {
                    const title = product.querySelector(".product-desc").innerText.toLowerCase()
                    if (!title.toLowerCase().includes(searchName.toLowerCase())) {
                              product.style.display = "none"
                              count--
                    }
          })

          // If no products found
          if (count === 0) {
                    productHTML += `<div class="col l-12 m-12 c-12 no-products-found">No products found!</div>`
                    document.querySelector("#product-wrap").innerHTML = productHTML
          }
}

const searchInput = document.querySelector('.header-search__input')
const searchButton = document.querySelector('.header-search__btn')

// Render searched products when user clicked to the search button 
searchButton.addEventListener('click', () => {
          const query = searchInput.value
          if (query !== "")
                    searchProducts(query)
          else
                    renderProducts()
})

// Render searched producs when user pressed enter 
searchInput.addEventListener('keydown', (event) => {
          const query = searchInput.value
          if (event.key === "Enter")
                    if (query !== "")
                              searchProducts(query)
                    else
                              renderProducts()
})
