let toolsCont = document.querySelector(".tool-cont");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;

let pencilCont = document.querySelector(".pencil-tool");
let eraserCont = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".fa-pencil");
let eraser = document.querySelector(".fa-eraser");
let pencilFlag = false;
let eraserFlag = false;

let stickyCont = document.querySelector(".fa-note-sticky")

let upload = document.querySelector(".fa-upload");



optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag

    if (optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}

function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "none";
    pencilCont.style.display = "none";
    eraserCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;

    if (pencilFlag) { pencilCont.style.display = "block"; }
    else pencilCont.style.display = "none";

})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;

    if (eraserFlag) { eraserCont.style.display = "flex"; }
    else eraserCont.style.display = "none";

})

stickyCont.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="mini"></div>
        <div class="close"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck=false ></textarea>
    </div>`;
    createSticky(stickyTemplateHTML);
})

upload.addEventListener("click", (e) => {
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    // uploading the image
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="mini"></div>
            <div class="close"></div>
        </div>
        <div class="note-cont">
            <img src="${url}" />
        </div>`; 

        createSticky(stickyTemplateHTML);
    })
})


function createSticky(stickyTemplateHTML){
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky-box");
    sticky.innerHTML = stickyTemplateHTML;
    document.body.appendChild(sticky);

    let minimize = sticky.querySelector(".mini");
    let close = sticky.querySelector(".close");
    noteActions(minimize,close,sticky);


    sticky.onmousedown = function (event) {
        dragANDdrop(sticky,event);
    };

    sticky.ondragstart = function () {
        return false;
    };
}


function noteActions (minimize,close,sticky){
    close.addEventListener("click", (e) => {
        sticky.remove();
    })

    minimize.addEventListener("click", (e) => {
        let noteCont = sticky.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");

        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}


function dragANDdrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    

    moveAt(event.pageX, event.pageY);

    // moves  at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

}