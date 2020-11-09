var newStudentName = function(){
    console.log("New student");
}

var newGoal = function(){
    console.log("New goal");
};

$("#newStudentBtn").on("click", newStudentName);
$("#newGoalBtn").on("click", newGoal);