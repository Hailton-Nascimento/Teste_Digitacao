var tempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao");



// atalho para Funciton para
// $(document).ready(Funciton => {
    // });
    
    // $(Funciton(){
        //     executa tudo que esta aqui apos carregar a pagina.
        //     }
        // )
        
        
        $(document).ready(function() {
            $ ( '.tooltip' ). tooltipster ({ 
                theme: 'my-custom-theme', 
                touchDevices : false , 
                trigger : 'custom',
                trigger:"hover"
            }); 
            fraseAleatoria(event);
            verificaQuantasFrades();
            atualizaTamanhoFrase();
            inicializaContadores();
            inicializaCronometro();
            evitaFraudes();
            verificaFrase();
            atualizaPlacar();
            $("#botao-reiniciar").on("click", reiniciaJogo);
            $(".botao-deletar").click(event,deletar);
            $("#usuarios").selectize({
                create: true,
                sortField: 'text'
            });
        
  
            
            
            

});

function atualizaTempoInicial(tempo){
    tempoInicial=tempo;
    $("#tempo-digitacao").text(tempo);
  
}

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
    
    $("#botao-reiniciar").attr("disabled",false);
    campo.one("focus", () => {
        console.log("Jogo iniciado");
        var tempoRestante = $("#tempo-digitacao").text();
        const cronometroID = setInterval(() => {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000)

    });

}

function evitaFraudes() {
    campo.bind('cut copy paste', function (event) {
        event.preventDefault();
        console.log("n??o pode colar no campo")
        alert(`N??o pode trapacear!!
            Deus t?? vendo!
            O jogo ser?? reiniciado.` );
        reiniciaJogo();

    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desabilita")
    campo.removeClass("borda-vermelha"); 
    campo.removeClass("borda-verde"); 
}

function verificaFrase(){
    
    campo.on("input", function() {
        var frase = $(".frase").text();
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




function finalizaJogo() {
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled",true);
    campo.toggleClass("campo-desabilita");
    inserePlacar();

}
