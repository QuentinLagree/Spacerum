const input_password = document.querySelector("#password");
const password_bar = document.querySelector("#PC-bar")
const checker_result = document.querySelector("#result")
input_password.addEventListener("keyup", () => {
    let val = input_password.value;
    let strength = 0;
    if (val.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
    }
    if (val.match(/([0-9])/)) {
        strength += 1;
    }
    if (val.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
    }
    if (val.length > 7) {
        strength += 1;
    }

    if (val.length > 10) {
        strength += 1;
    }

    let pourcent = 25 * strength;

    password_bar.style.width = "" + pourcent + "%"
    switch (strength) {
        case 0:
            checker_result.innerHTML = "Nul"
            checker_result.style.color = "var(--secondary-hover)"
            break;
        case 1:
            checker_result.innerHTML = "Très Faible"
            checker_result.style.color = "var(--weakness)"
            password_bar.style.background = "var(--weakness)"
            break;
        case 2:
            checker_result.innerHTML = "Faible"
            checker_result.style.color = "var(--weak)"
            password_bar.style.background = "var(--weak)"
            break;
        case 3:
            checker_result.innerHTML = "Moyen"
            checker_result.style.color = "var(--moy)"
            password_bar.style.background = "var(--moy)"
            break;
        case 4:
            checker_result.innerHTML = "Fort"
            checker_result.style.color = "var(--strength)"
            password_bar.style.background = "var(--strength)"
            break;
        case 5:
            checker_result.innerHTML = "Trés Fort"

            checker_result.style.color = "var(--very-strength)"
            password_bar.style.background = "var(--very-strength)"
            break;
        default:
            break;
    }
})