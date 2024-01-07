function checkMode(){
    let mode = localStorage.getItem("mode");
    if (mode == "light") {
        changeMode("lightButton");
    }else{
        changeMode("darkButton")
    }
}

function changeMode(button){
    const darkButton = "darkButton";
    const lightButton = "lightButton";
    const body = document.getElementsByTagName("body")[0];
    const navList = document.querySelector(".nav-list");
    if (button == lightButton) {
        body.style = `background: url('lightBG.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;background-position: center;`
        localStorage.setItem("mode", "light");
    }else{
        body.style = `background: url('darkBG.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;background-position: center;`
        localStorage.setItem("mode", "dark");
    }
    console.log(localStorage.getItem("mode"));
}