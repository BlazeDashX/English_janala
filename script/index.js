const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLessons(json.data));
};

const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn)=>{
        btn.classList.remove("active")
    })
}

const loadLevelWords = (levelId) => {
    const url = `https://openapi.programming-hero.com/api/level/${levelId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) =>{ 
            removeActive();
            const clickBtn = document.getElementById(`level-btn-${levelId}`)
            clickBtn.classList.add("active")
            displayLevelWords(data.data)

        });
}

const displayLevelWords =(words)=>{
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center rounded space-y-6  shadow-sm py-4">
            <img src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-semibold mt-2 font-bangla">নেক্সট Lesson এ যান</h1>
        </div> 
        `;
        return
    }

    words.forEach((word) => {
        console.log(word)
        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `
        <div class="bg-white shadow-sm rounded-xl text-center py-20 px-5 space-y-4">
            <h2 class="text-2xl font-bold ">${
                word.word ? word.word : "কোনো শব্দ পাওয়া যায়নি"}</h2>
            <p  class="font-semibold">Meaning /Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF44] cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF44] cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div> 
        `;
        wordContainer.appendChild(wordDiv)
    });
}

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
            <button id="level-btn-${lesson.level_no}" onclick="loadLevelWords('${lesson.level_no}')" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Lesson - ${lesson.level_no}
                
            </button>
        `
        container.appendChild(btnDiv)
    }
}

loadLessons();