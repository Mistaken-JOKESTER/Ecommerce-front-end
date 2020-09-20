const reglog = document.getElementById('reglog')
const bl = document.getElementById('bl')
const br = document.getElementById('br')
const sl = document.getElementById('sl')
const sr = document.getElementById('sr')
const blForm = document.getElementById('blForm')
const bRegForm = document.getElementById('bRegForm')
const slForm = document.getElementById('slForm')
const sRegForm = document.getElementById('sRegForm')
const buyerMMartToken = localStorage.getItem('buyerMMartToken')
const sellerMMartToken = localStorage.getItem('sellerMMartToken')
const errorAlert = document.getElementById('error')
const bLoginForm = document.getElementById('bLoginForm')
const bLoginSubmit = document.getElementById('bLoginSubmit')
const sLoginForm = document.getElementById('sLoginForm')
const sLoginSubmit = document.getElementById('sLoginSubmit')
const welcome = document.getElementById('Welcome')
const bRegSubmit = document.getElementById('bRegSubmit')
const sRegSubmit = document.getElementById('sRegSubmit')

bl.addEventListener('click', () =>{
    if(buyerMMartToken){
        axios({
            method:'get',
            url:'http://localhost:3000/buyer/welcome',
            headers:{
                'auth':buyerMMartToken
            }
        }).then(response => {
            console.log(response)
            if(response.data.error){
                localStorage.removeItem('buyerMMartToken')
                reglog.style.display = 'none'
                blForm.style.display = 'block'
            } else {
                reglog.style.display = 'none'
                welcome.innerHTML = `
                <h2>Hi ${response.data.name}, good to see you back.</h2>
                <h6>You will be shortly redirected to our Market</h6>
                `
                window.setInterval(() => {
                    location.replace('./Marketplace/market.html')
                }, 7000)
            }
        })
    } else {
        reglog.style.display = 'none'
        blForm.style.display = 'block'
    }
    
})
br.addEventListener('click', () =>{
    welcome.innerHTML=''
    if(buyerMMartToken){
        axios({
            method:'get',
            url:'http://localhost:3000/buyer/welcome',
            headers:{
                'auth':buyerMMartToken
            }
        }).then(response => {
            console.log(response)
            if(response.data.error){
                localStorage.removeItem('buyerMMartToken')
                reglog.style.display = 'none'
                brForm.style.display = 'block'
            } else {
                reglog.style.display = 'none'
                welcome.innerHTML = `
                <h2>Hi ${response.data.name}, good to see you back.</h2>
                <h6>You will be shortly redirected to our Market</h6>
                `
                window.setInterval(() => {
                    location.replace('./Marketplace/market.html')
                }, 7000)
            }
        })
    } else {
        reglog.style.display = 'none'
        brForm.style.display = 'block'
    }
    
})

sl.addEventListener('click', () =>{
    if(sellerMMartToken){
        axios({
            method:'get',
            url:'http://localhost:3000/seller/welcome',
            headers:{
                'auth':sellerMMartToken
            }
        }).then(response => {
            console.log(response)
            if(response.data.error){
                localStorage.removeItem('sellerMMartToken')
                reglog.style.display = 'none'
                slForm.style.display = 'block'
            } else {
                reglog.style.display = 'none'
                welcome.innerHTML = `
                <h2>Hi ${response.data.name}, good to see you back.</h2>
                <h6>You will be shortly redirected to our Seller Dashboard</h6>
                `
                window.setInterval(() => {
                    location.replace('./SellerDashboard/seller.html')
                    console.log('redirect')
                }, 7000)
            }
        })
    } else {
        reglog.style.display = 'none'
        slForm.style.display = 'block'
    }
})

sr.addEventListener('click', () =>{

    if(sellerMMartToken){
        axios({
            method:'get',
            url:'http://localhost:3000/seller/welcome',
            headers:{
                auth:sellerMMartToken
            }
        }).then(response => {
            console.log(response)
            if(response.data.error){
                localStorage.removeItem('sellerMMartToken')
                reglog.style.display = 'none'
                srForm.style.display = 'block'
            } else {
                reglog.style.display = 'none'
                welcome.innerHTML = `
                <h2>Hi ${response.data.name}, good to see you back.</h2>
                <h6>You will be shortly redirected to our Seller Dashboard</h6>
                `
                window.setInterval(() => {
                    location.replace('./SellerDashboard/seller.html')
                }, 7000)
            }
        })
    } else {
        reglog.style.display = 'none'
        srForm.style.display = 'block'
    }
})


function backFunction(){
    console.log('clikced')
    reglog.style.display='block'
    blForm.style.display = 'none'
    brForm.style.display = 'none'
    slForm.style.display = 'none'
    srForm.style.display = 'none'
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//buyer login
bLoginSubmit.addEventListener('click', (e) => {

    e.preventDefault()
    console.log(bLoginForm.email.value, bLoginForm.password.value)
    axios({
        method: 'post',
        url: 'http://localhost:3000/buyer/login',
        data:{
            email: bLoginForm.email.value,
            password: bLoginForm.password.value
        }
    }) .then(response =>{
        console.log(response.data.token)
        if(response.data.error){
            errorAlert.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${response.data.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>` 
        } else {
            localStorage.setItem('buyerMMartToken', response.data.token)
            location.replace('./Marketplace/market.html')
        }
        
    }) .catch(e => {
        alert('some error occured try again')
    })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Seller login
sLoginSubmit.addEventListener('click', (e) => {

    e.preventDefault()
    console.log(sLoginForm.email.value, sLoginForm.password.value)
    axios({
        method: 'post',
        url: 'http://localhost:3000/seller/login',
        data:{
            email: sLoginForm.email.value,
            password: sLoginForm.password.value
        }
    }) .then(response =>{
        console.log(response.data.token)
        if(response.data.error){
            errorAlert.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${response.data.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>` 
        } else {
            localStorage.setItem('sellerMMartToken', response.data.token)
            location.replace('./SellerDashboard/seller.html')
        }
        
    }) .catch(e => {
        
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//buyer register

bRegSubmit.addEventListener('click', (e)=>{
    e.preventDefault()

    var contentType = {headers: {'Content-Type': 'multipart/form-data'}}
    var formData = new FormData
    for(const x in bRegForm){
        if(bRegForm.elements[x].id == 'bRegSubmit')
          break
        if(bRegForm.elements[x].id == 'imagePic'){
          formData.append(bRegForm.elements[x].name, bRegForm.elements[x].files[0])
          continue
        }
        formData.append(bRegForm.elements[x].name, bRegForm.elements[x].value)  
    }
    axios.post('http://localhost:3000/buyer/register', formData, contentType)
    .then(response => {
        console.log(response)
        if(response.data.error){
            errorAlert.innerHTML = ''
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(response)
            console.log(response.data.error.message)
            const errors = response.data.error.message.split(', ')
            console.log(errors)
            for(const x in errors) {
                errorAlert.innerHTML += `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                ${errors[x]}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>`
            }
            
            
        } else {
            brForm.style.display='none'
            welcome.innerHTML = '<h3>Welcome to MMart You will be shortly redirected to login portal </h3>'
            setInterval(()=>{
                welcome.innerHTML=''
                blForm.style.display="block"
                
            }, 5000)
            
        }
        
    }).catch(e =>{
        console.log(e)
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////
//seller register

sRegSubmit.addEventListener('click', (e)=>{
    e.preventDefault()

    var contentType = {headers: {'Content-Type': 'multipart/form-data'}}
    var formData = new FormData
    for(const x in sRegForm){
        if(sRegForm.elements[x].id == 'sRegSubmit')
          break
        if(sRegForm.elements[x].id == 'imagePic'){
          formData.append(sRegForm.elements[x].name, sRegForm.elements[x].files[0])
          continue
        }
        formData.append(sRegForm.elements[x].name, sRegForm.elements[x].value)  
    }

    axios.post('http://localhost:3000/seller/register',formData, contentType)
    .then(response => {
        console.log(response)
        if(response.data.error){
            errorAlert.innerHTML = ''
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(response)
            console.log(response.data.error.message)
            const errors = response.data.error.message.split(', ')
            console.log(errors)
            for(const x in errors) {
                errorAlert.innerHTML += `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                ${errors[x]}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>`
            }
            
            
        } else {
            srForm.style.display='none'
            welcome.innerHTML = '<h3>Welcome to MMart You will be shortly redirected to login portal </h3>'
            setInterval(()=>{
                welcome.innerHTML=''
                slForm.style.display="block"
                
            }, 5000)
            
        }
        
    }).catch(e =>{
        console.log(e)
    })
})