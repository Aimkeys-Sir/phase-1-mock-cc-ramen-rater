// write your code here
const url=" http://localhost:3000/ramens"

const ramenMenu=document.getElementById("ramen-menu")
const ramenDetail=document.getElementById("ramen-detail")
const form=document.getElementById("new-ramen")
const newName=document.getElementById("new-name")
const newRestaurant=document.getElementById("new-restaurant")
const newImage=document.getElementById("new-image")
const rating=document.getElementById("new-rating")
const comment= document.getElementById("new-comment")

form.addEventListener("submit",e=>{
    e.preventDefault()
   const newRamen=new Ramen(newName.value,newImage.value,
    newRestaurant.value,rating.value,comment.value)
    newName.value=""
    newImage.value=""
    newRestaurant.value=""
    rating.value=""
    comment.value=""

    AddNewRamen(newRamen)
})

class Ramen
{
    name; image; restaurant;rating;comment;
    constructor(name,image,restaurant,rating,comment)
    {
        this.name=name
        this.image=image
        this.restaurant=restaurant
        this.rating=rating
        this.comment=comment
    }
}

fetch(url)
.then(response=>response.json())
.then(data=>{
    displayRamens(data)
    displayRamenDetails(data[0]) 
    console.log(data)
})
function AddNewRamen(newRamen)
{
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newRamen)   
    })
}
function displayRamens(data)
{
    data.forEach(ramen=>{
        const image= document.createElement("img")
        image.src=ramen.image
        ramenMenu.append(image)
        image.addEventListener("click",()=>{
            displayRamenDetails(ramen)
            
        })
    })
}
function displayRamenDetails(ramen)
{
    const image=document.querySelector(".detail-image")
    image.src=ramen.image
    image.alt=ramen.name

    const name=document.querySelector(".name")
    name.textContent=ramen.name
    const restaurant=document.querySelector(".restaurant")
    restaurant.textContent=ramen.restaurant
    const commentDisplay=document.getElementById("comment-display")
    commentDisplay.textContent=ramen.comment
    const ratingDisplay=document.getElementById("rating-display")
    ratingDisplay.textContent=ramen.rating
}