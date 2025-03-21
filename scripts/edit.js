const textBoxContainer = document.getElementById('textBoxContainer');
const addOptionButton = document.getElementById('addoption');
const createQuestionButton = document.getElementById('createQuestionButton');


let smcq = JSON.parse(localStorage.getItem("smcq")) || [];
let options = []; 
let editIndex = -1;  