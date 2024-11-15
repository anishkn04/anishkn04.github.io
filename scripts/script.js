function toggleNavbar() {
    const navClasses = document.querySelector("nav").classList;
    const navDivClasses = document.getElementById("mobile-nav").classList;
    const navUlClasses = document.getElementById("nav-ul").classList;

    if (document.body.offsetWidth >= 768) return

    navClasses.toggle("h-12")
    navClasses.toggle("h-screen")
    navClasses.toggle("z-50")
    navClasses.toggle("p-12")
    navClasses.toggle("bg-blue-400")
    navClasses.toggle("bg-transparent")
    navDivClasses.toggle("hidden")
    navUlClasses.toggle("hidden");
    navUlClasses.toggle("rounded-md");
    navUlClasses.toggle("bg-blue-300");
    navUlClasses.toggle("flex")
}

function scrollElement(el) {
    console.log(el)
    const refSectionName = el.dataset.section;
    const refSection = document.getElementById(`${refSectionName}`);
    refSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

const getData = async () => {
    const response = await fetch("../content/projects.json");
    if (!response) {
        return;
    }
    const dataArray = await response.json();
    let animDuration = 900;
    let finalHTML = "";
    dataArray.forEach(project => {
        finalHTML += `<a data-aos="fade-left" data-aos-duration="${animDuration}"
                        class="project-container bg-slate-50 flex flex-col drop-shadow-md hover:drop-shadow-xl w-64 max-w-64 max-h-96 h-96 items-center relative rounded-md overflow-hidden *:w-full group" target="_blank" href="${project.link}">
                        <img src="${project.image}" alt="${project.name}"
                            class="h-[60%] w-[90]% p-4 rounded-md object-contain">

                        <div
                            class="project-info flex-1 items-center flex flex-col bg-slate-50 p-2">
                            <h1 class="project-name text-center font-bold">${project.name}</h1>
                            <div class="project-desc group-hover:block text-xs md:text-sm flex-1 p-2">${project.description}</div>
                            <div class="project-desc group-hover:block text-xs md:text-sm p-2">Stack: ${project.stackUsed}</div>
                        </div>
                    </a>`
        animDuration += 200
    });
    const container = document.getElementById("projects");

    if (finalHTML === "") {
        container.innerHTML = "Nothing Found!";
    } else {
        container.innerHTML = finalHTML
    }
}

document.body.addEventListener("load", getData())
document.getElementById("mobile-nav").addEventListener("click", toggleNavbar);
document.getElementById("nav-ul").addEventListener("click", toggleNavbar);
const navUlLists = document.getElementsByClassName("nav-ul-lists");
for (const navUlList of navUlLists) {
    navUlList.addEventListener("click", () => scrollElement(navUlList));
}