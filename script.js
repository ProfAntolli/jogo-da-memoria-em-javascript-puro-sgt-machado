// Selecionamos todos os elementos com a class .carta
const  cartao = document.querySelectorAll('.carta');

let cartaVirada = false;

// Esta variável servirá para quando o jogador clicar na segunda carta, ela será definida como true
// e a condição if (bloquearCartas) return; previne que qualquer outra carta seja virada até que as cartas desvirem.
let bloquearCartas = false;
let primeiraCarta, segundaCarta;

// Ao primeiro clique, se não houver carta virada, cartaVirada é setada como true e primeiraCarta guarda a carta clicada
// Caso que o jogador clica duas vezes sobre a mesma carta vamos avaliar se a segunda carta clicada é a mesma que a primeira e retornar em caso positivo.
// A condição de pareamento seria avaliada como verdadeira, removendo o detector de evento da carta incorretamente.
function virarCarta(){   
    if (bloquearCartas) return;   
    if (this === primeiraCarta) return;

    this.classList.add('virar');

    if(!cartaVirada) {
        //primeiro clique
        cartaVirada = true;
        primeiraCarta = this;

        return;
    }
    //segundo clique
    segundaCarta = this;
    combinacao();
}

// Testar se as cartas formam pares acessando o seu dataset
function combinacao(){
    let par = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;
    par ? desativarCarta() : desvirarCarta();
}

// Se as cartas formarem um par, desativarCarta() é chamada e os detectores de eventos são removidos, para prevenir que as cartas sejam viradas novamente.
function desativarCarta(){
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    reiniciarCartas();
}

// Caso contrário, desvirarCarta() remove a classe .virar após 1500ms e a carta retorna a sua posição inicial.
function desvirarCarta(){   
    bloquearCartas = true;    

    setTimeout(() => {
    primeiraCarta.classList.remove('virar');
    segundaCarta.classList.remove('virar');   

    reiniciarCartas();
    }, 1500);
}

// As variáveis primeiraCarta e segundaCarta precisam ser resetadas após cada rodada.
function reiniciarCartas(){
    [cartaVirada, bloquearCartas] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

// Função Imediatamente Executada (IIFE) para embaralhar as cartas de forma aleatória
(function embaralhar(){
    cartao.forEach(card => {
        let embaralhar = Math.floor(Math.random() * 20);
        card.style.order = embaralhar;
    });
})();

// Toda vez que uma carta for clicada a função virarCarta será chamada
cartao.forEach(card => card.addEventListener('click', virarCarta));