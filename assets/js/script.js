var currentStudent = "";
const studentsArray = [];
var studentsGoalsArray = []
const goalsArray = [{goal: "Yes No Questions", description: "This is a description of Yes/No questions."}, {goal: "When Questions", description: "This is a description of When questions."}, {goal: "Categories", description: "This is a description of categories."}];


var studentGoalUpdate = function () {
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
            var newEvalArray = [];
            var goalName = $(this).children("h2").text();
            // console.log("Goal name is: " + goalName);
            $(".goal-eval", this).each(function(){
                var evalDate = $(this).children("p").text();
                // console.log("EvalDate is: " + evalDate);
                var scoreContainerEl = $(this).children("div");
                var scoreContainerChildren = scoreContainerEl.children();           
                var evalScore = scoreContainerChildren[0].textContent;
                // console.log("EvalScore is: " + evalScore);
                var scorePercent = scoreContainerChildren[1].textContent;
                // console.log("ScorePercent is: " + scorePercent);
                // console.log(evalDate, evalScore, scorePercent);
                var evalObj = {date: evalDate, score: evalScore, percent: scorePercent};
                // console.log(evalObj);
                newEvalArray.push(evalObj);
                // console.log(newEvalArray);
            });
        
            var goalDataObj = {goal: goalName, eval: newEvalArray}
            currentStudentArray.push(goalDataObj);
            // console.log(currentStudentArray);
        });
        studUpdateArrayData = {student: currentStudent, goals: currentStudentArray}
        studentsGoalsArray.push(studUpdateArrayData);
        console.log(studentsGoalsArray);
    }
};

// currently working here, can't access current student goals inside second for loop, a logs, but current student goals won't log until after the loop is complete
var displayStudentGoals = function(currentStudent) {
    $(".goal").each(function(){
        $(this).remove();
    })
        console.log(studentsGoalsArray);
    for (let i = 0; i < studentsGoalsArray.length; ++i) {
        // console.log(i);
        if (studentsGoalsArray[i].student === currentStudent) {
            let currentStudentGoals = studentsGoalsArray[i].goals;
            for (let a = 0; a < currentStudentGoals; ++a) {
                console.log(currentStudentGoals);
                // let currentGoal = currentStudentGoals[a].goal;
                // console.log(currentGoal);
            }
            console.log("Current Student goals are: ", currentStudentGoals);
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
        studentsArray.push(studentName)
        $("#student-name").append(studentOptionEl);
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
            console.log(goalsArray);
            var goalOptionEl = $("<option>").attr("value", goalName);
            goalOptionEl.text(goalName);
            $("#goal-select").append(goalOptionEl);
            $("#goal-form-modal").modal("hide");
        }
    }
    else {
        alert("Please enter a goal name and description.");
    }
});

var addGoalToStudent = function (currentGoal) {
    if (currentStudent === "") {
        $("#goal-select").val("");
        alert("Please select a student.")
        return;
    } 
    else {
        // error handling for goal already on page will go here (use forEach to check the divs on the page for the goal name)
        for (let i = 0; i < goalsArray.length; ++i) {
            if (goalsArray[i].goal === currentGoal) {
                const goalsContainerEl = $("#goals-container");
                let goalDivEl = $("<div>").attr("class", "goal col-11 col-md-5 card my-3 bg-goal p-0");
                let goalTitleEl = $("<h2>").attr("class", "p-2");
                goalTitleEl.text(goalsArray[i].goal);
                let goalInfoEl = $("<div>").attr("class", "p-3 bg-white mx-1 mb-1 overflow-auto");
                let goalDescEl = $("<p>").text(goalsArray[i].description)
                let takeDataBtn = $("<button>").attr("class", "takeDataBtn btn bg-goal mb-3");
                takeDataBtn.text("Take Data");
                let dataListEl = $("<div>").attr("class", "dataList list-group d-flex")
                goalInfoEl.append(goalDescEl);
                goalInfoEl.append(takeDataBtn);
                goalInfoEl.append(dataListEl);
                goalDivEl.append(goalTitleEl);
                goalDivEl.append(goalInfoEl);
                goalsContainerEl.append(goalDivEl);
                $("#goal-select").val("");
                studentGoalUpdate();
            }
        }
    }
}

$("#goal-select").on("change", function(){
    let currentGoal = $("#goal-select option:selected").text();
    addGoalToStudent(currentGoal);
});

$("#goals-container").on("click", ".takeDataBtn", studentGoalUpdate);
