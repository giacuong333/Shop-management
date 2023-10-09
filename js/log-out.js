import Accounts from "./local-storage.js";

let account = new Accounts();
account.init();

function logOut() {
  account.removeCurrentUser();
  alert("Log out successfully!");
  window.location.href = "../";
}

document.addEventListener("DOMContentLoaded", () => {
  let logout = document.querySelector("#dangxuat");
  let page = document.querySelector(".pagesLoginOut");

  if (logout !== null) {
    // log out
    logOut();
  }

  if (page !== null) {
    // Page
    if (account.getCurrentUser() !== null) {
      let login = document.querySelector(".login-button");
      let register = document.querySelector(".logout-button");

      login.remove();
      register.remove();

      document.querySelector(".nav-sign").innerHTML = `
                              <div class="row wrap-login-logout">
                                        <div class="col l-6 m-6 c-12 login-button">
                                                  <div class="nav-sign-btn" id="sign-in">
                                                            <a href="../account.html" class="btn btn--sign-in">Tài khoản</a>
                                                  </div>
                                        </div>
                                        <div class="col l-6 m-6 c-12 logout-button">
                                                  <div class="nav-sign-btn" id="sign-out">
                                                            <a href="../login/log-out.html" class="btn btn--sign-out">Đăng xuất</a>
                                                  </div>
                                        </div>
                              </div>
                              `;
    }
  }
});
