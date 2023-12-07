
function successfulOrder() {
    window.location.href="Success.html"
    localStorage.clear()
}

function cancelledOrder() {
    window.location.href="Failure.html"
}

function devModeToggle() {
    const Dev=document.getElementById("SimulationButtons")
    const Form=document.getElementById("contactInfo")
    if (Form.style.display=="none") {
        Form.style.display="block"
        Dev.style.display="none"
        
    }
    else {
        Form.style.display="none"
        Dev.style.display="block"

    }
}

function devModeListener() {
    window.onkeydown=function(e) {
        if (e.getModifierState("Control")) {
            if (e.key=='d') {
                devModeToggle()
            }
        }
    }

}

devModeListener()