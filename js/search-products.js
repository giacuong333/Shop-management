const getProducts = JSON.parse(localStorage.getItem("products"))
const getOutStandingProducts = JSON.parse(localStorage.getItem("outstanding"))
const getBestellerProducts = JSON.parse(localStorage.getItem("bestseller"))
let searchBox = document.querySelector(".header-search__input")
let header = document.querySelector(".header")
let containerSearchItem = document.querySelector(".header-search__items-list")
let productItem = document.querySelector(".header-search__items")

function searchProduct() {
          let productName = searchBox.value.trim().toUpperCase()
          let html = ""
          const allProducts = [...getProducts]
          allProducts.push(...getOutStandingProducts)
          allProducts.push(...bestsellerProducts)

          if (productName === "") {
                    containerSearchItem.innerHTML = ""
                    containerSearchItem.style["boxShadow"] = ""
                    containerSearchItem.style.setProperty("padding", "0")
                    return
          }

          allProducts.forEach(product => {
                    const { id, title, image, price } = product
                    if (title.toUpperCase().indexOf(productName) > -1) {
                              html += `
                              <a href="../details.html?productId=${id}" class="header-search__items">
                                        <img src="${image}" alt="Image">
                                        <div class="header-search__items-details">
                                                  <h3>${title}</h3>
                                                  <h3>${price}</h3>
                                        </div>
                              </a>
                              `
                    }
                    containerSearchItem.innerHTML = html
                    containerSearchItem.style["boxShadow"] = "0 4px 10px 2px rgba(0, 0, 0, .5)"
                    containerSearchItem.style.setProperty("padding", "12px")
          });
}

searchBox.addEventListener("keyup", () => {
          searchProduct()
})


