const marketPlaceProducts = document.getElementById('marketPlaceProducts')
const buyerMMartToken = localStorage.getItem('buyerMMartToken')
const alertMessage = document.getElementById('alertMessages')
const category = document.getElementById('category')
const logedIn = document.getElementById('logedIn')
const productPage = document.getElementById('productPage')


window.onload = function(){
    loadMarket()
    loadBuyer()
}   

category.addEventListener('change', ()=>{
    if(category.value == 'All'){
        return loadMarket()
    }
    axios({
        method: 'post',
        url: 'http://localhost:3000/marketPlace/bycategory',
        params: {
            category: category.value
        }
    })
    .then(response =>{
        console.log(response)
        if(response.data.error){
            console.log('error')
            alertMessage.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${response.data.error.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`

        } else {
            marketPlaceProducts.innerHTML =''
            response.data.productData.forEach(product => {
                marketPlaceProducts.innerHTML += `
                <div class="col">
                        <div class = "card bg-secondary mb-3 productCard" style = "width: 18rem; margin:auto">
                            <img src = "data:image/jpeg;base64,${product.productAvatar}" class = "card-img-top" style=" height:15rem" alt = "${product.name} image" >
                            <div class = "card-body" >
                                <h5 class = "card-title" > <button type="button" class="btn btn-light col" data-toggle="modal" data-target="#staticBackdrop" onclick="getProduct('${product._id}')">Light${product.name} </button></h5> 
                            </div> 
                            <ul class = "list-group list-group-flush">
                                <li class = "list-group-item" > Price: ${product.price} </li> 
                                <li class = "list-group-item" > Stock: ${product.stock}</li>
                                <li class = "list-group-item" > Category: ${product.category}</li> 
                            </ul> 
                        </div> 
                    
                    <br> 
                </div>
                `
            })

        }
        
    }).catch(e =>[
        console.log(e)
    ])

})

function loadBuyer(){
    logedIn.innerHTML = ``
    if(buyerMMartToken){
        axios({
            method: 'get',
            url: 'http://localhost:3000/buyer/welcome',
            headers: {
                auth: buyerMMartToken
            }
        }).then(response =>{
            console.log(response) 
            if(response){
                logedIn.innerHTML =`
                <button type="button" class="btn" style=" border-radius: 50%;" id="myProfile"><a href="../buyer/buyer.html"><img src="data:image/png;base64, ${response.data.avatar}"  alt="PP" style="width:40px; height:40px; border-radius: 50%;;" /></a></button>
                <button type="button" class="btn btn-primary" id="myCart" onClick="showCart()" data-toggle="modal" data-target="#buyersCart">
                        Cart <span class="badge bg-secondary" id='cartCount'>${response.data.cartCount}</span>
                        <span class="sr-only">unread messages</span>
                </button>
                <button type="button" class="btn btn-light" onclick="logOut()">Bye</button>
                `
            }

        }).catch(e =>{
            console.log(e)
            console.log('whooo')
        } )
    } else {
        logedIn.innerHTML = `<a href="../index.html"><button type="button" class="btn btn-outline-success">Login/Register</button></a>`
    }
}

function loadMarket(){
    axios({
        method: 'get',
        url:'http://localhost:3000/marketplace'
    }).then(response =>{
        console.log(response)
        if(response.data.error){
            console.log('error')
        } else {
            alertMessage.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${response.data.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`

            response.data.productData.forEach(product => {
                marketPlaceProducts.innerHTML += `
                <div class="col">
                        <div class = "card bg-secondary mb-3 productCard" style = "width: 18rem; margin:auto">
                            <img src = "data:image/jpeg;base64,${product.productAvatar}" class = "card-img-top" style=" height:15rem" alt = "${product.name} image" >
                            <div class = "card-body" >
                                <h5 class = "card-title" > <button type="button" class="btn btn-light col" data-toggle="modal" data-target="#staticBackdrop" onclick="getProduct('${product._id}')">Light${product.name} </button></h5> 
                            </div> 
                            <ul class = "list-group list-group-flush">
                                <li class = "list-group-item" > Price: ${product.price} </li> 
                                <li class = "list-group-item" > Stock: ${product.stock}</li>
                                <li class = "list-group-item" > Category: ${product.category}</li> 
                            </ul> 
                        </div> 
                    
                    <br> 
                </div>
                `
            })

        }
        
    }).catch(error => {
        console.log(error)
    })
}

function logOut(){
    axios({
        method:'post',
        url: 'http://localhost:3000/buyer/logout', 
        headers:{
            auth:buyerMMartToken
        }
    })
        .then(response =>{
            if(response.data.error){
                alertMessage.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${response.data.error.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
            } else {
                localStorage.removeItem('buyerMMartToken')
                location.reload()
            }
        }) .catch(e =>{
            console.log(e)
        })
} 

function getProduct(_id){
    axios({
        method:'get',
        url:'http://localhost:3000/marketPlace/product',
        params:{
            productID: _id
        }
    })
        .then(response=>{
            console.log(response)
            productPage.innerHTML = `
                <div class="modal-header col-12">
                    <h5 class="modal-title" id="staticBackdropLabel" style="text-transform:capitalize">${response.data.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class='text-center'>
                        <img class='img-fluid' src="data:image/jpeg;base64,${response.data.productAvatar}" style=" alt = "${response.data.name} image">
                    </div>
                    <div class='container'>
                        <div class="row">
                            <div class="col-3"><strong>Price:</strong></div>
                            <div class="col-3"><p>$${response.data.price}</p></div>
                            <div class="col-3"><strong>Stock:</strong></div>
                            <div class="col-3"><p>${response.data.stock}</p></div>
                        </div>
                        <div class="row">
                            <div class="col-12"><strong>Discription:-</strong></div>
                            <div class="col-12">${response.data.discription}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <div class="input-group col-md-6 cartCount">
                            <span class="input-group-text" id="basic-addon1">Count</span>
                            <input calss= "col-md-6 cartCount" type="number" class="form-control" value = "1" placeholder="1-10" aria-label="Username" aria-describedby="basic-addon1" min="1" max="10" id="itemCount">
                        </div>
                        <div class="col-md-6 text-center">
                            <button type="button" class="btn btn-secondary simplebuttons" id="addToCart" onClick="addToCart('${response.data._id}')">Add to Cart</button>
                            <button type="button" class="btn btn-primary simplebuttons" onclick="buyIt('${response.data._id}')">Buy</button>
                        </div>
                    </div>
                </div>
                </div>`

                if(!buyerMMartToken){
                    document.getElementById('addToCart').disabled= true
                    productPage.innerHTML += `
                    <div class="modal-footer">
                <div class="container">
                    <div class="row">
                    <div class = "mb-3">
                    <label for="formGroupExampleInput" class="form-label"><i style="font-size:.9rem; color:grey;"> You are not loged, so you can't use cart and have to fill this before you click buy</i></label>
                    </div>
                    <div class="mb-3">
                    <label for="formGroupExampleInput" class="form-label">Name</label>
                    <input type="text" class="form-control" id="noLoginName" placeholder="Example input placeholder">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Complete Address</label>
                    <input type="text" class="form-control" id="noLoignAddress" placeholder="Another input placeholder">
                  </div>
                    </div>
                </div>
                </div>`
                }
                
            
        }) .catch(e => {
            console.log(e)
    })
}

function addToCart(id){
    const count = document.getElementById('itemCount')
    console.log(count.value)
    axios({
        method:'post',
        url:'http://localhost:3000/buyer/addToCart',
        headers:{
            auth: buyerMMartToken
        },
        data:{
            product:{
                ID:id,
                count: Number(count.value)
            }
        }
    }) .then(response=>{
        console.log(response)
        document.getElementById('cartCount').innerHTML = response.data.cartCount
    }) .catch(e =>{
        console.log(e)
    })
}


function buyIt(id){
    if(buyerMMartToken){
        const count = document.getElementById('itemCount')
        axios({
            method:'post',
            url:'http://localhost:3000/buyer/directbuy',
            headers:{
                auth: buyerMMartToken
            }, 
            data:{
                product:{
                    ID: id,
                    count: Number(count.value)
                }
            }
        }).then(response =>{
            console.log(response)
            if(response.data.error){
                alertMessage.innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${response.data.error.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
            } else {
            productPage.innerHTML = `
                <div class="modal-header col-12">
                    <h5 class="modal-title" id="staticBackdropLabel" style="text-transform:capitalize">Thank You For Shoping</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${response.data.message}</p>
                </div>
                <div class="modal-footer">
                <div class="container">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shoping</button>
                </div>
                </div>`
        }})
    } else {
        const noLoignAddress = document.getElementById('noLoignAddress')
        const noLoginName = document.getElementById('noLoginName')
        const count = document.getElementById('itemCount')
        if(!noLoignAddress.value || !noLoginName.value){
            return alert('check the form below')
        }
        axios({
            method:'post',
            url:'http://localhost:3000/marketPlace/product/directbuy', 
            data:{
                address: noLoignAddress.value,
                product:{
                    
                    ID: id,
                    count: Number(count.value)
                }
            }
        }).then(response =>{
            if(response.data.error){
                alertMessage.innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${response.data.error.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
            } else {
            console.log(response)
            productPage.innerHTML = `
                <div class="modal-header col-12">
                    <h5 class="modal-title" id="staticBackdropLabel" style="text-transform:capitalize">Thank You For Shoping</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${response.data.message}</p>
                </div>
                <div class="modal-footer">
                <div class="container">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shoping</button>
                </div>
                </div>`
        }})
}}


function showCart(){
    const cartBody = document.getElementById('cartBody')
    if(buyerMMartToken){
        axios({
            method:'get',
            url:'http://localhost:3000/buyer/viewcart',
            headers: {
                auth:buyerMMartToken
            }
        }).then(response =>{
            cartBody.innerHTML=''
            console.log(response)
            response.data.productsData.forEach(product =>{
                cartBody.innerHTML +=`<hr>
                <div class="row" id="${product.product._id}">
                    <div class="col-sm-3">
                        <img src="data:image/jpeg;base64,${product.product.productAvatar}" class="img-thumbnail" alt="avatar">
                    </div>
                    <div class="col-sm-9">
                        <ul class="list-group">
                            <li class="list-group-item active" aria-current="true"><button type="button" class="btn btn-light" disabled>${product.product.name}</button></li>
                            <li class="list-group-item">Category: ${product.product.category}</li>
                            <li class="list-group-item">Price:${product.product.price}</li>
                            <li class="list-group-item">Count: ${product.count}</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                          </ul>
                    </div>
                    <hr><div class="col-12"><button type="button" class="btn btn-danger" onclick="removeFromCart('${product.product._id}')">Remove Form Cart</button></div>
                </div>
                <hr>`
                
            })
            cartBody.innerHTML += `<div class="text-center">Total Price: ${response.data.cartValue}</div>`
            
        }).catch(error=> console.log(error))
    } else {
        alert('Please login to use this feature')
    }
}


function removeFromCart(id){
    axios({
        method:'post',
        url:'http://localhost:3000/buyer/removeFromCart',
        headers:{
            auth:buyerMMartToken
        },
        data:{
            productID:id
        }
    }).then(response=>{
        console.log(response)
        document.getElementById(id).innerHTML= `<div class='text-center col-12'>Removed</div>`
        document.getElementById('cartCount').innerHTML = response.data.cartCount
    }).catch(e => console.log(e))
}

function emptyCart(){
    document.getElementById('weareDiable2').disabled = true
    document.getElementById('weareDiable').disabled = true
    axios({
        method:'get',
        url:'http://localhost:3000/buyer/emptyCart',
        headers:{
            auth: buyerMMartToken
        }
    }).then(response=>{
        if(response.data.error){
            alert('something worng has happend')
        } else{
            document.getElementById('cartCount').innerHTML = 0
            cartBody.innerHTML=''
            location.replace('./market.html')
        }

    }).catch(e=> console.log(e))
}

function checkout(){
    document.getElementById('weareDiable').disabled = true
    document.getElementById('weareDiable2').disabled = true
    axios({
        method:'get',
        url:'http://localhost:3000/buyer/checkout',
        headers:{
            auth: buyerMMartToken
        }
    }).then(response =>{
        if(response.data.error){
            alertMessage.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${response.data.error.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        } else {
        console.log(response)
        cartBody.innerHTML=
        cartBody.innerHTML=`
        <div class="card text-center">
            <div class="card-header">
                MMart
            </div>
            <div class="card-body">
                <h5 class="card-title">Thank You For Shoping With Us</h5>
                <p class="card-text">${response.data.message}.</p>
                <hr>
                <p>You will be redirected in some seconds</p>
            </div>
            <div class="card-footer text-muted">
                Have a nice day
            </div>
        </div>`
        }    

        document.getElementById('cartCount').innerHTML = 0
        window.setInterval(()=>{
            window.location.reload()
        }, 10000)
        
    })
}

