
const pages = [
          {
                    id: 0,
                    link: "../store_page1.html"
          },
          {
                    id: 1,
                    link: "../store_page2.html"
          },
          {
                    id: 2,
                    link: "../store_page3.html"
          },
          {
                    id: 3,
                    link: "../store_page4.html"
          },
]

// Move pages 
const pageBefore = document.querySelector(".content-cart__pagination-before")
const pageAfter = document.querySelector(".content-cart__pagination-after")

// Count var to count page 
var currentPageIndex = 1
var totalPage = 4

const nextPage = () => {
          if (currentPageIndex < totalPage) {
                    currentPageIndex++
                    var nextPageUrl = "./store_page" + currentPageIndex + ".html"
                    console.log(nextPageUrl)
                    window.location.href = nextPageUrl
          }
}

pageAfter.addEventListener('click', () => {
          nextPage()
})