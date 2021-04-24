const errorBox = document.querySelector(".box");
const cross = document.querySelector(".cross");
if (cross !== null) {
    cross.addEventListener("click", (e) => {
        e.preventDefault()
        errorBox.classList.add("hide")
        setTimeout(() => {
            errorBox.classList.add("end")
            setTimeout(() => {
                errorBox.remove()
            }, 800);
        }, 500);
    })
}