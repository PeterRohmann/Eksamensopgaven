// Dette er et af mange forsøg på at få testing til at fungere

//let createProfileValidation = require('./createProfileValidation')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../Controller/server')

chai.should();

chai.use(chaiHttp);

/*
var dummyElement = global.document.createElement('div');
global.document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
*/

describe("POST /users", function() {
    
    it('It should POST a new user', function(done) {
        this.timeout(10000);
        const data = {
            username: "myUsername",
            password: "mypassword"
        }
        chai.request(server)
        .post('http://localhost:5000/users')
        .send(data)
        .then((err, response) => {
            should.exist(response.body);
            response.should.have.status(200);
            done();
            
        }).catch(done);
    })
})