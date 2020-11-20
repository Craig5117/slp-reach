var currentStudent = "";
var studentsArray = [];
var studentsGoalsArray = []
var goalsArray = [{goal: "Yes/No Questions", description: "This is a description of Yes/No questions."}, {goal: "When Questions", description: "This is a description of When questions."}, {goal: "Categories", description: "This is a description of categories."}];
 
var studentGoalUpdate = function () {
    var currentStudentArray = [];
    $(".goal").each(function(){
        var newEvalArray = [];
        var goalName = $(this).children("h2").text();
        console.log("Goal name is: " + goalName);
        $(".goal-eval", this).each(function(){
            var evalDate = $(this).children("p").text();
            console.log("EvalDate is: " + evalDate);
            var scoreContainerEl = $(this).children("div");
            var scoreContainerChildren = scoreContainerEl.children();           
            var evalScore = scoreContainerChildren[0].textContent;
            console.log("EvalScore is: " + evalScore);
            var scorePercent = scoreContainerChildren[1].textContent;
            console.log("ScorePercent is: " + scorePercent);
            console.log(evalDate, evalScore, scorePercent);
            var evalObj = {date: evalDate, score: evalScore, percent: scorePercent};
            console.log(evalObj);
            newEvalArray.push(evalObj);
            console.log(newEvalArray);
        });
    
        var goalDataObj = {goal: goalName, eval: newEvalArray}
        currentStudentArray.push(goalDataObj);
        console.log(currentStudentArray);
    });
    studUpdateArrayData = {student: currentStudent, data: currentStudentArray}
    studentsGoalsArray.push(studUpdateArrayData);
    console.log(studentsGoalsArray);
};
var displayStudentGoals = function(currentStudent) {
    // $(".goal").each(function(){
    //     $(this).remove();
    // })
}

$("#student-form-modal").on("show.bs.modal", function() {
    $("#nameEntry").val("");
});

$("#student-form-modal").on("shown.bs.modal", function() {
    $("#nameEntry").trigger("focus");
});

$("#student-form-modal .btn-save").on("click", function(){
    var studentName = $("#nameEntry").val().trim();
    if (studentName) {
        var studentOptionEl = $("<option>").attr("value", studentName);
        studentOptionEl.text(studentName);
        $("#student-name").append(studentOptionEl);
        $("#student-form-modal").modal("hide");
    }
   // Save name to array code here

});

$("#student-name").on("change", function(){
    currentStudent = $("#student-name option:selected").text();
    displayStudentGoals(currentStudent);
});

$("#goal-form-modal").on("show.bs.modal", function() {
    $("#modalGoalTitle, #modalGoalDescription").val("");
});

$("#goal-form-modal").on("shown.bs.modal", function() {
    $("#modalGoalTitle").trigger("focus");
});

$("#goal-form-modal .btn-save").on("click", function(){
    var goalName = $("#modalGoalTitle").val().trim();
    if (goalName) {
        let newGoalDesc = $("#modalGoalDescription").val().trim();
        let newGoal = {
            goal: goalName, description: newGoalDesc
        }
        goalsArray.push(newGoal);
        console.log(goalsArray);
        var goalOptionEl = $("<option>").attr("value", goalName);
        goalOptionEl.text(goalName);
        $("#goal-select").append(goalOptionEl);
        $("#goal-form-modal").modal("hide");
    }
});

$("#goal-select").on("change", function(){
    currentGoal = $("#goal-select option:selected").text();

});

$("#newEvalBtn").on("click", studentGoalUpdate);
