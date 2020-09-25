const theWord = document.querySelector(".the-word");
const thePos = document.querySelector(".pos");
const defInitial = document.querySelector(".definition-initial");
const moreDef = document.querySelector(".definition-others");
const example = document.querySelector(".example");
const synonyms = document.querySelector(".syn-words");
const antonyms = document.querySelector(".anto-words");
const pronunciation = document.querySelector(".pronunciation");
const moreDefBtn = document.querySelector(".more-definition");
const wordInfo = document.querySelector(".word-info");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

// function to create html element with content

const createHtmlWithContent = (tag, content, newClass = " ") => {
    const newTag = document.createElement(tag);
    if (newClass !== " ") {
        newTag.classList.add(newClass);
    }
    newTag.innerHTML = content;

    return newTag;
};
moreDefBtn.addEventListener("click", () => {
    wordInfo.classList.toggle("show");
});

const renderWord = () => {
    thesReq().then((objArr) => {
        word = getWord(objArr);
        theWord.innerHTML = word;
    });
};

const renderPos = () => {
    thesReq().then((objArr) => {
        thePos.innerHTML = getPos(objArr);
    });
};

const renderDef = () => {
    thesReq().then((objArr) => {
        const defArr = getDefs(objArr);
        const otherArr = defArr.slice(1);
        defInitial.innerHTML = `<p>${defArr[0]}</p>`;
        if (defArr.length > 1) {
            otherArr.forEach((others) => {
                moreDef.innerHTML = "";
                moreDef.appendChild(createHtmlWithContent("p", others));
            });
            moreDefBtn.classList.add("pulse");
        }
    });
};

const renderPro = () => {
    dictReq().then((objArr) => {
        pronunciation.innerHTML = getPron(objArr);
    });
};
const renderExa = () => {
    thesReq().then((objArr) => {
        let example = getExamples(objArr)[0].t;
        example.split(" ").forEach((el) => {
            if (el[0] === "{") {
                const replaceRegex = /\{|\}|\{}/gi;
                let f = el.replace(replaceRegex, "");
                console.log(f);
                // LEARN REGULAR EXPRESSION
            }
        });
        console.log(example.split(" "));

        console.log(objArr);
        // example.innerHTML = `<p>${examplesObj[0].t}</p>`;
    });
};

// renderExa();

const renderSyns = () => {
    thesReq().then((objArr) => {
        const fullSyns = getSyns(objArr);
        let smallSyns = [];
        synonyms.innerHTML = "";
        if (fullSyns.length <= 5) {
            fullSyns.forEach((syns) => {
                synonyms.appendChild(createHtmlWithContent("p", syns, "card"));
            });
        } else {
            smallSyns = fullSyns.slice(0, 5);
            console.log(smallSyns);
            smallSyns.forEach((syns) => {
                synonyms.appendChild(createHtmlWithContent("p", syns, "card"));
            });
        }
    });
};

const renderAnts = () => {
    thesReq().then((objArr) => {
        const fullAnts = getAnts(objArr);

        console.log(fullAnts);
        antonyms.innerHTML = "";
        if (fullAnts.length === 0) {
            antonyms.innerHTML = "NOT AVAILABLE";
        } else {
            fullAnts[0].forEach((ants) => {
                antonyms.appendChild(createHtmlWithContent("p", ants, "card"));
            });
        }
    });
};

const renderAll = () => {
    renderWord();
    renderPos();
    renderPro();
    renderDef();
    // renderExa();
    renderSyns();
    renderAnts();
};

/* ::::::::::::::::::::::::::::::::::::::::::: */

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputWord.value === null) {
        return;
    }

    renderAll();

    console.log(inputWord.value);
    inputWord.value = "";
});
