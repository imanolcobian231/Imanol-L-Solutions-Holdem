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

//Detecta manos
function hands() {
    let compare = [...holeCards, ...comunityCards]
    let hand = Hand.solve(compare)
    console.log("type: ", hand.name) //Obtiene tipo de mano 
    return ""
}

function handsR() {
    let compare1 = []
    let compare = []
    let pairs = false
    let three = false
    let twoPairs = 0
    compare = [...holeCards, ...comunityCards]

    //Elimina palo para comparar numero
    for (let i = 0; i < compare.length; i++) {
        compare1.push(compare[i].slice(0, -1))
    }

    //Cuenta cantidad de repeticiones
    const conteo = {} 
    for (const num of compare1) {
        if(conteo[num]) {
            conteo[num]++
        } else {
            conteo[num] = 1
        }
    }

    //Valida si hay pares para no repetir"HIGH CARD"
    for(const num in conteo) {
        if (conteo[num] > 1) {
            pairs = true
            break
        }
    }

    //Valida par, trio, pokar, dos pares y full house
    for(const num in conteo) {
        if(pairs === false) {
            console.log("type: high card")
            break
        }

        if(conteo[num] == 2) {
            twoPairs++
        }

        if(conteo[num] == 3) {
            three = true
        }

        if(conteo[num] == 4) {
            console.log("type: four of a kind")
        }
    }

    if(twoPairs == 1) { //TWO PAIRS
        console.log("type: pair")
    }

    if(three && twoPairs >= 1) { //FULLHOUSE
        console.log("type: full house")
    }



    if(twoPairs >= 2) { //FULLHOUSE
        console.log("type: two pair")
    }
    return conteo
    } 


    //Valida flush
function flush() {
    let compare = []
    let compare1 = []
    const conteo = {}
    compare = [...holeCards, ...comunityCards]
    //Elimina numero para comparar palo
    for (let i = 0; i < compare.length; i++) {
        compare1.push(compare[i].slice(1))
    }

    //Cuenta repeticiones de palo
    for (const num of compare1) {
        if(conteo[num]) {
            conteo[num]++
        } else {
            conteo[num] = 1
        }
    }

    //Si se repite 5 veces retorna "FLUSH"
    for(const num in conteo) {
        if(conteo[num] >= 5) {
            console.log("type: flush")
        }
    }

    return conteo
    
}


console.log(generateComunityCards())
console.log(generateHoleCards())
console.log(ranks())
console.log(hands())
console.log(handsR())
console.log(flush())

