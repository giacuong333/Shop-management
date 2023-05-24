import Accounts from "./local-storage.js"

let account = new Accounts()
account.init()

// DOMContentLoaded used to ensure that your JS code runs after the HTML
// document has been fully loaded, allowing you to safely access and manipulate the DOM elements    
document.addEventListener("DOMContentLoaded", () => {
          let getUserEmail = document.querySelector("#email")
          let getUserPassword = document.querySelector("#pw")

          if (getUserEmail !== null && getUserPassword !== null) {
                    // Login page

                    if (account.getCurrentUser() !== null)
                              window.location.href = "../"

                    document.querySelector("#dangnhap").addEventListener("click", e => {
                              e.preventDefault()

                              // Get user array from local storage
                              let users = account.getUsers()
                              let user
                              let isValid = false

                              for (let i = 0; i < users.length; i++) {
                                        user = users[i]

                                        isValid = false
                                        isValid = (user.email === getUserEmail.value) ? true : false
                                        isValid = (user.password === getUserPassword.value) ? true : false

                                        if (isValid)
                                                  break
                              }

                              if (isValid) {
                                        account.setCurrentUser(user)
                                        alert("Login successfully!")
                                        window.location.href = "../"
                              } else
                                        alert("Invalid email or password")

                    })
          }
})
