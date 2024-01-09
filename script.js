function checkMode() {
    let mode = localStorage.getItem("mode");
    if (mode == "light") {
        changeMode("lightButton");
    } else {
        changeMode("darkButton");
    }
}

function changeMode(button) {
    const darkButton = "darkButton";
    const lightButton = "lightButton";
    const body = document.getElementsByTagName("body")[0];
    const navList = document.querySelector(".nav-list");
    if (button == lightButton) {
        body.style = `background: url('images/lightBG.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;background-position: center;`;
        localStorage.setItem("mode", "light");
    } else {
        body.style = `background: url('images/darkBG.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;background-position: center;`;
        localStorage.setItem("mode", "dark");
    }
}

function displayMenu(clickedId) {
    let menu = document.getElementById("mobile-menu");
    if (menu.style.display != "flex") {
        menu.style = "display: flex;";
    } else {
        menu.style = "display: none;";
    }
}
