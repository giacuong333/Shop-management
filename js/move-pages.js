const pageBefore = document.querySelector(".content-cart__pagination-before")
const pageAfter = document.querySelector(".content-cart__pagination-after")
const pageLinks = document.querySelectorAll(".content-cart__pagination-num__list-item a")

// Move forward
const nextPage = () => {
          const currentPage = parseInt(document.querySelector(".content-cart__pagination-num__current").textContent)
          if (currentPage < pageLinks.length + 1 && currentPage !== -1) {
                    const nextPageLink = pageLinks[currentPage - 1].getAttribute("href")
                    window.location.href = nextPageLink
          }
}

// Move backward
const previousPage = () => {
          const currentPage = parseInt(document.querySelector(".content-cart__pagination-num__current").textContent)
          if (currentPage > 1) {
                    const previousPageLink = pageLinks[currentPage - 2].getAttribute("href")
                    window.location.href = previousPageLink
          }
}

pageAfter.addEventListener("click", nextPage)
pageBefore.addEventListener("click", previousPage)
