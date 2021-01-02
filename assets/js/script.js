let dataListReference = "";
let currentStudent = "";
let studentsArray = [];
let studentsGoalsArray = []
let goalsArray = [];

const loadStudentsData = function () {
    studentsGoalsArray = localStorage.getItem("myStudentsData");
    studentsGoalsArray = JSON.parse(studentsGoalsArray);
    if (!studentsGoalsArray) {
        return studentsGoalsArray = [];
    }
}

const loadStudentsList = function () {
    studentsArray = localStorage.getItem("myStudents");
    studentsArray = JSON.parse(studentsArray);
    if (!studentsArray) {
        studentsArray = [];
    }
    else {
        for (let i = 0; i < studentsArray.length; ++i) {
            let studentOptionEl = $("<option>").attr("value", studentsArray[i]);
            studentOptionEl.text(studentsArray[i]);
            $("#student-name").append(studentOptionEl);
        }
    }
};

const loadGoalsData = function () {
    goalsArray = localStorage.getItem("mySLPReachGoals");
    goalsArray = JSON.parse(goalsArray);
    if (!goalsArray) {
       return goalsArray = [{goal: "Yes No Questions", description: "This is a description of Yes/No questions."}, {goal: "When Questions", description: "This is a description of When questions."}, {goal: "Categories", description: "This is a description of categories."}];
    }
    else {
        for (let i = 0; i < goalsArray.length; ++i) {
            let goalOptionEl = $("<option>").attr("value", goalsArray[i].goal);
            goalOptionEl.text(goalsArray[i].goal);
            $("#goal-select").append(goalOptionEl);
        }
    }
};    

const updateStudentData = function () {
    localStorage.setItem(
        "myStudentsData",
        JSON.stringify(studentsGoalsArray)
    );
};

const updateStudentList = function (){
    localStorage.setItem(
        "myStudents",
        JSON.stringify(studentsArray)
    )
};

const updateGoalsData = function () {
    localStorage.setItem(
        "mySLPReachGoals",
        JSON.stringify(goalsArray)
    );
};

var studentGoalUpdate = function () {
    console.log("I ran this function!")
    if (currentStudent === "") {
        alert("Please select a student.")
        return;
    } 
    else {
        for (let i = 0; i < studentsGoalsArray.length; ++i) {
            if (studentsGoalsArray[i].student.includes(currentStudent)) {
                studentsGoalsArray.splice(i, 1);
            }
            else {
                console.log("No")
            }
        }
        var currentStudentArray = [];
        $(".goal").each(function(){
            var newDataArray = [];
            var goalName = $(this).children("h2").text();
            // console.log("Goal name is: " + goalName);
            $(".goal-data", this).each(function(){
                let sessionDate = $(this).children("p").text();
                // console.log("sessionDate is: " + sessionDate);
                var scoreContainerEl = $(this).children("div");
                var scoreContainerChildren = scoreContainerEl.children();           
                var trialScore = scoreContainerChildren[0].textContent;
                // console.log("trialScore is: " + trialScore);
                let scorePercent = scoreContainerChildren[1].textContent;
                // console.log("ScorePercent is: " + scorePercent);
                // console.log(sessionDate, trialScore, scorePercent);
                var trialObj = {date: sessionDate, score: trialScore, percent: scorePercent};
                // console.log(trialObj);
                newDataArray.push(trialObj);
                // console.log(newDataArray);
            });
        
            var goalDataObj = {goal: goalName, data: newDataArray}
            currentStudentArray.push(goalDataObj);
            // console.log(currentStudentArray);
        });
        studUpdateArrayData = {student: currentStudent, goals: currentStudentArray}
        studentsGoalsArray.push(studUpdateArrayData);
        console.log(studentsGoalsArray);
        updateStudentData();
    }
};

var addSessionDataToGoal = function(sessionDate, trialScore, scorePercent) {
    let newSessionEl = $("<div>").attr("class", "goal-data list-group-item bg-goal");
    let sessionDateHeaderEl = $("<h6>").text("Date of session:");
    let sessionDateEl = $("<p>").attr("class", "sessionDate");
    sessionDateEl.text(sessionDate);
    let trialsHeaderEl = $("<h6>").text("Trials")
    let scoreBoxEl = $("<div>").attr("class", "d-flex justify-content-between");
    let trialScoreEl = $("<p>").text(trialScore);
    trialScoreEl.attr("class", "score border-bottom");
    
    let scorePercentEl = $("<p>").text(scorePercent);
    scorePercentEl.attr("scorePercent border-bottom");
    scoreBoxEl.append(trialScoreEl, scorePercentEl);
    newSessionEl.append(sessionDateHeaderEl, sessionDateEl, trialsHeaderEl, scoreBoxEl);
    $(dataListReference).append(newSessionEl);
}

// currently working here, goals print to page but they duplicate. It has something to do with the update function that is called by the addGoalToStudent function.
// I think I solved this
var displayStudentGoals = function(currentStudent) {
    $(".goal").each(function(){
        $(this).remove();
    })
    // $("#goals-container").empty();
        console.log(studentsGoalsArray);
    for (let i = 0; i < studentsGoalsArray.length; ++i) {
        // console.log(i);
        if (studentsGoalsArray[i].student === currentStudent) {
            // let currentStudentGoals = studentsGoalsArray[i].goals;
            studentsGoalsArray[i].goals.forEach(function(currentGoal) {
                addGoalToStudent(currentGoal.goal);
                dataListReference = "#" + currentGoal.goal.toLowerCase().split(" ").join("-");
                    console.log(dataListReference);
                currentGoal.data.forEach(function(currentData){
                    addSessionDataToGoal(currentData.date, currentData.score, currentData.percent);                   
                })
            })
            // forEach data
            // for (let a = 0; a < currentStudentGoals; ++a) {
            //     console.log(currentStudentGoals);
                // let currentGoal = currentStudentGoals[a].goal;
                // console.log(currentGoal);
            
            // console.log("Current Student goals are: ", currentStudentGoals);
        }
    }
    
}

$("#student-form-modal").on("show.bs.modal", function() {
    $("#nameEntry").val("");
});

$("#student-form-modal").on("shown.bs.modal", function() {
    $("#nameEntry").trigger("focus");
});

$("#student-form-modal .btn-save").on("click", function(){
    let studentName = $("#nameEntry").val().trim();
    if (studentName) {
        if (studentsArray.includes(studentName)) {
            alert("Student already exists");
            return;
        }
        else {
        var studentOptionEl = $("<option>").attr("value", studentName);
        studentOptionEl.text(studentName);
        studentsArray.push(studentName);
        $("#student-name").append(studentOptionEl);
        updateStudentList();
        $("#student-form-modal").modal("hide");
        }
    }
    else {
        alert("Please enter a name.")
    }
   // Save name to array code here

});

$("#student-name").on("change", function(){
    currentStudent = $("#student-name option:selected").text();
    console.log(currentStudent);
    displayStudentGoals(currentStudent);
});

$("#goal-form-modal").on("show.bs.modal", function() {
    $("#modalGoalTitle, #modalGoalDescription").val("");
});

$("#goal-form-modal").on("shown.bs.modal", function() {
    $("#modalGoalTitle").trigger("focus");
});

$("#goal-form-modal .btn-save").on("click", function(){
    let goalName = $("#modalGoalTitle").val().trim();
    let goalDesc = $("#modalGoalDescription").val().trim();
    if (goalName && goalDesc) {
        let repeated = goalsArray.find(repeated => repeated.goal === goalName);
        if (repeated) {
            return alert("You have already entered a goal with that name.")
        }
        else {
            let newGoal = {
                goal: goalName, description: goalDesc
            }
            goalsArray.push(newGoal);
            // console.log(goalsArray);
            var goalOptionEl = $("<option>").attr("value", goalName);
            goalOptionEl.text(goalName);
            $("#goal-select").append(goalOptionEl);
            updateGoalsData();
            $("#goal-form-modal").modal("hide");
        }
    }
    else {
        alert("Please enter a goal name and description.");
    }
});

var addGoalToStudent = function (currentGoal) {
    let goalsCheckArr = [];
    if (currentStudent === "") {
        $("#goal-select").val("");
        alert("Please select a student.")
        return;
    } 
    else {
        // error handling for goal already on page will go here (use forEach to check the divs on the page for the goal name)
        $('.goal').each(function(){
            goalsCheckArr.push(this.firstChild.textContent)
        });
        console.log(goalsCheckArr);
        if (goalsCheckArr.includes($('#goal-select').val())){
            $("#goal-select").val("");
            alert("This student already has that goal.")
            return;
        }
        else {
            for (let i = 0; i < goalsArray.length; ++i) {
                if (goalsArray[i].goal === currentGoal) {
                    const goalsContainerEl = $("#goals-container");
                    let goalDivEl = $("<div>").attr("class", "goal col-11 col-md-5 card my-3 bg-goal p-0");
                    let goalTitleEl = $("<h2>").attr("class", "p-2");
                    goalTitleEl.text(goalsArray[i].goal);
                    let goalInfoEl = $("<div>").attr("class", "p-3 bg-white mx-1 mb-1 overflow-auto");
                    let goalDescEl = $("<p>").text(goalsArray[i].description)
                    let takeDataBtn = $("<button>").attr("class", "takeDataBtn btn bg-goal mb-3");
                    takeDataBtn.attr("data-toggle", "modal");
                    takeDataBtn.attr("data-target", "#data-form-modal");
                    takeDataBtn.attr("href", "#")
                    takeDataBtn.text("Take Data");
                    let dataListEl = $("<div>").attr("class", "dataList list-group d-flex")
                    dataListEl.attr("id", currentGoal.toLowerCase().split(" ").join("-"))
                    goalInfoEl.append(goalDescEl);
                    goalInfoEl.append(takeDataBtn);
                    goalInfoEl.append(dataListEl);
                    goalDivEl.append(goalTitleEl);
                    goalDivEl.append(goalInfoEl);
                    goalsContainerEl.append(goalDivEl);
                    $("#goal-select").val("");
                    // studentGoalUpdate();
                    
                }
            }
        }
    }
}

$("#goal-select").on("change", function(){
    let currentGoal = $("#goal-select option:selected").text();
    addGoalToStudent(currentGoal);
    // try adding a .then(studentGoalUpdate)
    // when you come back to this, try using array.filter to stop the duplicate page items.
});

$("#data-form-modal").on("show.bs.modal", function() {
    $("#modalDate, #numberOfTrials, #correct").val("");
});

$("#data-form-modal").on("shown.bs.modal", function() {
    $("#modalDate").trigger("focus");
});


$("#data-form-modal .btn-save").on("click", function(){
    let sessionDate = $("#modalDate").val().trim();
    let numberOfTrials = $("#numberOfTrials").val().trim();
    let correct = $("#correct").val().trim();
    let trialScore = `${correct}/${numberOfTrials}`;
    let scorePercent = (parseInt(correct)/parseInt(numberOfTrials)) * 100;
    scorePercent = scorePercent.toFixed(2) + "%";
    if (sessionDate && numberOfTrials && correct) {
        addSessionDataToGoal(sessionDate, trialScore, scorePercent);   
        $("#data-form-modal").modal("hide");
        studentGoalUpdate();
    }
    else {
        alert("Make sure all fields have been filled in.");
    }
});

$("#goals-container").on("click", ".takeDataBtn", function() {
    dataListReference = "#" + $(this).parent().prev().text().toLowerCase().split(" ").join("-");
});

loadStudentsData();
loadStudentsList();
loadGoalsData();