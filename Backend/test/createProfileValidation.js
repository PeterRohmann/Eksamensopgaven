// Dette er et af mange forsøg på at få testing til at fungere

const axios = require('axios')

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

let password = "string"
let username = "string"
let firstname = "string"
let lastname = "string"
let age = 44
let gender = "string"
let interest = "string"
 

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
           
         /*alert('Welcome');
        window.location = "login.html";
        */
       
		}
}
    
module.exports = createProfileValidation;
