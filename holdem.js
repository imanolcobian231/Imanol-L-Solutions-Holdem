let numbers = [2,3,4,5,6,7,8,9,10,"J","Q","K","A",]
let suits = ["♠","♦","♥","♣"]
let comunityCarts = []
let holeCarts = []

//Genera carta sumando los valores aletorios de los numeros y palos
function generateCarts() {
    let cart = numbers[Math.floor(Math.random()*numbers.length)] + suits[Math.floor(Math.random()*suits.length)]
    return cart
}

//Genera 5 cartas aleatoreas
function generateComunityCarts() {
    for (let i = 0; i <= 4; i++) {
    comunityCarts.push(generateCarts())
    }
    return comunityCarts
}
//Genera 3 cartas aleatoreas
function generateHoleCarts() {
    for (let i = 0; i <= 1; i++) {
        holeCarts.push(generateCarts())
    }
    return holeCarts
}


console.log(generateComunityCarts())
console.log(generateHoleCarts())
