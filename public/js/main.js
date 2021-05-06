
//Contando numero de plavras nas frase e incluindo no HTML.

var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

$('#numPalavras').text(numPalavras);


// Adicionando eventos 

var campo = $(".campo-digitacao");
campo.on("input", () => {
    var entrada = campo.val();

    var qtdPalavras = entrada.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);

    var qtdCaracteres = entrada.length;
    $('#contador-caracteres').text(qtdCaracteres);
});

// add contador de tempo

var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", () => {
    var cronometroID = setInterval(() => {
        tempoRestante--;
        
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            campo.attr("disabled",true);
            clearInterval(cronometroID);
        }
    }, 1000);
        
});