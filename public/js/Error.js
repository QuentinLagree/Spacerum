const errorBox = document.querySelector(".box");

function remove () {
    if (errorBox !== null) {
        errorBox.classList.add("hide")
        setTimeout(() => {
            errorBox.classList.add("end")
            setTimeout(() => {
                errorBox.remove()
            }, 800);
        }, 500);
    }
    
}

if (typeof errorBox !== "undefined") {
    setTimeout(() => {
        remove()
    }, 3000);
}

const cross = document.querySelector(".cross");
if (cross !== null) {
    cross.addEventListener("click", (e) => {
        e.preventDefault()
        remove(e)
    })
}