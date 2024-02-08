let index = 0;
let questions = [];
let score = 0;
let select = document.querySelector("select").value;
let input = document.querySelectorAll("input[type='radio']");
let numQues = document.querySelector("#numQues");
let btn = document.querySelector("#startQuezz");

async function getData(category, num, level) {
  let data = await fetch(
    `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${level}&type=boolean`
  );
  let res = await data.json();
  questions = res.results;
  display(questions);
  console.log(questions);
}

btn.addEventListener("click", function () {
  let level = Array.from(input).find((e) => e.checked).value;
  getData(select, numQues.value, level);
  $("#showSetting").fadeOut(1000, function() {
    $("#showQues").fadeIn(1000)
  });
});

function display() {
  let current = questions[index];
  document.querySelector("#display").innerHTML = `<h2>Question ${
    index + 1
  }: <span>${current.question}</span></h2>`;
}

function nextAnswer(answer) {
  if (index < questions.length - 1) {
    index++;
    display();

    if (questions[index].correct_answer == "True") {
      score++;
    }
  } else {
    document.querySelector(
      "#display"
    ).innerHTML = `<h2 class="text-center">You Score Is : ${score}</h2>`;
    $("button").remove();
  }
}

// $("#startQuezz").on("click", function () {
//   if (!numQues.value == "") {
//     $("#showSetting").addClass("animate__backOutDown", function () {
//       $("#showSetting").removeClass("d-flex").addClass("d-none")
//     });
//   }
// });
