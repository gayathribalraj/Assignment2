
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



