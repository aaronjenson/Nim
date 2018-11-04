var tokens_left = 13;
var responses = [];

function onStart() {
    tokens_left = 13;
    responses = ["You go first. Take some tokens", "Try to take the last one..."];
    drawTokens();
    drawResponses();
}

function drawTokens() {
    document.getElementById("tokens-left").innerText = "x".repeat(tokens_left);
}

function take(num, name) {
    num = Math.min(num, 3);
    num = Math.max(num, 1);
    if (tokens_left - num >= 0) {
        tokens_left -= num;
    }
    drawTokens();
    addResponse(name + " took " + num + (num !== 1 ? " tokens" : " token"));
    if (tokens_left === 0) {
        addResponse(name + " won!");
    }
}

function userTake(num) {
    take(num, "You");
    if (tokens_left !== 0) {
        setTimeout(computerTake, 1000);
    }
}

function computerTake() {
    var num = tokens_left % 4;
    take(num > 0 && num < 4 ? num : Math.ceil(Math.random() * 3), "Computer");
}

function addResponse(response) {
    responses.unshift(response);
    if (responses.length > 5) {
        responses.pop();
    }
    drawResponses();
}

function drawResponses() {
    document.getElementById("response").innerText = responses.join("\n");
}