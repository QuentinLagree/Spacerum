let burgerIcon = document.querySelector(".burger");
const menu = document.querySelector(".menu")

burgerIcon.addEventListener("click", (e) => {
    e.preventDefault();
    burgerIcon.classList.toggle("isOpen");
    menu.classList.toggle("isOpen");
    document.body.classList.toggle("isOpen")
})

window.addEventListener("resize", (e) => {
    if (icon !== undefined) {
        if (window.innerWidth > 750 && icon.classList.contains("isOpen")) {
            burgerIcon.classList.remove("isOpen")
            menu.classList.remove("isOpen")
            document.body.classList.remove("isOpen")
        }
    }
})

const profil = document.querySelector("#profil")
const profilMenu = document.querySelector(".menu-profil")

if (profil) {
    profil.addEventListener("click", (e) => {
        e.preventDefault()
        profilMenu.classList.toggle("isOpen")
    })
}

