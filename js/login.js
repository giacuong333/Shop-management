const hideLoginButton = document.querySelector("#sign-in a")
const convertTextRegisterBtn = document.querySelector("#sign-out a")

const login = () => {
          // Get data input from user 
          const userInputEmail = document.querySelector("#email").value
          const userInputPasswrod = document.querySelector("#pw").value

          // Get data email and password from local storage
          const getEmail = localStorage.getItem('userEmail')
          const getPassword = localStorage.getItem('userPassword')

          if (userInputEmail === getEmail) {
                    if (userInputPasswrod === getPassword) {
                              alert("Login successfully!")
                              hideLoginButton.style.display = "none"
                              convertTextRegisterBtn.textContent = "Đăng xuất"
                    }
                    else {
                              alert("The password is incorrect!")
                    }

          } else
                    alert("Invalid email!")
}

const loginButton = document.querySelector("#dangnhap")

if (loginButton !== null) {
          loginButton.addEventListener('click', login)
          loginButton.addEventListener('keydown', (event) => {
                    if (event.key === "Enter")
                              login()
          })
}