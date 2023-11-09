// Iteration 1: Declare variables required for this game

const time = document.getElementById("timer")
const gameBody = document.getElementById("game-body")
const lives = document.getElementById("lives")

// Iteration 1.2: Add shotgun sound

const shotgunSound = new Audio("./assets/shotgun.wav")
shotgunSound.volume = 0.2

gameBody.onclick =()=>{
    shotgunSound.pause()
    shotgunSound.currentTime = 0
    shotgunSound.play()
}

// Iteration 1.3: Add background sound

const backgroundSound = new Audio("./assets/bgm.mp3")
backgroundSound.play()
backgroundSound.loop = true;

// Iteration 1.4: Add lives

var maxLives = 4
var nooflives = 4

// Iteration 2: Write a function to make a zombie

function makeZombie(){
    let index = randomInt(1,6)
    let zombie = document.createElement("img")
    zombie.src = `./assets/zombie-${index}.png`
    zombie.setAttribute("class" , "zombie-image")
    // zombie.setAttribute("id" , index)

     
    zombie.style.left = `${randomInt(20,65)}vw`
    zombie.style.animation = `flying ${randomInt(2,5)}s infinite ease-in`
    gameBody.append(zombie)
    
    zombie.addEventListener("click" , ()=>{
        destroyZombie(zombie)
    })

    
    // checkcollision(zombie)
}



// Iteration 3: Write a function to check if the player missed a zombie

function checkcollision(zombie){
    if (zombie.getBoundingClientRect().top <= 0){
        nooflives--
        zombie.remove()
        // console.log(lives)
        return true;
    }else{
        return false;
    }
    
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function destroyZombie(zombie){
    zombie.remove()
    makeZombie()
}

// Iteration 5: Creating timer

var timerID;

function timer(){
    let a = 60;
    timerID = setInterval(()=>{
        time.innerHTML = a;
        a--
        
        let zombie = document.querySelector(".zombie-image")
        if (checkcollision(zombie) == true){
            destroyZombie(zombie)

            if (nooflives == 0){
                location.href = "game-over.html"
            }
        }

        if (a == -1){
            // clearInterval()
            location.href = "win.html"
        }
    } , 1000)
}


// Iteration 6: Write a code to start the game by calling the first zombie


timer()
makeZombie()



// Iteration 7: Write the helper function to get random integer

function randomInt(min , max){
    let diff = max-min
    let rand = Math.floor(Math.random()*diff)
    rand = rand + min
    return rand
}
