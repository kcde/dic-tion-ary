const theWord = document.querySelector(".the-word");
const thePos = document.querySelector(".pos");
const defInitial = document.querySelector(".definition-initial");
const otherDefs = document.querySelector(".other-defs");
const example = document.querySelector(".example");
const synonyms = document.querySelector(".syn-words");
const antonyms = document.querySelector(".anto-words");
const pronunciation = document.querySelector(".pronunciation");
const moreDefBtn = document.querySelector(".more-definition");
const wordInfo = document.querySelector(".word-info");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
moreDefBtn.disabled = true;

const clearAll = () => {
    theWord.innerHTML = "";
    thePos.innerHTML = "";
    defInitial.innerHTML = "";
    otherDefs.innerHTML = "";
    moreDefBtn.classList.remove("pulse");
    pronunciation.innerHTML = "";
    // example.innerHTML = '';
    synonyms.innerHTML = "";
    antonyms.innerHTML = "";
};

// function to create html element with content
const createHtmlWithContent = (tag, content, newClass = " ") => {
    const newTag = document.createElement(tag);
    if (newClass !== " ") {
        newTag.classList.add(newClass);
    }
    newTag.innerHTML = content;

    return newTag;
};

//rendering word
const renderWord = () => {
    thesReq().then((objArr) => {
        word = getWord(objArr);
        theWord.innerHTML = word;
    });
};

// rendering part of speech
const renderPos = () => {
    thesReq().then((objArr) => {
        if (getPos(objArr) === undefined) {
            return;
        } else {
            thePos.innerHTML = getPos(objArr);
        }
    });
};

//rendering definitions
const renderDef = () => {
    thesReq().then((objArr) => {
        let defArr = getDefs(objArr);
        defInitial.innerHTML = `<p>${defArr[0]}</p>`;
        console.log(defArr);
        if (defArr.length > 1) {
            const otherArr = defArr.slice(1);

            otherArr.forEach((others) => {
                otherDefs.appendChild(createHtmlWithContent("p", others));
            });
            // moreDefBtn.disabled = false;
            moreDefBtn.classList.add("pulse");
            moreDefBtn.disabled = false;
            moreDefBtn.addEventListener("click", () => {
                moreDefBtn.classList.toggle("pulse");
                wordInfo.classList.toggle("show");
            });
        } else {
            otherDefs.innerHTML = "";
            moreDefBtn.disabled = true;
        }
    });
};

// rendering pronunciations
const renderPro = () => {
    dictReq().then((objArr) => {
        pronunciation.innerHTML = `/ ${getPron(objArr)} /`;
    });
};

//rendering examples
const renderExa = () => {
    thesReq().then((objArr) => {
        let examples = getExamples(objArr);

        const replaceRegex = /[{][/\w]\w+[}]/gi; ///\{|\}|\{}/gi;
        let replace = examples.replace(replaceRegex, `  **  `);
        console.log(replace);
        // LEARN REGULAR EXPRESSION

        console.log(objArr);
        example.innerHTML = `<p>${replace}</p>`;
    });
};
//rendering synonyms
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

//rendering antonyms
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

//rendering all render functions
const renderAll = () => {
    renderWord();
    renderExa();
    renderPos();
    renderPro();
    renderDef();
    renderExa();
    renderSyns();
    renderAnts();
};

/* ::::::::::::::::::::::::::::::::::::::::::: */

//event listener for submit button
searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    wordInfo.classList.remove("show");
    clearAll(); // clear all content whenever the submit button is click

    if (inputWord.value === null) {
        return;
    }

    renderAll();
    inputWord.value = "";
});
