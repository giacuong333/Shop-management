const login = () => {
          // Get data input from user 
          const userInputEmail = document.querySelector("#email").value
          const userInputPasswrod = document.querySelector("#pw").value

          // Get data email and password from local storage
          const getEmail = localStorage.getItem('userEmail')
          const getPassword = localStorage.getItem('userPassword')

          if (userInputEmail === getEmail) {
                    if (userInputPasswrod === getPassword)
                              alert("Login successfully!")
                    else
                              alert("The password is incorrect!")
          } else
                    alert("Invalid email!")
}

const loginButton = document.querySelector("#dangnhap")

loginButton.addEventListener('click', login)
loginButton.addEventListener('keydown', (event) => {
          if (event.key === "Enter")
                    login()
})