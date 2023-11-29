const cartKey="itemsInCart"

function loadCartDisplay() {
    const cart= getCart()
    const cartDisplay=document.getElementById("cartItems")
    const cartTitle=document.getElementById("cartTitle")
    if (cart.length==0) {
        const div=document.createElement("div")
        div.setAttribute("class","emptyCartSign")
        const p=document.createElement("p")
        p.innerText="Your cart is empty"

        div.appendChild(p)
        cartDisplay.appendChild(div)
    }
    else {
        for (var index=0;index<cart.length;index++) {
            const item=cart[index]


            const div=document.createElement("div")
            div.setAttribute("class","FlexBox")

            const image=document.createElement("img")
            let source="../Product Images/"+item.Photo_File_Name+".jpg"
            image.src=source
            image.setAttribute("class","productimage")

            div.appendChild(image)
            div.appendChild(getItemInfoHTML(item))
            div.appendChild(getQtyPriceHTML(item))
            cartDisplay.appendChild(div)
            
            


        }
    }
}



function getQtyPriceHTML(item) {
    const div=document.createElement("div")
    const qty=document.createElement("input")
    const id=item.Item_Number+"qty"
    qty.setAttribute("class", "qty")
    qty.setAttribute("id", id)

    qty.setAttribute("type","number")
    qty.setAttribute("min","1")
    qty.setAttribute("max","99")
    qty.setAttribute("value", "1")
    

    const remove=document.createElement("button")
    remove.setAttribute("class", "remove")
    remove.innerText="Remove"
    remove.onclick=function() {
        removeItemFromStorage(item)
        location.reload()
    }


    document.createElement("p")


    div.appendChild(qty)
    div.appendChild(remove)
    return div
}

function removeItemFromStorage(item) {
    stringItem=JSON.stringify(item)
    const qty=Number(localStorage.getItem(cartKey))
    removed=false
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        if (!removed) {
            
            const storageItem=localStorage.getItem(loadKey)
            if (storageItem==stringItem){
                
                removed=true
            } 
        }
        if (removed&&i<qty-1) {
            const nextIndex=i+1
            const nextKey="item"+nextIndex
            localStorage.setItem(loadKey, localStorage.getItem(nextKey))
        }
        else if (removed&&i==qty-1) {
            localStorage.removeItem(loadKey)
        }
        
    }
    incrementCart(-1)
}


function getItemInfoHTML(item) {
    const p=document.createElement("p")
    p.innerHTML=item.Item_Name+"<br>"
    p.innerHTML+="<span style='font-size: 16px;'>&nbsp&nbsp"+item.Item_Description+"<br></span>"
    p.setAttribute("class","info")

    return p
}

function checkForCart() {
    console.log(localStorage.getItem(cartKey))
    if (localStorage.getItem(cartKey)!=null) {return true}
    else {return false}

}


function createEmptyCart() {
    localStorage.setItem(cartKey,0)
}


function addToCart(item) {
    console.log(checkForCart())
    if (!checkForCart()) {
        createEmptyCart()
    }
    const saveIndex=(localStorage.getItem(cartKey)).toString()
    const saveKey="item"+saveIndex
    const JSONitem=JSON.stringify(item)
    localStorage.setItem(saveKey, JSONitem)
    incrementCart()

}

function incrementCart(increment=1) {
    newQty=Number(localStorage.getItem(cartKey))+increment
    localStorage.setItem(cartKey,newQty)
}


function getCart() {
    if (!checkForCart) {return undefined}
    var itemArray=[]
    const qty=Number(localStorage.getItem(cartKey))
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        const item=JSON.parse(localStorage.getItem(loadKey))

        itemArray.push(item)
        
    }
    return itemArray
}

function isInCart(item) {
    const qty=localStorage.getItem(cartKey)
    if (qty==undefined) {return false}
    const JSONitem=JSON.stringify(item)
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        const cartItem=localStorage.getItem(loadKey)
        if (cartItem==JSONitem) {return true}
    }
    return false
}
