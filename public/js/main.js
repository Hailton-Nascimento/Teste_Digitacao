
//Contando numero de plavras nas frase e incluindo no HTML.

var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;


$('#numPalavras').text(numPalavras);