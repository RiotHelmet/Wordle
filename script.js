document.addEventListener("keydown", write);

let current_typing = [];
let wordList = [
  "stair",
  "fault",
  "mower",
  "apple",
  "wheat",
  "about",
  "above",
  "admit",
  "adult",
  "after",
  "again",
  "agent",
  "agree",
  "allow",
  "alone",
  "along",
  "among",
  "apply",
  "argue",
  "avoid",
  "begin",
  "board",
  "break",
  "bring",
  "build",
  "carry",
  "catch",
  "cause",
  "chair",
  "check",
  "child",
  "civil",
  "claim",
  "class",
  "clear",
  "chant",
  "close",
  "coach",
  "color",
  "could",
  "court",
  "cover",
  "crime",
  "death",
  "dream",
  "drive",
  "early",
  "eight",
  "enjoy",
  "enter",
  "event",
  "every",
  "exist",
  "field",
  "fight",
  "first",
  "floor",
  "focus",
  "force",
  "front",
  "great",
  "green",
  "group",
  "guess",
  "happy",
  "heart",
  "heavy",
  "hotel",
  "house",
  "human",
  "image",
  "issue",
  "large",
  "later",
  "laugh",
  "learn",
  "least",
  "leave",
  "legal",
  "light",
  "local",
  "major",
  "maybe",
  "media",
  "might",
  "model",
  "money",
  "month",
  "mouth",
  "movie",
  "music",
  "never",
  "night",
  "north",
  "occur",
  "often",
  "order",
  "other",
  "owner",
  "paper",
  "party",
  "peace",
  "phone",
  "piece",
  "place",
  "plant",
  "point",
  "power",
  "price",
  "prove",
  "quite",
  "radio",
  "raise",
  "range",
  "reach",
  "ready",
  "right",
  "scene",
  "score",
  "sense",
  "serve",
  "seven",
  "shake",
  "share",
  "shoot",
  "short",
  "since",
  "skill",
  "small",
  "smile",
  "sound",
  "south",
  "space",
  "speak",
  "spend",
  "sport",
  "staff",
  "stage",
  "stand",
  "start",
  "state",
  "still",
  "stock",
  "store",
  "story",
  "study",
  "stuff",
  "style",
  "table",
  "teach",
  "thank",
  "their",
  "there",
  "these",
  "thing",
  "think",
  "third",
  "those",
  "three",
  "throw",
  "today",
  "total",
  "tough",
  "trade",
  "trial",
  "truth",
  "under",
  "until",
  "value",
  "visit",
  "voice",
  "watch",
  "water",
  "where",
  "which",
  "while",
  "white",
  "whole",
  "whose",
  "woman",
  "world",
  "worry",
  "would",
  "write",
  "wrong",
  "young",
];

let alphabet = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "å",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "ö",
  "ä",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
let word_divided = [];
let word = wordList[Math.floor(Math.random() * 181)];
let currentRow = 0;
function write(e) {
  if (hasWon === false) {
    console.log(current_typing);
    update(e);
  }
}

let hasWon = false;

let alertbox = document.getElementById("Alert");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let rightGuess = [];

function update(e) {
  if (hasWon === false) {
    if (currentRow === 6) {
      displayAlert(`You lost: ${word}`, 10);
    }

    if (currentRow < 6) {
      if (is_in(e.key, alphabet) == true) {
        if (current_typing.length < 5) {
          bopItem(current_typing.length + 5 * currentRow);
          current_typing.push(e.key.toUpperCase());
        }
        update_frame();
      }

      if (e.key == "Enter") {
        console.clear;
        if (is_in(current_typing.join(""), wordList)) {
          guess(current_typing);
        } else {
          shakeRow();
          displayAlert("Not a word", 2);
        }
      }

      if (e.key == "Backspace") {
        pop(current_typing);
        update_frame();
      }
    }
  } else {
    win();
    document
      .getElementById("4")
      .addEventListener("animationend", displayAlert("You won!!", 10));
  }
}

function is_in(x, list) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].toLowerCase() == x.toLowerCase()) {
      return true;
    }
  }
}

function pop(array) {
  let last = array[array.length - 1];
  array.length = array.length > 0 ? array.length - 1 : 0;
  return last;
}

function update_frame() {
  if (currentRow === 6) {
    displayAlert(`You lost: ${word}`, 10);
  }
  console.log(currentRow);
  if (currentRow < 6) {
    for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
      document.getElementById(`front${i}`).innerHTML = "";
      document.getElementById(`${i}`).style.border = null;
    }
    for (var i = 0, len = current_typing.length; i < len; i++) {
      document.getElementById(
        `front${i + 5 * currentRow}`
      ).innerHTML = `<h1 class="child">${current_typing[i]}</h1>`;
    }
    for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
      document.getElementById(`back${i}`).innerHTML = "";
    }
    for (var i = 0, len = current_typing.length; i < len; i++) {
      document.getElementById(
        `back${i + 5 * currentRow}`
      ).innerHTML = `<h1 class="child">${current_typing[i]}</h1>`;
      document.getElementById(`${i + 5 * currentRow}`).style.border =
        "solid #565758 2px";
    }
  }
}

async function guess(input) {
  rightGuess = [];
  word_divided = word.split(``);
  console.log(word_divided);

  for (var i = 0, len = 5; i < len; i++) {
    console.log(i + 5 * currentRow);
    if (input[i].toLowerCase() === word[i].toLowerCase()) {
      document.getElementById(
        `back${i + 5 * currentRow}`
      ).style.backgroundColor = "#538d4e";
      document.getElementById(
        `front${i + 5 * currentRow}`
      ).style.backgroundColor = "#538d4e";
      document.getElementById(`${i + 5 * currentRow}`).style.border = null;
      document.getElementById(`${i + 5 * currentRow}`).style.border =
        "solid #538d4e 2px";
      flipItem(i + 5 * currentRow);
      rightGuess.push("i");
      // -
      // -
      // -
      // -
      // -
    } else if (is_in(input[i], word_divided) === true) {
      document.getElementById(
        `back${i + 5 * currentRow}`
      ).style.backgroundColor = "#b59f3b";
      document.getElementById(
        `front${i + 5 * currentRow}`
      ).style.backgroundColor = "#b59f3b";
      document.getElementById(`${i + 5 * currentRow}`).style.border = null;
      document.getElementById(`${i + 5 * currentRow}`).style.border =
        "solid #b59f3b 2px";
      flipItem(i + 5 * currentRow);
      // -
      // -
      // -
      // -
      // -
    } else {
      document.getElementById(
        `back${i + 5 * currentRow}`
      ).style.backgroundColor = "#3a3a3c";
      document.getElementById(
        `front${i + 5 * currentRow}`
      ).style.backgroundColor = "#3a3a3c";
      document.getElementById(`${i + 5 * currentRow}`).style.border = null;
      document.getElementById(`${i + 5 * currentRow}`).style.border =
        "solid #3a3a3c 2px";
      flipItem(i + 5 * currentRow);
      // -
      // -
      // -
      // -
      // -
    }
    await sleep(250);
  }
  if (rightGuess.length === 5) {
    hasWon = true;
    update();
  }
  current_typing = [];
  currentRow += 1;
}

function shakeRow() {
  for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
    document.getElementById(`${i}`).style.animation = "shake 0.5s ease-in";
  }
  setTimeout(function () {
    for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
      document.getElementById(`${i}`).style.animation = null;
    }
  }, 1000);
}

function flipItem(item) {
  document.getElementById(`${item}`).style.animation = "flip 0.25s ease-in";
  setTimeout(function () {
    document.getElementById(`${item}`).style.animation = null;
  }, 1000);
}

function bopItem(item) {
  document.getElementById(`${item}`).style.animation = "bop 0.1s ease-in";
  setTimeout(function () {
    document.getElementById(`${item}`).style.animation = null;
  }, 1000);
}
async function win() {
  for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
    document.getElementById(`${i}`).style.animation = "win 1s ease-in";
    setTimeout(function () {
      document.getElementById(`${i}`).style.animation = null;
    }, 1000);
    await sleep(200);
  }
}

async function displayAlert(message, time) {
  alertbox.innerHTML = `<h1 style="color: black; font-size: 20px;">${message}</h1>`;
  alertbox.style.animation = `hide ${time}s ease-in`;
  setTimeout(function () {
    alertbox.style.animation = null;
  }, time * 1000);
}
