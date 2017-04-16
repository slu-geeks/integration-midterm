/**
 * Created by mehdi on 4/16/17.
 */

function getFacultySchedule() {

    let instructorId = document.getElementById("selectInstructorID").value;

    let allScheduleJsonStr = localStorage.getItem("allSchedulesJson");
    let allScheduleJsonObject = JSON.parse(allScheduleJsonStr);
    let allInstructorSchedules = JSON.parse('{"schedules" : []}');
    for (let index in allScheduleJsonObject.schedules) {
        let eachSchedule = allScheduleJsonObject.schedules[index];
        if (eachSchedule.FK_instructor_id == instructorId) {
            allInstructorSchedules['schedules'].push(eachSchedule);
        }
    }

    allInstructorSchedules['schedules'].sort(sortByTime);

    for (let index in allInstructorSchedules.schedules) {
        let eachInstructorSchedule = allScheduleJsonObject.schedules[index];

        let scheduleDay = eachInstructorSchedule.schedule_day;
        scheduleDay = capitalizeFirstLetter(scheduleDay.toLowerCase());

        let tdElement = document.getElementById("td" + scheduleDay + "Id");

        let associatedClass = getClassById(eachInstructorSchedule.FK_class_id);

        let elementContent = tdElement.innerHTML;
        if (elementContent == "") {
            tdElement.innerText += associatedClass.room_no + ":[" + eachInstructorSchedule.schedule_time_from + " - " + eachInstructorSchedule.schedule_time_to+ "]";
        } else {
            tdElement.innerText += " - "+associatedClass.room_no + ":[" + eachInstructorSchedule.schedule_time_from + " - " + eachInstructorSchedule.schedule_time_to+ "]";
        }
    }

    document.getElementById("instructorScheduleId").removeAttribute("hidden");
}


function sortByTime(scheduleA, scheduleB) {
    var dayList = {
        "Monday": "1",
        "Tuesday": "2",
        "Wednesday": "3",
        "Thursday": "4",
        "Friday": "5",
        "Saturday": "6",
        "Sunday" : "7"
    };

    let scheduleADayTime = dayList[scheduleA.schedule_day] + scheduleA.schedule_time_from + "";
    let scheduleBDayTime = dayList[scheduleB.schedule_day] + scheduleB.schedule_time_from + "";
    let scheduleANumber = parseInt(scheduleADayTime);
    let scheduleBNumber = parseInt(scheduleBDayTime);


    return scheduleANumber > scheduleBNumber;
}

function getClassById(classId) {
    let allClassesJsonStr = localStorage.getItem('allClassesJson');
    let allClassesJsonObject = JSON.parse(allClassesJsonStr);
    for (let index in allClassesJsonObject.classes) {
        let eachClass = allClassesJsonObject.classes[index];
        if (eachClass.PK_class_id == classId) {
            return eachClass;
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setInstructorList() {

    let allInstructorJsonStr = localStorage.getItem('allInstructorsJson');
    let allInstructorJsonObject = JSON.parse(allInstructorJsonStr);

    let selectElement = document.getElementById("selectInstructorID");
    for (let index in allInstructorJsonObject.instructors) {
        let eachInstructor = allInstructorJsonObject.instructors[index];

        let instructorId = eachInstructor.PK_instructor_idNo;
        let instructorName = eachInstructor.instructor_name;
        let instructorPicture = eachInstructor.picture_url;
        let instructorTitle = eachInstructor.instructor_title;
        let educationalLevel = eachInstructor.educational_level;
        let instructorBirthday = eachInstructor.instructor_birthday;
        let instructorEmail = eachInstructor.instructor_email;
        let instructorPhoneNum = eachInstructor.instructor_phoneNum;
        let option = document.createElement("option");
        option.text = instructorName;
        option.value = instructorId;
        selectElement.add(option);
    }
}
