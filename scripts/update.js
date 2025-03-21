function updateQuestion()
{
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