const checked = document.querySelector(".checked");
const notChecked = document.querySelector(".not-checked");
const checkboxContain = document.querySelector(".remember-me")
const checkbox = document.querySelector("#checkbox")
checkboxContain.addEventListener('click', (e) => {
    e.preventDefault();
    checkbox.checked = false;
    checkboxContain.classList.toggle("checked");
})