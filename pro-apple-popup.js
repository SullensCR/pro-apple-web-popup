function do_pro_apple_popup() {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; padding: 15px; background: #fff; box-shadow: 0px 0px 10px rgba(0,0,0,0.3); border-radius: 10px; z-index: 1000; text-align: center; max-width: 250px;">
        <p>hey! it looks like you're running an apple device!</p>
        <p>great choice!</p>
        <button id="apple-popup-dismiss-btn" style="margin-right: 10px;">OK</button>
        <button id="apple-popup-dont-show-again-btn">Don't show again</button>
    </div>
    `;
  document.body.appendChild(popup);
  document
    .getElementById("apple-popup-dismiss-btn")
    .addEventListener("click", () => {
      popup.remove();
    });

  document
    .getElementById("apple-popup-dont-show-again-btn")
    .addEventListener("click", () => {
      const date = new Date();
      date.setTime(date.getTime() + 1000 * 24 * 60 * 60 * 365 * 100); // 100 years ahead
      document.cookie = `hideApplePopup=true; expires=${date.toUTCString()}; path=/`;
      popup.remove();
    });
}

function pro_apple_popup_main() {
  if (
    /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 0 &&
      !document.cookie
        .split("; ")
        .find((row) => row.startsWith("hideApplePopup")))
  ) {
    do_pro_apple_popup();
  }
}

document.addEventListener("DOMContentLoaded", pro_apple_popup_main);
