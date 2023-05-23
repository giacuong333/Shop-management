const loginBtn = document.querySelector("#sign-in button")
const logoutBtn = document.querySelector("#sign-out button")

const login = () => {
          // Get data input from user 
          const userInputEmail = document.querySelector("#email").value
          const userInputPassword = document.querySelector("#pw").value

          console.log(userInputEmail)
          console.log(userInputPassword)

          // Get data email and password from local storage
          const getEmail = localStorage.getItem('userEmail')
          const getPassword = localStorage.getItem('userPassword')

          if (userInputEmail === getEmail && userInputPassword === getPassword) {
                    alert("Login successfully!")
                    loginBtn.remove()
                    logoutBtn.remove()
          } else if (userInputEmail.length === 0 || userInputPassword.length === 0)
                    alert("Email and password are not empty!")
          else
                    alert("Email or password is incorrect!")

}

const loginListener = document.querySelector("#dangnhap")
if (loginListener !== null) {
          loginListener.addEventListener('click', login)
          loginListener.addEventListener('keydown', (event) => {
                    if (event.key === "Enter")
                              login()
          })
}


