//const User = require('../Model/Classes.js')
//let user = new User()

class User{
    constructor(username, password, firstname, lastname, age, gender, interest){
        this.username = username
        this.password = password
        this.firstname = firstname
        this.lastname = lastname
        this.age = age
        this.gender = gender
        this.interest = interest
    }
}




    function createProfileValidation() {

let password = document.getElementById("passwordid");
let username = document.getElementById("usernameid");
let firstname = document.getElementById("firstnameid");
let lastname = document.getElementById("lastnameid");
let age = document.getElementById("ageid");
let gender = document.getElementById("genderid");
let interest = document.getElementById("interestid");

if(username.value === "" || 
   firstname.value === "" ||
   lastname.value === "" ||
   age.value === "" ||
   gender.value === "" ||
   interest.value === "" ||
   password.value === ""){
       return alert("Please fill out all forms")
   }
if(password.value.length < 5){
    alert("Your password must be 5 characters long")
}

else
		{
            let userdata = new User (username.value, password.value, firstname.value, lastname.value, age.value, gender.value, interest.value);
               

            axios.post("http://localhost:5000/users", userdata)
           
         alert('Profile created');
        window.location = "login.html";
        
		}
}
    
