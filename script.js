let images=document.querySelectorAll("#slider_container>img")
// console.log(images)
let index=0
function showimages(){
    images.forEach((img,i)=>{
        img.classList.toggle("non-active",i!==index)
    })
}

let rightArrow=document.getElementById("right_arrow")
// console.log(rightArrow)
rightArrow.addEventListener("click",()=>{
    index++
    if(index >= images.length){
        index=0
    }
    showimages()
})

let leftArrow=document.getElementById("left_arrow")
leftArrow.addEventListener("click",()=>{
    index--
    if(index < 0){
        index=images.length-1
    }
    showimages()
})