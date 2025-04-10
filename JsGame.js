$(document).ready(function() {
    let arrayElementsEven = []; //Par
    let arrayElementsOdd  = []; //Impar
    let arrayElements     = []; //Geral

    //Distingue quem é o player da jogada
    let player            = 0;
    let jogoIniciado      = false;
    let PointsEven = 0
    let PointsOdd  = 0

    Iniciar();

    $('#Iniciar').click(function() {
        if (!jogoIniciado) {
            Iniciar();
            jogoIniciado = true;
        };
    }); 

    $('#Reiniciar').click(function() {   
        Reiniciar(true);
        jogoIniciado = false;
    });

    function Iniciar(){

        $('#PlayerX').html(PointsEven);
        $('#PlayerO').html(PointsOdd);

        $('#jogada').html('X')
        $('.options').on('click', function() {
            var OptionSelect = `#${$(this).attr('id')}`;

            // Verifica se o item já está no array antes de adicionar
            if(!arrayElements.includes($(this).attr('id'))){
                if (isEven(player)) {
                    ActionPlayer("Even", OptionSelect)
                }else if (isOdd(player)) {
                    ActionPlayer("Odd", OptionSelect)
                };
            } else {
                ShakeDiv(OptionSelect);
            };
        });
    };

    function ActionPlayer(idPlayer, elementChoice){

        const arrayPromisse = (idPlayer == "Odd")? arrayElementsOdd: arrayElementsEven;

        arrayPromisse.push(elementChoice.replace('#',''));
        arrayElements.push(elementChoice.replace('#',''));  

        $(elementChoice).html('O');

        if(idPlayer == "Odd"){
            $(elementChoice).html('O');
            $('#jogada').html('X');
        }else{
            $(elementChoice).html('X');
            $('#jogada').html('O');
        }

        if(arrayPromisse.length >= 3){//
            if(arrayPromisse.length == 4){// Remove o primeiro elemento e a classe de aviso
                elementChoice = "#" + arrayElements[0];
                RemoveWarning(elementChoice);
                let indice = arrayElements.indexOf(arrayElements[0]);
                arrayElements.splice(indice, 1);
                arrayPromisse.shift(); // Remove o primeiro elemento quando chegar em 4        
            }
            if(arrayPromisse.length == 3){// Coloca a classe de aviso que aquela opção é a ultima
                if(ValidResult(arrayPromisse)){
                    ShowWinner(idPlayer, arrayPromisse);
                }
                elementChoice = "#" + arrayPromisse[0];
                $(elementChoice).addClass('WarningLast');
            };
        };
        player ++; 

    }

    function Reiniciar(All) {
        
        if(All){
            $('#PlayerX').html(0);
            $('#PlayerO').html(0);
        };
    
        arrayElementsEven = []; //Par
        arrayElementsOdd  = []; //Impar
        arrayElements     = []; //Geral
        player            = 0;
        $('.cell').removeClass('WarningLast');
        $('.cell').html('');
        $('.cell').removeClass('Winner');
        $('.cell').addClass('cell');
        $('#jogada').html('X');
        HabilitaCliques();
    };

    function RemoveWarning(id){
        setTimeout(function() {
            $(id).removeClass('WarningLast');
            $(id).html('');    
        ;}, 100); //1 sec
    };

    function ValidResult(options) {
        const winningCombinations = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [1, 5, 9]
        ];

        const optionsNum = options.map(Number);
        return winningCombinations.some(combination => 
            containsExactCombination(optionsNum, combination)
        );
    }
    
    function containsExactCombination(arr, combination) {
        if (arr.length !== combination.length) return false;
        return combination.every(val => arr.includes(val));
    }

    function ShowWinner(Winner, array){  

        BloqueiaCliques();

        for(let i = 0; i < array.length; i++){
            option = '#'+ array[i];
            $(option).addClass('Winner');
        };

        if(Winner == "Even"){
            $('#PlayerX').html(PointsEven ++);
        }else if(Winner == "Odd"){
            $('#PlayerO').html(PointsOdd ++); 
        }

        setTimeout(function() {Reiniciar();}, 3000); //1 sec
    };

    function isEven(number) {
        return number % 2 === 0;
    };

    function isOdd(number) {
        return number % 2 !== 0;
    };

    function ShakeDiv(div) {
        var div = $(div); 
        var intervalo = 100; 
        var distancia = 4;
    
        div.css('position', 'relative');
        for (var i = 0; i < 2; i++) {    // chacoalha 2 vezes
            div.animate({ left: distancia }, intervalo).animate({ left: -distancia }, intervalo * 2).animate({ left: 0 }, intervalo);
        };
    };

    function BloqueiaCliques(){
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = 'none';
            cell.style.cursor = 'default';
        });
    }

    function HabilitaCliques(){
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = 'auto';
            cell.style.cursor = 'pointer';
        });
    }

});