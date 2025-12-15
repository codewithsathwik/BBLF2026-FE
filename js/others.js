// terms and condition
let numSpan = document.querySelectorAll(".term-num");
let conditions = document.querySelectorAll(".condition");
let conditionNum = 0;

conditions.forEach((condition) => {
    let numSpan = condition.querySelectorAll(".term-num");
    conditionNum += 1;
    numSpan.forEach((numSpan) => {
        numSpan.textContent = conditionNum;
    });
});

