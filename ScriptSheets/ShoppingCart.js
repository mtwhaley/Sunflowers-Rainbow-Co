const cartKey="itemsInCart"

function loadCartDisplay() {
    const cart= getCart()
    const cartDisplay=document.getElementById("cartItems")
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
        alert("fixme!")
    }


    document.createElement("p")


    div.appendChild(qty)
    div.appendChild(remove)
    return div
}

function getItemInfoHTML(item) {
    const p=document.createElement("p")
    p.innerHTML=item.Item_Name+"<br>"
    p.innerHTML+="<span style='font-size: 16px;'>&nbsp&nbsp"+item.Item_Description+"<br></span>"
    p.setAttribute("class","info")

    return p
}

function checkForCart() {
    if (localStorage.getItem(cartKey)!=true) {return false}
    else {return true}

}

function createCart() {
    localStorage.setItem(cartKey,0)
}

function addToCart(item) {
    if (!checkForCart()) {
        createCart()
    }

    const saveIndex=localStorage.getItem(cartKey).toString()
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

loadCartDisplay()