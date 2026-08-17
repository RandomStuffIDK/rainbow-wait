let timer = null;

let totalSeconds = 300;
let remainingSeconds = 300;

const ring =
document.querySelector(".progress-ring");

function formatTime(seconds){

    const mins =
    Math.floor(seconds / 60);

    const secs =
    seconds % 60;

    return (
        String(mins).padStart(2,"0")
        + ":"
        +
        String(secs).padStart(2,"0")
    );

}

function buildRainbow(angle){

    return `
    conic-gradient(
      #ff4d4d 0deg,
      #ff4d4d ${angle/6}deg,

      #ff9933 ${angle/6}deg,
      #ff9933 ${angle/3}deg,

      #ffff66 ${angle/3}deg,
      #ffff66 ${angle/2}deg,

      #66ff66 ${angle/2}deg,
      #66ff66 ${(angle*2)/3}deg,

      #6699ff ${(angle*2)/3}deg,
      #6699ff ${(angle*5)/6}deg,

      #cc66ff ${(angle*5)/6}deg,
      #cc66ff ${angle}deg,

      #e0e0e0 ${angle}deg,
      #e0e0e0 360deg
    )
    `;

}

function updateDisplay(){

    document
    .getElementById(
        "timeDisplay"
    )
    .textContent =
    formatTime(
        remainingSeconds
    );

    let progress =
    (
        totalSeconds -
        remainingSeconds
    )
    /
    totalSeconds;

    progress =
    Math.max(
        0,
        Math.min(progress,1)
    );

    const angle =
    progress * 360;

    ring.style.background =
    buildRainbow(angle);

    if(
        remainingSeconds <= 0
    ){

        clearInterval(
            timer
        );

        document
        .getElementById(
            "celebration"
        )
        .classList
        .remove("hidden");
    }

}

function startTimer(){

    clearInterval(
        timer
    );

    totalSeconds =
    parseInt(
        document
        .getElementById(
            "minutesInput"
        )
        .value
    ) * 60;

    remainingSeconds =
    totalSeconds;

    document
    .getElementById(
        "celebration"
    )
    .classList
    .add("hidden");

    updateDisplay();

    timer =
    setInterval(()=>{

        remainingSeconds--;

        updateDisplay();

    },1000);

}

function pauseTimer(){

    clearInterval(
        timer
    );

}

function resetTimer(){

    clearInterval(
        timer
    );

    remainingSeconds =
    totalSeconds;

    document
    .getElementById(
        "celebration"
    )
    .classList
    .add("hidden");

    updateDisplay();
}

function addTime(minutes){

    remainingSeconds +=
    minutes * 60;

    totalSeconds +=
    minutes * 60;

    updateDisplay();
}

function setPreset(minutes){

    document
    .getElementById(
        "minutesInput"
    )
    .value =
    minutes;
}

function changeTheme(){

    const theme =
    document
    .getElementById(
        "themeSelect"
    )
    .value;

    const display =
    document
    .getElementById(
        "themeDisplay"
    );

    display.className =
    "theme-display";

    if(theme === "rocket"){

        display.textContent =
        "🚀";

        display.classList.add(
            "rocket-theme"
        );

    }
    else if(
        theme === "hourglass"
    ){

        display.textContent =
        "⏳";

        display.classList.add(
            "hourglass-theme"
        );

    }
    else{

        display.textContent =
        "🌈";

        display.classList.add(
            "rainbow-theme"
        );

    }
}

function toggleTVMode(){

    document.body.classList
    .toggle(
        "tv-mode"
    );

}

changeTheme();
updateDisplay();
