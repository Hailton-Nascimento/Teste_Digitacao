$('#botao-placar').click(mostraPlacar);

function deletar(evento) {
    evento.preventDefault();
    console.log("deletou");
    $(this).closest("tr").fadeOut(1000);
    setTimeout(()=>{
        $(this).closest("tr").remove();
    },1000);
}

function inserePlacar(){
    var corpoTabela = $('.placar').find('tbody');
    var usuario ="Hailton";
    var numPalavras = $('#contador-palavras').text();

    var linha = novaLinha(usuario, numPalavras);
    linha.click(event,deletar);
    corpoTabela.append(linha);
    $(".placar").slideDown(600);
    scroll($(".placar"));
    
}


function scroll(elemento){
    var posicaoElemento = elemento.offset().top;
    $("html, body").animate(
        {
            scrollTop:`${posicaoElemento}px`
        },1000)


}



function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaNumPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
        var link = $("<a>").addClass("botao-deletar").attr("href","#");
            var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");


    link.append(icone);
    colunaRemover.append(link); 

    linha.append(colunaUsuario);
    linha.append(colunaNumPalavras);
    linha.append(colunaRemover);
    return linha;       
}

function mostraPlacar(){ 

    $(".placar").stop().slideToggle(700);
}


