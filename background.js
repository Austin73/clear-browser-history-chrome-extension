// This script is optional if you want to clear history when the browser is closed
chrome.windows.onRemoved.addListener(function () {
  const days = 7; // Default to 7 days
  clearHistory(days);
});

function clearHistory(days) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const timeAgo = Date.now() - days * millisecondsPerDay;

  chrome.history.deleteRange({
    startTime: 0,
    endTime: timeAgo,
  });
}
