const moreDefBtn = document.querySelector(".more-definition");
const wordInfo = document.querySelector(".word-info");

moreDefBtn.addEventListener("click", () => {
    wordInfo.classList.toggle("show");
});
