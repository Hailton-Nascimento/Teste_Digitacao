$('#botao-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

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
    var usuario = $('#usuarios').val();
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


function sincronizaPlacar(){
  
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario =   $(this).find("td:nth-child(1)").text();
        var numPalavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: numPalavras            
        };
        placar.push(score);

    });
    var dados = {
        placar: placar
    };
    var mensagem =  $(".tooltip").tooltipster("content");


    $.post("http://localhost:3000/placar", dados , function() {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open").tooltipster("content", "Placar sincronizado com sucesso"); 
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ //novo
        setTimeout(function() {
        $(".tooltip").tooltipster("close");
        $(".tooltip").tooltipster("content", mensagem); 
    }, 1200);
    });
    

}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",(data)=>{
        $(data).each(function(data){
            var linha = novaLinha(this.usuario,this.pontos);
            linha.click(event,deletar);
            $("tbody").append(linha);
        });
    });
}