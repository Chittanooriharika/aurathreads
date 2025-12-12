//FOR INPUT SERACH TAG IN HTML FILE
let searchInput=document.getElementById("searchinput")
let productCards=document.querySelectorAll(".product_card")
// console.log(searchInput)
// console.log(productCards)
searchInput.addEventListener("input",()=>{
    let serachValue=searchInput.value.toLowerCase()
    productCards.forEach((card)=>{
        let productName=card.querySelector("h1").innerText.toLowerCase()
        if(productName.includes(serachValue)){
            card.style.display="flex"
        }else{
            card.style.display="none"
        }
    })

//DISPLAY ONLY PARTICULAR CONTAINER CLASS IMAGES
let ProductContainers=document.querySelectorAll(".products")
ProductContainers.forEach((productcontainer)=>{
    let cards=productcontainer.querySelectorAll(".product_card")
    let visiblecount=0
    cards.forEach((card)=>{
        if(card.style.display=="flex"){
            visiblecount++
    }
    })
    if(visiblecount == 0){
        productcontainer.style.display="none"
    }
    else{
        productcontainer.style.display="block"
    }
  })
})

//ADD TO CART FUNCTIONALITY
let cart=[]
let cartQuantity=document.getElementById("cart_quantity")
let cart_price=document.getElementById("cart_price")
productCards.forEach((card)=>{
    let productName=card.querySelector("h1").innerText
    let productPrice=parseFloat(card.querySelector("p").innerText.replace("₹",""))
    let productImage=card.querySelector("img").src
    let minusBtn=card.querySelector(".minus_btn")
    let cardQuantity=card.querySelector(".card_quantity")
    let plusBtn=card.querySelector(".plus_btn")
    let cardcartIcon=card.querySelector(".card_details2>p")
    

    function UpdateNavbar(){
        let totalQty=0;
        let totalPrice=0;
        cart.forEach((item)=>{
            totalQty += item.qty
            totalPrice += item.price*item.qty

        })
        cartQuantity.innerText=totalQty
        cart_price.innerText=`₹${totalPrice.toFixed(2)}`


    }

    function updateCart(name,price,qty){
        let existing=cart.find(item=>item.name == name)
        if(existing){
            existing.qty=qty
            if(qty==0){
                cart = cart.filter(item => item.name !== name)
            }
        }else{
            cart.push({name,price,qty,image:productImage})
        }
        UpdateNavbar()
        localStorage.setItem("cart",JSON.stringify(cart))

    }

       plusBtn.addEventListener("click",()=>{
        let qty=parseInt(cardQuantity.innerText)
        qty++
        cardQuantity.innerText=qty
        updateCart(productName,productPrice,qty)
        // console.log(cart)
        renderSidebar()

    })
     minusBtn.addEventListener("click",()=>{
        let qty=parseInt(cardQuantity.innerText)
        if(qty>0)qty--
        cardQuantity.innerText=qty
        updateCart(productName,productPrice,qty)
        // console.log(cart)
        renderSidebar()
        
    })
})

//SIDEBAR FUNCTIONALITY
let cartIcon=document.querySelector("#nav_three>i")
let slideBar=document.getElementById("sidebar_container")
let closeBtn=document.querySelector("#side_bar1>p")
let slidebar2=document.getElementById("side_bar2")
let totalcartPrice=document.querySelector("#side_bar3>h2>span")

cartIcon.addEventListener("click",()=>{
    slideBar.style.right="0px"
})
closeBtn.addEventListener("click",()=>{
    slideBar.style.right="-350px"
})


function renderSidebar(){
    slidebar2.innerHTML=""
    if(cart.length == 0){
        slidebar2.innerHTML=`<p style=margin:20px> Your Cart is Empty </p>`
        totalcartPrice.innerText="0.00"
        return
    }
    let total=0
    cart.forEach((item)=>{
        total += item.price*item.qty
        let itemDiv=document.createElement("div")
        itemDiv.classList.add("cart_item")
        itemDiv.innerHTML=`
        <div class=cart_item1>
        <img src=${item.image} alt=${item.name} height=120 width=150>
        </div>
        <div class=cart_item2>
            <h2>${item.name}</h2>
            <p>${item.price}</p>
           <div class=cart_item2_details>
              <p class=cart_minus_btn>-</p>
              <p class=cart_item_quantity>${item.qty}</p>
              <p class=cart_plus_btn>+</p>
              <p class=cart_delete_btn><i class="fa-regular fa-trash-can"></i></p>
           </div>
        </div>
        `
        slidebar2.append(itemDiv)

        //CART ITEMS DELETE FUNCTIONALITY
        let deleteBtn= itemDiv.querySelector(".cart_delete_btn")
        deleteBtn.addEventListener("click",()=>{

            cart=cart.filter(existingItem => existingItem.name != item.name)
            renderSidebar()
            //NAVBAR UPDATION
            let totalQty=0
            let totalPrice=0
            cart.forEach((item)=>{
                totalQty += item.qty
                totalPrice += item.price* item.qty
            })
            cartQuantity.innerText=totalQty
            cart_price.innerText=`₹${totalPrice.toFixed(2)}`
            localStorage.setItem("cart",JSON.stringify(cart))

            let allCards=document.querySelectorAll(".product_card")
            allCards.forEach((card) => {
                let name =card.querySelector("h1").innerText
                if(name == item.name){
                    let quantity=card.querySelector(".card_quantity")
                    quantity.innerText=0
                }
            })
            
        })


        totalcartPrice.innerText=total.toFixed(2)
    })

}


//navigating to checkout html page
let checkoutBtn=document.getElementById("checkout_btn")
checkoutBtn.addEventListener("click",()=>{
    location.href="checkout.html"
   
})



