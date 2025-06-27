const numbers = [2,3,4,5,6,7,8,9,10,"J","Q","K","A",]
const suits = ["♠","♦","♥","♣"]
let comunityCards = []
let holeCards = []
let used = new Set()
let card
const { Hand } = require("pokersolver");

//Genera carta sumando los valores aletorios de los numeros y palos
function generateCards() {
    do {
        card = numbers[Math.floor(Math.random()*numbers.length)] + suits[Math.floor(Math.random()*suits.length)]
    } while(used.has(card))

    used.add(card) //Agrega las cartas a un set para que no se repitan
    return card
}

//Genera 5 cartas aleatoreas
function generateComunityCards() {
    for (let i = 0; i <= 4; i++) {
    comunityCards.push(generateCards())
    }
    return comunityCards
}

//Genera 3 cartas aleatoreas
function generateHoleCards() {
    for (let i = 0; i <= 1; i++) {
        holeCards.push(generateCards())
    }
    return holeCards
}

//Agrega valor a los numeros y acomoda en base al valor
function ranks() {
    const valores = {"2": 2, "3": 3, "4": 4, "5": 5,"6": 6, "7": 7, "8": 8, "9": 9,"10": 10, "J": 11, "Q": 12, "K": 13, "A": 14};
    comunityCards.sort((a, b) => {
        let valA = valores[a.slice(0, -1)];//Elimina el palo para poder comparar el numero
        let valB = valores[b.slice(0, -1)];
        return valB - valA;//Ordena de mayor a menor 
    });

    console.log("ranks: ",comunityCards)
    return ""
}

function hands() {
    let compare = [...holeCards, ...comunityCards]
    let hand = Hand.solve(compare)
    console.log("type: ", hand.name)
    return ""
}


console.log(generateComunityCards())
console.log(generateHoleCards())
console.log(ranks())
console.log(hands())

