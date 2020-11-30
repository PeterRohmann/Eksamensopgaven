
//Lav eventlistener. 

let username2 = document.getElementById("usernameid2");
let password2 = document.getElementById("passwordid2");


//her skal bruges getElementById til at få fat i bruger input
function loginValidate() {
    let logindata = {
        username2 : username2.value,
        password2 : password2.value 
    }

//Man kan i chrome se navnet ved at skrive localStorage.getItem("name") i loggen i browseren. 
    axios.post("http://localhost:5000/users/login", logindata)
                .then(function(response){
                    console.log(response);
                    localStorage.setItem('loggedIn', response.data.id);
                    localStorage.setItem('username', username2.value);
                    localStorage.setItem('password', password2.value);
                    console.log(response.data.id);
                
                    
                })
                .then(() => window.location = "profile.html");
}


