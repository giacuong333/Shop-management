const accounts = [
          {
                    id: 0,
                    firstName: "Gia",
                    lastName: "Cường",
                    email: "legiacuong789@gmail",
                    phoneNumber: "0948800917",
                    password: "121003"
          },
]

const getAccounts = () => localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : []

const setAccounts = (accounts) => localStorage.setItem('accounts', JSON.stringify(accounts))

// Set accounts to local storage
setAccounts(accounts)

var id = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 0

function registration() {
          var firstName = document.querySelector("#ho").value
          var lastName = document.querySelector("#ten").value
          var email = document.querySelector("#email").value
          var phoneNumber = document.querySelector("#sdt").value
          var password = document.querySelector("#matkhau").value

          let tempAccount = getAccounts()
          let check = true

          tempAccount.array.forEach(element => {
                    if (element.email === email) {
                              alert("Account exists!")
                              check = false
                    }
          });

          if (check) {
                    // The first way to store data in local storage 
                    accounts.push({
                              id, firstName, lastName, email, phoneNumber, password
                    })
                    setAccounts(accounts)
                    return
          }

          // The second way
          // localStorage.userEmail = email
          // localStorage.userPassword = password

          alert("Register successfully!")
}

const register = document.querySelector("#dangky")
if (register !== null) {
          register.addEventListener('click', registration)
          register.addEventListener('keydown', (event) => {
                    if (event.key === "Enter")
                              registration()
          })
}




