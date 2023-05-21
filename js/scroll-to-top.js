const scrollToTop = () => {
    window.scrollTo(0, 0)
}

window.addEventListener('scroll', () => {
    let scrollButton = document.getElementById('top-btn')

    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)
        scrollButton.style.display = 'block'
    else
        scrollButton.style.display = 'none'

})

// Hide the button initially
document.getElementById('top-btn').style.display = 'none'
