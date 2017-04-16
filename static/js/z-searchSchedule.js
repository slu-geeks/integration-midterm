/**
 * Created by Arvince Neil on 05/04/2017.
 */
function getContent() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allSchedule = e.target.result;
            localStorage.setItem('schedJSON', allSchedule);

            let jsonData = JSON.parse(allSchedule);
            let nodeP = document.createElement("P");
            alert(allSchedule);

            for(let index in jsonData.schedule){
                let eachSchedule = jsonData.schedule[index];

                let classUL = document.createElement("UL");
                classUL.setAttribute("class", "schoolClassUL");

                liAppender(eachSchedule.days, classUL);
                liAppender(eachSchedule.times, classUL);
                liAppender(eachSchedule.classes, classUL);

                nodeP.appendChild(classUL);
                document.getElementById("currentClassesID").appendChild(nodeP);

            }

        };

        reader.readAsBinaryString(file.files[0]);
    }
}

function liAppender(data, parent){
    let liElement = document.createElement("LI")
    let textElement = document.createTextNode(data);
    liElement.appendChild(textElement);
    parent.appendChild(liElement)
}

function searchSchedule(){

    let savedInfoLocalStorage = localStorage.getItem('schedJSON');

    if(!savedInfoLocalStorage){
        alert("you have to provide the json file first ~");
        return;
    }

    let textVariable = document.getElementById("searchInput").value;
    let scheduleJson = JSON.parse(savedInfoLocalStorage);

    let codeNomArray  = new Array();

    for(let index in scheduleJson.schedule){
        let eachSched = scheduleJson.schedule[index]
        let codeNo = eachSched.days;
        codeNomArray.push(codeNo);
    }


    let returnSchedule = searchStringInArray(textVariable, codeNomArray);

    console.log(returnSchedule);

}

function searchStringInArray (str, strArray) {
    let findedItems = new Array();
    console.log(str);

    for(let index in strArray){
        let element = strArray[index];
        if(str != "" && str != undefined && element.includes(str)){
            findedItems.push(element);
        }
    }

    return findedItems;
}

