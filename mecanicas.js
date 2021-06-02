//Jayro Boy de Vasconcellos Neto
//nUSP:9762880
//github:@jayroboy

/*Projeto para candidatura ao FoG - Fellowship of the Game
Baseado no tutorial do canal freeCodeCamp.org, que pode ser
acessado no seguinte link:https://www.youtube.com/watch?v=rAUn1Lom6dw
*/ 



/*---------------------------------- 31/05/21 ---------------------------------*/

document.addEventListener('DOMContentLoaded', () => {

    //--------------Aqui começam os "Defines"--------------------

    /* Algumas variáveis não serão reatribuídas e nem terão seu valor direto mudado durante o código.
    Por conta disso, elas não são de fato variáveis, mas sim constantes, e são a primeira coisa que 
    colocaremos no nosso código*/
    const largura = 10 //10 quadrados de largura na tela principal
    const larguraPreview = 4 //4 quadrados de largura na tela que mostra a próxima peça
    const minigrid = document.querySelector(".minigrid")//O preview da próxima peça
    const placar = document.querySelector("#placar")// O span de placar
    const botao = document.querySelector("#botao-inicio") //O botão de iniciar e pausar    
    const posicaoPreview = 1 //A posição onde as peças são geradas no preview
  

    /* O segundo passo é criar as peças com todas as rotações. Basicamente cada peça é 
    um array que contém quatro arrays internos. Cada um desses arrays internos 
    contém os índices da array quadrados que descrevem a peça em uma de suas rotações. 
    As rotações estão em sentido horário.
    */

    //A peça em formato de L 
    const orangeRicky = [
        [0, largura, 2*largura, 2*largura+1], //L
        [largura, largura+1, largura+2, 2* largura], // +90º
        [0, 1, largura+1, 2*largura+1], // +90º
        [2*largura, 2*largura+1, 2*largura+2, largura + 2] //+90º       
    ]

    //A peça em formato de J
    const blueRicky = [
        [1, largura+1, 2*largura+1, 2*largura], //J
        [largura, 2*largura, 2*largura+1, 2*largura+2],
        [2, 1, largura + 1, 2*largura + 1],
        [largura, largura+1, largura+2, 2*largura+2]
    ]

    //A peça em formato de T
    const teewee = [
        [1, largura, largura+1, 2*largura+1], 
        [largura + 1, 2*largura, 2*largura+1, 2*largura+2],
        [1, largura + 2, largura+1, 2*largura+1],
        [largura, largura+1, largura+2, 2*largura+1]
    ]

     //A peça em formato de S
    const rhodeIslandZ = [
        [0, largura, largura +1, largura*2 + 1],
        [largura + 1, largura + 2, 2* largura, 2 * largura + 1],
        [0, largura, largura +1, largura*2 + 1],
        [largura + 1, largura + 2, 2* largura, 2 * largura + 1]
    ]

     //A peça em formato de Z
    const clevelandZ = [        
        [1, largura+1, largura, largura*2],
        [largura + 1, largura, 2* largura + 2, 2 * largura + 1],
        [1, largura+1, largura, largura*2],
        [largura + 1, largura, 2* largura + 2, 2 * largura + 1]
    ]

    //A peça em formato de O
    const smashBoy = [
        [0, 1, largura, largura+1],
        [0, 1, largura, largura+1],
        [0, 1, largura, largura+1],
        [0, 1, largura, largura+1]
    ]

    //A peça em formato de I
    const hero = [
        [0, largura, 2* largura, 3 * largura],
        [largura, largura+1, largura+2, largura + 3],
        [0, largura, 2* largura, 3 * largura],
        [largura, largura+1, largura+2, largura + 3]
    ]

    /*Agora colocamos todos as peças em um array. Efetivamente, isso é uma matriz 7 * 4 * 4 que contém
     todas as possíveis combinações de quadrados coloridos pra formar uma peça individual*/
    const pecas = [
        orangeRicky, 
        blueRicky, 
        teewee, 
        rhodeIslandZ, 
        clevelandZ, 
        smashBoy, 
        hero
    ]
    
    /*Essa array tem só a primeira configuração de cada peça, para usarmos no preview 
     Não podemos simplesmente usar orangeRicky[0], teewee[0] etc pois as peças estão montadas
     baseando-se na largura da tela grande, que é maior do que a do preview. 
    */
    
    const pecasPreview = [
        [0, larguraPreview, 2*larguraPreview, 2*larguraPreview+1], //OrangeRicky -  [1, largura+1, 2*largura+1, 2*largura+2]
        [1, larguraPreview+1, 2*larguraPreview+1, 2*larguraPreview],//BlueRicky - [1, largura+1, 2*largura+1, 2*largura]
        [1, larguraPreview, larguraPreview+1, 2*larguraPreview+1], //teewee -  [1, largura, largura+1, 2*largura+1]
        [0, larguraPreview, larguraPreview +1, larguraPreview*2 + 1], //rhodeIslandZ - [1, largura+1, largura +2, largura*2 + 2]
        [1, larguraPreview+1, larguraPreview, larguraPreview*2], //clevelandZ -  [1, largura+1, largura, largura*2]
        [larguraPreview, larguraPreview+1, 2*larguraPreview, 2*larguraPreview+1], //smashboy - [0, 1, largura, largura+1]
        [0, larguraPreview, 2* larguraPreview, 3 * larguraPreview], //hero - [0, largura, 2* largura, 3 * largura]
    ]




    //------------Aqui começam as funções--------------------


    /*Essa função serve para aplicar cores diferentes pra cada peça */
    function seletor(vari){
        switch(vari){
            case 0:
                return 'orangeRicky'
            case 1:
                return 'blueRicky'
            case 2: 
                return 'teewee'
            case 3:
                return 'rhodeIslandZ'
            case 4:
                return 'clevelandZ'
            case 5:
                return 'smashboy'
            case 6:
                return 'hero'
        }
    }




    /*-------------Funções de Visualização---------- 
        Essas funções realizam a manipulação do HTML e CSS
        para traduzir para a interface gráfica o que está aconte
        cendo no jogo.
    */

    //Essa função remove todas as classes referentes à formatação de peças     
    function removeColor(square){
        square.classList.remove("peca")
        square.classList.remove("smashboy")
        square.classList.remove("teewee")
        square.classList.remove("orangeRicky")
        square.classList.remove("blueRicky")
        square.classList.remove("hero")
        square.classList.remove("clevelandZ")
        square.classList.remove("rhodeIslandZ")
    }

    function liberar(square){
        square.classList.remove("taken")
    }

    /**Essa função manipula o span no heading placar para mostrar a pontuação
     * do usuário
     */
    function atualizaPlacar(){
        placar.innerHTML = "Placar: " + placarValor
    }


    /* Essa função limpa as divs do preview e atribui as classes relevantes
    para mostrar uma peça no preview*/
    function proximaPeca(){
        //Remover as classes da peça atual de todas as divs filhas do minigrid
        quadradosPreview.forEach(quadrado =>{
            removeColor(quadrado)
        })
        tipo = seletor(proximaPecaACair)
        //Adicionar as classes da próxima peça a todas as divs filhas do minigrid
        pecasPreview[proximaPecaACair].forEach(indice =>{
            quadradosPreview[posicaoPreview + indice].classList.add("peca")
            quadradosPreview[posicaoPreview + indice].classList.add(tipo)
        })
    }

    /*Essa função atribui classes a divs dentro do grid para desenhar uma peça*/
    function desenhar(){
        var tipo = seletor(pecaCaindoAgora)
        pecaAtual.forEach(indice => {
            quadrados[posicao + indice].classList.add(tipo)
            quadrados[posicao + indice].classList.add("peca")
        })
    }

    /*Essa função remove classes de divs dentro do grid para apagar uma peça da tela*/
    function apagar(){
        pecaAtual.forEach(indice =>{
            removeColor(quadrados[posicao + indice])
        })
    }




    /* -----------Funções Operacionais-----------------
        Essas funções realizam os movimentos básicos do
        jogo, como implementar a gravidade e a geração de 
        novas peças, bem como invocar as funções de verifi-
        cação quando apropriado
    */

    /*Essa função serve para alterar o valor do placar.
    Cada linha individual garante 10 pontos, e há um mutiplicador
    de combo, de forma que eliminar mais linhas de uma vez é mais
    vantajoso do que várias linhas individualmente.
    1 linha = 10 * 1 = 10 pontos
    2 linhas = 20 * 2 = 40 pontos
    3 linhas = 30 * 3 = 90 pontos
    4 linhas = 40 * 4 = 160 pontos
    */
    function calculaPlacar(){
        var combo = 0
        var placarTemp = 0
        for(let i = 0; i < 199; i += largura){
            const linha = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(linha.every(quadrado => quadrados[quadrado].classList.contains('taken'))){
                combo+=1
                placarTemp+=10
                linha.forEach(quadrado =>{
                    removeColor(quadrados[quadrado])
                    liberar(quadrados[quadrado])
                })
                var removidos = quadrados.splice(i, largura)
                quadrados = removidos.concat(quadrados)
                quadrados.forEach(quadrado => grid.appendChild(quadrado))
            }
        }
        console.log("Combo: " + combo + " placarTemp: " + placarTemp)
        placarTemp = placarTemp * combo
        placarValor += placarTemp
        atualizaPlacar()
    }


    
    /*O jogo funciona com uma grande Div com varias divs pequenas
    dentro dela. Para evitar de pouir o HTML, fiz essa função que 
    popula a div grande com as divs pequenas.*/
    function populate(grid){
        //20 linhas de 10 quadrados cada
        for(let i = 0; i< 200; i++){
            let newDiv = document.createElement("div")
            grid.appendChild(newDiv)
        }
        
        //A última linha(21) de quadrados para ser a borda
        for(let i = 0; i < 10; i++){
            let newDiv = document.createElement("div")
            newDiv.classList.add("taken")
            newDiv.classList.add("bottom")
            grid.appendChild(newDiv)
        }
    }

    /*Essa função faz a mesma coisa da de cima, mas com a div de preview
    da próxima peça*/
    function populateMini(minigrid){
        for(let i = 0; i < 16; i++){
            let newDiv = document.createElement("div")
            minigrid.appendChild(newDiv)
        }
    }

    //Essa funcao gera uma nova peça 
    function novaPeca(){
        pecaCaindoAgora = proximaPecaACair
        do{
            proximaPecaACair = Math.floor(Math.random()*pecas.length) //gera um número entre 0 e 1, multiplica pelo numero de opções e arredonda pra baixo
        }while(proximaPecaACair == pecaCaindoAgora)//Para evitarmos repetição
        configuracaoPeca = 0 
        pecaAtual = pecas[pecaCaindoAgora][configuracaoPeca]
        posicao = 4
        proximaPeca()
    }

    /*Essa função faz a peça parar de cair e gera uma peça nova*/
    function congelar(){
        if(pecaAtual.some(indice =>quadrados[posicao + indice + largura].classList.contains('taken'))){
            pecaAtual.forEach(indice => quadrados[posicao + indice].classList.add('taken'))
            novaPeca()
            calculaPlacar()
            desenhar()
            fimDeJogo()
        }
    }


    /* Essa função faz a peça descer um quadrado */
    function descer(){
        apagar()
        posicao += largura
        desenhar()
        setTimeout(()=>{congelar(), 3*gravidade/4})
    }


    /* -------------Funções de verificação---------------
        Essas funções são invocadas quando o usuário
        modifica a posição da peça para garantir que a modifica
        ção é válida
    */
    

    function fimDeJogo(){
        if(pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains("taken"))){
            placar.innerHTML = "Fim de Jogo!\n Placar:" + placarValor
            clearInterval(timerId)
            botao.innerHTML = "Reiniciar?"
            botao.classList.remove("red")
            gameOver = true
        }
    }

    //Verifica se a peça está na borda direita da tela
    function direita() {
        return pecaAtual.some(indice=> (posicao + indice + 1) % largura === 0)  
    }
     
   //verifica se a peça está na borda esquerda da tela 
    function esquerda() {
        return pecaAtual.some(indice=> (posicao + indice) % largura === 0)
    }
     
    /*Essa função recursiva corrige se a rotação fizer alguma bobeira.
    Basicamente ela chama a si mesma de novo e roda a peça até a peça estar em uma posição 
    válida. Ela precisa ser recursiva por conta da peça hero, a que são 4 quadrados enfileirados,
    porque essa peça pode ser rotacionada e mais de uma coluna atravessar a lateral
    da tela. Caso a peça já esteja em uma posição válida quando ela for chamada, ela simplesmente 
    passa direto e não faz nada
    */
    function verificarRotacao(P){
        P = P || posicao      
        if ((P+1) % largura < 4) {        
            if (direita() || pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){           
                posicao += 1
                verificarRotacao(P) 
            }
        }
        else if (P % largura > 5) {
            if (esquerda() || pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){
                posicao -= 1
                verificarRotacao(P)
            } 
        }
    } 

    //Essa faz a mesma coisa só que rodando pro outro lado
    function verificarRotacaoAnti(P){
        P = P || posicao      
        if ((P+1) % largura < 4) {        
            if (direita() || pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){           
                posicao -= 1   
                verificarRotacao(P) 
            }
        }
        else if (P % largura > 5) {
            if (esquerda() || pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){
                posicao += 1
                verificarRotacao(P)
            } 
        }
    } 




    /* ------------------Funções de controle--------------------- 
        Essas são as funções que lidam com o input do usuário
        e fazem a integração entre o que o usuário digita e o que
        o programa faz
    */

    //função principal de entrada que chama as outras
    function controle(e){
        if(e.keyCode === 37){
            moverEsquerda()
        }else if(e.keyCode === 38){
            rotacaoHorario()    
        }else if(e.keyCode === 39){
            moverDireita()
        }else if(e.keyCode === 40){
            rotacaoAntiHorario()
        }
    }

    /*Não é exatamente uma função, mas é o que fica monitorando 
    o que o usuário digita*/
   document.addEventListener('keyup', controle)

    //Congela o jogo
    function pause(){
        clearInterval(timerId)
        timerId = null
        if(!gameOver) botao.innerHTML = "Continuar"
        else{
            botao.innerHTML = "Iniciar"
            reset()
            gameOver = false
        }botao.classList.remove("red")
    }

    //faz o jogo voltar a funcionar
    function unpause(){
        desenhar()
        timerId = setInterval(descer, gravidade)
        botao.innerHTML = "Pausar"
        proximaPeca()
        botao.classList.add("red")
    }


    /*Função que reseta o jogo ao seu estado original*/
    function reset(){
        quadrados.forEach(quadrado => {
            if(!quadrado.classList.contains("bottom")){
                removeColor(quadrado)
                liberar(quadrado)
            }      
        })
        placarValor = 0
        posicao = 4
        configuracaoPeca = 0
        placar.innerHTML = "Placar: " + placarValor
        pecaCaindoAgora = Math.floor(Math.random() * pecas.length)
        do{
            proximaPecaACair = Math.floor(Math.random()*pecas.length) 
        }while(proximaPecaACair == pecaCaindoAgora)

        pecaAtual = pecas[pecaCaindoAgora][configuracaoPeca]
        botao.innerHTML = "Iniciar"
    }

    //Clique para iniciar
    botao.addEventListener('click', ()=>{
        if(timerId){
            pause()
        }else{
            unpause()
        }
    })

    //Desloca a peça atual uma casa para a esquerda
    function moverEsquerda(){
        apagar()
        if(!esquerda()) posicao -=1
        if(pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){
            posicao += 1
        }
        desenhar()
    }

    //Desloca a peça atual uma casa para a direita
    function moverDireita(){
        apagar()
        if(!direita()) posicao +=1
        if(pecaAtual.some(indice=>quadrados[posicao + indice].classList.contains('taken'))){
            posicao -= 1
        }
        desenhar()
    }

    //Realiza uma rotação de 90º em sentido horário
    function rotacaoHorario(){
        apagar()
        configuracaoPeca++
        configuracaoPeca = configuracaoPeca % 4
        pecaAtual = pecas[pecaCaindoAgora][configuracaoPeca]
        verificarRotacao()
        desenhar()
    }

    /*Essa funçao originalmente estava manualmente verificando a posição
    atual e atribuindo a posição apropriada, mas achei que isso era muito 
    deselegante. Em vez de rodar 90º em sentido anti-horário, ela roda 270º
    em sentido horário, o que funcionalmente, é a mesma coisa. Além disso,
    removemos um comparativo do nosso código, o que pode resultar em aumento
    de performance */
    function rotacaoAntiHorario(){
        apagar()
        configuracaoPeca+=3
        configuracaoPeca = configuracaoPeca % 4
        pecaAtual = pecas[pecaCaindoAgora][configuracaoPeca]
        verificarRotacaoAnti()
        desenhar()
    }




    /*------------------Operacional do Jogo-----------------------
        Aqui temos o restante das mecanicas do jogo. A maior parte das coisas que estão aqui
        dependem da inicialização do resto das coisas ou as invocam, e, portanto, ficam por 
        último no nosso código. De certa forma, isso é a "main"
    */
      
    var gameOver = false //variável usada para reiniciar o jogo
    var placarValor = 0 //Pontuação do jogador
    var grid = document.querySelector(".grid")//A nossa div principal

    /*Precisamos "preencher" o nosso grid antes de gerarmos a array com seus elementos internos.
    Apesar de estarmos mexendo no grid, a constante grid não está sendo reatribuída, ela continua
    guardando o tempo todo a div principal do nosso HTML, por isso ela é uma const e não uma var.
    */
    populate(grid)

    //Similarmente, preenchemos o minigrid que mostra a próxima peça
    populateMini(minigrid)

    /*Aqui criamos uma array com todas as Divs dentro do grid. Essa array é o que acessaremos
    para gerar as peças na tela, por isso o grid é um const e ela é um var*/
    var quadrados = Array.from(document.querySelectorAll(".grid div"))    

    /*Essa aqui é pra os quadrados do preview da próxima peça*/
    const quadradosPreview = Array.from(document.querySelectorAll(".minigrid div"))    
    
    //A posição onde a peça aparece
    let posicao = 4

    //A posição em que a peça se encontra dentre as 4 disponiveis
    let configuracaoPeca = 0 
    
    /*gera um número entre 0 e 1, multiplica pelo numero de opções e 
    arredonda pra baixo. Esse método(random) só é usado nessa variável
    uma vez, no início do jogo*/
    let pecaCaindoAgora =  Math.floor(Math.random()*pecas.length) 
    
    /*Aqui inicializamos a próxima peça e logo em seguida fazemos o tratamento de repetição
    imediata. Originalmente eu pensei em fazer uma 7-bag, ou seja, gerar uma ordem aleatória
    para as 7 peças, soltar elas nessa ordem e depois gerar uma outra ordem aleatória, e assim
    por diante. No entanto, além de isso ser consideravelmente mais dificil de implementar, também
    não combina bem com o tratamento de repetição direta, fazendo com que seja possível que a mesma
    peça venha duas vezes seguidas, o que pode ser desastroso para o jogador.
    */
    let proximaPecaACair
    do{
        proximaPecaACair = Math.floor(Math.random()*pecas.length) 
    }while(proximaPecaACair == pecaCaindoAgora)
    
    /*A diferença dessa variável para a variável "pecaCaindoAgora" é que essa salva, além de qual
    das 7 peças estamos manipulando, a configuração(ou rotação) em que ela está. Em termos técnicos,
    essa variável recebe um array de 4 valores enquanto a outra recebe um valor númerico apenas */
    let pecaAtual = pecas[pecaCaindoAgora][configuracaoPeca] 
    
    /*Não sei uma boa conta para distinguir entre as dificuldades e nem quantas dificuldades colocar, 
    mas a relação entre dificuldade e velocidade de queda das peças é inversamente proporcional*/
    let dificuldade = 4.5
    
    //Possivelmente 5 níveis com .2 seg maior velocidade de clock por nivel
    let gravidade = Math.floor(1200 - (200 * dificuldade))
    
    //Variável para implementação de pause e play
    let timerId
    
})