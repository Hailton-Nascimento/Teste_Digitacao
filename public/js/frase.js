$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


function fraseAleatoria() {
    $("#spinner").toggle()
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(()=>{
            $("#mensagem").slideToggle(700);
            setTimeout(()=>{
                $("#mensagem").slideToggle(700);
            },2500);

        })
        .always(()=>{
            $("#spinner").toggle();
        });
}

function trocaFraseAleatoria(data) {
    
    var frase = $('.frase');
    var numeroAleatorio = parseInt(Math.random() * data.length);// pode ser feito o aredondamento com Math.floor que é arrendodamento pra baixo.
    var novaFrase = data[numeroAleatorio].texto;
    frase.text(novaFrase);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
    $("#frase-id").val(numeroAleatorio)

}

function buscaFrase() {
    $("#spinner").toggle()
    var fraseId = $("#frase-id").val();
    var dados = {id : fraseId};

    $.get(`http://localhost:3000/frases/`,dados, trocaFrase)
        .fail(()=>{
            $("#mensagem").slideToggle(700);
            setTimeout(()=>{
                $("#mensagem").slideToggle(700);
            },2500);

        })
        .always(()=>{
            $("#spinner").toggle();
        });
}

function trocaFrase(data) {

    var frase = $(".frase");
    frase.text(data.texto); 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
    
}
function verificaQuantasFrades(){
    $.get(`http://localhost:3000/frases/`, (data)=>{
        $("#frase-id").attr("max",data.length-1); 
    })
}