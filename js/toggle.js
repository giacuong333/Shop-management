// Pagination
let thisPage = 1
let limit = 9
let listItem = document.querySelectorAll(".item")

// Load item 
function loadItem() {
  let begin = limit * (thisPage - 1)
  let end = limit * thisPage - 1

  listItem.forEach((item, index) => {
    if (index >= begin && index <= end) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })

  listPage()
}
loadItem()

function listPage() {
  // get total of pages will be displayed
  let count = Math.ceil(listItem.length / limit)
  document.querySelector(".content-cart__pagination").innerHTML = ""

  // prev
  if (thisPage !== 1) {
    let prev = document.createElement("div")
    prev.classList.add("content-cart__pagination-num")
    prev.innerText = "<"
    prev.setAttribute("onclick", `changePage(${thisPage - 1})`)
    document.querySelector(".content-cart__pagination").appendChild(prev)
  }

  // Move page when clicking on the button 
  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("div")
    newPage.classList.add("content-cart__pagination-num")
    newPage.innerText = i
    if (i === thisPage) {
      newPage.classList.add("content-cart__pagination-num--active")
    }
    newPage.setAttribute("onclick", `changePage(${i})`)
    document.querySelector(".content-cart__pagination").appendChild(newPage)
  }

  // next
  if (thisPage !== count) {
    let next = document.createElement("div")
    next.classList.add("content-cart__pagination-num")
    next.innerText = ">"
    next.setAttribute("onclick", `changePage(${thisPage + 1})`)
    document.querySelector(".content-cart__pagination").appendChild(next)
  }
}

function changePage(i) {
  thisPage = i
  loadItem()
} 