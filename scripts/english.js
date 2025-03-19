
// English for Teacher Page


let emcq = JSON.parse(localStorage.getItem("emcq")) || [];

function createQuestion() {
    const eq1 = document.getElementById("eq1").value;
    const eans1 = document.getElementById("eans1").value;
    
    if (eq1 === "" || eans1 === "") {
        alert("Please Fill both Qustine and Answare.");
        return;
    }
    
    const question = {
        id: emcq.length + 1,
        eq1: eq1,
        eans1: eans1,
      
    };
    
    emcq.push(question);
    localStorage.setItem("emcq", JSON.stringify(emcq));
    
    displayQuestions();
}

function displayQuestions() {
    const questionContainer = document.getElementById("question-list");
    questionContainer.innerHTML = "";
    
    emcq.forEach((em) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-box-english";
        questionDiv.innerHTML = `
            ${em.eq1}
        `;
        questionContainer.append(questionDiv);
    });
}
function clearQuestions() {
    emcq = [];
    localStorage.removeItem("emcq");
    displayQuestions();
}

document.addEventListener("DOMContentLoaded", displayQuestions);


//English for student pages 

function englishStudentQuestions() {
    const englishStudentQuestionsDiv = document.getElementById("question-list");
   englishStudentQuestionsDiv.innerHTML = "";
   emcq = JSON.parse(localStorage.getItem("emcq")) || [];
    
   emcq.forEach((e, index) => {
        let div = document.createElement("div");
        div.className = "question-box-english";
        div.innerHTML = `
            ${e.eq1}
            <p><input type='text' id='enganswer${index}'></p>
        `;
       englishStudentQuestionsDiv.appendChild(div);
    });
}

document.getElementById("submit-answers").addEventListener("click", function(event) {
    event.preventDefault();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let correctAnswers = 0;
    emcq = JSON.parse(localStorage.getItem("emcq")) || [];
    
    // Check if any answer field is empty


    let allAnswered = true;
    emcq.forEach((e, index) => {
        let studentAnswer1 = document.getElementById(`enganswer${index}`);
        if (studentAnswer1.value === "") {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Please answer all the questions before submitting.");
        return;
    }
    
    emcq.forEach((e, index) => {
        let studentAnswer1 = document.getElementById(`enganswer${index}`);
        let studentValue = studentAnswer1.value;
        let resultSymbol = document.createElement("div");

        if (studentValue === e.eans1) {
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
    
    let totalQuestions = emcq.length;
    let resultText = `You got ${correctAnswers} out of ${totalQuestions} correct!`;
    resultsDiv.insertAdjacentHTML("beforeend", `<h3>${resultText}</h3>`);
});

document.addEventListener("DOMContentLoaded", StudentQuestions);

// restart the the calculation 

document.getElementById("restart").addEventListener("click", function() {
    let studentAnswer1Fields = document.querySelectorAll("[id^='enganswer']");
    studentAnswer1Fields.forEach(field => {
        field.value = ''; 
        field.style.backgroundColor = '';
        field.style.color = ''; 
    });
    document.getElementById("results").innerHTML = ''; 
});

document.addEventListener("DOMContentLoaded", function() {
    displayQuestions(); 
    englishStudentQuestions();
});






