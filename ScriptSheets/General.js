
function createProductCard(item) {
    const resultDiv=document.getElementById("imageSpace")

    const card=document.createElement("div")
    card.setAttribute("class", "cardstock")


    const image=document.createElement("img")
    let source="../Product Images/"+item.Photo_File_Name+".jpg"
    image.src=source
    image.setAttribute("class","productimage")

    const text=document.createElement("p")
    text.innerHTML="<span class='productname'>"+item.Item_Name+"</span><br><br>"


    card.appendChild(image)
    card.appendChild(text)


    resultDiv.appendChild(card)
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