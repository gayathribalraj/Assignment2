
// Science for Teacher Page


const textBoxContainer = document.getElementById('textBoxContainer');
const addOptionButton = document.getElementById('addoption');
const createQuestionButton = document.querySelector("button[onclick='createQuestion()']");
const clearQuestionsButton = document.querySelector("button[onclick='clearQuestions()']");


// option input event 

addOptionButton?.addEventListener('click', function()
{
    if (options.length < 6) {
        const newOption = document.createElement('input');
        newOption.classList.add('text-box');
        newOption.type = 'text';
        newOption.placeholder = `Enter Option ${options.length + 1}`;
        textBoxContainer.appendChild(newOption);
        options.push(newOption);
    } else {
        alert("You can only add up to 6 options.");
    }
});



let smcq = JSON.parse(localStorage.getItem("smcq")) || [];
let options = []; 
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || []; 


function createQuestion() {
    const q1 = document.getElementById("q1").value;
    const q1ans = document.getElementById("q1ans").value;
    
    if (q1 === "" || q1ans === "") {
        alert("Please Fill both Qustine and Answare.");
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

    smcq.push(scienceQuestion);
    localStorage.setItem("smcq", JSON.stringify(smcq));
    
    
    document.getElementById("q1").value = '';
    document.getElementById("q1ans").value = '';
    options.forEach(option => option.value = '');



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
    smcq = JSON.parse(localStorage.getItem("userQuiz")) || [];

    // Check if any answer field is empty

    let allAnswered = true;
    smcq.forEach((s, index) => {
        let studentAnswer1 = document.getElementById(`answer1${index}`);
        if (studentAnswer1.value === "/") {
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
            resultSymbol.innerHTML = `<i class="fa fa-check" style="color: green;"></i> Problem ${index + 1}`; 
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

document.getElementById("restart").addEventListener("click", function() {
    let studentAnswer1Fields = document.querySelectorAll("[id^='answer1']");
    studentAnswer1Fields.forEach(field => {
        field.value = '/'; 
        field.style.backgroundColor = '';
        field.style.color = ''; 
    });
    document.getElementById("results").innerHTML = ''; 
});

document.addEventListener("DOMContentLoaded", function() {
    displayQuestions();  
    ScienceStudentQuestions();  
});



