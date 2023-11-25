async function filterCategories(catID) {
    const categoryClicker=document.getElementById(catID)
    ResetCategoryBackgrounds()
    categoryClicker.style.backgroundColor="#edb826"

    const productDiv=document.getElementById("productSpace")
    const elements=productDiv.childNodes
    for (var i=0;i<elements.length;i++) {
        if(elements[i].nodeName=="DIV") {   //cards
            let itemNumber= await getCardNumber(elements[i])
            const item=await searchJSON(itemNumber)
            let check=itemCategoryCheck(item, catID)
            if (check==true) {
                elements[i].style.display="block"
            }
            else {
                elements[i].style.display="none"
            }
        }
    };
    console.log("Here")

}

function itemCategoryCheck(item,category) {
    switch (category) {
        case "Decor":
            return item.Decor
        case "Apparel":
            return item.Apparel
        case "Stuffed":
            return item.Stuffed
        case "Misc":
            return item.Misc
        case "Seasonal":
            return item.Seasonal
        case "Themed":
            return item.Themed
        case "Slime":
            return item.Slime
        
        default:
            return false
    }
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

function ResetCategoryBackgrounds() {
    const div=document.getElementById("categoryText")
    const elements=div.childNodes
    elements.forEach(child => {
        if (child.nodeName=="BUTTON") {
            child.style.backgroundColor=""
        }
    });
}

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

    const text=document.createElement("p")
    if (item.Price==null) {
        item.Price=0
    }
    text.innerHTML="<span class='productname'>"+item.Item_Name+
        "</span><br><br>$"+
        item.Price


    card.appendChild(image)
    card.appendChild(text)


    resultDiv.appendChild(card)
    resultDiv.style.width="calc(100vw - (100vw - 100%))"

}

async function LookupByNumber() {
    let itemNumber=document.getElementById("ItemNumber").value

    let item=await searchJSON(itemNumber)
    if (item!=null) {
        createProductCard(item)

    }
}

function searchJSON(number) {
    return new Promise((resolve, reject)=> {
        JSONData.forEach(item => {
            if (item.Item_Number==number) {
                resolve(item)
            }
        });
       resolve(null)
    })
}

createAllProductCards()