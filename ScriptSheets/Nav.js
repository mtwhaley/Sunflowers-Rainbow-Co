const Directory=["Shop", "Custom Order", "Cart"]
const Navigation=["index.html", "CustomJob.html", ""]

function createNavigation(id=null) {
    const div=document.getElementById("navSpace")
    const table=document.createElement("table")
    const row=document.createElement("tr")
    Directory.forEach(label => {
        row.appendChild(createCell(label))
    });


    table.appendChild(row)   
    table.setAttribute("class", "navTable")
    if (id!=null) {
        table.setAttribute("id", id)
    }
    div.appendChild(table)
    
    

}

function createCell(label) {
    const td=document.createElement("td")
    const button=document.createElement("button")
    button.innerText=label
    button.setAttribute("class", "navButton")
    button.setAttribute("id", label)
    td.appendChild(button)
    return td
}

function setNavigation(currentTab) {
    for (var i=0;i<Navigation.length;i++) {
        const button=document.getElementById(Directory[i])
        if (Directory[i]==currentTab) {
            button.onclick=function() {location.reload()}
        }
        else if (Navigation[i]!="") {
            console.log(button)
            const link=Navigation[i]
            button.onclick=function() {
                location.href=link
            }
            console.log("done")
            //add navigation
            
        }
    }
}

createNavigation("topNav")
createNavigation("bottomNav")
