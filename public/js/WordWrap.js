const box_text = document.querySelector(".box p");
let save_text = "";

if (box_text !== null) {
    const type = (box_text.parentElement.classList.contains("success")) ? "s" : "e"
    const symbol = "..."
    const len = 100
    if (box_text.innerHTML.length > len) {
        let part_text = box_text.innerHTML.substring(0, len)
        save_text = box_text.innerHTML;
        box_text.innerHTML = part_text + " " + "<span data-tool=\"Afficher entièrement \" class=\"text_continue\">" + symbol + "</span>"
    }


}

let word_wrap_symbol_more = document.querySelector(".box p span.text_continue");

if (word_wrap_symbol_more != null) {
    word_wrap_symbol_more.addEventListener("click", () => {
        if (!box_text.lastChild.classList.contains("back")) {
            box_text.removeChild(box_text.lastChild)
            box_text.innerHTML = save_text
            word_wrap_symbol_back = document.querySelector(".box p span.text_continue.back");
        }
    })
    
}
