
function successfulOrder() {
    window.location.href="Success.html"
    localStorage.clear()
}

function cancelledOrder() {
    window.location.href="Failure.html"
}

function devMode() {
    window.onkeydown=function(e) {
        if (e.getModifierState("Control")) {
            if (e.key=='d') {
                alert()
            }
        }
    }

}

devMode()