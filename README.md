````markdown
# Poker Hand Simulator en JavaScript

Este proyecto simula una mano de poker **Texas Hold'em**, generando aleatoriamente cartas comunitarias y cartas privadas para un jugador, evitando duplicados, ordenando las cartas y determinando el tipo de mano obtenida. El código incluye una versión manual que detecta combinaciones sin necesidad de librerías externas, aunque por ahora también incluye una comprobación opcional con `pokersolver`.

## Requisitos

Instala la dependencia necesaria (opcional):

```bash
npm install pokersolver
````

## Objetivo del Código

1. Generar una baraja con cartas aleatorias sin repeticiones.
2. Crear las 5 cartas comunitarias.
3. Crear las 2 cartas privadas (hole cards) del jugador.
4. Ordenar las cartas comunitarias por valor.
5. Evaluar la combinación de las 7 cartas y detectar:

   * Flush
   * Straight
   * Straight flush
   * Pair
   * Two pair
   * Three of a kind
   * Full house
   * Four of a kind
   * High card (si no hay ninguna mano mejor)
6. Comprobación opcional con la librería `pokersolver`.

## Explicación Detallada del Código

### Variables Globales

```js
const numbers = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
const suits = ["♠","♦","♥","♣"]
let comunityCards = []
let holeCards = []
let used = new Set()
let card
let flush = false
let straight = false
let straightFlush = false
const { Hand } = require("pokersolver")
```

### Función: `generateCards()`

```js
function generateCards() {
    do {
        card = numbers[Math.floor(Math.random()*numbers.length)] + suits[Math.floor(Math.random()*suits.length)]
    } while(used.has(card))
    used.add(card)
    return card
}
```

### Función: `generateComunityCards()`

```js
function generateComunityCards() {
    for (let i = 0; i <= 4; i++) {
        comunityCards.push(generateCards())
    }
    return comunityCards
}
```

### Función: `generateHoleCards()`

```js
function generateHoleCards() {
    for (let i = 0; i <= 1; i++) {
        holeCards.push(generateCards())
    }
    return holeCards
}
```

### Función: `ranks()`

```js
function ranks() {
    const valores = {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":11,"Q":12,"K":13,"A":14}
    comunityCards.sort((a, b) => {
        let valA = valores[a.slice(0, -1)]
        let valB = valores[b.slice(0, -1)]
        return valB - valA
    })
    console.log("ranks: ", comunityCards)
    return ""
}
```

### Función: `hands()`

```js
function hands() {
    let compare = [...holeCards, ...comunityCards]
    let hand = Hand.solve(compare)
    console.log("type: ", hand.name)
    return ""
}
```

### Función: `flushR()`

```js
function flushR() {
    let compare = [...holeCards, ...comunityCards]
    let compare1 = []
    const conteo = {}

    for (let i = 0; i < compare.length; i++) {
        compare1.push(compare[i].slice(-1))
    }

    for (const suit of compare1) {
        if (conteo[suit]) {
            conteo[suit]++
        } else {
            conteo[suit] = 1
        }
    }

    for (const suit in conteo) {
        if (conteo[suit] >= 5) {
            console.log("type: flush")
            flush = true
        }
    }

    return conteo
}
```

### Función: `checkStraight()`

```js
function checkStraight() {
    const valores = {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":11,"Q":12,"K":13,"A":14}
    let compare = [...holeCards, ...comunityCards]
    let numbers = []
    let suits = {}

    for (let i = 0; i < compare.length; i++) {
        let num = compare[i].slice(0, -1)
        let suit = compare[i].slice(-1)
        let val = valores[num]

        if (!numbers.includes(val)) {
            numbers.push(val)
        }

        if (!suits[suit]) {
            suits[suit] = []
        }

        if (!suits[suit].includes(val)) {
            suits[suit].push(val)
        }
    }

    numbers.sort((a,b) => a - b)

    let count = 1
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === numbers[i - 1] + 1) {
            count++
            if (count === 5) {
                console.log("type: straight")
                straight = true
            }
        } else {
            count = 1
        }
    }

    for (let suit in suits) {
        let arr = suits[suit].sort((a, b) => a - b)
        let countFlush = 1
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1] + 1) {
                countFlush++
                if (countFlush === 5) {
                    console.log("type: straight flush")
                    straightFlush = true
                    straight = false
                }
            } else {
                countFlush = 1
            }
        }
    }

    return ""
}
```

### Función: `handsR()`

```js
function handsR() {
    let compare = [...holeCards, ...comunityCards]
    let compare1 = []
    const conteo = {}
    let pairs = false
    let three = false
    let fullHouse = false
    let twoPairs = 0

    for (let i = 0; i < compare.length; i++) {
        compare1.push(compare[i].slice(0, -1))
    }

    for (const num of compare1) {
        if (conteo[num]) {
            conteo[num]++
        } else {
            conteo[num] = 1
        }
    }

    for (const num in conteo) {
        if (conteo[num] > 1) {
            pairs = true
            break
        }
    }

    for (const num in conteo) {
        if (pairs === false && flush == false && straight == false && straightFlush == false) {
            console.log("type: high card")
            break
        }

        if (conteo[num] == 2) {
            twoPairs++
        }

        if (conteo[num] == 3) {
            three = true
        }

        if (conteo[num] == 4) {
            console.log("type: four of a kind")
        }
    }

    if (three && twoPairs >= 1 && flush == false) {
        console.log("type: full house")
        fullHouse = true
    }

    if (three && fullHouse == false && flush == false) {
        console.log("type: three of a kind")
    }

    if (twoPairs == 1 && fullHouse == false && flush == false) {
        console.log("type: pair")
    }

    if (twoPairs >= 2 && flush == false) {
        console.log("type: two pair")
    }

    return conteo
}
```

### Ejecución del Código

```js
console.log(generateComunityCards())
console.log(generateHoleCards())
console.log(ranks())
console.log(hands())
console.log(flushR())
console.log(checkStraight())
console.log(handsR())
```

```
```
