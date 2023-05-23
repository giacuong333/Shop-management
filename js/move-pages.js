// Move page (store)
const pageLinks = document.querySelectorAll(".content-cart__pagination-num__list-item a")
const pageCurrent = document.querySelector(".content-cart__pagination-num__current")

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

// Move page (Login-Logout)
const loginButton = document.querySelector("#sign-in")
const logoutButton = document.querySelector("#sign-out")

const loginPage = () => {
          window.location.href = "./login/dean1.html"
}

const logoutPage = () => {
          window.location.href = "./login/dean2.html"
}




