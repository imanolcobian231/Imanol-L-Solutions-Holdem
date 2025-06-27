const numbers = [2,3,4,5,6,7,8,9,10,"J","Q","K","A",]
const suits = ["♠","♦","♥","♣"]
let comunityCards = []
let holeCards = []
let used = new Set()
let card

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

function compareCards() {
    let compare = holeCards + comunityCards
    return compare 
    
}


console.log(generateComunityCards())
console.log(generateHoleCards())
console.log(compareCards())

