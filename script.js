let addScoreBtn = document.getElementById("add-score");
let studentInputContainer = document.querySelector(".student-input-container");
let studentList = [];
let leaderboardList = document.querySelector(".leaderboard-list");
let today = new Date();
const dateOptions = { day: "2-digit", month: "short", year: "numeric" };


function checkInput() {
  let result = true;
  studentInputContainer.childNodes.forEach((eachNode) => {
    if (eachNode.nodeName === "INPUT" && eachNode.value === "") result = false;
  });
  return result;
}



function updateLeaderboardUI() {
  studentList.sort((a, b) => b.score - a.score);
  leaderboardList.innerHTML = "";
  studentList.forEach((eachStudentObj, idx) => {
    let eachStudentDiv = document.createElement("div");
    eachStudentDiv.className = "each-student";
    eachStudentDiv.innerHTML = `
            <h5><span>${idx + 1}</span></h5>
            <h5>${eachStudentObj.name}</h5>
            <h5>${eachStudentObj.location}</h5>
            <h5>${today.toLocaleDateString("en", dateOptions)}</h5>
            <h5>${eachStudentObj.score}</h5>
            <div class="operation">
                <button class="plus">+5</button>
                <button class="minus">-5</button>
                <button class="delete">Delete</button>
            </div>
        `;
    leaderboardList.appendChild(eachStudentDiv);
    eachStudentDiv.addEventListener("click", function (e) {
        if (e.target.className === "delete") {
            studentList.splice(idx, 1);
            updateLeaderboardUI();
        } else if (e.target.className === "plus") {
            studentList[idx].score += 5;
            updateLeaderboardUI();
        } else if (e.target.className === "minus") {
            studentList[idx].score -= 5;
            updateLeaderboardUI();
        }
    });
});

}

addScoreBtn.addEventListener("click", function () {
  if (checkInput()) {
    let newStudent = {
      name:
        studentInputContainer.children[0].value +
        " " +
        studentInputContainer.children[1].value,
      location: studentInputContainer.children[2].value,
      score: parseInt(studentInputContainer.children[4].value),
    };
    studentList.push(newStudent);
    studentInputContainer.childNodes.forEach((eachNode) => {
      if (eachNode.nodeName === "INPUT") eachNode.value = "";
    });
    updateLeaderboardUI();
  } else alert("Fill all the Details!");
});