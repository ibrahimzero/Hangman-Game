// my letters
const letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
lettersContainer=document.querySelector('.letters');
//generat etters
lettersArray.forEach(letter=>{
    let span =document.createElement('span');
    let theLetter=document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className="letter-box";
    lettersContainer.appendChild(span);

})
const words={
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// random property
let allKeys=Object.keys(words);
let random=Math.floor(Math.random()*allKeys.length);
let randomName=allKeys[random];
let randompropValue=words[randomName];
let randomValueNumber=Math.floor(Math.random()*randompropValue.length);
let randomvalue= randompropValue[randomValueNumber];
let counter=0;
theDraw=document.querySelector('.hangman-draw');
//game info
document.querySelector('.game-info span').innerHTML=randomName;

let lettersGess=document.querySelector('.letters-guess');
let lettersAndSpace=Array.from(randomvalue);
let wrongAttemps=0;
//select drw element

lettersAndSpace.forEach(letter=>{
    let emptySpan = document.createElement('span');
    if(letter==' '){
        emptySpan.className='with-space';
        counter++
    }
    lettersGess.appendChild(emptySpan);
})
let letterSchosen=Array.from(randomvalue.toLowerCase());
let guessSpan=document.querySelectorAll('.letters-guess span');

//handle clicking on the letters
document.addEventListener('click',function(e){
    var status=false;
    let clickedLetter= e.target.innerHTML.toLowerCase();
    if(e.target.className==='letter-box'){
        e.target.classList.add('clicked')
    
    letterSchosen.forEach((letter,wordIndex)=>{
        if(clickedLetter==letter){
            //status 
            counter++;
             status=true;
             
            guessSpan.forEach((span,spanIndex)=>{
                if(wordIndex==spanIndex){
                    span.innerHTML=clickedLetter;
                    
                }
            });    
        }
    })
    //outsid the loop
    if(status!==true){
        //increes wrong attempts
        wrongAttemps++;
        theDraw.classList.add(`wrong-${wrongAttemps}`);
        //fail sound
        document.getElementById('fail').play();
        if(wrongAttemps==8){
            endGame();
            lettersContainer.classList.add("finished");
        }
        
        
    }else{
        document.getElementById('success').play();
        if(counter===randomvalue.length){
            winer();
            lettersContainer.classList.add("finished");
            document.getElementById('win').play();
        }
    }
    }
})
// end game function
function endGame(){
    let div =document.createElement("div");
    let text=document.createTextNode(`Game over the text is :${randomvalue}`);
    div.appendChild(text);

div.className='popup';
document.body.appendChild(div)
}
function winer(){
    let div =document.createElement("div");
    let text=document.createTextNode(`Congratulations, you won`);
    div.appendChild(text);

div.className='win-popup';
document.body.appendChild(div)
}

