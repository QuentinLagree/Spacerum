const eye_open = document.querySelector("#open");
const eye_close = document.querySelector("#close");
const password_input = document.querySelector("#password")


eye_open.addEventListener("click", (e) => {
    e.preventDefault();
    eye_open.style.scale = "0";
    eye_close.style.scale = "1";
    password_input.setAttribute("type", "text")
})

eye_close.addEventListener("click", (e) => {
    e.preventDefault();
    eye_open.style.scale = "1";
    eye_close.style.scale = "0";
    password_input.setAttribute("type", "password")

})