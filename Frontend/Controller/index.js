const rememberDiv = document.querySelector('.husk');
const forgetDiv = document.querySelector('.glem');
const table = document.querySelector('table');
//Bruger # fordi det er et inputfelt. 
const nameInput = document.querySelector('#skrivnavn');
const submitBtn = document.querySelector('#submitnavn');
const forgetBtn = document.querySelector('#glemnavn');

const h1 = document.querySelector('h1')
const personalGreeting = document.querySelector('.personal-greeting')


table.addEventListener('submit', function(e){
    //Gør at submit ikke gør som den plejer, men at man selv kan definere hvad den skal gøre. 
    e.preventDefault();
});
//"Click" betyder at den skal reagere på et click. 
submitBtn.addEventListener('click', function(){
    localStorage.setItem('navn', nameInput.value);
    nameDisplayCheck()
})

forgetBtn.addEventListener('click', function(){
    localStorage.removeItem('navn')
    nameDisplayCheck()
})

function nameDisplayCheck() {
    if(localStorage.getItem('navn')){
        let name = localStorage.getItem('navn');
        h1.textContent = 'Velkommen ' + name;
        personalGreeting.textContent = 'Velkommen til vores hjemmeside ' + name;
        
        } else {
            h1.textContent = 'Velkommen ukendte person';
            personalGreeting.textContent = 'Hej person som jeg ikke kender endnu';
            
        }
    }
//Dette betyder at funtionen bliver kørt til sidst. 
document.body.onload = nameDisplayCheck

//Man kan i chrome se navnet ved at skrive localStorage.getItem("navn") i loggen i browseren. 