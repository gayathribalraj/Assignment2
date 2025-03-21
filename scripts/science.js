const textBoxContainer = document.getElementById('textBoxContainer');
const addOptionButton = document.getElementById('addoption');
const createQuestionButton = document.getElementById('createQuestionButton');


let smcq = JSON.parse(localStorage.getItem("smcq")) || [];
let options = []; 
let editIndex = -1;  

// Add options dynamically
addOptionButton?.addEventListener('click', function() {
    if (options.length < 4) {
        const newOption = document.createElement('input');
        newOption.classList.add('text-box');
        newOption.type = 'text';
        newOption.placeholder = `Enter Option ${options.length + 1}`;
        textBoxContainer.appendChild(newOption);
        options.push(newOption);
    } else {
        alert("You can only add up to 4 options.");
    }
});

// Function to create a new or update an existing science question
function createQuestion() {
    const q1 = document.getElementById("q1").value;
    const q1ans = document.getElementById("q1ans").value;

    if (q1 === "" || q1ans === "") {
        alert("Please Fill both Question and Answer.");
        return;
    }
    if (options.length < 4) {
        alert("Please Fill the 4 options");
        return;
    }

    const optionValues = options.map(option => option.value);

    if (optionValues.length < 4) {
        alert("Please fill in all 4 options.");
        return;
    }

    const scienceQuestion = {
        id: smcq.length + 1,
        q1: q1,
        q1ans: q1ans,
        options: optionValues
    };

    // If editing an existing question


    if (editIndex !== -1) {
        smcq[editIndex] = scienceQuestion;
    } else {
        smcq.push(scienceQuestion);
    }

    localStorage.setItem("smcq", JSON.stringify(smcq));

    // Reset the form
    document.getElementById("q1").value = '';
    document.getElementById("q1ans").value = '';
    options.forEach(option => option.value = '');
    options = [];

    displayQuestions();
    editIndex = -1;  // Reset edit index after saving
}


function editQuestion(index) {
    const questionToEdit = smcq[index];

    // Set form fields to current question values
    document.getElementById("q1").value = questionToEdit.q1;
    document.getElementById("q1ans").value = questionToEdit.q1ans;

    // Clear any existing options
    textBoxContainer.innerHTML = "";
    options = [];
    questionToEdit.options.forEach((option, i) => {
        const newOption = document.createElement('input');
        newOption.classList.add('text-box');
        newOption.type = 'text';
        newOption.placeholder = `Enter Option ${i + 1}`;
        newOption.value = option;
        textBoxContainer.appendChild(newOption);
        options.push(newOption);
    });

    // Set the current index to edit
    editIndex = index;
}

// Function to display all science questions
function displayQuestions() {
    const sciencequestionContainer = document.getElementById("question-li");
    sciencequestionContainer.innerHTML = ""; 

    smcq.forEach((s, index) => {
        const sciencequestionDiv = document.createElement("div");
        sciencequestionDiv.className = "question-box-science";
        
        sciencequestionDiv.innerHTML = `
            ${s.q1} 
            <i class="fas fa-edit edit-icon" onclick="editQuestion(${index})"></i>
            <i class="fas fa-times delete-icon" onclick="deleteQuestion(${index})"></i>
        `;
        
        sciencequestionContainer.append(sciencequestionDiv);
    });
}


// Function to delete a question
function deleteQuestion(index) {
    const isConfirmed = window.confirm("Are you sure you want to delete this question?");
    
    if (isConfirmed) {
        setTimeout(() => {
            smcq.splice(index, 1);
            localStorage.setItem("smcq", JSON.stringify(smcq));
            displayQuestions();
        }, 1000); 
    }
}

// Function to clear all questions
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
    //  console.log(smcq)

    smcq.forEach((s, index) => {
        let div = document.createElement("div");
        div.className = "question-box-science";
        let opts = ``
        let sel = `
            ${s.q1}
       <select id="answer1${index}" style="margin-bottom: 20px;">
        <option value="/">...Select Answer</option>


        `;
        s.options.forEach(o=>{
            opts+=`<option value="${o}">${o}</option>`
        })
        sel = sel.concat(opts)
        console.log(`${sel} </select>`)
        div.innerHTML = `${sel} </select>`

        scienceStudentQuestionsDiv.appendChild(div);
        
    });
}



document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    let allAnswered = true;

    // Check if any answer field is empty

    smcq.forEach((s, index) => {
        let studentAnswer1 = document.getElementById(`answer1${index}`).value;
        if (studentAnswer1.value === "/") {
            allAnswered = false;
        }

        userAnswers[index] = studentAnswer1;
    });

    if (!allAnswered) {
        alert("Please answer all the questions before submitting.");
        return;
    }
    
    smcq.forEach((s, index) => {
        let studentAnswer1 = userAnswers[index];
        let resultSymbol = document.createElement("div");

        if (studentAnswer1 === s.q1ans) {
            resultSymbol.innerHTML = `<i class="fa fa-check" style="color: green;"></i> Problem ${index + 1}` ; 
            correctAnswers++;
        } else {
            resultSymbol.innerHTML = `<i class="fa fa-times" style="color: red"></i> Problem ${index + 1}`;  
        }

        resultsDiv.appendChild(resultSymbol);
    });
    
    let totalQuestions = smcq.length;
    let resultText = `You got ${correctAnswers} out of ${totalQuestions} correct!`;
    resultsDiv.insertAdjacentHTML("beforeend", `<h3>${resultText}</h3>`);

    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

});


// Restart the quiz

document.getElementById("restart").addEventListener("click", function() {
    let studentAnswer1Fields = document.querySelectorAll("[id^='answer1']");
    studentAnswer1Fields.forEach(field => {
        field.value = '/'; 
    });
    document.getElementById("results").innerHTML = ''; 
});

document.addEventListener("DOMContentLoaded", function() {
    if (document.body.contains(document.getElementById('question-li'))) {
        ScienceStudentQuestions();  
    } else {
        displayQuestions();
    }
});


