//let urlDB = 'https://my-test-page-c3702.firebaseio.com/statistic.json';

let maneForm = document.getElementById('maneForm');
let inputsForm = maneForm.querySelectorAll('.timeAction');
let buttonForm =  maneForm.querySelector('.buttonForm');

let listDiv = document.getElementById('listDiv');
let statisticDiv = document.getElementById('statisticDiv');
let totalStatisticDiv = document.getElementById('totalStatisticDiv');

let timeBeforeInput = ["0"];

window.onload = () => {

    disableButton();

}

maneForm.addEventListener('change', (event) => {
    //event.preventDefault();
    
    let elem = event.target;

    elem.classList.remove('ErrorTime');

    if(elem.className == 'timeAction'){
        
        let errorTime = controlCorrectTime(elem);

        if(errorTime){
            elem.classList.add('ErrorTime');            
        }
        
    }

    disableButton();

});

function disableButton(){

    buttonForm.classList.remove('disabled');

    disabled = false;

    for(let elemInput of inputsForm){
        
        if(elemInput.classList.contains('ErrorTime')) {
            disabled = true;
        }
        else if(elemInput.value == ''){
            disabled = true;
        }

    }


    if(!disabled){

        let startTime = "";
        let finishTime = "";

        for(let elemInput of inputsForm){

            if(elemInput.id == "startTime"){
                startTime = elemInput.value;
            }

            if(elemInput.id == "finishTime"){
                finishTime = elemInput.value;    
            }
        }

        startTime = startTime.split(':');
 
        let hourstartTime = startTime[0];
        let minutstartTime = startTime[1];

        finishTime = finishTime.split(':');
 
        let hourfinishTime = finishTime[0];
        let minutfinishTime = finishTime[1];

        if(+hourstartTime > +hourfinishTime){
            disabled = true;
        }else if(hourstartTime == +hourfinishTime && +minutstartTime > +minutfinishTime){
            disabled = true;
        }
    }

    if(disabled){
        buttonForm.classList.add('disabled');             
    }
    buttonForm.disabled = disabled;
}

function controlCorrectTime(elem){
    let currentValue = elem.value;
    let errorTime = false;

    currentValue = currentValue.split(':');
 
    let hour = currentValue[0];
    let minut = currentValue[1];

    if(hour <= 9 && hour.length == 1){      
        hour = '0' + hour;
    }else if(hour > 23){  
        errorTime = true;
    };

    if(minut == '' || minut == undefined){
        minut = '00';
    }else if(minut <= 9 && minut.length == 1){
        minut = '0' + minut;
    }else if(minut > 59){
        
        errorTime = true;
    };

    currentValue[0] = hour;
    currentValue[1] = minut;
    
    currentValue = currentValue.join(':');

    elem.value = currentValue; 

    return errorTime;
}

for(let elemInput of inputsForm){
    elemInput.addEventListener('input', (event) => {
        //event.preventDefault();
        
        let currentValue = elemInput.value;

        let positionCursorStar = elemInput.selectionStart;

        currentValue = currentValue.split('');
        //timeBeforeInput = timeBeforeInput.split('');

        currentValue = currentValue.filter(item => item !== ':');
        timeBeforeInput = timeBeforeInput.filter(item => item !== ':');


        if(currentValue.length > 0){
            let longtime = Math.min(currentValue.length-1,4);
            for(let i = 0; i <= longtime; i++){
           
                if(currentValue[i] != timeBeforeInput[i]){

                    if(currentValue[i] == timeBeforeInput[i+1]){
                        
                        currentValue.splice(i,0,"0");

                        break;

                    }else if(i+1 <= longtime && currentValue[i+1] == timeBeforeInput[i]){
                        
                        currentValue.splice(i+1,1);

                        break;
                    }

                }
            }

        }

        timeBeforeInput = currentValue;

        if(currentValue.length > 2){
            currentValue.splice(2,0,':');
        }

        if(currentValue.length > 5){
            currentValue.length = 5;
        }
 
        currentValue = currentValue.join('');

        elemInput.value = currentValue;
    
        if(currentValue.length > 2){
            
            if(positionCursorStar == 2){
                
                positionCursorStar += 1;  
                
            }else if(positionCursorStar == 3){
                
                positionCursorStar += 2;
                
            }
        
         }

        elemInput.setSelectionRange(positionCursorStar, positionCursorStar);

    });
   
};

function checkTimeKey(key) {
    
    return (key >= '0' && key <= '9') || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace' || key == 'Tab';

} 

function checkDistanceKey(key) {
    
    return (key >= '0' && key <= '9') || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace' || key == 'Tab' || key == '.';

} 


