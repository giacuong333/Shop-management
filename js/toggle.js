/*
    when the users click the button, toggle between hidding and showing the dropdown content
*/
dropDown = () => {
  document.getElementById("myDropDown").classList.toggle("show");
};

// close the dropdown menu when users click outside of it
window.onclick = function (event) {
  if (!event.target.matches(".content-cart__pagination-num")) {
    var dropDowns = document.getElementsByClassName(
      "content-cart__pagination-num__list"
    );
    var i;
    for (i = 0; i < dropDowns.length; i++) {
      var openDropDown = dropDowns[i];
      if (openDropDown.classList.contains("show"))
        openDropDown.classList.remove("show");
    }
  }
};
