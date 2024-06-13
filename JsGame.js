$(document).ready(function() {
    let arrayElementsEven = []; //Par
    let arrayElementsOdd  = []; //Impar
    let arrayElements  = [];    //Geral
    //Distingue quem é o player da jogada
    let player = 0
    let jogoIniciado = false;

    Iniciar();

    $('#Iniciar').click(function() {
        if (!jogoIniciado) {
            Iniciar();
            jogoIniciado = true;
        }
    }); 

    $('#Reiniciar').click(function() {   
        Reiniciar();
        jogoIniciado = false;
    });

    function Iniciar(){

        $('.options').on('click', function() {
            var OptionSelect = $(this).attr('id');
            let Wins = false;
            
            //console.log('OptionSelect:', OptionSelect);

            // Verifica se o item já está no array antes de adicionar
            console.log(arrayElements,'arrayElements');
            console.log(OptionSelect,'OptionSelect');
            if(!arrayElements.includes(OptionSelect)){
                //console.log('jogador : ' + player)
                //console.log('jogador par : ' + isEven(player))
                //console.log('jogador impar : ' + isOdd(player))
                if (isEven(player)) {
                    EvenPlayer(OptionSelect)
                }else if (isOdd(player)) {
                    OddPlayer(OptionSelect)    
                }
            } else {
                ElementChoice = "#" + OptionSelect
                $(ElementChoice).addClass('Warning');
                ShakeDiv(ElementChoice);
                RemoveWarning(ElementChoice);
            }
        });
    }

    function EvenPlayer(OptionSelect){
        arrayElementsEven.push(OptionSelect);
        arrayElements.push(OptionSelect);    

        ElementChoice = "#" + OptionSelect;

        $(ElementChoice).addClass('x-logo');
        animateX()
        
        if(arrayElementsEven.length >= 3){//
            ValidResult(arrayElementsEven)
    
            if(arrayElementsEven.length == 4){// Remove o primeiro elemento e a classe de aviso
                ElementChoice = "#" + arrayElements[0];
                $(ElementChoice).removeClass('WarningLast');
            
                let indice = arrayElements.indexOf(arrayElements[0]);
                arrayElements.splice(indice, 1);

                arrayElementsEven.shift(); // Remove o primeiro elemento quando chegar em 4        
            }
            
            if(arrayElementsEven.length == 3){// Coloca a classe de aviso que aquela opção é a ultima
                ElementChoice = "#" + arrayElementsOdd[0];
                $(ElementChoice).addClass('WarningLast');
            }
        };
        player ++; 
    }

    function OddPlayer(OptionSelect){
        arrayElementsOdd.push(OptionSelect);
        arrayElements.push(OptionSelect);  

        ElementChoice = "#" + OptionSelect;

        $(ElementChoice).addClass('circle');
        animateCircle()

        if(arrayElementsOdd.length >= 3){//
            ValidResult(arrayElementsOdd)
            if(arrayElementsOdd.length == 4){// Remove o primeiro elemento e a classe de aviso
                ElementChoice = "#" + arrayElements[0];
                $(ElementChoice).removeClass('WarningLast');
            
                let indice = arrayElements.indexOf(arrayElements[0]);
                arrayElements.splice(indice, 1);

                arrayElementsOdd.shift(); // Remove o primeiro elemento quando chegar em 4        
            }
            if(arrayElementsOdd.length == 3){// Coloca a classe de aviso que aquela opção é a ultima
                ElementChoice = "#" + arrayElementsOdd[0];
                $(ElementChoice).addClass('WarningLast');
            }
        };
        player ++; 
    }

    function Reiniciar() {
        arrayElementsEven = []; //Par
        arrayElementsOdd  = []; //Impar
        arrayElements     = []; //Geral
        player = 0    
        $('#teste0').html('');
        $('#teste1').html('');
        $('.cell').removeClass('WarningLast');
    };

    function RemoveWarning(id){
        setTimeout(function() {$(id).removeClass('Warning');}, 1000); //1 sec
    }

    function ValidResult(options){
        for (let i = 0; i < options.length; i++) {
            
        }

    }

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
            div.animate({ left: distancia }, intervalo)
                .animate({ left: -distancia }, intervalo * 2)
                .animate({ left: 0 }, intervalo);
        }
    }
    function animateX() {
        $('#x-logo .line1').animate({width: 'toggle'}, 500);
        $('#x-logo .line2').animate({width: 'toggle'}, 500);
    }

    function animateCircle() {
        $('#circle').css('width', '200px');
        $('#circle').css('height', '200px');
      
        setTimeout(function() {
          $('#circle').css('width', '100px');
          $('#circle').css('height', '100px');
        }, 500);
      }
});