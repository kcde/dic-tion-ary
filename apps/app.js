const theWord = document.querySelector(".the-word");
const thePos = document.querySelector(".pos");
const defInitial = document.querySelector(".definition-initial");
const moreDef = document.querySelector(".definition-others");
const example = document.querySelector(".example");
const pronunciation = document.querySelector(".pronunciation");
const moreDefBtn = document.querySelector(".more-definition");
const wordInfo = document.querySelector(".word-info");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

// function to create html element with content

const createHtmlWithContent = (tag, content) => {
    const newTag = document.createElement(tag);
    newTag.innerHTML = content;

    return newTag;
};
moreDefBtn.addEventListener("click", () => {
    wordInfo.classList.toggle("show");
});

const renderWord = () => {
    theWord.innerHTML = inputWord.value;
};

const renderPos = () => {
    dictReq().then((objArr) => {
        thePos.innerHTML = getPos(objArr);
    });
};

const renderDef = () => {
    dictReq().then((objArr) => {
        const defArr = getDefs(objArr);
        const otherArr = defArr.slice(1);

        if (defArr.length > 1) {
            otherArr.forEach((others) => {
                moreDef.appendChild(createHtmlWithContent("p", others));
            });
            moreDefBtn.classList.add("pulse");
        }
        defInitial.innerHTML = `<p>${defArr[0]}</p>`;
    });
};

renderDef();

const renderPro = () => {
    dictReq().then((objArr) => {
        pronunciation.innerHTML = getPron(objArr);
    });
};
const renderExa = () => {
    thesReq().then((objArr) => {
        let examplesObj = getExamples(objArr);

        console.log(objArr);
        example.innerHTML = `<p>${examplesObj[0].t}</p>`;
    });
};

renderExa();

const renderAll = () => {
    renderWord();
    renderPos();
    renderPro();
    renderExa();
    renderSyn();
    renderAnt();
};

/* ::::::::::::::::::::::::::::::::::::::::::: */

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPos();
    renderPro();
    console.log(inputWord.value);
    // renderAll();
});
