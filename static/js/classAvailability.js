/**
 * Created by mehdi on 4/17/17.
 */

function classAvail() {

    var wholeClasses = localStorage.getItem("allDepartmentClassesJson");
    document.getElementById("classesId").innerHTML = "";
    if (wholeClasses == null || wholeClasses == undefined) {


        let formElement = document.getElementById("formElementImportClasses");
        let clonedForm = formElement.cloneNode(true);
        clonedForm.setAttribute("id", "formElementImportClasses1");
        clonedForm.removeAttribute("hidden");

        let classIdForm = document.getElementById("classesId");
        classIdForm.innerHTML = "";

        classIdForm.appendChild(clonedForm);
        return;
    }

    showAllAvailableClasses();

}

function importClassesFromFile() {
    let file = document.getElementsByClassName('importFileClass')[0];

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allClazzes = e.target.result;
            let jsonData = JSON.parse(allClazzes);
            localStorage.setItem('allDepartmentClassesJson', allClazzes);
            showAllAvailableClasses();
        };

        reader.readAsBinaryString(file.files[0]);
    }
}


function showAllAvailableClasses() {

    //document.getElementById("contentAttendance").innerHTML = "";

    let dailyAttendanceFullList = createDailyAttendance();
    dailyAttendanceFullList = sortAttendanceList(dailyAttendanceFullList);
    let fullJson = createFullJson(dailyAttendanceFullList);

    if (document.getElementById("checkBoxId").checked) {
        fillContent(fullJson, 0);
    } else {
        let currentHour = new Date().getHours();
        fillContent(fullJson, currentHour);
    }
}


function createDailyAttendance() {
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDate();
    let weekDay = newDate.getDay();


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

        if (scheduleDay == weekDay) {
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

function fillContent(attendanceFullJson, timeFrom) {
    let allAttendances = new Array();
    let providedElement = document.getElementById("eachBlockScheduleId");
    let allClasses = localStorage.getItem('allDepartmentClassesJson');
    let allClassesObject = JSON.parse(allClasses);


    let timeDayStart = 7;
    let timeDayEnd = 20;

    for (let outerIndex in allClassesObject.department_classes) {
        let eachAvailableClass = allClassesObject.department_classes[outerIndex];
        let dummy = 0;

        for (let index in attendanceFullJson.attendances) {
            dummy = 0;
            for (let i = timeDayStart; i <= timeDayEnd; i++) {
                let eachAttendance = attendanceFullJson.attendances[index];
                if (i != eachAttendance.schedule.schedule_time_from) {
                    if (dummy == (timeDayEnd - timeDayStart - 1)) {
                        let pElement1 = document.createElement("p");
                        pElement1.appendChild(document.createTextNode(eachAvailableClass.room_no + " - FROM " + eachAttendance.schedule.schedule_time_from + " TO " + eachAttendance.schedule.schedule_time_to));
                        document.getElementById("classesId").appendChild(pElement1);
                    }
                    dummy++;
                }
            }
        }
    }


    for (let index in allAttendances) {
        document.getElementById("contentAttendance").appendChild(allAttendances[index]);
    }

}