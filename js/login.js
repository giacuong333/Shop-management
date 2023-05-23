const loginBtn = document.querySelector("#sign-in nav-sign-btn a")
const logoutBtn = document.querySelector("#sign-out .nav-sign-btn a")

var check = false

const login = () => {
          // Get data input from user 
          const userInputEmail = document.querySelector("#email")
          const userInputPasswrod = document.querySelector("#pw")

          // Get data email and password from local storage
          const getEmail = localStorage.getItem('userEmail')
          const getPassword = localStorage.getItem('userPassword')

          if (userInputEmail.value === getEmail) {
                    if (userInputPasswrod.value === getPassword) {
                              alert("Login successfully!")
                              check = true
                    }
                    else {
                              alert("The password is incorrect!")
                    }

          } else
                    alert("Invalid email!")
}

