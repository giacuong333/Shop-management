const scrollToTop = () => {
  window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
  let scrollButton = document.getElementById("top-btn");

  if (scrollButton) {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) scrollButton.style.display = "block";
    else scrollButton.style.display = "none";
  }
});

// Hide the button initially
if (document.getElementById("top-btn")) {
  document.getElementById("top-btn").style.display = "none";
}

function scrollSticky() {
  const stickyHeader = document.querySelector(".wrap-placed-products__row");
  const pageAccountRightPanel = document.querySelector(".wrap-placed-products");

  if (pageAccountRightPanel && stickyHeader) {
    pageAccountRightPanel.addEventListener("scroll", () => {
      if (pageAccountRightPanel.scrollTop > 0) {
        stickyHeader.style.backgroundColor = "var(--primary-color)";
        stickyHeader.style.color = "white";
      } else {
        stickyHeader.style.backgroundColor = "transparent";
        stickyHeader.style.color = "var(--text-color)";
      }
    });
  }
}

scrollSticky();
