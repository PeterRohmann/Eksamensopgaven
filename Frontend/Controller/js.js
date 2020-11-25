

/*
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
*/
let username = document.getElementById("usernameid");
let firstname = document.getElementById("firstnameid");
let lastname = document.getElementById("lastnameid");
let age = document.getElementById("ageid");
let gender = document.getElementById("genderid");
let interest = document.getElementById("interestid");
let password1 = document.getElementById("passwordid");

function validate() {
var errormessage = ""; 

//error for username
    if (username.value == "") {
        errormessage += "box is empty \n";
    }
   
//error for first name
    if (firstname.value == "") {
        errormessage += "First name is empty\n"
    }
    
//error for last name
    if (lastname.value == "") {
        errormessage += "Last name is empty\n"
    }

//error for age
    if(age.value == "") {
    errormessage += "Skriv din alder i tal\n"
    }
//error for gender

    if(gender.value == "") {
        errormessage += "What is your gender?\n";
    }

//error for interest
    if(interest.value == "")
    errormessage += "Write your interest\n"

//error for password

    if (password1.value == "" || password1.value.length <6){
        errormessage += "Submit a password with at least 6 characters\n"
    }

//alert for errors

if (errormessage != ""){
    alert(errormessage)
}

else
		{
            let userdata = {
                username : username.value,
                password1 : password1.value,
                firstname : firstname.value,
                lastname : lastname.value,
                age : age.value, 
                gender : gender.value, 
                interest : interest.value
            }

            axios.post("http://localhost:5000/users", userdata)
            .then(function(response){
                console.log(response);
            })
         alert('Welcome');
        window.location = "login.html";
		}
}


//Localstorage. 
/*
const rememberDiv = document.querySelector('.register-form');
const table = document.querySelector('table');
//Bruger # fordi det er et inputfelt. 
const usernameInput = document.querySelector('#usernameid');
const firstnameInput = document.querySelector('#firstnameid');
const lastnameInput = document.querySelector('#lastnameid');
const ageInput = document.querySelector('#ageid');
const genderInput = document.querySelector('#genderid');
const interestInput = document.querySelector('#interestid');
const password1Input = document.querySelector('#passwordid');

const submitBtn = document.querySelector('#submituser');

table.addEventListener('submit', function(e){
    //Gør at submit ikke gør som den plejer, men at man selv kan definere hvad den skal gøre. 
    e.preventDefault();
});
//"Click" betyder at den skal reagere på et click. 
submitBtn.addEventListener('click', function(){
    localStorage.setItem('username', usernameInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('firstname', firstnameInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('lastname', lastnameInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('age', ageInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('gender', genderInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('interest', interestInput.value);
})
submitBtn.addEventListener('click', function(){
    localStorage.setItem('password', password1Input.value);
})
*/

//Man kan i chrome se navnet ved at skrive localStorage.getItem("name") i loggen i browseren. 
