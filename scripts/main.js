// Script for Teacher Page

let problems = JSON.parse(localStorage.getItem("problems")) || [];

function createQuestion() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const operator = document.getElementById("operator").value;
    
    if (num1 === "" || num2 === "") {
        alert("Please Fill both Qustine and Answare.");
        return;
    }
    
    const question = {
        id: problems.length + 1,
        num1: parseInt(num1),
        num2: parseInt(num2),
        operator: operator,
        ans: eval(`${num1} ${operator} ${num2}`),
    };
    
    problems.push(question);
    localStorage.setItem("problems", JSON.stringify(problems));
    
    displayQuestions();
}

function displayQuestions() {
    const questionContainer = document.getElementById("question-list");
    questionContainer.innerHTML = "";
    
    problems.forEach((p) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-box";
        questionDiv.innerHTML = `
            ${p.num1}
          ${p.operator}
            ${p.num2}
            <i class="fas fa-times delete-icon" onclick="deleteQuestion(${index})"></i>
            
        `;
        questionContainer.append(questionDiv);
    });
}


function deleteQuestion(index)
{
    const isConfirmed = window.confirm("Are you sure you want to delete this question?")
    if(isConfirmed)
        {
            setTimeout(() => {
            smcq.splice(index,1);


         } )
        }
}

function clearQuestions() {
    problems = [];
    localStorage.removeItem("problems");
    displayQuestions();
}

document.addEventListener("DOMContentLoaded", displayQuestions);


// Script for Student Page
function StudentQuestions() {
    const studentQuestionsDiv = document.getElementById("student-questions");
    studentQuestionsDiv.innerHTML = "";
    problems = JSON.parse(localStorage.getItem("problems")) || [];
    
    problems.forEach((p, index) => {
        let div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
            ${p.num1}
            ${p.operator}
            ${p.num2} =
            <p><input type='number' id='answer${index}'></p>
        `;
        studentQuestionsDiv.appendChild(div);
    });
}

document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    problems = JSON.parse(localStorage.getItem("problems")) || [];
    
    // Check if any answer field is empty


    let allAnswered = true;
    problems.forEach((p, index) => {
        let studentAnswer = document.getElementById(`answer${index}`);
        if (studentAnswer.value === "") {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Please answer all the questions before submitting.");
        return;
    }
    
    problems.forEach((p, index) => {
        let studentAnswer = document.getElementById(`answer${index}`);
        let studentValue = parseFloat(studentAnswer.value);
        let resultSymbol = document.createElement("div");

        if (studentValue === p.ans) {
            studentAnswer.style.backgroundColor = "lightgreen";
            resultSymbol.innerHTML = `<i class="fa fa-check " style="color: green;"></i> Problem ${index + 1}`;  // Check icon
            studentAnswer.style.color = "green";

            correctAnswers++;
        } else {
            studentAnswer.style.backgroundColor = "red";
            resultSymbol.innerHTML = `<i class="fa fa-times" style="color: red"></i> Problem ${index + 1}`;  // Cross icon
        }

        resultsDiv.appendChild(resultSymbol);
    });
    
    let totalQuestions = problems.length;
    let resultText = `You got ${correctAnswers} out of ${totalQuestions} correct!`;
    resultsDiv.insertAdjacentHTML("beforeend", `<h3>${resultText}</h3>`);
});

document.addEventListener("DOMContentLoaded", StudentQuestions);

// restart the the calculation 

document.getElementById("restart").addEventListener("click", function() {
    let studentAnswerFields = document.querySelectorAll("[id^='answer']");
    studentAnswerFields.forEach(field => {
        field.value = ''; 
        field.style.backgroundColor = '';
        field.style.color = ''; 
    });
    document.getElementById("results").innerHTML = ''; 
});

document.addEventListener("DOMContentLoaded", StudentQuestions);
