

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent='From Javascript';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const theLocation = search.value;
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address=' +
     theLocation).then((res)=>{
     res.json().then((data)=>{
         if(data.error){
             messageOne.textContent=data.error;
         }else{
             messageOne.textContent=data.location
             messageOne.textContent=data.forecast
           
         }
       
     })
})
    
})


