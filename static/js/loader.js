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
    var request = new XMLHttpRequest();
    var urlStr = document.getElementById("urlId").value;
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

    localStorage.setItem('allClassesJson', allClasses);

    let jsonData = JSON.parse(allClasses);
    let nodeP = document.createElement("P");

    for (let index in jsonData.classes) {
        let eachClass = jsonData.classes[index];

        let classUL = document.createElement("UL");
        classUL.setAttribute("class", "schoolClassUL");

        liAppender(eachClass.PK_class_id, classUL);
        liAppender(eachClass.room_no, classUL);
        liAppender(eachClass.instructor_id, classUL);
        liAppender(eachClass.loc_X, classUL);
        liAppender(eachClass.loc_Y, classUL);

        nodeP.appendChild(classUL);
        document.getElementById("currentClassesID").appendChild(nodeP);
    }

    updateChangesAppender("save changes", "saveTheChanges()", nodeP);
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
    var request = new XMLHttpRequest();
    var urlStr = document.getElementById("urlId").value;
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
    localStorage.setItem('allInstructorsJson', allInstructors);

    let jsonData = JSON.parse(allInstructors);
    let nodeP = document.createElement("P");

    for (let index in jsonData.instructors) {
        let eachInstructor = jsonData.instructors[index];

        let instructorUL = document.createElement("UL");
        instructorUL.setAttribute("instructor", "schoolInstructorUL");

        liAppender(eachInstructor.PK_instructor_idNo, instructorUL);
        liAppender(eachInstructor.instructor_name, instructorUL);
        liAppender(eachInstructor.picture_url, instructorUL);
        liAppender(eachInstructor.instructor_title, instructorUL);
        liAppender(eachInstructor.educational_level, instructorUL);
        liAppender(eachInstructor.instructor_birthday, instructorUL);
        liAppender(eachInstructor.instructor_email, instructorUL);
        liAppender(eachInstructor.instructor_phoneNom, instructorUL);

        nodeP.appendChild(instructorUL);
        document.getElementById("currentInstructorsID").appendChild(nodeP);
    }

    updateChangesAppender("save changes", "saveTheChanges()", nodeP);
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
    var request = new XMLHttpRequest();
    var urlStr = document.getElementById("urlId").value;
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
    localStorage.setItem('allSchedulesJson', allSchedules);

    let jsonData = JSON.parse(allSchedules);
    let nodeP = document.createElement("P");

    for (let index in jsonData.schedules) {
        let eachSchedule = jsonData.schedules[index];

        let scheduleUL = document.createElement("UL");
        scheduleUL.setAttribute("schedule", "schoolScheduleUL");

        liAppender(eachSchedule.PK_schedule_code, scheduleUL);
        liAppender(eachSchedule.schedule_time_from, scheduleUL);
        liAppender(eachSchedule.schedule_time_to, scheduleUL);
        liAppender(eachSchedule.schedule_day, scheduleUL);
        liAppender(eachSchedule.schedule_subject, scheduleUL);
        liAppender(eachSchedule.FK_class_id, scheduleUL);
        liAppender(eachSchedule.FK_instructor_id, scheduleUL);

        nodeP.appendChild(scheduleUL);
        document.getElementById("currentScheduleID").appendChild(nodeP);
    }

    updateChangesAppender("save changes", "saveTheChanges()", nodeP);
}


function liAppender(data, parent) {
    let liElement = document.createElement("LI")
    let textElement = document.createTextNode(data);
    liElement.appendChild(textElement);
    parent.appendChild(liElement)
}

function updateChangesAppender(name, callingMethodName, parent) {
    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("onclick", callingMethodName);
    submitButton.setAttribute("value", name);
    parent.appendChild(submitButton);
}


