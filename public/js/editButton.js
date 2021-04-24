const containerEdit = document.getElementsByClassName("containEdit")
let editing = false;

for (edit of containerEdit) {
    let txt = document.getElementById("edit")
    let currentText = txt.innerHTML;
    const leure = document.getElementById("leure")
    const form = edit.children[1]
    const btn = edit.children[1].children[0]

    let post = () => {
        submit.click()
    }

    edit.addEventListener("focusout", (e) => {
        e.preventDefault()
        post()
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault() 
            if (editing === true) {
                submit.click()
            }
        }
    })

    txt.addEventListener("paste", (e) => e.preventDefault())
   
    txt.addEventListener("input", () => {leure.value = txt.innerHTML})
    
    let selectText = (element) => {
        let range = document.createRange();
        range.selectNodeContents(element)
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range)
    }

    btn.addEventListener("click", (e) => {
        editing = true
        e.preventDefault()
        txt.setAttribute("contenteditable", "true")
        txt.focus()
        selectText(txt)
        submit = document.createElement("button");
        submit.setAttribute("type", "submit")
        form.appendChild(submit)
    })   
}
