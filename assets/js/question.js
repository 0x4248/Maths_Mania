// ===========variables===========
let n1 = 0
let question_tally = 0
let tries_tally = 0
let type = ""
let num_max = 20
// ===========modules===========
function RandomInt(min,max) {
    //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(ms) {
    //https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start(){
    var doc = `<p id="result" class="result"></p>
    <p id="question" class="question"></p>
    <input class="answer" id="answer" type="number" placeholder="Answer" max="9999" min="0">
    <br>
    <button onclick="submit()">Check</button>
    <button onclick="new_question()">Skip</button>
    <button onclick="menu()">menu</button>
    <p id="tries_tally" style="margin-bottom: 0px;">Tries:</p>
    <p id="correct_tally" style="margin-top: 0px;">Questions Correct:</p>`
    document.getElementById("main").innerHTML = doc
    new_question()
    var enter = document.getElementById("answer");
    enter.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            submit()
        }
    });


}

// ===========question check===========
async function add_check(){
        if(document.getElementById("answer").value == n1+n2){
            document.getElementById("result").innerHTML = "Correct"
            document.getElementById("result").style.color = "green"
            new_question()
            add_question_tally()
            add_tries_tally()
            num_max = num_max + 2
            document.getElementById("answer").style.color = "black"
            document.getElementById("answer").value = ""
        } else {
            add_tries_tally()
            document.getElementById("result").innerHTML = "Incorrect"
            document.getElementById("result").style.color = "red"
            document.getElementById("answer").style.color = "red"
            if (num_max > 2){
                num_max = num_max - 2
            }
        }
    clear()
}
async function subtract_check(){
    if(document.getElementById("answer").value == n1-n2){
        document.getElementById("result").innerHTML = "Correct"
        document.getElementById("result").style.color = "green"
        new_question()
        add_question_tally()
        add_tries_tally()
        num_max = num_max + 2
        document.getElementById("answer").style.color = "black"
        document.getElementById("answer").value = ""
    } else {
        add_tries_tally()
        document.getElementById("result").innerHTML = "Incorrect"
        document.getElementById("result").style.color = "red"
        document.getElementById("answer").style.color = "red"
        if (num_max > 2){
            num_max = num_max - 2
        }
    }
clear()
}
async function submit(){
    if(type == "add"){
        add_check()
    } else {
        subtract_check()
    }
}

// ===========messages and question===========
async function clear(){
    await sleep(1000)
    document.getElementById("result").innerHTML = ""
    document.getElementById("result").style.color = "black"
    document.getElementById("answer").style.color = "black"
}



async function new_question(){
    type = "add"
    if(RandomInt(0,1) == 1){
        type = "subtract"
    }
    if(type == "add"){
        n1 = RandomInt(1,num_max)
        n2 = RandomInt(1,num_max)
        document.getElementById("question").innerHTML = n1+" + "+n2+"="

    }
    if(type == "subtract"){
        n1 = RandomInt(num_max+1,num_max+3)
        n2 = RandomInt(1,num_max+1)
        document.getElementById("question").innerHTML = n1+" - "+n2+"="
    }
}

async function menu(){
    window.location.reload()
}
// ===========script===========