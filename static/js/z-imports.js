function addInstructor() {
    let instructors = localStorage.getItem("instructorList");

    let elements = document.getElementById("importInstructorId").elements;
    let jsonString = "";
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        let name = item.name;

        if (name != undefined && name != "add" && name != "submit") {
            jsonString = jsonString.concat('"' + item.name + '": "' + item.value + '"');
            jsonString = jsonString.concat(name != "cellphoneNo2" ? "," : "");
        }
    }

    let obj;
    if (instructors == undefined || instructors == null) {
        obj = JSON.parse('{"instructors": [{' + jsonString + '}]}');
    } else {
        obj = JSON.parse(instructors);
        let t = JSON.parse('{' + jsonString + '}');
        obj['instructors'].push(t);
    }

    let jsonStr = JSON.stringify(obj, null, 4);
    localStorage.setItem('instructorList', jsonStr);

    //different part for showing inside somewhere

    document.getElementById("dataInstructorID").setAttribute("href", "data:application/json," + JSON.stringify(obj));
    showLatestJson();

}





//FOR CLASSES
function viewRegIns() {
    let ins = JSON.parse(localStorage.getItem("instructorList"));
    if(!ins){
        alert("Create a Instructor First!");
    }
    let length = Object.keys(ins.instructors).length;
    let select = document.getElementById("RegIns");
    for (let i = 0; i < length; i++) {
        let option = document.createElement("option");
        option.text = ins.instructors[i].name;
        select.add(option,select[i]);
    }
}

function addSched() {
    let classes = localStorage.getItem("schedList");

    let elements = document.getElementById("importSched").elements;
    let jsonString = "";
    let e = document.getElementById("Day");
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        let name = item.name;


        if (name != undefined && name != "add" && name != "submit") {
            if (name == "Day")
                jsonString = jsonString.concat('"' + item.name + '": "' + e.options[e.selectedIndex].value + '"');
            else
            jsonString = jsonString.concat('"' + item.name + '": "' + item.value + '"');
            jsonString = jsonString.concat(name != "timeOut" ? "," : "");
        }
    }

    let obj;
    if (classes == undefined || classes == null) {
        obj = JSON.parse('{"classes": [{' + jsonString + '}]}');
    } else {
        obj = JSON.parse(classes);
        let t = JSON.parse('{' + jsonString + '}');
        obj['classes'].push(t);
    }
    showSchedJson();
    let jsonStr = JSON.stringify(obj, null, 4);
    localStorage.setItem('schedList', jsonStr);

    //different part for showing inside somewhere

    document.getElementById("dataCLasses").setAttribute("href", "data:application/json," + JSON.stringify(obj));


}

function showSchedJson() {
    let classes = localStorage.getItem("schedList");

    document.getElementById("printClassJson").innerHTML = '';

    if (classes == undefined || classes == null) {
        alert("You haven't yet entered any json content");
    } else {
        let stringClassesJson = JSON.stringify(JSON.parse(classes), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringClassesJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);
        document.getElementById("printClassJson").appendChild(preElement);
    }


}

function removeSchedLocalStorage() {
    let r = confirm("This will remove all Classes Created, Are you sure about this ?");
    if (r == true) {
        let classes = localStorage.getItem("schedList");
        let stringInstructorJson = JSON.stringify(JSON.parse(classes), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);

        let pElement = document.createElement("p");
        let h1Element = document.createElement("h3");
        let textInfo = document.createTextNode("Here is the deleted json :");
        h1Element.appendChild(textInfo);
        pElement.appendChild(h1Element);
        document.getElementById("printClassJson").appendChild(pElement);

        let pElement2= document.createElement("p");
        pElement2.appendChild(preElement);
        document.getElementById("printClassJson").appendChild(pElement2);

        localStorage.removeItem("schedList");
    }
}
//CLASSSES MON

function removeLocalStorage() {
    let r = confirm("This will remove all of your instructors, Are you sure about this ?");
    if (r == true) {
        let instructors = localStorage.getItem("instructorList");
        var stringInstructorJson = JSON.stringify(JSON.parse(instructors), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);

        let pElement = document.createElement("p");
        let h1Element = document.createElement("h3");
        let textInfo = document.createTextNode("Here is the deleted json :");
        h1Element.appendChild(textInfo);
        pElement.appendChild(h1Element);
        document.getElementById("printJson").appendChild(pElement);

        let pElement2= document.createElement("p")
        pElement2.appendChild(preElement);
        document.getElementById("printJson").appendChild(pElement2);

        localStorage.removeItem("instructorList");
    }
}

function showLatestJson() {
    let instructors = localStorage.getItem("instructorList");

    document.getElementById("printJson").innerHTML = '';

    if (instructors == undefined || instructors == null) {
        alert("You haven't yet entered any json content");
    } else {
        var stringInstructorJson = JSON.stringify(JSON.parse(instructors), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);
        document.getElementById("printJson").appendChild(preElement);
    }


}