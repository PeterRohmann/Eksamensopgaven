//Delete User
const dataPath = '../data/users.json';



function deleteuser() {
    axios.delete("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
         console.log(res);
         localStorage.removeItem("username")
         localStorage.removeItem("password")
         localStorage.removeItem("loggedIn")
     })
     .then(() => window.location = "login.html")
    
    };
 
 //Get User with id
    function getuser() {
     axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
     .then(function(res){
          console.log(res);
          document.getElementById("overview").innerHTML = JSON.stringify(res.data)

      })
    }
 
 
 const h1 = document.querySelector('h1')
 const personalGreeting = document.querySelector('.personal-greeting')
 //Show your name on profile site. 
 function nameDisplayCheck() {
     if(localStorage.getItem('username')){
         let name = localStorage.getItem("username");
         h1.textContent = "Velkommen til din profil, " + name;
     }
 }
 //Dette betyder at funtionen bliver kørt til sidst. 
 document.body.onload = nameDisplayCheck
 
 
 //Login function
 function logout() {
     
     axios.post("http://localhost:5000/users/logout")
                 .then(function(response){
                     console.log(response);
                     //Edris sagde: localStorage.setItem('', response.data.id); Men det jeg har er godt nok.
                     localStorage.removeItem("username")
                     localStorage.removeItem("password")
                     localStorage.removeItem("loggedIn")
                 
                     
                 })
                 .then(() => window.location = "login.html");
 }