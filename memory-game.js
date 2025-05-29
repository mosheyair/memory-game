                   //  חלק ראשון זה החלק שמתיחס לכל אנימצית הפתיחה
     //הגדרת משתנים
document.addEventListener("DOMContentLoaded", () => {
    const allImages = document.querySelectorAll(".item img");
    const slider = document.querySelector(".slider");
    const banner = document.querySelector(".banner");
    const instructionText = document.getElementById("text");
    const buttonsDiv = document.querySelector(".buttons");
  
    allImages.forEach(img => {
      img.addEventListener("click", () => {
        // עצירת הקרוסלה
        slider.style.animation = "none";
  
        // אנימציה דעיכת הקרוסלה
        banner.style.transition = "opacity 3s ease";
        banner.style.opacity = "0";
  
        // להחליף את הטקסט לטקס בחירת השחקן
        instructionText.textContent = "Choose your world game";
        instructionText.style.color = "#f8e71c";
        instructionText.style.transition = "all 1s ease";
        instructionText.style.fontFamily = "Poetsen One, sans-serif";
        instructionText.style.fontSize = "3rem";
  
        // גילוי הכפתורים לבחירת המשחק
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
  
           // חלק שני זה החלק שמתיחס למשחק זכרון
  const gameBoard = document.getElementById("game-board");
  const API_KEY = "50468830-6e430c89ef17bf5c7028c8448";
  
  function fetchAnimalImages(animal) {
    let query = animal;
        //ניסוח הבקשה לפי החיה שנבחרה
    if (animal === "dragon") query = "fantasy dragon attack";
    if (animal === "lion") query = "Tiger, Puma and Lion ";
    if (animal === "snake") query = "snake attack";
    if (animal === "dinosaur") query = "dinosaur from Jurassic Park";
  
        //בקשת התמונות "Pixabay" API
          fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=8`)
          .then(res => res.json())
          .then(data => {
         const imageURLs = data.hits.map(hit => hit.webformatURL);
  
          // הכפלת כל תמונה כדי ליצור זוגות
        const cardImages = [...imageURLs, ...imageURLs];
  
        // הסתרת ההוראות והכפתורים
        document.querySelector(".instructions").style.display = "none";
        document.querySelector(".buttons").style.display = "none";
  
          // לעבב את התמונות
        cardImages.sort(() => 0.5 - Math.random());
  
          // לנקות את המשחק הקודם
              gameBoard.innerHTML = "";
  
        // לבנות את הקלפים
        cardImages.forEach((imgSrc, index) => {
          const card = document.createElement("div");
          card.className = "memory-card";
          card.setAttribute("data-framework", imgSrc);

          // שואב את התמונה לגב הקלף מתיקית שעל  המחשב
          const front = document.createElement("img");
          front.className = "front-face";
          front.src = imgSrc;
  
          const back = document.createElement("img");
          back.className = "back-face";
          back.src = "img/back.jpg"; // תמונה אחורית של הקלף
  
          card.appendChild(front);
          card.appendChild(back);
          gameBoard.appendChild(card);
        });
  
        // להפעיל את המשחק זכרון
        activateMemoryGame();
      })
      .catch(err => {
        console.error("Failed to fetch images:", err);
      });
  }
  
  document.querySelector(".btnDragon").addEventListener("click", () => {
    fetchAnimalImages("dragon");
  });
  
  function activateMemoryGame() {
    const cards = document.querySelectorAll(".memory-card");
  
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add("flip");
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
  
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
  
      resetBoard();
    }
  
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    cards.forEach(card => card.addEventListener("click", flipCard));
    cards.forEach(card => {
      card.style.order = Math.floor(Math.random() * 12);
    });
  }
  document.querySelector(".btnLion").addEventListener("click", () => {
    fetchAnimalImages("lion");
  });
  
  document.querySelector(".btnSnake").addEventListener("click", () => {
    fetchAnimalImages("snake");
  });
  
  document.querySelector(".btnDinosaur").addEventListener("click", () => {
    fetchAnimalImages("dinosaur");
  });
  