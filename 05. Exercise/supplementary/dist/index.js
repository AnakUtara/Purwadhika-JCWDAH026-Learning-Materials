"use strict";
// Grab HTML elements
const inputField = document.querySelector("#inputField");
const changeTextButton = document.querySelector("#changeTextButton");
const outputDiv = document.querySelector("#output");
const resetBtn = document.querySelector("#resetButton");
const listContainer = document.querySelector("#listContainer");
//Data to be displayed in the list
const dataList = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
];
// Function to change the text of the output div
function changeOutputText() {
    const userInput = inputField.value;
    outputDiv.textContent = userInput
        ? `You typed: ${userInput}`
        : "Please type something!";
    if (dataList.includes(userInput)) {
        alert("Data sudah ada di list!");
        return;
    }
    listContainer === null || listContainer === void 0 ? void 0 : listContainer.replaceChildren();
    dataList.push(userInput);
    renderList();
}
const resetField = () => {
    inputField.value = "";
};
const renderList = () => {
    const ulElement = document.createElement("ul");
    dataList.forEach((item, i) => {
        const liElement = document.createElement("li");
        liElement.textContent = `${i + 1}. ${item}`;
        ulElement.appendChild(liElement);
    });
    listContainer === null || listContainer === void 0 ? void 0 : listContainer.appendChild(ulElement);
};
// Add event listener to the button
changeTextButton.addEventListener("click", changeOutputText);
resetBtn.addEventListener("click", resetField);
renderList();
