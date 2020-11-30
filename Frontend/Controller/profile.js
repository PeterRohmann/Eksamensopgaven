//const { response } = require("express");

//Delete User
const dataPath = '../Model/users.json';
const likePath = '../Model/likes.json';


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
 


    //Get match 
/*function getProfile() {
    for(i=0; i < JSON.parse(data).length; i++){
        if( i === localStorage.getItem('loggedin')){
            continue;
        }
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`  
        console.log("test");
    })
}}*/

//Get full profile
function getFullProfile() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
    })
}

function getFullProfileSwipe() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('likeId'))
    .then(function(res){
        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`

        document.getElementById("displayFirstname").style.visibility = "visible";
        document.getElementById("displayLastname").style.visibility = "visible";
        document.getElementById("displayAge").style.visibility = "visible";
        document.getElementById("displayGender").style.visibility = "visible"; 

        if(localStorage.getItem('likeId') === "undefined"){
            document.getElementById("displayFirstname").style.visibility = "hidden";
            document.getElementById("displayLastname").style.visibility = "hidden";
            document.getElementById("displayAge").style.visibility = "hidden";
            document.getElementById("displayGender").style.visibility = "hidden"; 
        }
     })
}

        
//swipe
var i = 0;
function Swipe() {
    if (i === JSON.parse(localStorage.getItem("loggedIn"))){
        i++
    }
    
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        localStorage.setItem('likeId', res.data.id);
            document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
            document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`  
            document.getElementById("displayFirstname").style.visibility = "hidden";
            document.getElementById("displayLastname").style.visibility = "hidden";
            document.getElementById("displayAge").style.visibility = "hidden";
            document.getElementById("displayGender").style.visibility = "hidden"; 
    i++
    if (localStorage.getItem('likeId') == "undefined"){
        document.getElementById("displayInterest").style.visibility = "hidden";
        document.getElementById("displayUsername").style.visibility = "hidden";
        document.getElementById("nomoreusers").innerHTML =  `<p>No more hot chicks and/or dudes in your area! come back later!</p>`

        alert("No more profiles!");
        //få den til at fjerne htmlelementerne!
        
    }
        })         
}


//like
function Like() {
 
axios.post("http://localhost:5000/users/like", {
    User: localStorage.getItem('loggedIn'),
    Likes: localStorage.getItem('likeId')
}) 
.then(function(res){
    for ( i = 0; i < res.data.length; i++){
        for ( j = 0; j < res.data.length; j++){
           
            
            if ( res.data[i].User === res.data[j].User && res.data[i].Likes === res.data[j].Likes && j!==i){
            
                return alert("Du har allerede liket denne User!");
                
            }
            else if (res.data[i].User === res.data[j].Likes && res.data[i].Likes === res.data[j].User && j!==i){
                 
                
                axios.post("http://localhost:5000/users/match/match", {
                    id1 : res.data[i].User,
                    id2 : res.data[j].User
                })
                

                return alert("DU har et match");
            
            }
        }
    }
    
})
}   
//bruges ikke nu
function showMatches() {
    axios.get("http://localhost:5000/users/match/showmatches/")
    .then(function(res){
    // Kun have console.log med hvis dataen fra requested skal vises i browserens console.log. 
    console.log(res);
    for ( i = 0; i < res.data.length; i++){
        if ( res.data[i].id1 === localStorage.getItem("loggedIn")){
                axios.get("http://localhost:5000/users/" + res.data[i].id2)
                .then(function(res){

                    alert(JSON.stringify(res.data));
                })
            
        }
        else if ( res.data[i].id2 === localStorage.getItem("loggedIn")){
            axios.get("http://localhost:5000/users/" + res.data[i].id1)
                .then(function(res){
                    alert(JSON.stringify(res.data));
                })
        }
    }
}) 
}


function showmatches() {
    axios.get("http://localhost:5000/users/match/showmatches/")
    .then(function(res){
    // Kun have console.log med hvis dataen fra requested skal vises i browserens console.log. 
    console.log(res);
    
    for ( i = 0; i < res.data.length; i++){
        
        if ( res.data[i].id1 === localStorage.getItem("loggedIn")){
            console.log(res.data[i].id2);
            
                axios.get("http://localhost:5000/users/" + res.data[i].id2)
                .then(function(res){
                    //alert(JSON.stringify(res.data));
                    console.log(res)
                    

    var myName = JSON.stringify(res.data.firstname);
    var age = JSON.stringify(res.data.age);
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">`;
    row.insertCell(1).innerHTML= myName;
    row.insertCell(2).innerHTML= age;
                    
                })
            
        }
        else if ( res.data[i].id2 === localStorage.getItem("loggedIn")){
            axios.get("http://localhost:5000/users/" + res.data[i].id1)
                .then(function(res){
                    //alert(JSON.stringify(res.data.firstname));

                    var myName = JSON.stringify(res.data.firstname);
                    var age = JSON.stringify(res.data.age);
                    var table = document.getElementById("myTableData");
                 
                    var rowCount = table.rows.length;
                    var row = table.insertRow(rowCount);
                 
                    row.insertCell(0).innerHTML= `<input type="button"  id =  value = "Delete" onClick="deleteRow()">`;
                    row.insertCell(1).innerHTML= myName;
                    row.insertCell(2).innerHTML= age;
                    return
                })
        }
    }
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