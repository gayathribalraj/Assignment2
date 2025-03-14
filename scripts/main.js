const problems = [
	{
		id: 1,
		num1: 10,
		num2: 20,
		operator: "+",
		ans: "0",
	},
];

const questionContainer = document.getElementById("question-container");

problems.forEach((p) => {
	const questionDiv = document.createElement("div");
	questionDiv.id = p.id;
	questionDiv.style.width = "100px";
	questionDiv.style.height = "100px";
	questionDiv.style.backgroundColor = "yellow";
	questionContainer.append(questionDiv);
});
