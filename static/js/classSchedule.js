/**
 * Created by mehdi on 4/17/17.
 */
//let contentElement = providedElement.cloneNode(true);
function getClassSchedule() {

    document.getElementById("contentInformationId").innerHTML = "";

    let classCodeNumber = document.getElementById("classCodeId").value;

    let allScheduleJsonStr = localStorage.getItem("allSchedulesJson");
    let allScheduleJsonObject = JSON.parse(allScheduleJsonStr);
    let allSelectedSchedules = JSON.parse('{"schedules" : []}');
    for (let index in allScheduleJsonObject.schedules) {
        let eachSchedule = allScheduleJsonObject.schedules[index];
        if (eachSchedule.class_code == classCodeNumber) {
            allSelectedSchedules['schedules'].push(eachSchedule);
        }
    }

    allSelectedSchedules['schedules'].sort(sortByTime);
    let mainDoc = document.getElementById("classScheduleId")
    let contentElement = mainDoc.cloneNode(true);
    let instructorId = allSelectedSchedules.schedules[0].FK_instructor_id;

    for (let index in allSelectedSchedules.schedules) {
        let eachSelectedSchedule = allSelectedSchedules.schedules[index];

        let scheduleDay = eachSelectedSchedule.schedule_day;
        scheduleDay = capitalizeFirstLetter(scheduleDay.toLowerCase());

        let tdElement = contentElement.getElementsByClassName("td" + scheduleDay + "Id")[0];

        let associatedClass = getClassById(eachSelectedSchedule.FK_class_id);

        let elementContent = tdElement.innerHTML;
        if (elementContent == "") {
            tdElement.innerText += associatedClass.room_no + ":[" + eachSelectedSchedule.schedule_time_from + " - " + eachSelectedSchedule.schedule_time_to + "]";
        } else {
            tdElement.innerText += " - " + associatedClass.room_no + ":[" + eachSelectedSchedule.schedule_time_from + " - " + eachSelectedSchedule.schedule_time_to + "]";
        }
    }
    setInstructorInfo(contentElement, instructorId);
    contentElement.removeAttribute("hidden");
    document.getElementById("contentInformationId").appendChild(contentElement);
}


function sortByTime(scheduleA, scheduleB) {
    var dayList = {
        "Monday": "1",
        "Tuesday": "2",
        "Wednesday": "3",
        "Thursday": "4",
        "Friday": "5",
        "Saturday": "6",
        "Sunday": "7"
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

function setInstructorInfo(parentElement,instructorId) {
    let allInstructorJsonStr = localStorage.getItem('allInstructorsJson');
    let allInstructorJsonObject = JSON.parse(allInstructorJsonStr);
    for (let index in allInstructorJsonObject.instructors) {
        let eachInstructor = allInstructorJsonObject.instructors[index];
        let instructorIdObj = eachInstructor.PK_instructor_idNo;
        if (instructorId == instructorIdObj) {
            let instructorName = eachInstructor.instructor_name;
            let pElementName = document.createElement("p");
            pElementName.appendChild(document.createTextNode(instructorName));
            parentElement.getElementsByClassName("instructorNameId")[0].appendChild(pElementName);

            let instructorPicture = eachInstructor.picture_url;
            // let instructorTitle = eachInstructor.instructor_title;
            // let educationalLevel = eachInstructor.educational_level;
            // let instructorBirthday = eachInstructor.instructor_birthday;
            let instructorEmail = eachInstructor.instructor_email;
            let instructorPhoneNum = eachInstructor.instructor_phoneNum;

            let pElementPhone = document.createElement("p");
            pElementPhone.appendChild(document.createTextNode("Phone: " + instructorPhoneNum));

            let pElementEmail = document.createElement("p");
            pElementEmail.appendChild(document.createTextNode("Email: " + instructorEmail));

            parentElement.getElementsByClassName("instructorBioId")[0].appendChild(pElementPhone);
            parentElement.getElementsByClassName("instructorBioId")[0].appendChild(pElementEmail);

            let thumbnailElement = parentElement.getElementsByClassName("thumbnailClass")[0];
            thumbnailElement.src = instructorPicture;
            thumbnailElement.alt = instructorName;

            return;
        }
    }
}
