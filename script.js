// --- 1. Efek Mengetik (Typing Effect) ---
const text = "Niswati Nur Lathifah";
const typingTextElement = document.getElementById("typing-text");
let charIndex = 0;

function typeWriter() {
  if (charIndex < text.length) {
    typingTextElement.innerHTML += text.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeWriter, 150);
  }
}

window.addEventListener("load", () => {
  setTimeout(typeWriter, 800);
});

// --- 2. Interaksi Tombol (Transisi Section) ---
const btnNext = document.getElementById("btn-next");
const heroSection = document.getElementById("hero");
const specialContent = document.getElementById("special-content");

if (btnNext) {
  btnNext.addEventListener("click", () => {
    const card = document.querySelector(".cute-card");
    if (card) {
      card.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      card.style.transform = "translateY(-150%) scale(0.8)";
      card.style.opacity = "0";
    }

    setTimeout(() => {
      if (heroSection) heroSection.style.display = "none";

      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";

      if (specialContent) {
        specialContent.style.display = "block";
        void specialContent.offsetWidth;
        specialContent.style.opacity = "1";
        specialContent.style.transition = "opacity 1s ease";
      }
    }, 600);
  });
}

// --- 3. Efek Confetti Gelembung / Bulat ---
const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ["#bae6fd", "#ffffff", "#e0f2fe", "#fef08a", "#f9a8d4"];

  for (let i = 0; i < 80; i += 1) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.05 + 0.01,
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((piece, index) => {
      ctx.beginPath();
      const xPos = piece.x + Math.sin(Date.now() * piece.wobbleSpeed + index) * piece.wobble;
      ctx.arc(xPos, piece.y, piece.r, 0, Math.PI * 2);
      ctx.fillStyle = piece.color;
      ctx.fill();

      piece.y += piece.speed;

      if (piece.y > canvas.height) {
        piece.y = -10;
        piece.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawConfetti);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  drawConfetti();
}

// --- 4. LOGIKA TOMBOL LARI (FORM JAHIL) ---
const btnRunaway = document.getElementById("btn-runaway");
const btnStay = document.getElementById("btn-stay");

if (btnRunaway) {
  const formCard = btnRunaway.closest(".form-card");

  const moveRunawayButton = function () {
    if (!formCard) return;

    const bounds = formCard.getBoundingClientRect();
    const maxX = Math.max(20, bounds.width - btnRunaway.offsetWidth - 20);
    const maxY = Math.max(20, bounds.height - btnRunaway.offsetHeight - 20);
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btnRunaway.style.transform = `translate(${randomX > bounds.width / 2 ? -randomX / 2 : randomX / 2}px, ${randomY > bounds.height / 2 ? -randomY / 2 : randomY / 2}px)`;
  };

  btnRunaway.addEventListener("mouseover", moveRunawayButton);
  btnRunaway.addEventListener("focus", moveRunawayButton);
  btnRunaway.addEventListener("touchstart", moveRunawayButton, { passive: true });
}

if (btnStay) {
  const formPopup = document.getElementById("form-popup");
  let popupTimer = null;

  const showPopup = (message) => {
    if (!formPopup) return;

    const popupText = formPopup.querySelector(".popup-text");
    if (popupText) {
      popupText.textContent = message;
    }

    formPopup.classList.remove("show");
    void formPopup.offsetWidth;
    formPopup.classList.add("show");

    if (popupTimer) clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      formPopup.classList.remove("show");
    }, 2800);
  };

  btnStay.addEventListener("click", () => {
    showPopup("Keputusan yang sangat bijak, Bu Sekre. Jadi kita gak jadi asing wkwk");
  });
}

// --- 5. LOGIKA KLAIM REWARD (GIFT BOX) ---
const vouchers = ["Traktir Mie Ayam", "Voucher Nonton Bioskop 🎬", "Voucher Tahu Kress", "Voucher Kue Pancong"];

function openGift(element) {
  const giftsWrapper = document.getElementById("gifts-wrapper");
  const voucherResult = document.getElementById("voucher-result");
  const voucherText = document.getElementById("voucher-text");
  const rewardInstruction = document.getElementById("reward-instruction");

  if (element) element.classList.add("is-open");
  if (giftsWrapper) giftsWrapper.style.display = "none";
  if (rewardInstruction) {
    rewardInstruction.textContent = "Voucher kamu sudah siap!";
    rewardInstruction.style.color = "#10b981";
    rewardInstruction.style.fontWeight = "800";
  }

  const randomReward = vouchers[Math.floor(Math.random() * vouchers.length)];

  if (voucherText) voucherText.innerText = randomReward;
  if (voucherResult) voucherResult.style.display = "block";
}
