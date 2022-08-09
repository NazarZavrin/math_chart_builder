"use strict"

import getFunction from "./getFunction.js";
import "./addEventListenerN and removeEventListenerN.js";
import getChartBlockNum from "./getChartBlockNum.js";


// let wrapper = document.querySelector(".wrapper");
let chartBlocksContainer = document.querySelector(".chart-blocks");

// let chartButtons = chartBlocksContainer.getElementsByClassName("chart-buttons");
// let actionButtons = chartBlocksContainer.getElementsByClassName("action-buttons");

// let charts = document.getElementsByClassName("chart");

const inputDataWrapper = document.querySelector(".input-data-wrapper");

let inputFuncKeyboard = document.getElementsByClassName("input-function__keyboard")[0];
let inputFuncOutput = document.getElementsByClassName("input-function__output")[0];
inputFuncOutput.style.color = "transparent";
// inputDataBlock.style.display = "block";
/*const createChartBtn = document.querySelector(".create-chart");
const removeChartBtn = document.querySelector(".remove-chart");
const cancleChangesBtn = document.querySelector(".cancel-changes");*/



let inputFuncButtons = document.querySelector(".input-function__buttons");

let createChartBlockBtn = document.querySelector(".create-chart-block-btn");
let chartBlockHTML = `
            <div class='chart-buttons'>
                <div></div>
                <div class='add-chart-btn'></div>
            </div>
            <div class='canvas'></div>
            <div class='action-buttons'>
                <div class='remove-chart-block-btn'>
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
        // this.func = inputData();
        let chartBlockElement = document.createElement("div");
        chartBlockElement.classList.add("chart-block");
        chartBlockElement.insertAdjacentHTML("beforeend", chartBlockHTML);
        chartBlocksContainer.append(chartBlockElement);

        let chartButtons = chartBlockElement.getElementsByClassName("chart-buttons")[0];
        chartButtons.addEventListener("pointerup", event => {
            inputData(event.target.closest(".chart-block"));
        })
        let actionButtons = chartBlockElement.getElementsByClassName("action-buttons")[0];
        this.removeActiveButtons = actionButtons.addEventListenerN("pointerup", event => {
            if (event.target.closest(".remove-chart-block-btn")){
                this.removeChart(event);
            }
        })
        chartBlockElement.querySelector(".canvas").textContent = String(Date.now()).slice(-3);
        state.chartsBlocks.push(this);
        // console.log(state);
        
    }
    removeChart(event) {
        console.log("removeChart");
        this.removeActiveButtons();
        let chart = chartBlocksContainer.children[getChartBlockNum(event, chartBlocksContainer)];
        chart.addEventListener('transitionend', event => {
            setTimeout(() => event.target.remove(), 250);
        }, {"once": true});
        chart.style.transform = "scale(0)";
        state.chartsBlocks = state.chartsBlocks.filter(item => item !== this);
        createChartBlockBtn.style.display = "flex";
    }
}

createChartBlockBtn.addEventListener("pointerup", event => {
    if (state.chartsBlocks.length === 4) {
        return;
    }
    new Chart();
    if (state.chartsBlocks.length === 4) {
        createChartBlockBtn.style.display = "none";
    }
})

function inputData(chartBlock){
    document.body.style.overflow = "hidden";
    inputDataWrapper.classList.add("active");
    inputDataWrapper.style.top = window.scrollY + "px";
    let symbolTyped = false;
    let removeKeyboard = inputFuncKeyboard.addEventListenerN("pointerup", event => {
        if (event.target.matches(".input-function__keyboard > section > div")) {
            if (!symbolTyped) {
                inputFuncOutput.textContent = event.target.textContent;
                inputFuncOutput.style.color = "black";
                symbolTyped = true;
            } else {
                inputFuncOutput.textContent += event.target.textContent;
            }
        }
    })
    let disableInputFuncButtons = inputFuncButtons.addEventListenerN("pointerup", event => {
        let canvas = chartBlock.getElementsByClassName("canvas")[0];
        if (event.target.closest(".create-chart")) {
            if (inputFuncOutput.style.color !== "transparent") {
                canvas.textContent = inputFuncOutput.textContent;
            }
            closeDataInput([removeKeyboard, disableInputFuncButtons]);
        } else if (event.target.closest(".remove-chart")){
            canvas.textContent = String(Date.now()).slice(-3);
            closeDataInput([removeKeyboard, disableInputFuncButtons]);
            
        } else if (event.target.closest(".cancel-changes")){
            closeDataInput([removeKeyboard, disableInputFuncButtons]);
        }
    })
    
}

function closeDataInput(functions){
    inputFuncOutput.style.color = "transparent";
    inputFuncOutput.textContent = "f(x)";
    functions.forEach(func => func());
    inputDataWrapper.classList.remove("active");
    inputDataWrapper.addEventListener('transitionend', event => {
        inputDataWrapper.style.top = "0px";
    }, {"once": true});
    document.body.style.overflow = "auto";
}

