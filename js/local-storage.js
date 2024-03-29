// Initializing default account when loading page
export default function Accounts() {
  this.init = () => {
    if (!this.getUsers()) this.initUsers();
  };

  this.initUsers = () => {
    let users = [
      {
        firstName: "Gia",
        lastName: "Cường",
        email: "legiacuong789@gmail.com",
        password: "121003",
        phoneNumber: "0948800917",
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  };

  Accounts.prototype.getUsers = () => JSON.parse(localStorage.getItem("users"));

  this.setUsers = (userArr) => localStorage.setItem("users", JSON.stringify(userArr));

  this.addUser = (userObj) => {
    // Get from local storage
    let users = this.getUsers();
    users.push(userObj);
    // Set to local storage
    this.setUsers(users);
  };

  this.setCurrentUser = (userObj) => localStorage.setItem("currentUser", JSON.stringify(userObj));

  this.getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

  this.removeCurrentUser = () => localStorage.removeItem("currentUser");
}
