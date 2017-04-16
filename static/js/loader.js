function importClassesFromFile() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allClasses = e.target.result;
            performImportClasses(allClasses);

        };

        reader.readAsBinaryString(file.files[0]);
    }
}

function importClassesFromURL() {
    // read text from URL location
    let request = new XMLHttpRequest();
    let urlStr = document.getElementById("urlId").value;
    request.open('GET', urlStr, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let allClasses = request.responseText;
                performImportClasses(allClasses);
            }
        }
    }
}

function performImportClasses(allClasses){
    let jsonData = JSON.parse(allClasses);
    localStorage.setItem('allClassesJson', allClasses);
    let element = document.getElementById("importClassId");
    element.setAttribute("style", "color:green;")
    element.innerText = "successfully imported !";
}

function importInstructorsFromFile() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allInstructors = e.target.result;
            performImportInstructors(allInstructors);

        };

        reader.readAsBinaryString(file.files[0]);
    }
}

function importInstructorsFromURL() {
    // read text from URL location
    let request = new XMLHttpRequest();
    let urlStr = document.getElementById("urlId").value;
    request.open('GET', urlStr, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let allInstructors = request.responseText;
                performImportInstructors(allInstructors);
            }
        }
    }
}

function performImportInstructors(allInstructors){
    let jsonData = JSON.parse(allInstructors);
    localStorage.setItem('allInstructorsJson', allInstructors);
    let element = document.getElementById("importInstructorId")
    element.setAttribute("style", "color:green;")
    element.innerText = "successfully imported !";
}

function importSchedulesFromFile() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allSchedules = e.target.result;
            performImportSchedules(allSchedules);
        };

        reader.readAsBinaryString(file.files[0]);
    }
}

function importSchedulesFromURL() {
    // read text from URL location
    let request = new XMLHttpRequest();
    let urlStr = document.getElementById("urlId").value;
    request.open('GET', urlStr, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let allSchedules = request.responseText;
                performImportSchedules(allSchedules);
            }
        }
    }
}

function performImportSchedules(allSchedules){
    let jsonData = JSON.parse(allSchedules);
    localStorage.setItem('allSchedulesJson', allSchedules);
    let element = document.getElementById("importScheduleId");
    element.setAttribute("style", "color:green;")
    element.innerText = "successfully imported !";

}

