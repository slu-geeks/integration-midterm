/**
 * Created by mehdi on 3/21/17.
 */

function renderContent() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allClasses = e.target.result;
            localStorage.setItem('ourJsonObject', allClasses);

            let jsonData = JSON.parse(allClasses);
            let nodeP = document.createElement("P");

            for(let index in jsonData.classes){
                let eachClass = jsonData.classes[index];

                let classUL = document.createElement("UL");
                classUL.setAttribute("class", "schoolClassUL");

                liAppender(eachClass.roomNo, classUL);
                liAppender(eachClass.codeNo, classUL);
                liAppender(eachClass.instructor, classUL);
                liAppender(eachClass.subject, classUL);
                liAppender(eachClass.locX, classUL);
                liAppender(eachClass.locY, classUL);
                liAppender(eachClass.classTime, classUL);
                liAppender(eachClass.day, classUL);

                checkBoxAppender(index, classUL);

                nodeP.appendChild(classUL);
                document.getElementById("currentClassesID").appendChild(nodeP);
            }

            updateChangesAppender("save changes", "saveTheChanges()", nodeP);

        };

        reader.readAsBinaryString(file.files[0]);
    }

    function liAppender(data, parent){
        let liElement = document.createElement("LI")
        let textElement = document.createTextNode(data);
        liElement.appendChild(textElement);
        parent.appendChild(liElement)
    }

    function checkBoxAppender(index, parent){
        let checkbox1 = document.createElement('input');
        checkbox1.id = "chkBox1-" + index;
        checkbox1.type = "checkbox"; /*checkbox.name = "name"; checkbox.value = "value";*/

        let checkbox2 = document.createElement('input');
        checkbox2.id = "chkBox1-" + index;
        checkbox2.type = "checkbox";

        parent.appendChild(checkbox1);
        parent.appendChild(checkbox2);
    }

    function updateChangesAppender(name, callingMethodName, parent){
        let submitButton = document.createElement("input");
        submitButton.setAttribute("type", "button");
        submitButton.setAttribute("onclick", callingMethodName);
        submitButton.setAttribute("value", name);
        parent.appendChild(submitButton);
    }


}

function saveTheChanges() {
    var jsonFile = document.getElementById("hiddenJson").innerText;
    localStorage.setItem('ourJsonObject', jsonFile);

    var sss = localStorage.getItem('ourJsonObject');

    var uls = document.getElementsByClassName("jsonElement");

    for (var i = 0; i < uls.length; i++) {
        var chkBox1 = document.getElementById("chkBox1-" + i);
        var chkBox2 = document.getElementById("chkBox2-" + i);


        if (chkBox1.checked) {
            alert("checkbox1 in" + (i + 1) + "row is checked");
        } else {
            // alert("checkbox1 in" + i + "row is not checked");
        }

        if (chkBox2.checked) {
            alert("checkbox2 in" + (i + 1) + "row is checked");
        } else {
            // alert("checkbox2 in" + i + "row is not checked");
        }
    }

}



function changeCoordinatorColor(e) {

    let isTeacherAvailable = confirm("is this room full ????");

    if (isTeacherAvailable) {

        let element = e.target;
        let coordinate = element.getAttribute("coords");

        alert(coordinate);
        let pos = coordinate.split(',');

        let left = pos[0];
        let top = pos[1];
        let width = pos[2];
        let height = pos[3];


        // document.getElementById("floor1Id").setAttribute("style", "position:absolute;top:"+ top+"px;left:"+ left+ "px;width:"+ width+ "px;height:"+ height+"px; background:#f00;");

        element.setAttribute("style", "position:absolute;top:" + top + 73 + "px;left:" + left + "px;width:" + width + "px;height:" + height + "px; background:#f00;");
    }

}


function availability() {

    //check if the local storage data for availability is refreshed for the current day


    
}