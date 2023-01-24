const eye_open = document.querySelector("#open");
const eye_close = document.querySelector("#close");
const password_input = document.querySelector("#password")


eye_open.addEventListener("click", (e) => {
    e.preventDefault();
    eye_open.style.display = "none";
    eye_close.style.display = "block";
    password_input.setAttribute("type", "text")
})

eye_close.addEventListener("click", (e) => {
    e.preventDefault();
    eye_open.style.display = "block";
    eye_close.style.display = "none";
    password_input.setAttribute("type", "password")

})