document.addEventListener("DOMContentLoaded", () => {
  const countdownTimer = document.getElementById("countdown-timer");

  if (!countdownTimer) {
    return;
  }

  const gameStartTime = new Date("2025-10-27T09:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = gameStartTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval);
      countdownTimer.innerHTML = "GAME HAS BEGUN";
    } else {
      // Format the output
      countdownTimer.innerHTML = `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
    }
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
});
