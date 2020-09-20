const buyerMMartToken = localStorage.getItem('buyerMMartToken')
const profile = document.getElementById('profile')
const upadteProfile = document.getElementById('updateProfile')
const deleteProfile = document.getElementById('deleteProfile')
const alert = document.getElementById('alert')

alert.innerHTML

window.onload = function (){
    if(!buyerMMartToken){
        location.replace('../index.html')
    } else {
        axios({
            method:'get',
            url:'http://localhost:3000/buyer/profile',
            headers:{
                auth: buyerMMartToken
            }
        }) .then(response => {
            if(response.data.error){
                alert.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> ${response.data.error.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>` 
                
            } else {
                if(!response.data.avatar){
                    document.getElementById('avatar').src ='https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg'
                } else{
                    document.getElementById('avatar').src = `data:image/png;base64, ${response.data.avatar}`
                }
                profile.firstName.value = response.data.firstName
                profile.secondName.value = response.data.secondName
                profile.phNumber.value =response.data.phNumber
                profile.city.value =response.data.city
                profile.address.value =response.data.address
                profile.email.value = response.data.email
                for(const x in profile){
                    if(!profile.elements[x])
                        break
                    profile.elements[x].disabled = true
                }
            }
        })
           .catch(e => console.log(e))
    }
}

function updateMyProfile(){
    document.getElementById('delete').style.display='none'
    document.getElementById('update').style.display='none'
    for(const x in profile){
        if(!profile.elements[x])
            break
        profile.elements[x].disabled =false
    }
    updateProfile.style.display = 'block'
}

function deleteMyProfile(){
    document.getElementById('delete').style.display='none'
    document.getElementById('update').style.display='none'
    deleteProfile.style.display = 'block'
}

function updateIt(){
    var contentType = {headers: {'Content-Type': 'multipart/form-data', auth: buyerMMartToken}}
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

    axios.post('http://localhost:3000/buyer/update', formData, contentType)
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
        url:'http://localhost:3000/buyer/delete',
        headers:{
            auth: buyerMMartToken
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
            deleteProfile.style.display = 'none'
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
        window.localStorage.removeItem('buyerMMartToken')
        }
    }) .catch(e => console.log(e))
}