document.getElementById("InitateBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "activate" });
});
