function registration() {
          var firstName = document.querySelector("#ho").value
          var lastName = document.querySelector("#ten").value
          var email = document.querySelector("#email").value
          var phoneNumber = document.querySelector("#sdt").value
          var password = document.querySelector("#matkhau").value

          // The first way to store data in local storage 
          localStorage.setItem('userFirstName', firstName)
          localStorage.setItem('userLastName', lastName)
          localStorage.setItem('userEmail', email)
          localStorage.setItem('userPhoneNumber', phoneNumber)
          localStorage.setItem('userPassword', password)

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
