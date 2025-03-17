// Script for Teacher Page



let problems = JSON.parse(localStorage.getItem("problems")) || [];

function createQuestion() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const operator = document.getElementById("operator").value;
    
    if (num1 === "" || num2 === "") {
        alert("Please enter both numbers.");
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
            <p>num1 = ${p.num1}</p>
            <p>num2 = ${p.num2}</p>
            <p>Operator: ${p.operator}</p>
        `;
        questionContainer.append(questionDiv);
    });
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
            <p>num1 = ${p.num1}</p>
            <p>num2 = ${p.num2}</p>
            <p>Operator: ${p.operator}</p>
            <p>= <input type='number' id='answer${index}'></p>
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
    
    problems.forEach((p, index) => {
        let studentAnswer = document.getElementById(`answer${index}`);
        let studentValue = parseFloat(studentAnswer.value);
        let resultSymbol = document.createElement("p");
        
        if (studentValue === p.ans) {
            studentAnswer.style.backgroundColor = "lightgreen";
            resultSymbol.textContent = `✔️ Problem ${index + 1}`;
            correctAnswers++;
        } else {
            studentAnswer.style.backgroundColor = "lightredS";
            resultSymbol.textContent = `❌ Problem ${index + 1}`;
        }
        
        resultsDiv.appendChild(resultSymbol);
    });
    
    let totalQuestions = problems.length;
    let resultText = `You got ${correctAnswers} out of ${totalQuestions} correct!`;
    resultsDiv.insertAdjacentHTML("beforeend", `<h3>${resultText}</h3>`);
});

document.addEventListener("DOMContentLoaded", StudentQuestions);
