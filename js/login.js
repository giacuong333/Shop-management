import Accounts from "./local-storage.js";

let account = new Accounts();
account.init();

// Function to check if the user is logged in
function isLoggedIn() {
  const currentUser = account.getCurrentUser();
  // Return true if currentUser is defined
  return !!currentUser;
}

// Function to perform login
function performLogin(email, password) {
  const users = account.getUsers();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === email && user.password === password) {
      account.setCurrentUser(user);
      return true;
    }
  }

  return false;
}

// Log out
function logOut() {
  account.removeCurrentUser();
  alert("Log out successfully!");
  window.location.href = "../";
}

// DOMContentLoaded used to ensure that your JS code runs after the HTML
// document has been fully loaded, allowing you to safely access and manipulate the DOM elements
document.addEventListener("DOMContentLoaded", () => {
  let getUserEmail = document.querySelector("#email");
  let getUserPassword = document.querySelector("#pw");

  if (getUserEmail !== null && getUserPassword !== null) {
    // Login page
    if (account.getCurrentUser() !== null) {
      window.location.href = "../";
    }

    document.querySelector("#dangnhap").addEventListener("click", (e) => {
      e.preventDefault();

      const email = getUserEmail.value;
      const password = getUserPassword.value;

      if (performLogin(email, password)) {
        alert("Login successfully");
        window.location.href = "../";
      } else {
        alert("Invalid email or password");
      }
    });
  }

  const loginIcon = document.querySelector(".payment-customer-info__head i a");
  if (loginIcon && isLoggedIn()) {
    loginIcon.textContent = "Đăng xuất";
    loginIcon.parentElement.classList.remove("ti-user");
    loginIcon.parentElement.classList.add("ti-arrow-circle-right");
    loginIcon.addEventListener("click", () => {
      logOut();
    });
  }
});

// ============================================ CHANGE PASSWORD FORM ============================================
function changePassword() {
  const formInputGroup = document.querySelectorAll(".form-input");
  const oldPasswordInput = document.getElementById("opassword");
  const newPasswordInput = document.getElementById("npassword");
  const verifyPasswordInput = document.getElementById("vpassword");
  const changePasswordBtn = document.querySelector(".change-password-btn");
  const errorMessage = document.querySelectorAll(".error-message");

  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const oldPassword = oldPasswordInput.value.trim();
      const newPassword = newPasswordInput.value.trim();
      const verifyPassword = verifyPasswordInput.value.trim();

      // Clear previous error messages
      errorMessage.forEach((message) => {
        message.textContent = "";
        message.classList.remove("invalid");
      });

      let isValid = true;

      if (!updatePassword(oldPassword, newPassword, verifyPassword)) {
        errorMessage[0].textContent = "Mật khẩu cũ không tồn tại";
        errorMessage[0].classList.add("invalid");
        isValid = false;
      }

      if (newPassword === "") {
        errorMessage[1].textContent = "Vui lòng nhập mật khẩu mới!";
        errorMessage[1].classList.add("invalid");
        isValid = false;
      }

      if (verifyPassword === "") {
        errorMessage[2].textContent = "Vui lòng xác nhận mật khẩu mới!";
        errorMessage[2].classList.add("invalid");
        isValid = false;
      } else if (verifyPassword !== newPassword) {
        errorMessage[2].textContent = "Xác nhận mật khẩu không khớp";
        errorMessage[2].classList.add("invalid");
        isValid = false;
      }

      if (isValid) {
        updatePassword(oldPassword, newPassword, verifyPassword);
      }
    });
  }

  // If the user goes on typing, hide the error message
  formInputGroup.forEach((form) => {
    form.querySelector("input").addEventListener("input", () => {
      form.querySelector(".error-message").textContent = "";
      form.querySelector(".error-message").classList.remove("invalid");
    });
  });
}

changePassword();

function updatePassword(oldPassword, newPassword, verifyPassword) {
  const users = account.getUsers();
  const currentUser = account.getCurrentUser();

  const userToUpDate = users.find((user) => user.email === currentUser.email && user.password === oldPassword);

  if (userToUpDate) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === currentUser.email && user.password === oldPassword) {
        // Check if newPassword is not an empty string before updating
        if (newPassword.trim() !== "" && verifyPassword === newPassword) {
          user.password = newPassword;
          account.setUsers(users);
          alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại!");
          logOut();
        }
        return true; // Password updated successfully
      }
    }
  }

  return false; // password updated failed
}
