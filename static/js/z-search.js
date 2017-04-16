function myTimer() {
    let d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
    document.getElementById("date").innerHTML = d.toDateString();

}
function searchText(clicked_id) {
    let content = JSON.parse(localStorage.getItem('ourJsonObject'));

    if (!content) {
        alert("you have to provide the json file first ~");
        return;
    }
    let time = new Date().getHours();
    let day = new Date().getDay();

    let insName = "";
    let length = Object.keys(content.classes).length;
    for (let i = 0; i < length; i++) {
        if ((content.classes[i].timeIn == time || content.classes[i].timeIn == time+.30)
            && (content.classes[i].day == day && content.classes[i].roomNo == clicked_id))
            insName = content.classes[i].instructor+"<br />"+content.classes[i].subject+"<br />" +"<br />"+"PRESENT";
    }

    /*if(insName)
        alert(insName);
        else
            alert("The Room Is Free !");*/
    let modContent = document.getElementById('modContent');
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    let modal = document.getElementById('myModal');
    modal.style.display = "block";
    if(insName){
        document.getElementById('modContent').innerHTML = insName;
        modContent.appendChild(checkbox);
    }
    else
        document.getElementById('modContent').innerHTML = "The Room Is Free !";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}
function myFunction() {
    confirm("Are you sure you want to save ?");
}



