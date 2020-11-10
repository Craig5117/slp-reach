var newStudentName = function(){
    
    console.log("New student");
}

var newGoal = function(){
    console.log("New goal");
};


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
    var currentStudent = $("#student-name option:selected").text();
    displayStudentGoals(currentStudent);
})

// // $("#newStudentBtn").on("click", newStudentName);
// $("#newGoalBtn").on("click", newGoal);