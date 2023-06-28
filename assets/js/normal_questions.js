// ===========variables===========
var n1 = 0
var n2 = 0
var question_tally = 0
var tries_tally = 0
var type = ""
var num_max = 20

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
async function opacity_to_100(id){
    var opacity = 0
    for (let i = 0; i < 25; i++) {
        document.getElementById(id).style.opacity = opacity+"%"
        opacity = opacity + 4
        await sleep(10)
    } 
}
async function opacity_to_0(id){
    var opacity = 100
    for (let i = 0; i < 25; i++) {
        document.getElementById(id).style.opacity = opacity+"%"
        opacity = opacity - 4
        await sleep(10)
    }
}

async function start_game(){
    num_max = 20
    await opacity_to_0("main")
    var doc = `<p id="result" class="result">Please answer the question</p>
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
    await opacity_to_100("main")


}

// ===========question check===========
async function add_check(){
    var opacity = 100
    if(document.getElementById("answer").value == n1+n2){
        await opacity_to_0("result")
        document.getElementById("result").innerHTML = "Correct"
        document.getElementById("result").style.color = "green"
        new_question()
        await opacity_to_100("result")
        add_question_tally()
        add_tries_tally()
        num_max = num_max + 2
        document.getElementById("answer").style.color = "black"
        document.getElementById("answer").value = ""
    } else {
        add_tries_tally()
        await opacity_to_0("result")
        document.getElementById("result").innerHTML = "Incorrect"
        document.getElementById("result").style.color = "red"
        document.getElementById("answer").style.color = "red"
        await opacity_to_100("result")
        if (num_max > 2){
            num_max = num_max - 2
        }
    }
    clear()
}
async function subtract_check(){
    var opacity = 100
    if(document.getElementById("answer").value == n1-n2){
        await opacity_to_0("result")
        new_question()
        document.getElementById("result").innerHTML = "Correct"
        document.getElementById("result").style.color = "green"
        await opacity_to_100("result")
        add_question_tally()
        add_tries_tally()
        num_max = num_max + 2
        document.getElementById("answer").style.color = "black"
        document.getElementById("answer").value = ""
    } else {
        add_tries_tally()
        await opacity_to_0("result")
        document.getElementById("result").innerHTML = "Incorrect"
        document.getElementById("result").style.color = "red"
        document.getElementById("answer").style.color = "red"
        await opacity_to_100("result")
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
    await opacity_to_0("result")
    document.getElementById("result").innerHTML = "Please answer the question"
    document.getElementById("result").style.color = "black"
    document.getElementById("answer").style.color = "black"
    await opacity_to_100("result")

}



async function new_question(){
    await opacity_to_0("question")
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
    await opacity_to_100("question")
}

async function menu(){
    await opacity_to_0("body")
    document.getElementById("body").style.opacity = "0%"
    window.location.reload()
}
