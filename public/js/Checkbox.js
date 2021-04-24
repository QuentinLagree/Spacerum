const checked = document.querySelector(".checked");
const notChecked = document.querySelector(".not-checked");
const checkboxContain = document.querySelector(".checkbox")
const checkbox = document.querySelector("#checkbox")
checked.addEventListener('click', (e) => {
    checkbox.checked = false;
    checkboxContain.classList.remove("checked");
})

notChecked.addEventListener('click', (e) => {
    checkbox.checked = true;
    checkboxContain.classList.add("checked")
})