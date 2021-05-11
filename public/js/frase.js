$("#botao-frase").click(fraseAleatoria);


function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFraseAleatoria);
}

function trocaFraseAleatoria(data) {

    var frase = $('.frase');
    var numeroAleatorio = parseInt(Math.random() * data.length);// pode ser feito o aredondamento com Math.floor que é arrendodamento pra baixo.
    var novaFrase = data[numeroAleatorio].texto;
    frase.text(novaFrase);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}