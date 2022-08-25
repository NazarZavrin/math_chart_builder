import { inputFuncOutput } from "./script.js";

let text = ["x", "π", "𝑒", "+", "-", "×", "÷", "."];
for (let i = 0; i <= 10; i++) {
    text.push(String(i));
}
console.log(text);

let inputFuncKeyboard = document.getElementsByClassName("input-function__keyboard")[0];
export default function inputFunction(output) {
    inputFuncOutput.style.color = "black";
    return inputFuncKeyboard.addEventListenerN("pointerup", event => {
        if (event.target.matches(".input-function__keyboard > div > section > div")) {
            /*`<div>𝑓²</div><div>𝑓³</div><div>𝑓𝆑</div>
            <div>√𝑓</div><div>∛𝑓</div><div>𝆑√𝑓</div>
            <div>ln(𝑓)</div><div>lg(𝑓)</div><div>log𝑓(𝑓)</div>
            <div>⌫</div>`*/
            let keyText = event.target.textContent;
            if (text.includes(keyText)) {
                console.log(keyText);
            } else if (keyText === "(") {
                console.log("(");
            } else if (keyText === "|𝑓|"){
                console.log("abs");
            } else if (["sin", "cos", "tg", "ctg"].includes(keyText)){
                console.log(keyText);
            } else if (["²", "³"].includes(keyText.split("").pop())) {
                console.log("power 2 or 3");
            } else if (["√", "∛"].includes(keyText.split("").shift())) {
                console.log("root 2 or 3");
            } else if (keyText.startsWith("l")){
                console.log("log");
            } else if (event.target.matches(".nth-power")) {
                console.log("nth-power");
            } else if (event.target.matches(".nth-root")) {
                console.log("nth-root");
            }
            // доделать стрелки и делит бакспейс
            output.textContent += keyText;

            
        }
    })
}