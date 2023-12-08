const cartKey="itemsInCart"
const subtotalID="sub"
const taxRate=0.065
const shippingCost=5

function loadCartDisplay() {
    const cart= getCart()
    const cartDisplay=document.getElementById("cartItems")
    const cartTitle=document.getElementById("cartTitle")
    var idArray=[]
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
            div.setAttribute("class","cartProduct")


            const image=document.createElement("img")
            let source="Product Images/"+item.Photo_File_Name+".jpg"
            image.src=source
            image.setAttribute("class","productimage")
            div.appendChild(image)
            div.appendChild(getItemInfoHTML(item))
            div.appendChild(getQtyPriceHTML(item))

            cartDisplay.appendChild(div)
            idArray.push(item.Item_Number+"price")
            
            


        }
        

        const subtotalSpacer=document.createElement("p")
        subtotalSpacer.innerHTML="<br><br><hr><br>"

        cartDisplay.appendChild(subtotalSpacer)

        
        const totals=document.createElement("div")
        const totalsText=document.createElement("p")
        totals.setAttribute("class", "total")

        var subtotal=0
        for (var i=0;i<idArray.length;i++) {
            subtotal+=Number((document.getElementById(idArray[i]).innerText).substring(1))
        }
        totalsText.innerHTML="subtotal: $<span id='"+subtotalID+"'>"+(subtotal.toFixed(2))+"</span>"
        totalsText.innerHTML+="<br><br><span style='font-weight: normal; font-size: 18px;'>shipping: $"+shippingCost.toFixed(2)+"</span>"
        totalsText.innerHTML+="<br><br><span style='font-weight: normal; font-size: 18px'>taxes: $<span id='taxAmount'>"+getTaxes(subtotal)+"</span></span>"
        totalsText.innerHTML+="<br><br><br>total: $<span id='totalAmount'>"+getTotal(subtotal)+"</span>"


        totals.appendChild(totalsText)
        cartDisplay.appendChild(totals)
        
        
    }
}

function updateTotals(subtotal) {
    const taxes=document.getElementById("taxAmount")
    const taxTotal=subtotal*taxRate
    taxes.innerText=taxTotal.toFixed(2)

    const total=document.getElementById("totalAmount")
    const grandTotal=subtotal+shippingCost+taxTotal
    total.innerText=grandTotal.toFixed(2)
}

function getTotal(subtotal) {
    const total=subtotal+shippingCost+Number(getTaxes(subtotal))
    return total.toFixed(2)
}

function getTaxes(subtotal) {
    const taxes=((subtotal+shippingCost)*taxRate).toFixed(2)
    return taxes
}

function getQtyPriceHTML(item) {
    const div=document.createElement("div")
    div.setAttribute("class","priceDiv")
    const qty=document.createElement("input")
    const qtyid=item.Item_Number+"qty"
    const priceid=item.Item_Number+"price"
    qty.setAttribute("class", "qty")
    qty.setAttribute("id", qtyid)

    qty.setAttribute("type","number")
    qty.setAttribute("min","1")
    qty.setAttribute("max","99")
    qty.setAttribute("value", "1")
    qty.style.marginRight="5px"
    qty.onchange=function() {
        const thisQTY=document.getElementById(qtyid).value
        const itemPrice=document.getElementById(priceid)
        const previousPrice=Number((itemPrice.innerText).substring(1))
        const newPrice=item.Price*thisQTY
        itemPrice.innerText="$"+(newPrice.toFixed(2))

        const difference=newPrice-previousPrice
        const previousSubtotal=Number(document.getElementById(subtotalID).innerText)
        const newSubtotal=previousSubtotal+difference
        document.getElementById(subtotalID).innerText=newSubtotal.toFixed(2)
        updateTotals(newSubtotal)

    }
    

    const remove=document.createElement("button")
    remove.setAttribute("class", "remove")
    remove.innerText="Remove"
    remove.onclick=function() {
        removeItemFromStorage(item)
        location.reload()
    }


    const p=document.createElement("p")
    p.setAttribute("id",priceid)
    p.innerText="$"+(item.Price).toFixed(2)
    p.style.marginRight="65px"
    p.style.width="100px"
    p.style.right="0"

    div.appendChild(qty)
    div.appendChild(remove)
    div.appendChild(p)
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
    const div=document.createElement("div")
    const p=document.createElement("p")
    div.setAttribute("class","nameDiv")
    p.innerHTML=item.Item_Name+"<br>"
    p.innerHTML+="<span style='font-size: 16px;'>&nbsp&nbsp"+item.Item_Description+"<br></span>"
    p.setAttribute("class","info")

    div.appendChild(p)

    return div
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

function setFormData() {
    document.getElementById("cost").value=document.getElementById("totalAmount").innerText
    const numItems=localStorage.getItem(cartKey)
    var arr=[]
    const divs=$(".cartProduct")
    alert(divs.length)
}
