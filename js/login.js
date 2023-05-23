const loginBtn = document.querySelector("#sign-in button")
const logoutBtn = document.querySelector("#sign-out button")

const getAccounts = () => localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : []

const setAccounts = (accounts) => localStorage.setItem('accounts', JSON.stringify(accounts))

const login = () => {
          // Get data input from user 
          const userInputEmail = document.querySelector("#email").value
          const userInputPassword = document.querySelector("#pw").value

          // Get email and password from local storage
          const accounts = getAccounts()

          console.log(accounts.length)

          accounts.array.forEach(element => {
                    const getEmail = element.email
                    const getPassword = element.password

                    if (userInputEmail === getEmail && userInputPassword === getPassword) {
                              alert("Login successfully!")
                              loginBtn.remove()
                              logoutBtn.remove()
                    } else if (userInputEmail.length === 0 || userInputPassword.length === 0)
                              alert("Email and password are not empty!")
                    else
                              alert("Email or password is incorrect!")
          });
}

const loginListener = document.querySelector("#dangnhap")
if (loginListener !== null) {
          loginListener.addEventListener('click', login)
          loginListener.addEventListener('keydown', (event) => {
                    if (event.key === "Enter")
                              login()
          })
}


