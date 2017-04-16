/**
 * Created by mehdi on 4/14/17.
 */
function showAllAttendance() {

    document.getElementById("contentAttendance").innerHTML = "";

    var dailyAttendanceFullList = createDailyAttendance();
    dailyAttendanceFullList = sortAttendanceList(dailyAttendanceFullList);
    var fullJson = createFullJson(dailyAttendanceFullList);

    if (document.getElementById("checkBoxId").checked) {
        fillContent(fullJson);
    } else {
        /**
         * When the checker open the app, based on his/her current time
         * the classes going on in that period will be sub list by the function below
         */
        let subDayAttendance = subAttendanceBasedOnCurrentTime(fullJson);
        fillContent(subDayAttendance);
    }
}

function subAttendanceBasedOnCurrentTime(attendanceFullJson) {

    let currentDate = new Date();
    let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();


    let subListAttendance = JSON.parse('{"attendances": []}');

    for (let index in attendanceFullJson.attendances) {
        let eachAttendance = attendanceFullJson.attendances[index];
        let eachSchedule = eachAttendance.schedule;

        let startTime = getTime(eachSchedule.schedule_time_from);
        let endTime = getTime(eachSchedule.schedule_time_to);

        if (currentTime > startTime && currentTime < endTime) {
            subListAttendance['attendances'].push(eachAttendance);
        }
    }

    return subListAttendance;
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


        let submitElement = contentElement.getElementsByClassName("submitAttendanceClass")[0];
        submitElement.dataset.attendanceId = eachAttendance.PK_attendance_id;

        contentElement.setAttribute("id", eachAttendance.PK_attendance_id);

    }

    for (let index in allAttendances) {
        document.getElementById("contentAttendance").appendChild(allAttendances[index]);
    }

}


function submitAttendance(attendance) {

    let newDate = new Date();
    let dailyScheduleName = newDate.getYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();

    let attendanceId = attendance.getAttribute("data-attendance-id");

    let dayAttendanceJsonStr = localStorage.getItem(dailyScheduleName);
    let dayAttendanceJsonObject = JSON.parse(dayAttendanceJsonStr);

    for (let index in dayAttendanceJsonObject.attendances) {
        let eachAttendance = dayAttendanceJsonObject.attendances[index];
        let eachAttendanceIdNo = eachAttendance.PK_attendance_id;

        if (attendanceId == eachAttendanceIdNo) {
            let mainSelection = document.getElementById(attendanceId);
            let selectElement = mainSelection.getElementsByClassName("selectFormClass")[0];
            let text = selectElement.options[selectElement.selectedIndex].text;

            eachAttendance.attendance_state = text;
            alert("you successfully change the state to: " + text);
            let strJson = JSON.stringify(dayAttendanceJsonObject, null, 4);
            localStorage.setItem(dailyScheduleName, strJson);
            return;
        }
    }
}


function createDailyAttendance() {
    let newDate = new Date();
    let year = newDate.getYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();

    let dailyScheduleName = year + "-" + month + "-" + day;


    let dayAttendanceJsonStr = localStorage.getItem(dailyScheduleName);

    if (dayAttendanceJsonStr != null && dayAttendanceJsonStr != undefined) {
        return JSON.parse(dayAttendanceJsonStr);
    }

    //create daily attendance on the fly since it's not yet existing
    let allSchedulesStr = localStorage.getItem("allSchedulesJson");
    let allSchedulesObject = JSON.parse(allSchedulesStr);


    let dayAttendanceJsonObject = JSON.parse('{"attendances": []}');

    for (let index in allSchedulesObject.schedules) {
        let eachSchedule = allSchedulesObject.schedules[index];
        let scheduleDay = getDayNumber(eachSchedule.schedule_day);

        if (scheduleDay == day) {
            let jsonString = "";
            jsonString = jsonString.concat('{"PK_attendance_id": "' + newDate + '---' + index + '",');
            jsonString = jsonString.concat('"attendance_date": "' + newDate + '",');
            jsonString = jsonString.concat('"attendance_state": "NOT_CHECKED",');
            jsonString = jsonString.concat('"FK_schedule_id": "' + eachSchedule.PK_schedule_code + '"}');
            dayAttendanceJsonObject['attendances'].push(JSON.parse(jsonString));
        }
    }

    let dailyAttendanceStrList = JSON.stringify(dayAttendanceJsonObject, null, 4);
    localStorage.setItem(dailyScheduleName, dailyAttendanceStrList);

    /*

     json from and to object
     var dateStr = JSON.parse(json);
     console.log(dateStr); // 2014-01-01T23:28:56.782Z

     var date = new Date(dateStr);
     console.log(date);  // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)
     */

    return dayAttendanceJsonObject;


    function getDayNumber(day) {
        let dayLowerCase = day.toLowerCase();
        let dayNumber = -1;
        switch (dayLowerCase) {
            case "sunday":
                dayNumber = 0;
                break;
            case "monday":
                dayNumber = 1;
                break;
            case "tuesday":
                dayNumber = 2;
                break;
            case "wednesday":
                dayNumber = 3;
                break;
            case "thursday":
                dayNumber = 4;
                break;
            case "friday":
                dayNumber = 5;
                break;
            case "saturday":
                dayNumber = 6;
                break;
            default:
                alert("Error: " + dayLowerCase + " is not a correct day in your schedule json file");
        }
        return dayNumber;
    }
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


    alert(JSON.stringify(attendanceFullList, null, 4));
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