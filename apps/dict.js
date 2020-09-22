// this file contains all dictionary words arrays needed
//url format : https://www.dictionaryapi.com/api/v3/references/collegiate/json/(WORD TO FIND)?key= API-KEY
const inputWord = document.querySelector(".word-input");
let word = "indeed";
const url = "https://www.dictionaryapi.com/api/v3/references/";
const thes = "thesaurus/json";
const colg = "collegiate/json";
const thesApiKey = "33ef45f2-1295-489b-8a06-e195492e8b94";
const colgApiKey = "5ac2886b-89ca-47f0-813c-f82354fa6a7e";

// endpoint for thesaurus request
let thesEndpoint = url + thes + "/" + word + "?key=" + thesApiKey;

// endpoint for collegiate request
let colgEndpoint = url + colg + "/" + word + "?key=" + colgApiKey;

console.log(thesEndpoint);
console.log(colgEndpoint);

// aync reuest for thesaurus
const thesReq = async () => {
    try {
        const response = await fetch(thesEndpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        throw new Error("Request Failed");
    } catch (error) {
        console.log(error);
    }
};

// async request for dictionary
const dictReq = async () => {
    try {
        const response = await fetch(colgEndpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

// getting the parts of speech
const getPos = (defArr) => {
    const pos = defArr[0].fl;
    return pos;
};

// getting array of definitions
const getDefs = (defArr) => {
    const defs = [];
    defArr[0].shortdef.forEach((def) => {
        defs.push(def);
    });
    return defs;
};

// getting array of synonyms
const getSyns = (defArr) => {
    const synArr = [];
    defArr[0].meta.syns[0].forEach((syn) => {
        synArr.push(syn);
    });
    return synArr;
};

// getting array of antonyms
const getAnts = (defArr) => {
    const antArr = [];
    defArr[0].meta.ants[0].forEach((ant) => {
        antArr.push(ant);
    });
    return antArr;
};

// getting word pronunciation
const getPron = (defArr) => {
    const defs = defArr[0].hwi.prs[0].mw;
    return defs;
};

// getting examples
const getExamples = (defArr) => {
    const exaArr = defArr[0].def[0].sseq[0][0][1].dt[1][1][0];
    return exaArr;
};

thesReq().then((r) => {
    console.log(r);
});

dictReq().then((r) => {
    console.log(getPron(r));
});