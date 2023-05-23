const accounts = [
          {
                    email: "legiacuong789@gmail",
                    phoneNumber: "0948800917",
                    password: "121003"
          },
]

const getAccounts = () => localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : []

const setAccounts = (accounts) => localStorage.setItem('accounts', JSON.stringify(accounts))

// Set accounts to local storage
setAccounts(accounts)

function registration() {
          var email = document.querySelector("#email").value
          var phoneNumber = document.querySelector("#sdt").value
          var password = document.querySelector("#matkhau").value



          // The first way to store data in local storage 
          accounts.push({
                    firstName, lastName, email, phoneNumber, password
          })
          setAccounts(accounts)
          alert("Register successfully!")

          // The second way
          // localStorage.userEmail = email
          // localStorage.userPassword = password
}


const register = document.querySelector("#dangky")
if (register !== null) {
          register.addEventListener('click', registration)
          register.addEventListener('keydown', (event) => {
                    if (event.key === "Enter")
                              registration()
          })
}




