const Directory=["Shop", "Custom Order", "Cart"]
const Navigation=["index.html", "CustomJob.html", "ShoppingCart.html"]

function createNavigation(id=null) {
    const div=document.getElementById("navSpace")
    const table=document.createElement("table")
    const row=document.createElement("tr")
    Directory.forEach(label => {
        row.appendChild(createCell(id,label))
    });


    table.appendChild(row)   
    table.setAttribute("class", "navTable")
    if (id!=null) {
        table.setAttribute("id", id)
    }
    div.appendChild(table)
    
    

}

function createCell(setID, label) {
    const td=document.createElement("td")
    const button=document.createElement("button")
    button.innerText=label
    button.setAttribute("class", "navButton")
    const buttonID=setID+label
    button.setAttribute("id", buttonID)
    td.appendChild(button)
    return td
}

function setNavigation(currentTab) {
    for (var i=0;i<Navigation.length;i++) {
        
        const button1=document.getElementById("topNav"+Directory[i])
        const button2=document.getElementById("bottomNav"+Directory[i])
        if (Directory[i]==currentTab) {
            button1.onclick=function() {location.reload()}
            button2.onclick=function() {location.reload()}
            
        }
        else if (Navigation[i]!="") {
            const link=Navigation[i]
            button1.onclick=function() {location.href=link}
            button2.onclick=function() {location.href=link}
            
        }
    }
}

createNavigation("topNav")
createNavigation("bottomNav")
