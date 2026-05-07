const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
    // 1.get the container & empty
    const container = document.getElementById("level-container")
    container.innerHTML = ""
    // 2.get into every lesson
    for (let lesson of lessons) {

        //      3.create Element
        const btnDiv = document.createElement("div")

        //      4.append into container
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary ">
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Lesson - ${lesson.level_no}
                
            </button>
        `
        container.appendChild(btnDiv)
    }
}

loadLessons();