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

function search() {
    var file = document.getElementById('importFile');

    if (file.files.length) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var jsonRow = e.target.result;
            var jsonData = JSON.parse(jsonRow);
            var nodeP = document.createElement("P");

            var unOrderedList = document.createElement("UL");
            unOrderedList.setAttribute("class", "jsonElement");

            var roomNoLi = document.createElement("LI");
            var roomNoText = document.createTextNode("Room No.");
            roomNoLi.appendChild(roomNoText);

            var codeLi = document.createElement("LI");
            codeLi.appendChild(document.createTextNode("Code No."));

            var instructorLi = document.createElement("LI");
            instructorLi.appendChild(document.createTextNode("Instructor"));

            var subjectLi = document.createElement("LI");
            subjectLi.appendChild(document.createTextNode("Subject"));

            var timeLi = document.createElement("LI");
            timeLi.appendChild(document.createTextNode("Time"));

            var dayLi = document.createElement("LI");
            dayLi.appendChild(document.createTextNode("Day"));

            unOrderedList.appendChild(roomNoLi);
            unOrderedList.appendChild(codeLi);
            unOrderedList.appendChild(instructorLi);
            unOrderedList.appendChild(subjectLi);
            unOrderedList.appendChild(timeLi);
            unOrderedList.appendChild(dayLi);

            var chkbox1 = document.createElement("input");
            chkbox1.setAttribute("id", "chkBox1-");
            chkbox1.setAttribute("type", "checkbox");

            var chkbox2 = document.createElement("input");
            chkbox2.setAttribute("id", "chkBox2-");
            chkbox2.setAttribute("type", "checkbox");

            var chkbox3 = document.createElement("input");
            chkbox3.setAttribute("id", "chkBox3-");
            chkbox3.setAttribute("type", "checkbox");

            var chkbox4 = document.createElement("input");
            chkbox4.setAttribute("id", "chkBox4-");
            chkbox4.setAttribute("type", "checkbox");

            var chkbox5 = document.createElement("input");
            chkbox5.setAttribute("id", "chkBox5-");
            chkbox5.setAttribute("type", "checkbox");

            var chkbox6 = document.createElement("input");
            chkbox6.setAttribute("id", "chkBox6-");
            chkbox6.setAttribute("type", "checkbox");

            for (var i = 0; i < jsonData.classes.length; i++) {
                var clazz = jsonData.classes[i];



                if(clazz.roomNo == "s426"){
                    alert(jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
                }

                if(clazz.code == "9413"){
                    alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
                }

                if(clazz.instructor == "Sir Montes"){
                    alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
                }

                if(clazz.subject == "Tech Press"){
                    alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
                }

                if(clazz.time == "12"){
                    alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].day);
                }

                if(clazz.day == "Monday"){
                    alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time);
                }

                unOrderedList.appendChild(chkbox1);
                unOrderedList.appendChild(chkbox2);
                unOrderedList.appendChild(chkbox3);
                unOrderedList.appendChild(chkbox4);
                unOrderedList.appendChild(chkbox5);
                unOrderedList.appendChild(chkbox6);

                nodeP.appendChild(unOrderedList);
                document.getElementById("XYZ").appendChild(nodeP);
            }

            var submitButton = document.createElement("input");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("onclick", "startSearch()");
            submitButton.setAttribute("value", "start");

            document.getElementById("hiddenJson").innerText = jsonRow;
            nodeP.appendChild(submitButton);

        };

        reader.readAsBinaryString(file.files[0]);

    }

}

function startSearch() {
    var jsonFile = document.getElementById("hiddenJson").innerText;
    localStorage.setItem('ourJsonObject', jsonFile);

    var sss = localStorage.getItem('ourJsonObject');

    var uls = document.getElementsByClassName("jsonElement");

    for (var i = 0; i < uls.length; i++) {
        var chkBox1 = document.getElementById("chkBox1-" + i);
        var chkBox2 = document.getElementById("chkBox2-" + i);
        var chkBox3 = document.getElementById("chkBox3-" + i);
        var chkBox4 = document.getElementById("chkBox4-" + i);
        var chkBox5 = document.getElementById("chkBox5-" + i);
        var chkBox6 = document.getElementById("chkBox6-" + i);


        if (chkBox1.checked) {
            if(jiji.roomNo == "s426"){
                alert(jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
            }
        } else {

        }

        if (chkBox2.checked) {
            if(jiji.code == "9413"){
                alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
            }
        } else {

        }
        if (chkBox3.checked) {
            if(jiji.instructor == "Sir Montes"){
                alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
            }
        } else {

        }

        if (chkBox4.checked) {
            if(jiji.subject == "Tech Press"){
                alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].time+"\n"+jsonData.classes[i].day);
            }
        } else {

        }
        if (chkBox5.checked) {
            if(jiji.time == "12"){
                alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].day);
            }
        } else {

        }

        if (chkBox6.checked) {
            if(jiji.day == "Monday"){
                alert(jsonData.classes[i].roomNo+"\n"+jsonData.classes[i].code+"\n"+jsonData.classes[i].instructor+"\n"+jsonData.classes[i].subject+"\n"+jsonData.classes[i].time);
            }
        } else {

        }
    }

}