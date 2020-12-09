

    //Logout
    function logOut() {
        
        axios.post("http://localhost:5000/users/logout")
                    .then(function(res){
                        localStorage.removeItem("loggedIn")
                    })
                    .then(() => window.location = "login.html");
    }



    //Delete profile
    function deleteProfile() { 
        
        axios.delete("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
        .then(function(res){
            localStorage.removeItem("loggedIn")
        })
        .then(() => window.location = "login.html")
        return "working"
        };
    


    

    //Get full profile
    function seeOwnProfile() {
        axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
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
        })
    }

    function seeFullProfile() {
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

            

    var i = 0;

    function showNextProfile() {
        if (i === JSON.parse(localStorage.getItem("loggedIn"))){
            i++
        }
        // Id inkrementeres med 1 hver gang funktionen kører
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
            
            
        }
            })         
    }



    //like
    function like() {

    axios.get("http://localhost:5000/users/match/showmatches/")
        .then(function(res){
        var matches = res.data;
        

    axios.post("http://localhost:5000/users/like", {
        User: localStorage.getItem('loggedIn'),
        Likes: localStorage.getItem('likeId')
    }) 
    .then(function(res){
        for ( i = 0; i < res.data.length; i++){
            for ( j = 0; j < res.data.length; j++){
            
                
                if ( res.data[i].User === res.data[j].User && res.data[i].Likes === res.data[j].Likes && j!==i){

                    //sletter altid det seneste like
                    axios.delete("http://localhost:5000/users/likes/" + (res.data.length - 1))

                    return alert("You have already liked this profile.. Don't be desperate!");
                    
                }
                else if (res.data[i].User === res.data[j].Likes && res.data[i].Likes === res.data[j].User && j!==i){
                    
                    
                    axios.post("http://localhost:5000/users/match/match", {
                        id1 : res.data[i].User,
                        id2 : res.data[j].User
                    })

                    
                    for ( q = 0; q < JSON.stringify(matches.length); q++){
                        for ( w = 0; w < JSON.stringify(matches.length); w++){
                        // der tjekkes for duplikeringer i matches.json    
                    if( JSON.stringify(matches[q].id1) === JSON.stringify(matches[w].id1) && 
                        JSON.stringify(matches[q].id2) === JSON.stringify(matches[w].id2) && q!==w){
                        // seneste match slettes
                        axios.delete("http://localhost:5000/users/delete/match/" + (matches.length - 1))
                        
                        return alert("You have already matched with this profile")
                    }}}   

                    return alert("You have a match!");
                    
                }
            }
        }
        
    })})
    }   

function deleteMatch(){
        axios.delete("http://localhost:5000/users/delete/match/" + localStorage.getItem("matchId"))
    }

    function displayMyMatches() {
        axios.get("http://localhost:5000/users/match/show/")
        .then(function(res){ 
        
        for ( i = 0; i < res.data.length; i++){
            
            if ( res.data[i].id1 === localStorage.getItem("loggedIn")){
            
                
    localStorage.setItem('matchId', res.data[i].matchId)

    axios.get("http://localhost:5000/users/" + res.data[i].id2)
    .then(function(res){

        var myName = res.data.firstname;
        var interest = res.data.interest;
        var matchId = JSON.stringify(matchId)
        var table = document.getElementById("myTableData");
    
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
    
        row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onClick="deleteMatch()">`;
        row.insertCell(1).innerHTML= myName;
        row.insertCell(2).innerHTML= interest;
                        
                    })
                
            }
            else if ( res.data[i].id2 === localStorage.getItem("loggedIn")){

                
                localStorage.setItem('matchId', res.data[i].matchId)

                axios.get("http://localhost:5000/users/" + res.data[i].id1)
                    .then(function(res){


                        var myName = res.data.firstname;
                        var interest = res.data.interest;
                        var matchId = JSON.stringify(matchId)
                        var table = document.getElementById("myTableData");
                    
                        var rowCount = table.rows.length;
                        var row = table.insertRow(rowCount);
                    
                        row.insertCell(0).innerHTML= `<input type="button"  value = "Delete" onClick="deleteMatch()">`;
                        row.insertCell(1).innerHTML= myName;
                        row.insertCell(2).innerHTML= interest;
                        return
                    })
            }
        }
    }) 
    }

    
    



    

    
