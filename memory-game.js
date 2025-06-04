 //  אירוע טעינה של הדף כדי להבטיח שכל האלמנטים נטענו לפני ביצוע הקוד
 document.addEventListener("DOMContentLoaded", () => {
  // הגדרת משתנים עבור האלמנטים בדף
  const allImages = document.querySelectorAll(".item img");
  const slider = document.querySelector(".slider");
  const banner = document.querySelector(".banner");
  const instructionText = document.getElementById("text");
  const buttonsDiv = document.querySelector(".buttons");
         // הגדרת אודיו עבור כל כפתור
       const lionRoar = new Audio("sounds/lion-roar.mp3");
       const dinosaurRoar = new Audio("sounds/dinosaur-roar.mp3");
       const dragonRoar = new Audio("sounds/dinosaur-roar.mp3");
       const snakeHiss = new Audio("sounds/snake-hissing.mp3");
// הוספת מאזין אירוע לכל תמונה בזמן לחיצה על תמונה הקרוסלה נעצרת והופכת לשקופה
  allImages.forEach(img => {
    img.addEventListener("click", () => {
      slider.style.animation = "none";
       banner.style.transition = "opacity 3s ease";
        banner.style.opacity = "0";
      //הגדרת נתיב הקובץ אודיו עבור כל כפתור
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
      //הסתרת הקרוסלה אחרי 3 שניות
      setTimeout(() => {
        banner.style.display = "none";
     }, 3000);
                             //טקסט בחירת המשחק
               instructionText.textContent = "Choose your jungle game";
                 instructionText.style.color = "#f8e71c";
                   instructionText.style.fontFamily = "Poetsen One, sans-serif";
                     instructionText.style.fontSize = "3rem";
        //להציג את כפתורי הבחירה בתוספת אפקט של שקיפות
         setTimeout(() => {
          buttonsDiv.style.display = "flex";
           buttonsDiv.style.opacity = "0";
            buttonsDiv.style.transition = "opacity 1s ease";
             requestAnimationFrame(() => {
              buttonsDiv.style.opacity = "1";
               });
                }, 1000);
             });
          });
        });

   // שליפת אלמנט הלוח והגדרת מפתח API
const gameBoard = document.getElementById("game-board");
const API_KEY = "50468830-6e430c89ef17bf5c7028c8448";
// פונקציה לשליפת תמונות של בעלי חיים מה-API של Pixabay
      function fetchAnimalImages(animal) {
        let query = animal;
          if (animal === "dragon") query = " Game of Thrones dragons";
            if (animal === "lion") query = "Tiger, Puma and Lion ";
              if (animal === "snake") query = "cobra snake";
                if (animal === "dinosaur") query = "dinosaur from Jurassic Park";
//בקשת אי-פי-איי לשליפת תמונות
  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=8`)
    .then(res => res.json())
    .then(data => {
      const imageURLs = data.hits.map(hit => hit.webformatURL);
      const cardImages = [...imageURLs, ...imageURLs];
      document.querySelector(".instructions").style.display = "none";
      document.querySelector(".buttons").style.display = "none";
      gameBoard.innerHTML = "";
      cardImages.sort(() => 0.5 - Math.random());
                // יצירת כרטיסים עבור כל תמונה
             cardImages.forEach((imgSrc) => {
              const card = document.createElement("div");   //יצירת דיב חדש עבור כרטיס
               card.className = "memory-card";             //  הוספת מחלקת 
                card.setAttribute("data-framework", imgSrc);// הגדרת מאפיין נתונים עבור הכרטיס
                                                // יצירת אלמנט תמונה עבור הצד הקדמי של הכרטיס
                     const front = document.createElement("img");
                      front.className = "front-face";
                       front.src = imgSrc;
                                              // יצירת אלמנט תמונה עבור הצד האחורי של הכרטיס
                            const back = document.createElement("img");
                             back.className = "back-face";
                              back.src = "img/back.jpg";
                                           // הוספת אלמנטים התמונה לכרטיס וללוח המשחק
                                   card.appendChild(front);// הוספת צד הקדמי של הכרטיס
                                    card.appendChild(back);// הוספת צד האחורי של הכרטיס
                                      gameBoard.appendChild(card);// הוספת הכרטיס ללוח המשחק
                     });

      activateMemoryGame();// הפעלת משחק הזיכרון
    })
        .catch(err => console.error("Failed to fetch images:", err));// טיפול בשגיאות
}

      // משתנים להצגת טיימר המשחק
     let timerInterval;
     let secondsPassed = 0;


// פונקציה להפעלת משחק הזיכרון
function activateMemoryGame() {
  const cards = document.querySelectorAll(".memory-card");// שליפת כל הכרטיסים מהלוח
// הגדרת משתנים לניהול מצב המשחק
  let hasFlippedCard = false;// משתנה לבדיקת אם כרטיס הפוך
  let lockBoard = false;// משתנה לנעילת הלוח כדי למנוע לחיצות נוספות בזמן השוואת כרטיסים
  let firstCard, secondCard;// משתנים לאחסון הכרטיסים שהופכים
// פונקציה להפיכת כרטיס
  function flipCard() {
    if (lockBoard || this === firstCard) return;// אם הלוח נעול או הכרטיס כבר הפוך, לא לעשות כלום

    this.classList.add("flip");// אם הכרטיס לא הפוך, להפוך אותו
// אם זה הכרטיס הראשון שהופך, לשמור אותו
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
// אם זה הכרטיס השני שהופך, לשמור אותו ולהשוות עם הכרטיס הראשון
    secondCard = this;
    checkForMatch();
  }
// פונקציה להשוואת הכרטיסים
  function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }
// פונקציה לנעילת הכרטיסים המותאמים
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
// אם כל הכרטיסים מותאמים, לסיים את המשחק
    if (document.querySelectorAll(".memory-card:not(.matched)").length === 0) {
      setTimeout(simulateEndGame, 1000);
    }

    resetBoard();//
  }
// פונקציה להפיכת הכרטיסים הלא מותאמים חזרה למצב הפוך אחרי דיילי של שניה וחצי
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1500);
  }
// פונקציה לאיפוס מצב הלוח והכרטיסים
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];// איפוס משתנים
    [firstCard, secondCard] = [null, null];// איפוס הכרטיסים
  }
// הוספת מאזיני אירועים לכל כרטיס
  cards.forEach(card => card.addEventListener("click", flipCard));
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 12);// הגדרת סדר אקראי לכרטיסים
  });
                    // התחלת טיימר
               document.getElementById("timer").style.display = "block";
                 secondsPassed = 0;
                   document.getElementById("timer").textContent = `⏱ Time: 0s`;

               clearInterval(timerInterval);
                 timerInterval = setInterval(() => {
                   secondsPassed++;
                     document.getElementById("timer").textContent = `⏱ Time: ${secondsPassed}s`;
                }, 1000);

}

// אנימציה לסיום המשחק
function endGameAnimation(callback) {
  const message = document.createElement("div");

 
  message.style.position = "fixed";
  message.style.top = "30%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.fontSize = "2.5rem";
  message.style.backgroundColor = "#4a1616"; // צבע רקע כהה
  message.style.color = "#fff";
  message.style.padding = "20px";
  message.style.borderRadius = "10px";
  message.style.boxShadow = "0 0 15px  #db6969"; // צללית רכה
  message.style.textAlign = "center";
  message.style.zIndex = 9999;// לוודא שההודעה מעל כל האלמנטים האחרים
  document.body.appendChild(message);
    const win = new Audio("sounds/win.mp3"); // הגדרת צליל הניצחון
    win.play(); // הפעלת הצליל מיד כשההודעה מופיעה

        // הצגת זמן סיום
               const finalTimeDisplay = document.getElementById("final-time");
                finalTimeDisplay.textContent = `⏱ bravo your time ${secondsPassed} seconds!`;
                 finalTimeDisplay.style.display = "block";
                  finalTimeDisplay.style.fontSize = "2rem";
                   finalTimeDisplay.style.color = "#f8e71c";
                    finalTimeDisplay.style.fontFamily = "Poetsen One, sans-serif";
                     finalTimeDisplay.style.textShadow = "2px 2px 4px #000";
                      finalTimeDisplay.style.marginTop = "20px";
          //  message.innerHTML = `
           //  🎉 you win<br>
            //   ⏱ your time <strong>${secondsPassed} seconds!</strong><br><br>
            //      <button id="btn-register" style="margin: 10px; padding: 10px 20px; font-size: 1rem;">Subscribe to the //leaderboard</button>
           //         <button id="btn-skip" style="margin: 10px; padding: 10px 20px; font-size: 1rem;">Maybe another time</button>
        //    `;

                     
     setTimeout(() => {
       document.getElementById("btn-register").addEventListener("click", () => {
         message.remove();
           askForName(); // ניצור את הפונקציה הזו בהמשך
        });

                document.getElementById("btn-skip").addEventListener("click", () => {
                  message.remove();
                   if (callback) callback();
                 });
              }, 100); // השהייה קצרה כדי לוודא שהכפתורים נטענו



  setTimeout(() => {
    message.remove();
    if (callback) callback();
  }, 3000);
}

            win.play() ;// השמעת צליל ניצחון
          
// פונקציה לניקוי הכרטיסים עם דיליי
function clearCardsWithDelay(callback) {
  const cards = document.querySelectorAll(".memory-card");
  let finishedCount = 0;
// עבור כל כרטיס, להוסיף דיליי של 500 מילישניות לפני ההסרה
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = "opacity 0.7s";// הגדרת אנימציה של שקיפות
      card.style.opacity = "0";// הפיכת הכרטיס לשקוף

      setTimeout(() => {
        card.remove();
        finishedCount++;
        if (finishedCount === cards.length && callback) {
          callback();
        }
      }, 800);
    }, index * 300);
  });

  if (cards.length === 0 && callback) callback();
}

function simulateEndGame() {
  endGameAnimation(() => {
    clearCardsWithDelay(() => {
      document.getElementById("game-board").innerHTML = "";
      document.querySelector(".instructions").style.display = "flex";
      document.getElementById("text").innerText = "Choose your world game";
      document.querySelector(".buttons").style.display = "flex";
    });
  });
  clearInterval(timerInterval);// איפוס זמן המשחק
  
}

// כפתורי בחירה
document.querySelector(".btnDragon").addEventListener("click", () => {
  fetchAnimalImages("dragon");
});
document.querySelector(".btnLion").addEventListener("click", () => {
  fetchAnimalImages("lion");
});
document.querySelector(".btnSnake").addEventListener("click", () => {
  fetchAnimalImages("snake");
});
document.querySelector(".btnDinosaur").addEventListener("click", () => {
  fetchAnimalImages("dinosaur");
});

//הפעלה מיותרת של בחירה אוטומטית של המשחק
//  document.querySelector(".btnRandom").addEventListener("click", () => {
//   const animals = ["lion", "dinosaur", "dragon", "snake"];
//   const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
//   fetchAnimalImages(randomAnimal);
// });

// כפתור לבדיקה ידנית
 //document.getElementById("test-end-game").addEventListener("click", simulateEndGame);
 
