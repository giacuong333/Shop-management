const productList = document.querySelectorAll(".product-container")

const renderProducts = () => {
          productList.forEach((product) => {
                    product.style.display = "block"
          })
}

const searchProducts = (searchName) => {
          productList.forEach((product) => {
                    const title = product.querySelector(".product-desc").innerText.toLowerCase()
                    if (!title.toLowerCase().includes(searchName.toLowerCase()))
                              product.style.display = "none"
          })


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
          if (query !== "") {
                    if (event.key === "Enter")
                              searchProducts(query)
          } else
                    renderProducts()
})
