// טיימר גלובלי
let timerInterval;
let secondsPassed = 0;

function stopTimer() {
  clearInterval(timerInterval);
}

// כאשר הדף נטען
document.addEventListener("DOMContentLoaded", () => {
   // טוען את הנתונים בטבלה ושומר אותם לנצח
   const savedScores = JSON.parse(localStorage.getItem("userScores")) || [];
  if (savedScores && savedScores.length > 0) {
    updateTopScores();
    const table = document.getElementById("win").getElementsByTagName("tbody")[0];
    const userRowsStart = 3;
    const scoreRowsEnd = userRowsStart + 4;
    const sorted = [...savedScores].sort((a, b) => parseInt(a.time) - parseInt(b.time)).slice(0, 3);
    for (let i = 0; i < sorted.length; i++) {
      const row = table.rows[i];
      if (row) {
        row.cells[1].textContent = sorted[i].name;
        row.cells[2].textContent = sorted[i].time;
      }
    }

    for (let i = 0; i < savedScores.length; i++) {
      const row = table.rows[userRowsStart + i];
      if (row) {
        row.cells[1].textContent = savedScores[i].name;
        row.cells[2].textContent = savedScores[i].time;
      }
    }
  }

  const allImages = document.querySelectorAll(".item img");// כל התמונות בדף
  const slider = document.querySelector(".slider");// סליידר התמונות
  const sliderImages = document.querySelectorAll(".slider img");// כל התמונות בסליידר
  const banner = document.querySelector(".banner");// באנר התמונות
  const bannerImages = document.querySelectorAll(".banner img");// כל התמונות בבאנר
  const gameBoard = document.getElementById("game-board");// לוח המשחק
  const instructionText = document.getElementById("text");// טקסט ההוראות
  const winTable = document.getElementById("win");// טבלת הניצחון
  const instructionsDiv = document.querySelector(".instructions");// מחלקת ההוראות
  const buttonsDiv = document.querySelector(".buttons");// מחלקת הכפתורים 
  const radioDiv = document.querySelector(".choosNext");// מחלקת הכפתורים בסיום המשחק

  const lionRoar = new Audio("sounds/lion-roar.mp3");// צליל של שאגת אריה
  lionRoar.volume = 0.5; // הגדרת עוצמת הצליל 
  const dinosaurRoar = new Audio("sounds/dragon-roar.mp3");// צליל של שאגת דינוזואר
  dinosaurRoar.volume = 0.5; // הגדרת עוצמת הצליל 
  const dragonRoar = new Audio("sounds/dinosaur-roar.mp3"); // צליל של שאגת דרקון
  dragonRoar.volume = 0.5; // הגדרת עוצמת הצליל 
  const snakeHiss = new Audio("sounds/snake-hissing.mp3");  // צליל של חיסת נחש
  snakeHiss.volume = 0.5; // הגדרת עוצמת הצליל  

  allImages.forEach(img => {//
    img.addEventListener("click", () => {
      slider.style.animation = "none"; // ביטול האנימציה של הסליידר
      banner.style.transition = "opacity 3s ease"; // הגדרת אנימציה של הבאנר
      banner.style.opacity = "0"; // הפחתת שקיפות הבאנר
     //לא חובה
      sliderImages.forEach(sliderImg => {
        sliderImg.style.display = "none"; // הסתרת כל התמונות בסליידר
      }); 
// פונקציות להפעלת הכפתורים של ההפעלה
      document.querySelector(".btnLion").addEventListener("click", () => {  
        lionRoar.play();
        fetchAnimalImages("lion");
      });
      document.querySelector(".btnDinosaur").addEventListener("click", () => {
        dinosaurRoar.play();
        fetchAnimalImages("dinosaur");
      });
      document.querySelector(".btnDragon").addEventListener("click", () => {
        dragonRoar.play();
        fetchAnimalImages("dragon");
      });
      document.querySelector(".btnSnake").addEventListener("click", () => {
        snakeHiss.play();
        fetchAnimalImages("snake");
      });
// המתנה של 3 שניות לפני הסתרת הבאנר
      setTimeout(() => {   // המתנה של 3 שניות לפני הסתרת הבאנר
        banner.style.display = "none";
      }, 3000);
// טקסט מעל הכפתורים
      instructionText.textContent = "Choose your jungle game"; // הגדרת טקסט ההוראות
      instructionText.style.color = "#f8e71c"; // הגדרת צבע הטקסט
      instructionText.style.fontFamily = "Poetsen One, sans-serif"; // הגדרת גופן הטקסט
      instructionText.style.fontSize = "3rem"; // הגדרת גודל הטקסט

      setTimeout(() => { // המתנה של שנייה לפני הצגת הכפתורים
        buttonsDiv.style.display = "flex"; // הצגת הכפתורים
        buttonsDiv.style.opacity = "0"; // הגדרת שקיפות הכפתורים
        buttonsDiv.style.transition = "opacity 1s ease"; // הגדרת אנימציה של שקיפות הכפתורים
        requestAnimationFrame(() => { // הפעלת אנימציה של שקיפות הכפתורים
          buttonsDiv.style.opacity = "1"; // הגדרת שקיפות הכפתורים ל-1  
        });
      }, 1000);  
      winTable.style.display = "none"; // הסתרת טבלת הניצחון
    });

  // כפתורי רדיו בסיום המשחק
  document.querySelectorAll("input[name='color']").forEach(radio => {  //קריאה לכפתורי הרדיו
    radio.addEventListener("change", (e) => { // כאשר הכפתור משתנה
      if (e.target.value === "black") {  // אם הכפתור הוא שחור
        document.querySelector(".choosNext").style.display = "none"; // הסתרת הכפתורים בסיום המשחק
        document.querySelector(".instructions").style.display = "block"; // הצגת ההוראות
        document.querySelector(".instructions #text").textContent = "Choose your jungle game"; // הגדרת טקסט ההוראות
        document.querySelector(".buttons").style.display = "flex"; // הצגת הכפתורים
         const winTable = document.getElementById("win");
 
      }
      //פונקציה שמטפלת בבחירה לרישום השם
        else if (e.target.value === "red") {  //אים נבחר רישום השם
        document.querySelector(".choosNext").style.display = "none"; // הסתרת הכפתורים של סיום המשחק
        const form = document.querySelector("form"); // קבלת הטופס לרישום השם
        if (form) {
          form.style.display = "block"; // הצגת הטופס לרישום השם

          const sendBtn = document.getElementById("sendName"); // קבלת כפתור שליחת השם
          if (sendBtn) {
            sendBtn.onclick = function(e) { // כאשר הכפתור נלחץ
              e.preventDefault(); // מניעת ברירת מחדל של הכפתור
              const input = document.getElementById("yourtName"); // קבלת שדה הטקסט של השם
              const name = input ? input.value.trim() : ""; // קבלת השם מהשדה טקסט והסרת רווחים מיותרים
              const time = secondsPassed; // קבלת הזמן שעבר מהטיימר
              if (name && document.getElementById("win")) { // אם השם קיים והטבלה של הניצחון קיימת
                const table = document.getElementById("win").getElementsByTagName("tbody")[0]; // קבלת גוף הטבלה של הניצחון
                const userRowsStart = 3; 
                const userRowsEnd = table.rows.length;
                let lastUsedIndex = parseInt(localStorage.getItem("lastUsedRow")) || userRowsStart;

                const row = table.rows[lastUsedIndex];
                if (row) {
                  row.cells[1].textContent = name;
                  row.cells[2].textContent = `${time}s`;
                }

                lastUsedIndex++;
                if (lastUsedIndex >= userRowsEnd) lastUsedIndex = userRowsStart;
                localStorage.setItem("lastUsedRow", lastUsedIndex);

                    form.style.display = "none";
                       input.value = ""; // איפוס שדה הטקסט של השם

                      // שמירת כל נתוני המשתמשים ב-localStorage
                         const userData = [];
                            for (let i = userRowsStart; i < userRowsEnd; i++) {
                                  const nameCell = table.rows[i].cells[1].textContent;
                                  const timeCell = table.rows[i].cells[2].textContent;
                            if (nameCell && timeCell) {
                               userData.push({ name: nameCell, time: timeCell });
                       }
                    }                    
                    localStorage.setItem("userScores", JSON.stringify(userData));
                    updateTopScores();




                form.style.display = "none";
                document.querySelector(".instructions").style.display = "block";// הצגת ההוראות
                document.querySelector(".instructions #text").textContent = "Choose your jungle game"; // הגדרת טקסט ההוראות
                document.querySelector(".buttons").style.display = "flex"; // הצגת הכפתורים
                document.getElementById("timer").style.display = "none"; // הסתרת הטיימר
                document.querySelector(".buttons").style.display = "flex"; // הצגת הכפתורים
                 if (winTable) {
   
  }
              }
          };
          }
        }
      }
    });
  });
  });
});



const gameBoard = document.getElementById("game-board"); // לוח המשחק
const API_KEY = "50468830-6e430c89ef17bf5c7028c8448"; // מפתח ה-API של Pixabay

// פונקציה לקבלת תמונות של בעלי חיים
function fetchAnimalImages(animal) {
  let query = animal;
  if (animal === "dragon") query = "Game of Thrones dragons";
  if (animal === "lion") query = "Tiger, Puma and Lion";
  if (animal === "snake") query = "cobra snake";
  if (animal === "dinosaur") query = "dinosaur from Jurassic Park";

  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=8`)
    .then(res => res.json())
    .then(data => {
      const imageURLs = data.hits.map(hit => hit.webformatURL);
      const cardImages = [...imageURLs, ...imageURLs];
      
              document.querySelector(".instructions").style.display = "none"; // הסתרת ההוראות
              document.querySelector(".buttons").style.display = "none"; // הסתרת הכפתורים
              document.getElementById("timer").style.display = "none"; // הסתרת הטיימר
              document.querySelector(".choosNext").style.display = "none"; // הסתרת הכפתורים בסיום המשחק
              document.getElementById("win").style.display = "none";
      document.getElementById("win").style.display = "none";

              gameBoard.innerHTML = ""; // ניקוי לוח המשחק  
              cardImages.sort(() => 0.5 - Math.random()); // ערבוב התמונות  
     
              // הצגת לוח המשחק
      cardImages.forEach((imgSrc) => {  //פונקציה להצגת התמונות בלוח המשחק
        const card = document.createElement("div"); // יצירת אלמנט חדש של כרטיס
        card.className = "memory-card"; // הגדרת מחלקת הכרטיס
        card.setAttribute("data-framework", imgSrc); // הגדרת מאפיין נתונים של הכרטיס

        const front = document.createElement("img"); // יצירת אלמנט חדש של תמונה  
        front.className = "front-face"; // הגדרת מחלקת התמונה 
        front.src = imgSrc; // הגדרת מקור התמונה

        const back = document.createElement("img"); // יצירת אלמנט חדש של תמונה
        back.className = "back-face"; // הגדרת מחלקת התמונה
        back.src = "img/back.jpg"; // הגדרת מקור התמונה של הצד האחורי של הכרטיס

        card.appendChild(front); // הוספת התמונה הקדמית לכרטיס
        card.appendChild(back); // הוספת התמונה האחורית לכרטיס
        gameBoard.appendChild(card); // הוספת הכרטיס ללוח המשחק
      });

      activateMemoryGame(); // הפעלת משחק הזיכרון
    })
    .catch(err => console.error("Failed to fetch images:", err)); // טיפול בשגיאות
}

// פונקציה להפעלת משחק הזיכרון
function activateMemoryGame() { 
  const cards = document.querySelectorAll(".memory-card"); // קבלת כל הכרטיסים בלוח המשחק 
  let hasFlippedCard = false; // משתנה לבדוק אם כרטיס כבר הפוך  
  let lockBoard = false; // משתנה לנעילת לוח המשחק כדי למנוע לחיצות נוספות בזמן שהכרטיסים מתהפכים
  let firstCard, secondCard; // משתנים לכרטיסים הראשונים והשניים שנלחצו 
  // הוספת אירוע לחיצה על כל כרטיס
  cards.forEach(card => card.addEventListener("click", flipCard));  //האזנה ללחיצות על הכרטיסים
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 12); // ערבוב הכרטיסים בלוח המשחק 
  });

  startTimer(); // הפעלת הטיימר

  // פונקציה להפיכת הכרטיסים
  // כאשר הכרטיס נלחץ
  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flip");

    // אם הכרטיס הראשון לא הפוך, הגדר אותו ככרטיס הראשון
    // אחרת, הגדר אותו ככרטיס השני
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    // אם הכרטיס הראשון כבר הפוך, הגדר את הכרטיס הנוכחי ככרטיס השני
    secondCard = this;
    checkForMatch();
  }

  // פונקציה לבדוק אם הכרטיסים תואמים
  function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  // פונקציה לנעילת הכרטיסים כאשר הם תואמים
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);  // הסרת האזנה ללחיצה על הכרטיס הראשון
    secondCard.removeEventListener("click", flipCard); // הסרת האזנה ללחיצה על הכרטיס השני
    firstCard.classList.add("matched"); // הוספת מחלקת "matched" לכרטיס הראשון
    secondCard.classList.add("matched"); // הוספת מחלקת "matched" לכרטיס השני

    if (document.querySelectorAll(".memory-card:not(.matched)").length === 0) { // אם כל הכרטיסים תואמים
      setTimeout(simulateEndGame, 1000); // המתנה של שנייה לפני סיום המשחק  
    } 

    resetBoard(); // איפוס לוח המשחק
  }

  // פונקציה להפוך את הכרטיסים חזרה אם הם לא תואמים
  // לאחר המתנה של 1.5 שניות  
  function unflipCards() { 
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip"); // הסרת מחלקת "flip" מהכרטיס הראשון 
      secondCard.classList.remove("flip"); // הסרת מחלקת "flip" מהכרטיס השני
      resetBoard();
    }, 1500);
  }

  // פונקציה לאיפוס לוח המשחק
  // איפוס משתנים גלובליים
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}

// פונקציה להתחלת הטיימר
function startTimer() {   // הפעלת הטיימר
  const timerDisplay = document.getElementById("timer"); // קבלת אלמנט הטיימר
  timerDisplay.style.display = "block"; // הצגת הטיימר
  secondsPassed = 0; // איפוס שניות שעברו
  timerDisplay.textContent = `⏱ Time: 0s`; // הגדרת טקסט הטיימר

  // הפעלת טיימר עם מירווח של שנייה
  clearInterval(timerInterval); // ניקוי טיימר קיים אם יש
  timerInterval = setInterval(() => {  // הפעלת טיימר כל שנייה
    secondsPassed++; // הגדלת השניות שעברו
    timerDisplay.textContent = `⏱ Time: ${secondsPassed}s`; // עדכון טקסט הטיימר
  }, 1000);  // כל 1000 מילישניות (1 שנייה)
}

// פונקציה לסיום אנימציית המשחק
function endGameAnimation(callback) {
  const message = document.createElement("div"); // יצירת אלמנט חדש של הודעה

  message.innerHTML = `🎉 You win!<br>⏱ Your time: ${secondsPassed} seconds!`; // הודעה סיום עם זמן הסיום

 

  // הצגת עותק של הטבלה (ולא המקור)
  const winTable = document.getElementById("win");
  if (winTable) {
    winTable.style.display = "table";
  }

  

  document.body.appendChild(message); // הוספת ההודעה לגוף הדף

 const victorySound = new Audio("sounds/win.mp3"); // צליל של ניצחון
  win.volume = 0.3; // הגדרת עוצמת הצליל  
  victorySound.play(); // הפעלת צליל הניצחון

  
  setTimeout(() => {  // המתנה של 3 שניות לפני הסרת ההודעה
    message.style.transition = "opacity 0.5s ease"; // הגדרת אנימציה של שקיפות להודעה 
    message.remove();
    if (callback) callback();
  }, 3000);
}

// פונקציה לנקות את הכרטיסים עם עיכוב
function clearCardsWithDelay(callback) { 
  const cards = document.querySelectorAll(".memory-card"); // קבלת כל הכרטיסים בלוח המשחק
  let finishedCount = 0; 

  cards.forEach((card, index) => { //פונקציה לנקות את הכרטיסים עם עיכוב
    setTimeout(() => { // המתנה של 300 מילישניות לפני הסרת הכרטיס
      card.style.transition = "opacity 0.7s"; // הגדרת אנימציה של שקיפות לכרטיס 
      card.style.opacity = "0"; // הפחתת שקיפות הכרטיס

      setTimeout(() => { // המתנה של 800 מילישניות לפני הסרת הכרטיס 
        card.remove(); // הסרת הכרטיס מהדף
        finishedCount++; // הגדלת מספר הכרטיסים שהוסרו  
        if (finishedCount === cards.length && callback) { // אם כל הכרטיסים הוסרו
          callback(); // קריאה לפונקציה של סיום המשחק
        }
      }, 800);  // המתנה של 800 מילישניות לפני הסרת הכרטיס
    }, index * 300); // המתנה של 300 מילישניות כפול מספר הכרטיסים לפני הסרת הכרטיס
  });

  if (cards.length === 0 && callback) callback(); // אם אין כרטיסים בלוח המשחק, קריאה לפונקציה של סיום המשחק
}

function simulateEndGame() { // פונקציה המדמה סיום המשחק
  stopTimer(); // עצירת הטיימר  
  document.querySelectorAll("input[name='color']").forEach(radio => { // קריאה לכל כפתורי הרדיו
  radio.checked = false;
});


  endGameAnimation(() => { // קריאה לפונקציה של סיום אנימציית המשחק 
    clearCardsWithDelay(() => { // קריאה לפונקציה לנקות את הכרטיסים עם עיכוב
      document.getElementById("game-board").innerHTML = ""; // ניקוי לוח המשחק
      document.querySelector(".instructions").style.display = "none"; // הסתרת ההוראות
      document.getElementById("timer").style.display = "none"; // הסתרת הטיימר  
      document.querySelector(".buttons").style.display = "none"; // הסתרת הכפתורים
      document.querySelector(".choosNext").style.display = "block"; // הצגת הכפתורים בסיום המשחק

      const winTable = document.getElementById("win"); // קבלת הטבלה של הניצחון 
      if (winTable) { // אם הטבלה קיימת
       // winTable.style.display = "none"; // הסתרת הטבלה של הניצחון
       
      }
    });
  });
}


function updateTopScores() {
  const savedScores = JSON.parse(localStorage.getItem("userScores")) || [];
  const table = document.getElementById("win").getElementsByTagName("tbody")[0];
  const sorted = [...savedScores].sort((a, b) => parseInt(a.time) - parseInt(b.time)).slice(0, 3);

  for (let i = 0; i < 3; i++) {
    const row = table.rows[i];
    if (row) {
      row.cells[1].textContent = sorted[i]?.name || "";
      row.cells[2].textContent = sorted[i]?.time || "";
    }
  }
}







//  function showTable() {
//     document.getElementById('myTable').style.display = 'table';
//   }



//הפעלה מיותרת של בחירה אוטומטית של המשחק
//  document.querySelector(".btnRandom").addEventListener("click", () => {
//   const animals = ["lion", "dinosaur", "dragon", "snake"];
//   const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
//   fetchAnimalImages(randomAnimal);
// });

// פונקציה לניקוי הטבלה וה־localStorage
function resetScoreTable() {
  localStorage.removeItem("userScores");
  localStorage.removeItem("lastUsedRow");
  const table = document.getElementById("win").getElementsByTagName("tbody")[0];
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[1].textContent = "";
    table.rows[i].cells[2].textContent = "";
  }
}

// כפתור לבדיקה ידנית
 document.getElementById("test-end-game").addEventListener("click", simulateEndGame);
 
