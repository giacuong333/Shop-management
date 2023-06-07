// Move page (store)
const pageLinks = document.querySelectorAll(".content-cart__pagination-num__list-item a")
const pageCurrent = document.querySelector(".content-cart__pagination-num__current")
const pageAfter = document.querySelector(".content-cart__pagination-after")
const pageBefore = document.querySelector(".content-cart__pagination-before")

// Move forward
const nextPage = () => {
          const currentPage = parseInt(pageCurrent.textContent.trim())
          if (currentPage < pageLinks.length + 1 && currentPage !== -1) {
                    const nextPageLink = pageLinks[currentPage - 1].getAttribute("href")
                    window.location.href = nextPageLink
          }
}

// Move backward
const previousPage = () => {
          const currentPage = parseInt(pageCurrent.textContent.trim())
          if (currentPage > 1) {
                    const previousPageLink = pageLinks[currentPage - 2].getAttribute("href")
                    window.location.href = previousPageLink
          }
}

document.addEventListener("DOMContentLoaded", () => {
          pageBefore.addEventListener("click", () => previousPage())
          pageAfter.addEventListener("click", () => nextPage())
})

// Move page(Login - Logout)
const loginPage = () => {
          window.location.href = "../login/dean1.html"
}

const registerPage = () => {
          window.location.href = "../login/dean2.html"
}




