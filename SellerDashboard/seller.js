const sellerMMartToken = localStorage.getItem('sellerMMartToken')
const profile = document.getElementById('profile')
const deleteProfile = document.getElementById('deleteProfile')
const alert = document.getElementById('alert')

alert.innerHTML

window.onload = function (){
    if(!sellerMMartToken){
        location.replace('../index.html')
    } else {
        axios({
            method:'get',
            url:'http://localhost:3000/seller/profile',
            headers:{
                auth: sellerMMartToken
            }
        }) .then(response => {
            console.log(response)
            if(response.data.error){
                alert.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> ${response.data.error.message} & you will be redirected to login page
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>` 
                setInterval(()=>{
                    location.replace('../index.html')
                }, 5000)
                
                
            } else {
                document.getElementById('avatar').src = `data:image/png;base64, ${response.data.profile.avatar}`
                if(!response.data.profile.avatar){
                    document.getElementById('avatar').src = `https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`
                    document.getElementById('avatarpic').src ='https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                } else{
                    document.getElementById('avatar').src = `data:image/png;base64, ${response.data.profile.avatar}`
                    document.getElementById('avatarpic').src = `data:image/png;base64, ${response.data.profile.avatar}`
                }
                profile.firstName.value = response.data.profile.firstName
                profile.secondName.value = response.data.profile.secondName
                profile.phNumber.value =response.data.profile.phNumber
                profile.city.value =response.data.profile.city
                profile.shopAddress.value =response.data.profile.shopAddress
                profile.email.value = response.data.profile.email
                profile.shopName.value = response.data.profile.shopName
                
                for(const x in profile){
                    if(!profile.elements[x])
                        break
                    profile.elements[x].disabled = true
                }
                document.getElementById('save').style.display= 'none'
                document.getElementById('updateProfile').style.display ='block'
             }
        })
           .catch(e => console.log(e))
    }
}

function updateMyProfile(){
    for(const x in profile){
        if(!profile.elements[x])
            break
        profile.elements[x].disabled =false
    }
    document.getElementById('updateProfile').style.display ='none'
    document.getElementById('save').style.display ='block'
    
}

function updateIt(){
    var contentType = {headers: {'Content-Type': 'multipart/form-data', auth: sellerMMartToken}}
    var formData = new FormData
    for(const x in profile){
        if(!profile.elements[x])
          break
        if(profile.elements[x].id == 'imagePic'){
            if(profile.elements[x].files[0]){
                formData.append(profile.elements[x].name, profile.elements[x].files[0])
            }

          continue
        }
        formData.append(profile.elements[x].name, profile.elements[x].value)  
    }

    axios.post('http://localhost:3000/seller/update', formData, contentType)
        .then(response =>{
            console.log(response)
            if(response.data.error){
                alert.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> ${response.data.error.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>` 
            }else{
                location.reload()
            }
            
        }) .catch(e =>console.log(e))
}

function deleteIt(){
    console.log('you are clicked')
    axios({
        method:'delete',
        url:'http://localhost:3000/seller/delete',
        headers:{
            auth: sellerMMartToken
        }
    }) .then(response =>{
        if(response.data.error){
            alert.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error:</strong> ${response.data.error.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>` 
            
        } else {
             profile.innerHTML = ''
            alert.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <div class='text-center'>You have succesfully deleted your profile and will be redirected to login page</div>
                    
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
            setInterval(()=>{
                location.assign('../index.html')
            },5000)
        window.localStorage.removeItem('sellerMMartToken')
        }
    }) .catch(e => console.log(e))
}


function logout(){
    axios({
        method:'post',
        url: 'http://localhost:3000/seller/logout', 
        headers:{
            auth:sellerMMartToken
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
                localStorage.removeItem('sellerMMartToken')
                location.reload()
            }
        }) .catch(e =>{
            console.log(e)
        })
}