import { randomIntFromInterval } from "./generics"

const lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lettersLower = "abcdefghijklmnopqrstuvwxyz"

export function UnscrambleAnimation(event, type) {
    //event.target.style.fontFamily = ["Space Mono", "monospace"]
    var letters = type === 'lower' ? lettersLower : lettersUpper
    var iterations = 0
    var interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index <= iterations) {
                    return event.target.dataset.text[index]
                } else return letters[randomIntFromInterval(0, 25)]
            })
            .join('')
        if (iterations >= event.target.innerText.length) clearInterval(interval)
        iterations += 1/3
    }, 30);
}