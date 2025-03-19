
// Science for Teacher Page


let smcq = JSON.parse(localStorage.getItem("smcq")) || [];

function createQuestion() {
    const q1 = document.getElementById("q1").value;
    const q1ans = document.getElementById("q1ans").value;
    
    if (q1 === "" || q1ans === "") {
        alert("Please Fill both Qustine and Answare.");
        return;
    }
    
    const sciencequestion = {
        id: smcq.length + 1,
        q1: q1,
        q1ans: q1ans,
      
    };
    
    smcq.push(sciencequestion);
    localStorage.setItem("smcq", JSON.stringify(smcq));
    
    displayQuestions();
}

function displayQuestions() {
    const sciencequestionContainer = document.getElementById("question-li");
    sciencequestionContainer.innerHTML = "";
    
    smcq.forEach((s) => {
        const sciencequestionDiv = document.createElement("div");
        sciencequestionDiv.className = "question-box-science";
        sciencequestionDiv.innerHTML = `
            ${s.q1}
        `;
        sciencequestionContainer.append(sciencequestionDiv);
    });
}
function clearQuestions() {
    smcq = [];
    localStorage.removeItem("smcq");
    displayQuestions();
}
document.addEventListener("DOMContentLoaded", displayQuestions);




// Script for Student Page



function ScienceStudentQuestions() {
    const scienceStudentQuestionsDiv = document.getElementById("question-li");
    scienceStudentQuestionsDiv.innerHTML = "";
    smcq = JSON.parse(localStorage.getItem("smcq")) || [];
    
    smcq.forEach((s, index) => {
        let div = document.createElement("div");
        div.className = "question-box-science";
        div.innerHTML = `
            ${s.q1}
            <p><input type='number' id='answer1${index}'></p>
        `;
        scienceStudentQuestionsDiv.appendChild(div);
    });
}

document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    smcq = JSON.parse(localStorage.getItem("smcq")) || [];
    
    // Check if any answer field is empty


    let allAnswered = true;
    smcq.forEach((s, index) => {
        let studentAnswer1 = document.getElementById(`answer1${index}`);
        if (studentAnswer1.value === "") {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Please answer all the questions before submitting.");
        return;
    }
    
    smcq.forEach((s, index) => {
        let studentAnswer1 = document.getElementById(`answer1${index}`);
        let studentValue = studentAnswer1.value;
        let resultSymbol = document.createElement("div");

        if (studentValue === s.q1ans) {
            studentAnswer1.style.backgroundColor = "lightgreen";
            resultSymbol.innerHTML = `<i class="fa fa-check " style="color: green;"></i> Problem ${index + 1}`; 
            studentAnswer1.style.color = "green";
            correctAnswers++;
        } else {
            studentAnswer1.style.backgroundColor = "red";
            resultSymbol.innerHTML = `<i class="fa fa-times" style="color: red"></i> Problem ${index + 1}`;  
        }

        resultsDiv.appendChild(resultSymbol);
    });
    
    let totalQuestions = smcq.length;
    let resultText = `You got ${correctAnswers} out of ${totalQuestions} correct!`;
    resultsDiv.insertAdjacentHTML("beforeend", `<h3>${resultText}</h3>`);
});

document.addEventListener("DOMContentLoaded", StudentQuestions);

// restart the the calculation 

document.getElementById("restart").addEventListener("click", function() {
    let studentAnswer1Fields = document.querySelectorAll("[id^='answer1']");
    studentAnswer1Fields.forEach(field => {
        field.value = ''; 
        field.style.backgroundColor = '';
        field.style.color = ''; 
    });
    document.getElementById("results").innerHTML = ''; 
});

document.addEventListener("DOMContentLoaded", function() {
    displayQuestions(); 
    ScienceStudentQuestions();
});
