/**
 * Created by Arvince Neil on 27/03/2017.
 */


function searchText(){
    let savedInfoLocalStorage = localStorage.getItem('ourJsonObject');

    if(!savedInfoLocalStorage){
        alert("you have to provide the json file first ~");
        return;
    }


    let textVariable = document.getElementById("searchInput").value;
    let classesJson = JSON.parse(savedInfoLocalStorage);

    let codeNomArray  = new Array();

    for(let index in classesJson.classes){
        let eachClass = classesJson.classes[index]
        let codeNo = eachClass.codeNo;
        codeNomArray.push(codeNo);
    }


    let returnNumber = searchStringInArray(textVariable, codeNomArray);

    console.log(returnNumber);


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