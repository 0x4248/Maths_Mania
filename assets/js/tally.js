// ===========tally===========
async function add_question_tally(){
    question_tally = question_tally + 1
    document.getElementById("correct_tally").innerHTML = "Questions Correct: "+question_tally
}
async function add_tries_tally(){
    tries_tally = tries_tally + 1
    document.getElementById("tries_tally").innerHTML = "Tries: "+tries_tally
}
