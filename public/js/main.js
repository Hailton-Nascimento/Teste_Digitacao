const tempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao");



// atalho para Funciton para
// $(document).ready(Funciton => {
// });

// $(Funciton(){
//     executa tudo que esta aqui apos carregar a pagina.
//     }
// )





$(document).ready(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    evitaFraudes();
    verificaFrase();
    $("#botao-reiniciar").on("click", reiniciaJogo);
});


//Contando numero de plavras nas frase e incluindo no HTML.

function atualizaTamanhoFrase() {
    var frase =$(".frase").text();
    var numPalavras = frase.split(" ").length;
    $('#numPalavras').text(numPalavras);

}


// Adicionando eventos 

function inicializaContadores() {

    campo.on("input", () => {
        var entrada = campo.val();
        var qtdPalavras = entrada.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);

        var qtdCaracteres = entrada.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

// add contador de tempo

function inicializaCronometro() {
    var tempoRestante = tempoInicial;
    $("#botao-reiniciar").attr("disabled",true);
    $("#tempo-digitacao").text(tempoRestante);
    campo.one("focus", () => {
        const cronometroID = setInterval(() => {
            tempoRestante--;

            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                $("#botao-reiniciar").attr("disabled",false);
                campo.toggleClass("campo-desabilita");
            }
        }, 1000)

    });

}

function evitaFraudes() {
    campo.bind('cut copy paste', function (event) {
        event.preventDefault();
        console.log("não pode colar no campo")
        alert(`Não pode trapacear!!
            Deus tá vendo!
            O jogo será reiniciado.` );
        reiniciaJogo();

    });
}

function reiniciaJogo() {

    campo.attr("disabled", false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    inicializaCronometro();
    campo.removeClass("campo-desabilita")
    campo.removeClass("borda-vermelha"); 
    campo.removeClass("borda-verde"); 
}

function verificaFrase(){
    var frase = $(".frase").text();
    campo.on("input", function() {

        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
    
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

