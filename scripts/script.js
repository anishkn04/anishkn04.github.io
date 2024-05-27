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
                        class="project-container bg-white flex flex-col w-44 max-w-44 max-h-60 md:max-w-48 md:w-48 md:max-h-64 xl:max-w-52 xl:w-52 xl:max-h-72 items-center relative rounded-md overflow-hidden *:w-full group" target="_blank" href="${project.link}">
                        <img src="${project.image}" alt="${project.name}"
                            class="h-full aspect-square object-cover">

                        <div
                            class="project-info bottom-0 max-w-44 max-h-60 md:max-w-48 md:max-h-64 xl:max-w-52 xl:max-h-72 absolute bg-slate-50">
                            <div class="project-name text-center">${project.name}</div>
                            <div class="project-desc hidden group-hover:block text-xs p-2">${project.description}</div>
                            <div class="project-desc hidden group-hover:block text-xs p-2">Stack: ${project.stackUsed}</div>
                        </div>
                    </a>`
        animDuration += 500
    });
    const container = document.getElementById("projects-container");

    if (finalHTML === "") {
        container.innerHTML = "Nothing Found!";
    }else{
        container.innerHTML = finalHTML
    }
}