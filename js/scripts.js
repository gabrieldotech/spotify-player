const musicProgress = document.getElementById("music-progress");
const progressTimeStart = document.querySelector(".progress-time-start");
const progressTimeEnd = document.querySelector(".progress-time-end");

musicProgress.addEventListener("input", function() {
    const progress = (this.value - this.min) / (this.max - this.min);
    const thumbPosition = `${progress * 100}%`;
    const colorStop = progress * 100;
    this.style.background = `linear-gradient(to right, white 0%, white ${thumbPosition}, #535252 ${thumbPosition}, #535252 100%)`;
    this.style.setProperty("--thumb-position", thumbPosition);
});

const audio = new Audio('audio/not_allowed.mp3');
const audioProgress = document.getElementById("music-progress");
const playButton = document.querySelector(".control-buttons .fa-play");
const forwardButton = document.querySelector(".control-buttons .fa-forward");
const backwardButton = document.querySelector(".control-buttons .fa-backward");

let isPlaying = false;
let progressInterval;

playButton.addEventListener("click", function() {
    if (!isPlaying) {
        isPlaying = true;
        this.classList.remove("fa-play");
        this.classList.add("fa-pause");
        audio.play();
        startProgress();
    } else {
        isPlaying = false;
        this.classList.remove("fa-pause");
        this.classList.add("fa-play");
        audio.pause();
        clearInterval(progressInterval);
    }
});

forwardButton.addEventListener("click", function() {
    audio.currentTime += 5; 
});

backwardButton.addEventListener("click", function() {
    audio.currentTime -= 5; 
});

audio.addEventListener("timeupdate", function() {
    updateProgress();
    updateColorAndThumb(); 
    updateProgressTime();
});

audioProgress.addEventListener("input", function() {
    const seekTime = (audio.duration / 100) * this.value;
    audio.currentTime = seekTime;
    updateProgress();
    updateColorAndThumb(); 
    updateProgressTime();
});

function startProgress() {
    function update() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        musicProgress.value = progressPercent;
        audioProgress.value = progressPercent; 
        updateProgressTime();
        requestAnimationFrame(update);
    }
    update();
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    audioProgress.value = progressPercent;
}

function updateColorAndThumb() {
    const progress = audio.currentTime / audio.duration;
    const colorStop = progress * 100;
    audioProgress.style.background = `linear-gradient(to right, white 0%, white ${colorStop}%, #535252 ${colorStop}%, #535252 100%)`;
}

function updateProgressTime() {
    const currentTime = audio.currentTime;
    const remainingTime = audio.duration - currentTime;
    progressTimeStart.textContent = formatTime(currentTime);
    progressTimeEnd.textContent = formatTime(remainingTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return (number < 10) ? `0${number}` : number;
}

audio.addEventListener("loadedmetadata", function() {
    progressTimeEnd.textContent = formatTime(audio.duration);
});


const repeatToggle = document.getElementById("repeatToggle");

let isRepeatEnabled = false; 

repeatToggle.addEventListener("click", function() {
    if (!isRepeatEnabled) {
        isRepeatEnabled = true;
        repeatToggle.style.color = "green"; 
    } else {
        isRepeatEnabled = false;
        repeatToggle.style.color = "black"; 
    }
});

audio.addEventListener("ended", function() {
    if (isRepeatEnabled) {
        audio.currentTime = 0;
        audio.play();
        isPlaying = true;
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        startProgress();
    } else {
        isPlaying = false;
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        clearInterval(progressInterval);
    }
});

const repeatToggle2 = document.getElementById("repeatToggle");

repeatToggle.addEventListener("click", function() {
    this.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("lyricsModal");
    const closeBtn = document.querySelector("#lyricsModal .close");
    const lyricsButton = document.getElementById("lyricsButton");

    lyricsButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

audio.addEventListener("timeupdate", function() {
    if (!isNaN(audio.duration)) {
        updateLyrics(Math.floor(audio.currentTime));
    }
});

function updateLyrics(timeInSeconds) {
    const lyricsText = document.getElementById("lyricsText");
    const lyrics = [
        { time: 0, text: "Now you suck", translation: "(Agora você não presta!)" },
        { time: 2.2, text: "We wanna talk about sex but we're not allowed", translation: "(Queremos falar sobre sexo, mas não temos permissão)" },
        { time: 7, text: "Well, you may not like it but you better learn how 'cause it's your turn now", translation: "(Bem, você pode não gostar, mas é melhor você aprender)" },
        { time: 13, text: "You're wasting your tongue with lame excuses and lies", translation: "(Você está desperdiçando sua língua com desculpas esfarrapadas e mentiras)" },
        { time: 19, text: "So how should I begin this?", translation: "(Então, como devo começar isso?)" },
        { time: 21, text: "I guess it started when you were with him", translation: "(Eu acho que começou quando você estava com ele)" },
        { time: 23, text: "And how he never even took you out to dance", translation: "(E como ele nunca te levou para dançar)" },
        { time: 26, text: "But did he fuck with any rhythm?", translation: "(Mas ele fodia com algum ritmo?)" },
        { time: 29, text: "But now he's playing with your head", translation: "(Mas agora ele está brincando com a sua cabeça)" },
        { time: 31, text: "But did he ever make you cum?", translation: "(Ele alguma vez te fez gozar?)" },
        { time: 33, text: "Did he ever make you cry?", translation: "(Ele alguma vez te fez chorar?)" },
        { time: 36, text: "Do the wires in your mind get sewn together", translation: "(Fez os fios em sua mente serem costurados juntos)" },
        { time: 39, text: "Rubbed and severed by the heat", translation: "(Se desgastarem e serem cortados pelo calor)" },
        { time: 41, text: "You don't know how long I could stare into your picture", translation: "(Você não sabe por quanto tempo eu poderia ficar olhando para a sua foto)" },
        { time: 45, text: "And wish that it was me", translation: "(Desejando que fosse eu)" },
        { time: 46.8, text: "I guess it's different 'cause you love him", translation: "(Eu acho que é diferente porque você o ama)" },
        { time: 49, text: "But I've got an interactive", translation: "(Mas eu tenho uma interativa)" },
        { time: 52, text: "Sick and twisted imagination", translation: "(Imaginação doentia e distorcida)" },
        { time: 54, text: "And that's gotta count for something", translation: "(E isso tem que contar para algo)" },
        { time: 57, text: "We wanna talk about sex but we're not allowed", translation: "(Queremos falar sobre sexo, mas não temos permissão)" },
        { time: 62, text: "Well you may not like it but you'd better learn how 'cause it's your turn now", translation: "(Bem, você pode não gostar, mas é melhor você aprender)" },
        { time: 68, text: "You're wasting your tongue with lame excuses and lies", translation: "(Você está desperdiçando sua língua com desculpas esfarrapadas e mentiras)" },
        { time: 71, text: "Get your face between my thighs", translation: "(Coloque seu rosto entre minhas coxas!)" },
        { time: 73, text: "I dreamt I was standing in your doorstep", translation: "(Eu sonhei que estava parado na sua porta)" },
        { time: 75, text: "Licking sweat off of your forehead", translation: "(Lambendo o suor da sua testa)" },
        { time: 78, text: "With your finger in my mouth", translation: "(Com seu dedo na minha boca)" },
        { time: 80, text: "And the sound when leather jackets hit the ground", translation: "(E o som quando as jaquetas de couro atingem o chão)" },
        { time: 83, text: "You should hear when you're not around", translation: "(Você deve ouvir quando não estiver por perto)" },
        { time: 86, text: "When it's just us horny poets", translation: "(Quando somos apenas nós, poetas com tesão)" },
        { time: 88, text: "Who can't wait to write it down", translation: "(Que não podem esperar para escrever isso)" },
        { time: 90, text: "And swear we were only being honest", translation: "(E juro que estávamos apenas sendo honestos)" },
        { time: 93, text: "Do you like these little sonnets", translation: "(Você gosta desses pequenos sonetos)" },
        { time: 95, text: "'Cause I wrote them just for you", translation: "(Porque eu os escrevi só para você)" },
        { time: 97, text: "But how quickly they turn sour", translation: "(Mas com rapidez eles azedam)" },
        { time: 99, text: "So be careful who you screw", translation: "(Portanto, tome cuidado com quem você fode)" },
        { time: 102.8, text: "And never call", translation: "(E você nunca chama)" },
        { time: 105, text: "And I'm starting to suspect", translation: "(E estou começando a suspeitar)" },
        { time: 107, text: "You don't intend to do anything you say at all", translation: "(Você não pretende fazer nada do que disse)" },
        { time: 112, text: "We wanna talk about sex but we're not allowed", translation: "(Queremos falar sobre sexo, mas não temos permissão)" },
        { time: 117, text: "Well you may not like it but you'd better learn how 'cause it's your turn now", translation: "(Bem, você pode não gostar, mas é melhor você aprender)" },
        { time: 123, text: "You're wasting your tongue with lame excuses and lies", translation: "(Você está desperdiçando sua língua com desculpas esfarrapadas e mentiras)" },
        { time: 128, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 130.5, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 133, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 135, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 138, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 140, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 142, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 144, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 147, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 149, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 151, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 153, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 156, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 158, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
        { time: 160, text: "All by yourself, sittin' alone", translation: "(Completamente por si mesmo, sentado sozinho)" },
        { time: 163, text: "I hope we're still friends, yeah, I hope you don't mind", translation: "(Espero que ainda sejamos amigos, sim, espero que você não se importe)" },
    ];


    let currentLyric = "";
    let currentTranslation = "";
    for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].time <= timeInSeconds) {
            currentLyric = lyrics[i].text;
            currentTranslation = lyrics[i].translation; 
        } else {
            break;
        }
    }


lyricsText.innerHTML = `<p class="lyric">${currentLyric}</p><p class="translation">${currentTranslation}</p>`
}

audio.addEventListener("timeupdate", function() {
    updateLyrics(Math.floor(audio.currentTime));
});
