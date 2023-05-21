const products = [
    {
        id: 0,
        title: "Áo len Karma",
        price: "550.000đ",
        description: "Chiếc áo len này của Karma Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao len karma.jpg",
        amount: 100,
        details: "./product/aolenkarma.htm",
    },
    {
        id: 1,
        title: "Áo len Kimono SM",
        price: "330.000đ",
        description: "Chiếc áo len này của Kimono Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao len kimono sm.jpg",
        amount: 100,
        sale: "product--sale",
        details: "./product/aolenkimonosm.htm",
    },
    {
        id: 2,
        title: "Áo len KSUMI",
        price: "330.000đ",
        description: "Chiếc áo len này của KSUMI Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao len ksumi.jpg",
        amount: 100,
        sale: "product--sale",
        details: "./product/aolenksumi.htm",
    },
    {
        id: 3,
        title: "Áo khoát gió Moza",
        price: "330.000đ",
        description: "Chiếc áo len này của Moza Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao-khoat-gio-moza.png",
        amount: 100,
        sale: "product--sale",
    },
    {
        id: 4,
        title: "Giày thể thao nữ Prowin",
        price: "390.000đ",
        description: "Giày thể thao này của Prowin Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay the thao nu prowin.jpg",
        amount: 100,
        details: "./product/giaythethaonuprowin.htm",
    },
    {
        id: 5,
        title: "Giày chạy bộ nữ Nike Lunarglide",
        price: "Liên Hệ",
        description: "Giày chạy bộ này của Nike Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-chay-bo-nu-nike-lunarglide.png",
        amount: 100,
        sale: "product--sale",
    },
    {
        id: 6,
        title: "Túi xách thời trang Madam",
        price: "720.000đ",
        description: "Túi xách này của Madam Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/tui-xach-thoi-trang-madam.png",
        amount: 100,
    },
    {
        id: 7,
        title: "Áo váy Free People cổ truyền",
        price: "430.000đ",
        description: "Áo váy này của Free Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao vay free people co thuyen.jpg",
        amount: 100,
        details: "./product/aovayfreepeoplecothuyen.htm",
    },
    {
        id: 8,
        title: "Áo sơ mi Calvin Klein",
        price: "500.000đ",
        description: "Áo sơ mi này của Calvin Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao-so-mi-calvin-klein.png",
        amount: 100,
    },
    {
        id: 9,
        title: "Áo sơ mi Anne Klein",
        price: "450.000đ",
        description: "Áo sơ mi này của Klein Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/ao so mi anne klein.jpg",
        amount: 100,
        details: "./product/aosomianneklein.htm",
    },
    {
        id: 10,
        title: "Giày thời trang nữ Nike",
        price: "35.000đ",
        description: "Giày thời trang nữ này của Nike Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay thoi trang nu nike.jpg",
        amount: 100,
        sale: "product--sale",
        details: "./product/giaythoitrangnunike.htm",
    },
    {
        id: 11,
        title: "Giày thời trang Creative",
        price: "450.000đ",
        description: "Giày creative của Creative Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-thoi-trang-creative.png",
        amount: 100,
    },
    {
        id: 12,
        title: "Giày thể thao nữ DT",
        price: "45.000đ",
        description: "Giày DT này của DT Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay the thao nu dt.jpg",
        sale: "product--sale",
        amount: 100,
        details: "./product/giaythethaonudt.htm",
    },
    {
        id: 13,
        title: "Giày cao cổ Prowin",
        price: "1.200.000đ",
        description: "Giày cao cổ này của Prowin Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-cao-co-prowin.png",
        amount: 100,
    },
    {
        id: 14,
        title: "Giày bóng đá nam Codad ROCKET",
        price: "410.000đ",
        description: "Giày bóng đá này của Codad Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-bong-da-nam-codad-rocket.png",
        sale: "product--sale",
        amount: 100,
    },
    {
        id: 15,
        title: "Giày cầu lông động lực Promax",
        price: "590.000đ",
        description: "Giày cầu lông động lực này của Promax Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-cau-long-dong-luc-promax.png",
        sale: "product--sale",
        amount: 100,
    },
    {
        id: 16,
        title: "Giày thể thao nữ Prowin",
        price: "390.000đ",
        description: "Giày thể thao nữ này của Prowin Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay the thao nu prowin.jpg",
        amount: 100,
        details: "./product/giaythethaonuprowin.htm",
    },
    {
        id: 17,
        title: "Giày chạy bộ NX",
        price: "540.000đ",
        description: "Giày chạy bộ này của NX Club sẽ giúp tăng thêm cảm giác mềm mại cho diện mạo hàng ngày của bạn. - Chất liệu: cotton/nylon lớp lót: polyester - Có thể giặt máy - Kiểu...",
        image: "./product/img/giay-chay-bo-nu-nx.png",
        amount: 100,
    },
]

// Render products
const renderProducts = (products) => {
    const productList = document.querySelector("#products-area")
    productList.innerHTML = ""
    let productHTML = ""

    products.forEach((product) => {
        const { id, title, price, description, image, sale, details } = product
        if (id === 10)
            productHTML += `<h2 class="product-name">SẢN PHẨM HOT</h2>`

        productHTML += `
        <div onclick="productsDetails(${id})" class="col l-6 m-6 c-12 product-details">
            <a href="${details}" target="_self" class="product product--space ${sale}">
                <img src="${image}" alt="Image" class="product-img"/>
                <span class="product-desc">${title}</span>
                <span class="product-price">${price}</span>
            </a>
        </div>
        `
    })

    productList.innerHTML = productHTML
}

const createProducts = () => {
    renderProducts(products)
}

// Render all products by default
window.onload = createProducts

// Go to product details
let productsDetails = (idProduct) => {
    window.location.href = products[idProduct].details
}

// Search products 
const searchProducts = (searchName) => {
    const productContain = document.getElementById("products-area")
    let productHTML = ""

    // Filter the products based on the search searchName
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchName.toLowerCase()))

    filteredProducts.forEach((product) => {
        const { id, title, price, description, image, sale, details, amount } = product
        productHTML += `
        <div onclick="productsDetails(${id})" class="col l-6 m-6 c-12 product-details">
            <a href="${details}" target="_self" class="product product--space ${sale}">
                <img src="${image}" alt="Image" class="product-img"/>
                <span class="product-desc">${title}</span>
                <span class="product-price">${price}</span>
            </a>
        </div>
        `
    })

    productContain.innerHTML = productHTML
}

const searchInput = document.querySelector('.header-search__input')
const searchButton = document.querySelector('.header-search__btn')

// Render searched products when user clicked to the search button 
searchButton.addEventListener('click', () => {
    const query = searchInput.value
    if (query !== "")
        searchProducts(query)
    else
        renderProducts(products)
})

// Render searched producs when user pressed enter 
searchInput.addEventListener('keydown', (event) => {
    const query = searchInput.value
    if (query !== "") {
        if (event.key === "Enter")
            searchProducts(query)
    } else
        renderProducts(products)
})

// Set products to local storage 
const setProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}

// Get products from local storage 
const getProducts = () => {
    const productString = localStorage.getItem('products')
    return productString ? JSON.parse(productString) : []
}

setProducts(products)

const allProducts = getProducts()
