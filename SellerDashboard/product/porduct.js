const sellerMMartToken = localStorage.getItem('sellerMMartToken')
const productRegForm = document.getElementById('productRegForm')
const productRegSubmit = document.getElementById('productRegSubmit')
const errorAlert = document.getElementById('alert')
const displayProducts = document.getElementById('displayProducts')

window.onload = function(){
    axios({
        url:'http:/localhost:3000/seller/viewProducts',
        method:'post',
        headers:{
            auth: sellerMMartToken
        }
    }).then(response =>{
        displayProducts.innerHTML = ''
        console.log(response)
        response.data.products.forEach(product => {
            displayProducts.innerHTML += `
                <div class="card p-3 m-3" style="width: 18rem;">
                    <img src="data:image/png;base64, ${product.productAvatar}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#id${product._id}">
                View
                </button>
                    </div>
                </div>

                

                <!-- Modal -->
                <div class="modal fade" id="id${product._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id="product${product._id}">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-4">
                                            <img src="data:image/png;base64, ${product.productAvatar}" class="img-thumbnail img-fluid" alt="...">
                                        </div>
                                        <div class="col-8">
                                            <strong>Name</strong>: <p>${product.name}</p>
                                            <strong>price</strong>: <p>${product.price}</p>
                                            <strong>Stock</strong>: <p>${product.stock}</p>
                                            <strong>Category</strong>: <p>${product.category}</p>
                                            <strong>Discription</strong>: <p>${product.Discription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" id="productfooter${product._id}">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="removeProduct('${product._id}')">Remove Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    }).catch(e =>{
        console.log(e)
    })
}

productRegSubmit.addEventListener('click',(e)=> {
    e.preventDefault()

    var contentType = {headers: {'Content-Type': 'multipart/form-data', auth: sellerMMartToken}}
    var formData = new FormData
    for(const x in productRegForm){
        console.log(productRegForm.elements[x].name,productRegForm.elements[x].value)
        if(productRegForm.elements[x].id == 'productRegSubmit')
          break
        if(productRegForm.elements[x].id == 'imagePic'){
          formData.append(productRegForm.elements[x].name, productRegForm.elements[x].files[0])
          continue
        }
        formData.append(productRegForm.elements[x].name, productRegForm.elements[x].value)  
    }

    axios.post('https://asroot-ecommerce.herokuapp.com/seller/addProduct', formData, contentType)
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
            console.log('done')
            productRegForm.innerHTML ='<br><br><br><h3 class="text-center text-secondary">your product is registed and you will redirected to proudcts page</h3>'
            setInterval(()=>{
                location.reload()
            }, 5000)
        }
        
    }).catch(e =>{
        console.log(e)
    })
})

function removeProduct(id){
    axios({
        url:'http:/localhost:3000/seller/removeProduct',
        method:'post',
        headers:{
            auth:sellerMMartToken
        },
        data: {
            productID:id.toString()
        }
    }).then(response =>{
        console.log(response)
        if(response.error){
            document.getElementById(`product${id}`).innerHTML += '<p>Something went wrong refresh and try agian</p>'
        } else{
            document.getElementById(`productfooter${id}`).innerHTML =``
            document.getElementById(`product${id}`).innerHTML ='<div class="lead text-center m-3"><p>This product is removed you will be redirected shortly</p></div>'
            setInterval(()=>{
                location.reload()
            }, 3000)
        }
    }).catch(e =>{
        console.log(e)
    })
}