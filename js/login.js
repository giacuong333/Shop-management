import Accounts from "./local-storage.js"

let account = new Accounts()
account.init()

// Function to check if the user is logged in 
function isLoggedIn() {
          const currentUser = account.getCurrentUser()
          // Return true if currentUser is defined
          return !!currentUser
}

// Function to perform login 
function performLogin(email, password) {
          const users = account.getUsers()

          for (let i = 0; i < users.length; i++) {
                    const user = users[i]
                    if (user.email === email && user.password === password) {
                              account.setCurrentUser(user)
                              return true
                    }
          }

          return false
}

// Log out
function logOut() {
          account.removeCurrentUser()
          alert("Log out successfully!")
          window.location.href = "../"
}

// DOMContentLoaded used to ensure that your JS code runs after the HTML
// document has been fully loaded, allowing you to safely access and manipulate the DOM elements    
document.addEventListener("DOMContentLoaded", () => {
          let getUserEmail = document.querySelector("#email")
          let getUserPassword = document.querySelector("#pw")

          if (getUserEmail !== null && getUserPassword !== null) {
                    // Login page
                    if (account.getCurrentUser() !== null) {
                              window.location.href = "../"
                    }

                    document.querySelector("#dangnhap").addEventListener("click", e => {
                              e.preventDefault()

                              const email = getUserEmail.value
                              const password = getUserPassword.value

                              if (performLogin(email, password)) {
                                        alert("Login successfully")
                                        window.location.href = "../"
                              } else {
                                        alert("Invalid email or password")
                              }
                    })
          }

          const loginIcon = document.querySelector(".payment-customer-info__head i a")
          if (loginIcon && isLoggedIn()) {
                    loginIcon.textContent = "Đăng xuất"
                    loginIcon.parentElement.classList.remove("ti-user")
                    loginIcon.parentElement.classList.add("ti-arrow-circle-right")
                    loginIcon.addEventListener("click", () => {
                              logOut()
                    })
          }
})

