
function createAllProductCards() {
    JSONData.forEach(item => {
        createProductCard(item)
    });
}


function createProductCard(item) {
    const resultDiv=document.getElementById("productSpace")

    const card=document.createElement("div")
    card.setAttribute("class", "cardstock")


    const image=document.createElement("img")
    let source="../Product Images/"+item.Photo_File_Name+".jpg"
    image.src=source
    let id="img"+item.Item_Number
    image.setAttribute("id", id)
    image.setAttribute("class","productimage")
    image.onclick=function() {
        window.open(image.src)
        //window.alert(item.Item_Number)
    }

    const text=document.createElement("p")
    if (item.Price==null) {
        item.Price=0
    }
    text.innerHTML="<span class='productname'>"+item.Item_Name+
        "</span><br><br>$"+
        item.Price



    const addButton=document.createElement("button")
    addButton.setAttribute("class", "addButton")
    addButton.innerText="+"
    addButton.onclick=function() {
        window.alert("add item "+item.Item_Number+" to cart")
    }


    card.appendChild(image)
    card.appendChild(text)
    card.appendChild(addButton)


    resultDiv.appendChild(card)
    resultDiv.style.width="calc(100vw - (100vw - 100%))"

}

function getCardNumber(card) {
    return new Promise((resolve, reject)=> {
        const elements=card.childNodes
    elements.forEach(element => {
        if (element.nodeName=="IMG") {
            let id=element.id
            number=id.substring(3)
            resolve(number)
        }
    });
    })
    
}

