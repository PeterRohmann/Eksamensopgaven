let username = document.getElementById("usernameidlogin");
let password = document.getElementById("passwordidlogin");


function loginValidation() {
    let logindata = {
        username : username.value,
        password : password.value 
    }


    axios.post("http://localhost:5000/users/login", logindata)
                .then(function(res){
                    localStorage.setItem('loggedIn', res.data.id);
                    
                    console.log(res.data.id);
                
                    
                })
                .then(() => window.location = "profile.html");
}


