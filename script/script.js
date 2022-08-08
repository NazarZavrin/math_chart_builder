"use strict"

import getFunction from "./getFunction.js";
import "./addEventListenerN and removeEventListenerN.js";
console.log(typeof addEventListenerN);

let wrapper = document.querySelector(".wrapper");
let chartBlocksContainer = document.querySelector(".chart-blocks");

// let chartButtons = chartBlocksContainer.getElementsByClassName("chart-buttons");
// let actionButtons = chartBlocksContainer.getElementsByClassName("action-buttons");

// let charts = document.getElementsByClassName("chart");

let createChartBlockBtn = document.querySelector(".create-chart-btn");
let chartBlockHTML = `
            <div class='chart-buttons'>
                <div></div>
                <div class='add-chart-btn'></div>
            </div>
            <div class='canvas'></div>
            <div class='action-buttons'>
                <div class='remove-chart-btn'>
                    <div></div><div></div>
                </div>
                <div class='zoom-in-btn'></div>
                <div class='zoom-out-btn'></div>
            </div>
        `;

let state = {
    chartsBlocks: [],
};

class Chart {
    constructor() {
        this.func = inputFunction();
        
        let chartBlockElement = document.createElement("div");
        chartBlockElement.classList.add("chart-block");
        
        chartBlockElement.insertAdjacentHTML("beforeend", chartBlockHTML);
        chartBlocksContainer.append(chartBlockElement);
        console.log(chartBlockElement);
        let actionButtons = chartBlockElement.getElementsByClassName("action-buttons")[0];
        this.removeActiveButtons = actionButtons.addEventListenerN("pointerup", event => {
            if (event.target.closest(".remove-chart-btn")){
                console.log(event.target.closest(".remove-chart-btn"));
                this.removeChart(event.target.closest(".remove-chart-btn"));
            }
        })
        chartBlockElement.getElementsByClassName("canvas")[0].textContent = String(Date.now()).slice(-3);
        state.chartsBlocks.push(this);
        // console.log(chartBlocksContainer.children);
    }
    removeChart(removeButton) {
        console.log("removeChart");
        this.removeActiveButtons();
        let removeButtons = Array.from(chartBlocksContainer.getElementsByClassName("remove-chart-btn"));
        let index = removeButtons.findIndex(btn => btn === removeButton);
        chartBlocksContainer.children[index].remove();
        state.chartsBlocks = state.chartsBlocks.filter(item => item !== this);
        createChartBlockBtn.style.display = "flex";
    }
}
function inputFunction() {
    getFunction()
}

// chartButtons.addEventListener("pointerup", event => {
//     if (event.target.closest(".remove-chart-btn")){
//         console.log("remove");
//     }
// })

// activeButtons.addEventListener("pointerup", event => {})

createChartBlockBtn.addEventListener("pointerup", event => {
    if (state.chartsBlocks.length === 4) {
        return;
    }
    new Chart();
    if (state.chartsBlocks.length === 4) {
        createChartBlockBtn.style.display = "none";
    }
})


