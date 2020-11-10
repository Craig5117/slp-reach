var currentStudent = "";
var studentsArray = [];
var studentsGoalsArray = []
var goalsArray = [{goal: "Yes/No Questions", description: "This is a description of Yes/No questions."}, {goal: "When Questions", description: "This is a description of When questions."}];
 
var studentGoalUpdate = function () {
    var currentStudentArray = [];
    $(".goal").each(function(){
        var newEvalArray = [];
        var goalName = $(this).children("h2").text();
        console.log("Goal name is: " + goalName);
        $(".goal-eval").each(function(){
            var evalDate = $(this).children("p").text();
            console.log(evalDate);
            var scoreContainerEl = $(this).children("div");
            var evalScore = scoreContainerEl.children("p").text();
            // var evalScore = $(this).find(".score").text();
            console.log("EvalScore is: " + evalScore);
            var scorePercent = $(this).children(".scorePercent").text();
            console.log("ScorePercent is: " + scorePercent);
            var evalObj = {date: evalDate, score: evalScore, percent: scorePercent};
            console.log("This is the evalObj: " + evalObj);
            newEvalArray.push(evalObj);
            console.log("This is the newEvalArray" + newEvalArray);
        })
        var goalDataObj = {goal: goalName, eval: newEvalArray}
        currentStudentArray.push(goalDataObj);
        console.log("This is the currentStudentArray: " + currentStudentArray);
    })
    studUpdateArrayData = {student: currentStudent, data: currentStudentArray}
    studentsGoalsArray.push(studUpdateArrayData);
    console.log("This is the updated studentGoalsArray: " + studentsGoalsArray);
}
var displayStudentGoals = function(currentStudent) {
    $(".goal").each(function(){
        $(this).remove();
    })
}

$("#student-form-modal").on("show.bs.modal", function() {
    // clear values
    $("#nameEntry").val("");
});

$("#student-form-modal").on("shown.bs.modal", function() {
    // highlight textarea
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
    // clear values
    $("#modalGoalTitle, #modalGoalDescription").val("");
});

$("#goal-form-modal").on("shown.bs.modal", function() {
    // highlight textarea
    $("#modalGoalTitle").trigger("focus");
});

$("#goal-select").on("change", function(){
    currentGoal = $("#goal-select option:selected").text();

});

$("#newEvalBtn").on("click", studentGoalUpdate);

// // $("#newStudentBtn").on("click", newStudentName);
// $("#newGoalBtn").on("click", newGoal);