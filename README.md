````markdown
# Poker Hand Simulator en JavaScript

Este proyecto simula una mano de poker **Texas Hold'em**, generando aleatoriamente cartas comunitarias y cartas privadas para un jugador, evitando duplicados, ordenando las cartas y determinando el tipo de mano obtenida utilizando la librería `pokersolver`. (PROVISIONALMENTE)

## Requisitos

Instala la dependencia necesaria con:

```bash
npm install pokersolver
````

## Objetivo del Código

1. Generar una baraja con cartas aleatorias sin repeticiones.
2. Crear las 5 cartas comunitarias.
3. Crear las 2 cartas privadas (hole cards) del jugador.
4. Ordenar las cartas comunitarias por valor (sin importar el palo).
5. Evaluar la combinación de las 7 cartas y determinar la mejor mano posible según las reglas del poker.
6. De momento funciona con libreria "POKERSOLVER" pero se esta trabajando en su version libre de librerias

---

## Explicación Detallada del Código

### Variables Globales

```js
const numbers = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
const suits = ["♠","♦","♥","♣"]
let comunityCards = []
let holeCards = []
let used = new Set()
let card
const { Hand } = require("pokersolver");
```

* `numbers`: Representa los valores numéricos posibles de las cartas (2 al A).
* `suits`: Representa los 4 palos (♠, ♦, ♥, ♣).
* `comunityCards`: Arreglo que guardará las 5 cartas comunitarias.
* `holeCards`: Arreglo que guardará las 2 cartas privadas del jugador.
* `used`: Un `Set` que guarda las cartas ya usadas para evitar duplicados.
* `card`: Variable temporal para almacenar una carta generada.
* `Hand`: Clase de la librería `pokersolver` usada para analizar manos de poker.

---

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

* Genera una carta aleatoria combinando un número y un palo.
* Verifica que la carta no se haya generado antes con `used.has(card)`.
* Si la carta ya fue usada, repite el proceso.
* Agrega la carta al `Set` y la devuelve.

---

### Función: `generateComunityCards()`

```js
function generateComunityCards() {
    for (let i = 0; i <= 4; i++) {
        comunityCards.push(generateCards())
    }
    return comunityCards
}
```

* Llama a `generateCards()` cinco veces.
* Almacena las cartas en el arreglo `comunityCards`.
* Devuelve el arreglo con las 5 cartas comunitarias.

---

### Función: `generateHoleCards()`

```js
function generateHoleCards() {
    for (let i = 0; i <= 1; i++) {
        holeCards.push(generateCards())
    }
    return holeCards
}
```

* Genera dos cartas para el jugador (hole cards).
* Se aseguran de ser únicas por el uso de `generateCards()`.

---

### Función: `ranks()`

```js
function ranks() {
    const valores = {
        "2": 2, "3": 3, "4": 4, "5": 5,
        "6": 6, "7": 7, "8": 8, "9": 9,
        "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
    };
    
    comunityCards.sort((a, b) => {
        let valA = valores[a.slice(0, -1)];
        let valB = valores[b.slice(0, -1)];
        return valB - valA;
    });

    console.log("ranks: ", comunityCards)
    return ""
}
```

* Crea un objeto `valores` que asigna valor numérico a cada carta.
* `slice(0, -1)` elimina el último carácter (el palo) para comparar solo el número.
* Ordena las cartas comunitarias de mayor a menor por su valor.
* Imprime el resultado ordenado.

---

### Función: `hands()`

```js
function hands() {
    let compare = [...holeCards, ...comunityCards]
    let hand = Hand.solve(compare)
    console.log("type: ", hand.name)
    return ""
}
```

* Combina las hole cards y las cartas comunitarias en un solo arreglo.
* Usa `Hand.solve()` de la librería `pokersolver` para evaluar la mejor jugada posible.
* Imprime el tipo de mano resultante, como "Pair", "Two Pair", "Straight", etc.

---

### Ejecución del Código

```js
console.log(generateComunityCards()) // Genera y muestra 5 cartas comunitarias
console.log(generateHoleCards())     // Genera y muestra 2 cartas privadas
console.log(ranks())                 // Ordena y muestra las comunitarias
console.log(hands())                 // Evalúa la mano y muestra el tipo
```

Este bloque ejecuta todo el flujo del programa.

---

## Resultado Esperado

Ejemplo de posible salida en consola:

```
[ 'K♠', '3♦', '10♣', '9♥', '7♣' ]
[ 'A♦', 'J♠' ]
ranks:  [ 'K♠', '10♣', '9♥', '7♣', '3♦' ]
type:  High Card
```

Este ejemplo muestra:

* 5 cartas comunitarias.
* 2 cartas privadas del jugador.
* Las comunitarias ordenadas de mayor a menor.
* El tipo de mano identificada.

```
```
