// this sets an empty variable that will be used to dynamically create id selectors
let dataListReference = "";
// initiates a variable to store the current student on student select change
let currentStudent = "";
// initiates the three arrays that store the bulk of the information for the app, studentGoalsArray is the big one that holds all the students and their data
let studentsArray = [];
let studentsGoalsArray = [];
let goalsArray = [];

// gets studentsGoalsArray from localStorage
const loadStudentsData = function () {
  studentsGoalsArray = localStorage.getItem("myStudentsData");
  studentsGoalsArray = JSON.parse(studentsGoalsArray);
  if (!studentsGoalsArray) {
    return (studentsGoalsArray = []);
  }
};

// gets list of student names for drop down from localStorage
const loadStudentsList = function () {
  studentsArray = localStorage.getItem("myStudents");
  studentsArray = JSON.parse(studentsArray);
  if (!studentsArray) {
    studentsArray = [];
  } else {
    for (let i = 0; i < studentsArray.length; ++i) {
      let studentOptionEl = $("<option>").attr("value", studentsArray[i]);
      studentOptionEl.text(studentsArray[i]);
      $("#student-name").append(studentOptionEl);
    }
  }
};

// gets list of goals and their descriptions from localStorage
const loadGoalsData = function () {
  goalsArray = localStorage.getItem("mySLPReachGoals");
  goalsArray = JSON.parse(goalsArray);
  if (!goalsArray) {
    return (goalsArray = [
      {
        goal: "Yes No Questions",
        description: "This is a description of Yes/No questions.",
      },
      {
        goal: "When Questions",
        description: "This is a description of When questions.",
      },
      {
        goal: "Categories",
        description: "This is a description of categories.",
      },
    ]);
  } else {
    for (let i = 0; i < goalsArray.length; ++i) {
      let goalOptionEl = $("<option>").attr("value", goalsArray[i].goal);
      goalOptionEl.text(goalsArray[i].goal);
      $("#goal-select").append(goalOptionEl);
    }
  }
};

// sets localStorage of studentsGoalsArray
const updateStudentData = function () {
  localStorage.setItem("myStudentsData", JSON.stringify(studentsGoalsArray));
};

// sets localStorage of studentsArray
const updateStudentList = function () {
  localStorage.setItem("myStudents", JSON.stringify(studentsArray));
};

// sets localStorage of goalsArray
const updateGoalsData = function () {
  localStorage.setItem("mySLPReachGoals", JSON.stringify(goalsArray));
};

// updates the studentsGoalsArray with changes to or addition of goals for a student
const studentGoalUpdate = function () {
  // Stops function if no student has been selected
  if (currentStudent === "") {
    alert("Please select a student.");
    return;
  } else {
    for (let i = 0; i < studentsGoalsArray.length; ++i) {
        // This deletes the current student's stored data so it can be replaced with the new data
      if (studentsGoalsArray[i].student.includes(currentStudent)) {
        studentsGoalsArray.splice(i, 1);
      } 
    }
    // initializes an array to collect current student data
    let currentStudentArray = [];
    // for each goal on this student's display, it executes the following function
    $(".goal").each(function () {
        // initiates an array to collect new data
      let newDataArray = [];
      // gets the goal name from the DOM
      let goalName = $(this).children("h2").text();
      // Loops over each recorded take-data and executes the following function
      $(".goal-data", this).each(function () {
          // gets the date from the element in the DOM
        let sessionDate = $(this).children("p").text();
        // gets the Score container so the children can be sorted and used
        let scoreContainerEl = $(this).children("div");
        // sets score container children to an arrayish variable
        let scoreContainerChildren = scoreContainerEl.children();
        // stores the score from the children array
        let trialScore = scoreContainerChildren[0].textContent;
        // stores the percentage from the children array
        let scorePercent = scoreContainerChildren[1].textContent;
        // builds an object from the stored date, score, and percentage
        let trialObj = {
          date: sessionDate,
          score: trialScore,
          percent: scorePercent,
        };
        // pushes the trialObj to the newDataArray
        newDataArray.push(trialObj);
      });
      // constructs an object with the goal name and the newly updated newDataArray
      let goalDataObj = { goal: goalName, data: newDataArray };
      // updates currentStudentArray with the new object
      currentStudentArray.push(goalDataObj);
    });
    // combines student name with the assembled data in an object to be sent to the studentGoalsArray
    studUpdateArrayData = {
      student: currentStudent,
      goals: currentStudentArray,
    };
    // sends the newly updated data to the studentsGoalsArray
    studentsGoalsArray.push(studUpdateArrayData);
    // updates localStorage data for studentsGoalsArray
    updateStudentData();
  }
};

// Adds take-data data to the student's goal
const addSessionDataToGoal = function (sessionDate, trialScore, scorePercent) {
    // creates the new element that will be added to the page on the goal
  let newSessionEl = $("<div>").attr(
    "class",
    "goal-data list-group-item bg-goal"
  );
  // creates the date header
  let sessionDateHeaderEl = $("<h6>").text("Date of session:");
  // creates the sessionDate p element and adds the class "section data"
  let sessionDateEl = $("<p>").attr("class", "sessionDate");
  // gets the text for the sessionDate element from passed in parameter
  sessionDateEl.text(sessionDate);
  let trialsHeaderEl = $("<h6>").text("Trials");
  let scoreBoxEl = $("<div>").attr("class", "d-flex justify-content-between");
  let trialScoreEl = $("<p>").text(trialScore);
  trialScoreEl.attr("class", "score border-bottom");

  let scorePercentEl = $("<p>").text(scorePercent);
  scorePercentEl.attr("scorePercent border-bottom");
  scoreBoxEl.append(trialScoreEl, scorePercentEl);
  newSessionEl.append(
    sessionDateHeaderEl,
    sessionDateEl,
    trialsHeaderEl,
    scoreBoxEl
  );
  // feeds the value of dataListReference in as the id selector to append the newSessionEl on
  // in this instance, the valude of dataListReference will be coming from the goal name of the div that the take data button was clicked on
  // the h2 goal name is converted to the same format as the id
  // then the newSessionEl is appended to the element with the matching id which would be the .dataList div with the matching id
  $(dataListReference).append(newSessionEl);
};

const displayStudentGoals = function (currentStudent) {
  $(".goal").each(function () {
    $(this).remove();
  });
  console.log(studentsGoalsArray);
  for (let i = 0; i < studentsGoalsArray.length; ++i) {
    if (studentsGoalsArray[i].student === currentStudent) {
      studentsGoalsArray[i].goals.forEach(function (currentGoal) {
        addGoalToStudent(currentGoal.goal);
        dataListReference =
          "#" + currentGoal.goal.toLowerCase().split(" ").join("-");
        console.log(dataListReference);
        currentGoal.data.forEach(function (currentData) {
          addSessionDataToGoal(
            currentData.date,
            currentData.score,
            currentData.percent
          );
        });
      });
    }
  }
};

$("#student-form-modal").on("show.bs.modal", function () {
  $("#nameEntry").val("");
});

$("#student-form-modal").on("shown.bs.modal", function () {
  $("#nameEntry").trigger("focus");
});

$("#student-form-modal .btn-save").on("click", function () {
  let studentName = $("#nameEntry").val().trim();
  if (studentName) {
    if (studentsArray.includes(studentName)) {
      alert("Student already exists");
      return;
    } else {
      let studentOptionEl = $("<option>").attr("value", studentName);
      studentOptionEl.text(studentName);
      studentsArray.push(studentName);
      $("#student-name").append(studentOptionEl);
      updateStudentList();
      $("#student-form-modal").modal("hide");
    }
  } else {
    alert("Please enter a name.");
  }
  // Save name to array code here
});

$("#student-name").on("change", function () {
  currentStudent = $("#student-name option:selected").text();
  console.log(currentStudent);
  displayStudentGoals(currentStudent);
});

$("#goal-form-modal").on("show.bs.modal", function () {
  $("#modalGoalTitle, #modalGoalDescription").val("");
});

$("#goal-form-modal").on("shown.bs.modal", function () {
  $("#modalGoalTitle").trigger("focus");
});

$("#goal-form-modal .btn-save").on("click", function () {
  let goalName = $("#modalGoalTitle").val().trim();
  let goalDesc = $("#modalGoalDescription").val().trim();
  if (goalName && goalDesc) {
    let repeated = goalsArray.find((repeated) => repeated.goal === goalName);
    if (repeated) {
      return alert("You have already entered a goal with that name.");
    } else {
      let newGoal = {
        goal: goalName,
        description: goalDesc,
      };
      goalsArray.push(newGoal);
      // console.log(goalsArray);
      let goalOptionEl = $("<option>").attr("value", goalName);
      goalOptionEl.text(goalName);
      $("#goal-select").append(goalOptionEl);
      updateGoalsData();
      $("#goal-form-modal").modal("hide");
    }
  } else {
    alert("Please enter a goal name and description.");
  }
});

const addGoalToStudent = function (currentGoal) {
  let goalsCheckArr = [];
  if (currentStudent === "") {
    $("#goal-select").val("");
    alert("Please select a student.");
    return;
  } else {
    // error handling for goal already on page will go here (use forEach to check the divs on the page for the goal name)
    $(".goal").each(function () {
      goalsCheckArr.push(this.firstChild.textContent);
    });
    console.log(goalsCheckArr);
    return new Promise(function (resolve, reject) {
      if (goalsCheckArr.includes($("#goal-select").val())) {
        $("#goal-select").val("");

        reject("This student already has that goal.");
      } else {
        for (let i = 0; i < goalsArray.length; ++i) {
          if (goalsArray[i].goal === currentGoal) {
            const goalsContainerEl = $("#goals-container");
            let goalDivEl = $("<div>").attr(
              "class",
              "goal col-11 col-md-5 card my-3 bg-goal p-0"
            );
            let goalTitleEl = $("<h2>").attr("class", "p-2");
            goalTitleEl.text(goalsArray[i].goal);
            let goalInfoEl = $("<div>").attr(
              "class",
              "p-3 bg-white mx-1 mb-1 overflow-auto"
            );
            let goalDescEl = $("<p>").text(goalsArray[i].description);
            let takeDataBtn = $("<button>").attr(
              "class",
              "takeDataBtn btn bg-goal mb-3"
            );
            takeDataBtn.attr("data-toggle", "modal");
            takeDataBtn.attr("data-target", "#data-form-modal");
            takeDataBtn.attr("href", "#");
            takeDataBtn.text("Take Data");
            let dataListEl = $("<div>").attr(
              "class",
              "dataList list-group d-flex"
            );
            dataListEl.attr(
              "id",
              currentGoal.toLowerCase().split(" ").join("-")
            );
            goalInfoEl.append(goalDescEl);
            goalInfoEl.append(takeDataBtn);
            goalInfoEl.append(dataListEl);
            goalDivEl.append(goalTitleEl);
            goalDivEl.append(goalInfoEl);
            goalsContainerEl.append(goalDivEl);
            $("#goal-select").val("");
            console.log("Goal Added!");
          }
        }
      }
      resolve();
    });
  }
};

$("#goal-select").on("change", function () {
  let currentGoal = $("#goal-select option:selected").text();
  addGoalToStudent(currentGoal)
    .then(function () {
      studentGoalUpdate();
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

$("#data-form-modal").on("show.bs.modal", function () {
  $("#modalDate, #numberOfTrials, #correct").val("");
});

$("#data-form-modal").on("shown.bs.modal", function () {
  $("#modalDate").trigger("focus");
});

$("#data-form-modal .btn-save").on("click", function () {
  let sessionDate = $("#modalDate").val().trim();
  let numberOfTrials = $("#numberOfTrials").val().trim();
  let correct = $("#correct").val().trim();
  let trialScore = `${correct}/${numberOfTrials}`;
  let scorePercent = (parseInt(correct) / parseInt(numberOfTrials)) * 100;
  scorePercent = scorePercent.toFixed(2) + "%";
  if (sessionDate && numberOfTrials && correct) {
    addSessionDataToGoal(sessionDate, trialScore, scorePercent);
    $("#data-form-modal").modal("hide");
    studentGoalUpdate();
  } else {
    alert("Make sure all fields have been filled in.");
  }
});

// when a take data button is clicked within the goals-container, 
// it looks for the parent element and then goes to the parent elements sibling which will be the h2 containing the goal name
// the goal name is then converted to lowercase, split, and joined with - to reflect the format of the id
// # is added to complete the id format
$("#goals-container").on("click", ".takeDataBtn", function () {
  dataListReference =
    "#" + $(this).parent().prev().text().toLowerCase().split(" ").join("-");
});

loadStudentsData();
loadStudentsList();
loadGoalsData();
