const container = document.querySelector(".container")
const squares = document.querySelectorAll(".square")
const message = document.querySelector(".msg")
let player = 'X'
let n = 0
let test

//création de la bouton reset
const btn = document.createElement("button")
btn.textContent = "Nouvelle partie"
btn.className = "btn"
btn.classList.add("hide")
container.appendChild(btn)

//Les lignes
const r1 = document.querySelectorAll(".r1")
const r2 = document.querySelectorAll(".r2")
const r3 = document.querySelectorAll(".r3")


//Function qui gère la resultat, si un joueur a gagné le match(X ou O) ou match nul
let result = function(v1, v2, v3) {
    if(v1 == v2 && v2 == v3 && v1 !== "") {
        n = undefined
        test = true
        message.innerHTML = v1 + " gagne la partie"
        player = ""
        btn.classList.remove("hide")
    } else {
        test = false
    }
}

//Boucles et ecouteur d'évènement des squares
squares.forEach(square => {
    square.classList.add("changeBg")
    square.addEventListener('click', () => {
        //n ici represente le nombre des squares à remplir - quand n = 9 toutes les squares sont remplient
        if(square.value == "") {
            square.setAttribute("disabled", true)
            square.style.cursor = "not-allowed"
            square.classList.remove("changeBg")
            square.value = player
            n++
        }
        
        //Ternaire qui permet changer de player (p1 = X et p2 = O)
        player = player == 'X' ? 'O' : "X"
       
        //verification si le match est gagné
            //verification par ligne
        result(r1[0].value, r1[1].value, r1[2].value)
        result(r2[0].value, r2[1].value, r2[2].value)
        result(r3[0].value, r3[1].value, r3[2].value)
            //verification par colonne
        result(r1[0].value, r2[0].value, r3[0].value)
        result(r1[1].value, r2[1].value, r3[1].value)
        result(r1[2].value, r2[2].value, r3[2].value)

            //verification par diagonal
        result(r1[0].value, r2[1].value, r3[2].value)
        result(r1[2].value, r2[1].value, r3[0].value)
            //En cas de match nul (result return false)
        if(n === 9 && test == false) {
            message.textContent = "Match nul"
            btn.classList.remove("hide")
        }

        //Reset
        btn.addEventListener("click", function() {
            player = "X"
            square.classList.add("changeBg")
            square.value = ""
            square.style.cursor = "pointer"
            square.removeAttribute("disabled")
            n = 0
            message.textContent = ""
            btn.classList.add("hide")
        })
    })
})


