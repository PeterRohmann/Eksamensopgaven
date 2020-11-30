let username3 = document.getElementById("patchUsername");
let password3 = document.getElementById("patchPassword");
let firstname3 = document.getElementById("patchFirstName");
let lastname3 = document.getElementById("patchLastName");
let age3 = document.getElementById("patchAge");
let gender3 = document.getElementById("patchGender");
let interest3 = document.getElementById("patchInterest");

function updateFunction() {
    let updateData = {
        username : username3.value,
        password1 : password3.value, 
        firstname : firstname3.value,
        lastname : lastname3.value,
        age : age3.value,
        gender : gender3.value,
        interest : interest3.value,
        id : localStorage.getItem('loggedIn')
    }
    axios.patch("http://localhost:5000/users/" + localStorage.getItem('loggedIn'), updateData)
                .then(function(response){
                console.log(response);
                localStorage.setItem('username', username3.value);
                localStorage.setItem('password', password3.value);
                })
                .then(() => window.location = "profile.html");
}
/*
function getuser() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
        document.getElementById("overview").innerHTML = <p>${JSON.stringify(res.data)}</p>
    })
}
*/