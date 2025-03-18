function StudentQuestions() {
    const scienceStudentQuestionsDiv = document.getElementById("student-questions-science");

    // Check if the element exists
    if (!scienceStudentQuestionsDiv) {
        console.error("The div with id 'student-questions-science' was not found.");
        return;  // Exit the function if the div is not found
    }

    scienceStudentQuestionsDiv.innerHTML = "";

    // Retrieve the questions from localStorage
    smcq = JSON.parse(localStorage.getItem("smcq")) || [];

    // Debugging log to check if smcq is loaded correctly
    console.log("SMCQ Data:", smcq);

    // If smcq is an array and has questions, create the question elements
    if (Array.isArray(smcq) && smcq.length > 0) {
        smcq.forEach((s, index) => {
            let div = document.createElement("div");
            div.className = "question-box-science";
            div.innerHTML = `
                <p>${s.q1}</p>
                <p><input type='number' id='answer1${index}'></p>
            `;
            scienceStudentQuestionsDiv.appendChild(div);
        });
    } else {
        console.log("No questions available.");
    }
}
