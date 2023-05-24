import Accounts from "./local-storage.js";

let accounts = new Accounts()
accounts.init()

document.addEventListener("DOMContentLoaded", e => {
          let formRegister = document.querySelector("#frm_login")

          if (formRegister !== null) {
                    // Login page

                    if (accounts.getCurrentUser() !== null)
                              window.location.href = "../"

                    formRegister.addEventListener("submit", e => {
                              e.preventDefault()

                              // Get all input tags
                              const inputValues = document.querySelectorAll("#frm_login input")
                              let obj = {}

                              inputValues.forEach(element => {
                                        if (typeof element.dataset.type !== "undefined")
                                                  obj[element.dataset.type] = element.value
                              })

                              let users = accounts.getUsers()
                              let isExisted = false
                              users.forEach(element => {
                                        if (element.email === obj.email)
                                                  isExisted = true
                              })

                              if (isExisted)
                                        alert("User existed!")
                              else {
                                        accounts.addUser(obj)
                                        alert("Register successfully!")
                                        window.location.href = "../login/dean1.html"
                              }
                    })

          }
})
