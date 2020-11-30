
const fs = require('fs');
const express = require('express');
const router = express.Router()

//https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
//På ovenstående link om nodejs er der en masse relavante ting at læse om til rapportskrivning. 


const dataPath = '../Model/users.json';
const likePath = '../Model/likes.json';


//Create
router.post('/', (req, res) => {
    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const newUserId = parsedData.length;
    // add the new user
    req.body.id = newUserId 
    parsedData.push(req.body)
    console.log(parsedData)
    //data[newUserId.toString()] = req.body;
    fs.writeFile(dataPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send('new user added');
    });
    })
      
});
// til likefunktionen

router.post('/like', (req, res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    parsedData.push(req.body)
    
    fs.writeFile(likePath, JSON.stringify(parsedData),(e) => {
        
        res.status(200).send(JSON.stringify(parsedData));
    });
    })      
});





//Vise fuldt overblik
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        userByIdArray = parsedData[userId];
        res.send(parsedData[userId]);
    });
}); 



// Delete 
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        // add the new user
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
        parsedData = parsedData.filter(function(x) {return x !== null});
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);
    //Måske lave et if statement. Hvis der står "null" i array'et så bliver det automatisk fjernet. Eller det vil måske ikke virke(hvad med kommaet??)
    //Det skal ikke laves her, men inde i login funktionen, hvor den kigger efter username. Hvis der står "null,", så spring over?.
    // Det har intet med det den her funktion at gøre. Lav et for-loop i loginfunktionen, der tager højde for "null,", og så skal den .pop(). 
});

//deletelike
router.delete('/deletelike', (req, res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
        // add the new user
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
        fs.writeFile(likePath, JSON.stringify(parsedData), () => {
            res.status(200).send(JSON.stringify(parsedData));
        });
    },
    true);

    
});

//login
router.post('/login', (req, res) => {

    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
        console.log(data)
        // Userarray kunne også være kaldt parsedData, som jeg har gjort under Delete og Create. 
        const userArray = JSON.parse(data);
        console.log(userArray)
        for (let i=0; i < userArray.length; i++) {
            if (req.body.username2 === userArray[i].username && req.body.password2 === userArray[i].password1) {
                
                let signedIn = userArray[i];
                
                res.status(200).json(signedIn);
                return
            }
        }
        console.log(req.body)
        res.status(400).send("fejl");   
    },
    true);
});    

//logout
router.post('/logout', (req, res) => {

    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
                res.status(200).json("Logged out succesfully");
                return
            },
    true);
});    

//Opdater
router.patch('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        // add the new user
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        parsedData[userId] = req.body;
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
    true);
});



module.exports = router;
    /*
    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/users', (req, res) => {

        //her skal bruger-input tages fra req-body
        //her skal hentes database array
        console.log(req.body)
    
        readFile(data => {
        const newUserId = Object.keys(data).length;
    
        // add the new user
        req.body.id = newUserId 
        data.push(req.body)
        //data[newUserId.toString()] = req.body;
        console.log(data)
    
        writeFile(JSON.stringify(data, 2), () => {
            res.status(200).send('new user added');
        });
    },
        true);
    });
*/



 
/*

    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });



    
    

        

    //her bestemmes om brugeren logges ind eller ej




  // LoginValidation
  
  const fs = require('fs');
const dataPath = '../data/users.json';

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        console.log(JSON.parse(data));
    });
*/





