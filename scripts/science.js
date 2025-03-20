
// Science for Teacher Page


const addoption = document.getElementById('addoption');
const textBoxContainer = document.getElementById('textBoxContainer')

addoption.addEventListener('click', function()
{
const newText = document.createElement('input');
    newText.classList.add('text-box');
    newText.type ='text';

    textBoxContainer.appendChild(newText);

});

const userQuiz = [
    {
      id: 1,
      question: "Which of these is a noun?",
      options: ["Run", "Happy", "Dog", "Slowly"],
      answer: "Dog"
    },
    {
      id: 2,
      question: "Which sentence is correct?",
      options: [
        "She can sings well.",
        "She can sing well.",
        "She can singing well.",
        "She can sung well."
      ],
      answer: "She can sing well."
    },
    {
      id: 3,
      question: "What is the opposite of 'big'?",
      options: ["Small", "Tall", "Large", "Heavy"],
      answer: " Small"
    }
  ];




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
       options:['8','10']
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
     console.log(smcq)
    userQuiz.forEach((s, index) => {
        let div = document.createElement("div");
        div.className = "question-box-science";
        let opts = ``
        let sel = `
            ${s.q1}
 <select id="answer1${index}" style="margin-bottom: 20px;">
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

  // <select id="answer1${index}" style="margin-bottom: 20px;">
            //     <option value="/">...Select Answer</option>
            //     <option id ="1" value="The Moon">A) The Moon</option>
            //     <option value="The Sun">B) The Sun</option>
            //     <option value="Volcanoes">C) Volcanoes</option>
            //     <option value="Ocean currents">D) Ocean currents</option>
            // </select>
            


document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    userQuiz = JSON.parse(localStorage.getItem("userQuiz")) || [];

    // Check if any answer field is empty

    let allAnswered = true;
    userQuiz.forEach((s, index) => {
        let studentAnswer1 = document.getElementById(`answer1${index}`);
        if (studentAnswer1.value === "/") {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Please answer all the questions before submitting.");
        return;
    }
    
    userQuiz.forEach((s, index) => {
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
    
    let totalQuestions = userQuiz.length;
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



