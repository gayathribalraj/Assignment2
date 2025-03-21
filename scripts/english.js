
//Englishefor Teacher Page


const textBoxContainer = document.getElementById('textBoxContainer');
const addOptionButton = document.getElementById('addoption');
const createQuestionButton = document.querySelector("button[onclick='createQuestion()']");
const clearQuestionsButton = document.querySelector("button[onclick='clearQuestions()']");


// option input event 

addOptionButton?.addEventListener('click', function()
{
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



let emcq = JSON.parse(localStorage.getItem("emcq")) || [];
let options = []; 
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || []; 


function createQuestion() {
    const q1 = document.getElementById("q1").value;
    const q1ans = document.getElementById("q1ans").value;
    
    if (q1 === "" || q1ans === "") {
        alert("Please Fill both Qustine and Answare.");
        return;
    }
    if (options.length < 4 )
        {
            alert("Please Fill the 4 options")
            return;
        }
   
    
    const optionValues = options.map(option => option.value);
   
    if(optionValues.length < 4)
        {
            alert("please fill in all 4 options ")
            return ;
        }


     const englishQuestion = {
        id: emcq.length + 1,
        q1: q1,
        q1ans: q1ans,
        options: optionValues
    };

    emcq.push(englishQuestion);
    localStorage.setItem("emcq", JSON.stringify(emcq));
    
    
    document.getElementById("q1").value = '';
    document.getElementById("q1ans").value = '';
    options.forEach(option => option.value = '');



    displayQuestions();
}

function displayQuestions() {
    const englishquestionContainer = document.getElementById("question-li");
    englishquestionContainer.innerHTML = "";
    
    emcq.forEach((s) => {
        const englishquestionDiv = document.createElement("div");
        englishquestionDiv.className = "question-box-english";
        englishquestionDiv.innerHTML = `
            ${s.q1}
        `;
        englishquestionContainer.append(englishequestionDiv);
    });
}
function clearQuestions() {
    emcq = [];
    localStorage.removeItem("emcq");
    displayQuestions();
}
document.addEventListener("DOMContentLoaded", displayQuestions);




// Script for Student Page



function EnglishStudentQuestions() {
    const englishStudentQuestionsDiv = document.getElementById("question-li");
    englishStudentQuestionsDiv.innerHTML = "";

    
    emcq = JSON.parse(localStorage.getItem("emcq")) || [];
    //  console.log(emcq)

    emcq.forEach((s, index) => {
        let div = document.createElement("div");
        div.className = "question-box-english";
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

        englishStudentQuestionsDiv.appendChild(div);
        
    });
}



document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    let allAnswered = true;

    // Check if any answer field is empty

    emcq.forEach((s, index) => {
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
    
    emcq.forEach((s, index) => {
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
    
    let totalQuestions = emcq.length;
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
        EnglishStudentQuestions();  
    } else {
        displayQuestions();
    }
});


