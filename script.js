let urlDB = 'https://my-test-page-c3702.firebaseio.com/statistic.json';

let maneForm = document.getElementById('maneForm');
let inputsForm = maneForm.querySelectorAll('.timeAction');
let buttonForm =  maneForm.querySelector('.buttonForm');

let listDiv = document.getElementById('listDiv');
let statisticDiv = document.getElementById('statisticDiv');
let totalStatisticDiv = document.getElementById('totalStatisticDiv');

let resultListArrDB = [];

window.onload = () => {

    disableButton();

    viewContentList();

}

maneForm.addEventListener('submit', (event) => {

    event.preventDefault();

    sendDataToDB();

});

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

    if(minut == ''){
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

        currentValue = currentValue.split('');
     
        currentValue = currentValue.filter(item => item !== ':');

        currentValue.splice(2,0,':');

        currentValue.length = 5;
        
        currentValue = currentValue.join('');

        elemInput.value = currentValue;

    });
    
};

function checkTimeKey(key) {
    
    return (key >= '0' && key <= '9') || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace' || key == 'Tab';

} 

function addContentList(currentList, statisticLongest = false){

    data = new Date(currentList.data);
    startTime = currentList.startTime;
    finishTime = currentList.finishTime;
    action = currentList.action;
    distance = currentList.distance;


    // GET data
    dataListMonth = data.toLocaleString('eng', { month: 'long' }); 
    data = dataListMonth + ' ' + data.getDate();


    // GET time
    currentValue = startTime.split(':');
 
    startTimehour = currentValue[0];
    startTimeminut = currentValue[1];

    currentValue = finishTime.split(':');
 
    finishTimehour = currentValue[0];
    finishTimeminut = currentValue[1];

    startTimehour = startTimehour * 60 * 60;
    startTimeminut = startTimeminut * 60;


    fullStartTime = startTimehour + startTimeminut;

    finishTimehour = finishTimehour * 60 * 60;
    finishTimeminut = finishTimeminut * 60;

    fullfinishTime = finishTimehour + finishTimeminut;

    subtractTime = fullfinishTime - fullStartTime;

    coefficient = subtractTime / 60 / 60;
    coefficient = Math.floor(coefficient * 100) / 100;


    // GET distance
    distanceList = distance / coefficient;
    distanceList = Math.floor(distanceList * 100) / 100;

    hourList = Math.floor(coefficient);
    minuteList = (subtractTime - hourList * 60 * 60) / 60;

    fulltimeList = '';

    if(hourList){
        fulltimeList = hourList + ' h ';
    }

    if(minuteList){
       
        if(fulltimeList == ''){
            fulltimeList = minuteList + ' mimutes';
        }else{
            fulltimeList = fulltimeList + minuteList + ' m';
        }
        
    }else{
       
        if(fulltimeList !== ''){
            fulltimeList = fulltimeList.trim() + 'our';
        }
    }


    if(statisticLongest){

        currentListElem = `
        <div>
            Longest ${action}:
            <table>
            <tr>
                <td>
                ${data}
                </td>
                <td>
                ${distance} km
                </td>
                <td>
                ${fulltimeList} 
                </td>
            </tr>
            </table>
        </div>`;
        
        statisticDiv.innerHTML = statisticDiv.innerHTML + currentListElem;

    }else{

        currentListElem = `
        <div class="elList">
           
            <table>
              <tr>
                <td>
                    ${data}
                </td>
                <td>
                    ${action}
                </td>
                <td>
                    ${distance} km
                </td>
                <td>
                    ${fulltimeList} 
                </td>
                <td>
                    ${distanceList} km / hour
                </td>
              </tr>
            </table>

          </div>`;

        listDiv.innerHTML = listDiv.innerHTML + currentListElem;

    }

}

function viewTotalStatic(resultListArr){
    let arrRun = resultListArr.filter(item => item[1].action == 'Run');
    let arrRide = resultListArr.filter(item => item[1].action == 'Ride');    

    let arrRunSort = arrRun.sort((a,b) => b[1].distance - a[1].distance);
    let arrRideSort = arrRide.sort((a,b) => b[1].distance - a[1].distance); 

    totalRunDistance = 0;
    totalRideDistance = 0;

    if(arrRunSort.length){
        addContentList(arrRunSort[0][1], true);
        totalRunDistance = arrRun.reduce((sum, item) => sum + +item[1].distance, 0);
    }

    if(arrRideSort.length){
        addContentList(arrRideSort[0][1], true); 
        totalRideDistance = arrRide.reduce((sum, item) => sum + +item[1].distance, 0);   
    }

    currentListElem = `
        Total ride distance: <span id="totalRide">${totalRideDistance} km</span>
        <br>
        Total run distance: <span id="totalRun">${totalRunDistance} km</span>
        `;

    // totalStatisticDiv.innerHTML = totalStatisticDiv.innerHTML + currentListElem;
    totalStatisticDiv.innerHTML = currentListElem;
}

function viewContentList(){

    let actionDB = new ActionWithDB();

    actionDB.getDataWithDB()
    .then(resultList => {

        resultListArr = Object.entries(resultList);
        
        resultListArrDB = resultListArr;

        for(let value of resultListArr){

             let currentList = value[1];

            addContentList(currentList);

        }

        viewTotalStatic(resultListArr);      
    });

}

function complitDataToDB(){

    let startTime = maneForm.querySelector('#startTime').value;
    let finishTime = maneForm.querySelector('#finishTime').value;
    let distance = maneForm.querySelector('#distance').value;
    let action = maneForm.querySelector('select');
    let currenData = new Date();

    return {
                data: currenData,
                startTime,
                finishTime,
                action: action[action.selectedIndex].value,
                distance, 
            }

}

function sendDataToDB(){
   
    let data = complitDataToDB();

    let actionDB = new ActionWithDB();

    actionDB.createDataDB(data)
    .then(addContentList(data))
    .catch(err => console.log(err));


    totalStatisticDiv.innerHTML = '';
    statisticDiv.innerHTML = '';

    resultListArrDB.push([[],data]);
    viewTotalStatic(resultListArrDB); 

}

class ActionWithDB{

    getDataWithDB(){

        return fetch(urlDB,{
            method: 'GET',
            // body: JSON.stringify(),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json());

     }

    createDataDB(dataDB){

        return fetch(urlDB,{
            method: 'POST',
            body: JSON.stringify(dataDB),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(responce => response.json());

    }
} 
