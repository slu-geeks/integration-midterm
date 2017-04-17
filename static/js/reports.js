/**
 * Created by mehdi on 4/17/17.
 */

/**
 * Created by mehdi on 4/14/17.
 */
function showAllReports() {

    document.getElementById("contentAttendance").innerHTML = "";
    let givenDate = document.getElementById("dateTimeId").value;
    let parsedDateArray = givenDate.split("-");
    if (parsedDateArray.length != 3) {
        alert("you must send your date in write format!");
        return;
    }
    let dateAttendance = getDateAttendance(parsedDateArray[0], parsedDateArray[1], parsedDateArray[2]);

    if(dateAttendance == null){
        alert("there is no registered attendance for " + givenDate);
        return;
    }
    dateAttendance = sortAttendanceList(dateAttendance);
    let fullJson = createFullJson(dateAttendance);

    let dataClass = document.getElementById("dataClassId");
    dataClass.innerHTML = "";
    let anchorElement = document.createElement("a");
    anchorElement.alt = "download";
    anchorElement.href = "data:text/plainText," + JSON.stringify(fullJson, null, 4);
    anchorElement.setAttribute("download", true);
    anchorElement.appendChild(document.createTextNode("DOWNLOAD"));
    dataClass.appendChild(anchorElement);

    fillContent(fullJson);
}

function getTime(strTime) {
    if (!strTime.includes(":")) {
        strTime = strTime + ":00:00";
    } else {
        strTime += ":00"
    }

    return strTime;
}

function fillContent(attendanceFullJson) {
    let allAttendances = new Array();
    let providedElement = document.getElementById("eachBlockScheduleId");

    for (let index in attendanceFullJson.attendances) {
        let eachAttendance = attendanceFullJson.attendances[index];
        let contentElement = providedElement.cloneNode(true);
        contentElement.removeAttribute("hidden");

        let eachSchedule = eachAttendance.schedule;
        let eachInstructor = eachAttendance.schedule.instructor;
        let eachClass = eachAttendance.schedule.class;

        let thumbnailElement = contentElement.getElementsByClassName("thumbnailClass")[0];
        thumbnailElement.src = eachInstructor.picture_url;
        thumbnailElement.alt = eachInstructor.instructor_name;


        let infoClassElement = contentElement.getElementsByClassName("infoClass")[0];
        infoClassElement.appendChild(document.createTextNode(eachClass.room_no + " Under " + eachInstructor.instructor_name));

        let classCodeNumberElement = contentElement.getElementsByClassName("classCodeNumberClass")[0];
        classCodeNumberElement.appendChild(document.createTextNode(eachSchedule.PK_schedule_code));

        let instructorElement = contentElement.getElementsByClassName("instructorNameClass")[0];
        instructorElement.appendChild(document.createTextNode(eachInstructor.instructor_name));

        let subjectElement = contentElement.getElementsByClassName("subjectNameClass")[0];
        subjectElement.appendChild(document.createTextNode(eachSchedule.schedule_subject));

        let dateElement = contentElement.getElementsByClassName("dateNameClass")[0];
        let attendanceDate = new Date(eachAttendance.attendance_date);
        dateElement.appendChild(document.createTextNode(attendanceDate));

        let timeElement = contentElement.getElementsByClassName("timeClass")[0];
        // attendanceDate.getHours() + ":" + attendanceDate.getMinutes()
        timeElement.appendChild(document.createTextNode(eachSchedule.schedule_time_from + " to " + eachSchedule.schedule_time_to));
        allAttendances.push(contentElement);
        

        contentElement.setAttribute("id", eachAttendance.PK_attendance_id);

        let attendanceState = contentElement.getElementsByClassName("attendanceStateClass")[0];

        attendanceState.appendChild(document.createTextNode(eachAttendance.attendance_state));

    }

    for (let index in allAttendances) {
        document.getElementById("contentAttendance").appendChild(allAttendances[index]);
    }

}


function getDateAttendance(year, month, day) {
    let dailyScheduleName = year + "-" + (parseInt(month)-1) + "-" + day;
    let dayAttendanceJsonStr = localStorage.getItem(dailyScheduleName);

    if (dayAttendanceJsonStr != null && dayAttendanceJsonStr != undefined) {
        return JSON.parse(dayAttendanceJsonStr);
    }

    return null;
}

function sortAttendanceList(attendanceList) {
    //implement later
    return attendanceList;
}

function createFullJson(attendanceJsonObjectList) {
    let attendanceFullList = JSON.parse('{"attendances" : []}');

    for (let index in attendanceJsonObjectList.attendances) {
        let eachAttendance = attendanceJsonObjectList.attendances[index];
        let scheduleCode = eachAttendance.FK_schedule_id;
        let eachFullAttendanceObject = findSchedulesTree(eachAttendance, scheduleCode);
        attendanceFullList['attendances'].push(eachFullAttendanceObject);
    }


    //alert(JSON.stringify(attendanceFullList, null, 4));
    return attendanceFullList;

    function findSchedulesTree(eachAttendanceData, scheduleCode) {
        let scheduleObj = JSON.parse('{"schedule": {"instructor": {}, "class" : {}}}');
        let strAllSchedules = localStorage.getItem('allSchedulesJson');
        let objectAllSchedules = JSON.parse(strAllSchedules);
        for (let index in objectAllSchedules.schedules) {
            let eachSchedule = objectAllSchedules.schedules[index];
            let pkScheduleCode = eachSchedule.PK_schedule_code;
            if (scheduleCode == pkScheduleCode) {
                let instructorId = eachSchedule.FK_instructor_id;
                let classId = eachSchedule.FK_class_id;

                let instructorJsonObject = findInstructor(instructorId);
                let classJsonObject = findClass(classId);

                //constructing full.json
                scheduleObj['schedule'] = eachSchedule;
                scheduleObj['schedule']['instructor'] = instructorJsonObject;
                scheduleObj['schedule']['class'] = classJsonObject;

                let eachAttendance = JSON.parse('{"schedule" : {}}');
                eachAttendance = eachAttendanceData;
                eachAttendance['schedule'] = scheduleObj.schedule;

                return eachAttendance;
            }
        }
    }

    function findInstructor(instructorId) {
        let allInstructors = localStorage.getItem('allInstructorsJson');
        let objectAllInstructors = JSON.parse(allInstructors);
        for (let index in objectAllInstructors.instructors) {
            let eachInstructor = objectAllInstructors.instructors[index];
            let insId = eachInstructor.PK_instructor_idNo;

            if (insId == instructorId) {
                return eachInstructor;
            }
        }

        alert("An instructor with id: [" + instructorId + "] is not inside your json file");

    }

    function findClass(classId) {
        let allClasses = localStorage.getItem('allClassesJson');
        let objectAllClasses = JSON.parse(allClasses);
        for (let index in objectAllClasses.classes) {
            let eachClass = objectAllClasses.classes[index];
            let clazzId = eachClass.PK_class_id;
            if (classId == clazzId) {
                return eachClass;
            }
        }
        alert("A class with id: [" + classId + "] is not inside your json file");
    }
}