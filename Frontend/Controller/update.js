let username = document.getElementById("patchUsername");
let password = document.getElementById("patchPassword");
let firstname = document.getElementById("patchFirstName");
let lastname = document.getElementById("patchLastName");
let age = document.getElementById("patchAge");
let gender = document.getElementById("patchGender");
let interest = document.getElementById("patchInterest");

function updateFunction() {
    let updateData = {
        username : username.value,
        password : password.value, 
        firstname : firstname.value,
        lastname : lastname.value,
        age : age.value,
        gender : gender.value,
        interest : interest.value,
        id : localStorage.getItem('loggedIn')
    }

 axios.patch("http://localhost:5000/users/" + localStorage.getItem('loggedIn'), updateData)
    .then(function(res){
    
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);
    })
    .then(() => window.location = "profile.html");
}
