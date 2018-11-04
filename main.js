var tokens_left = 13;
var responses = [];
var game_in_progress = false;
var computers_turn = false;

function onStart() {
    game_in_progress = true;
    computers_turn = false;
    tokens_left = 13;
    responses = ["You go first. Take some tokens", "Try to take the last one..."];
    updateButtons();
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
        game_in_progress = false;
        addResponse(name + " won!");
    }
    updateButtons();
}

function userTake(num) {
    computers_turn = true;
    take(num, "You");
    if (tokens_left !== 0) {
        setTimeout(computerTake, 1000);
    }
}

function computerTake() {
    var num = tokens_left % 4;
    computers_turn = false;
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

function updateButtons() {
    var one = document.getElementById("button-one");
    var two = document.getElementById("button-two");
    var three = document.getElementById("button-three");
    var reset = document.getElementById("reset-game");

    switch (tokens_left) {
        case 0:
            one.disabled = true;
            two.disabled = true;
            three.disabled = true;
            break;
        case 1:
            one.disabled = computers_turn;
            two.disabled = true;
            three.disabled = true;
            break;
        case 2:
            one.disabled = computers_turn;
            two.disabled = computers_turn;
            three.disabled = true;
            break;
        default:
            one.disabled = computers_turn;
            two.disabled = computers_turn;
            three.disabled = computers_turn;
    }

    hideshow(one, !game_in_progress);
    hideshow(two, !game_in_progress);
    hideshow(three, !game_in_progress);
    reset.innerText = game_in_progress ? "Reset game" : "Start game";
}

function hideshow(elem, hidden) {
    elem.style.visibility = hidden ? "hidden" : "visible";
}