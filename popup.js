document.addEventListener("DOMContentLoaded", function () {
  const clearBtn = document.getElementById("clearBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");

  clearBtn.addEventListener("click", function () {
    const days = document.getElementById("days").value;
    clearHistory(days);
    clearCache(days);
  });

  clearAllBtn.addEventListener("click", function () {
    if (
      confirm(
        "You are clearing all history. Your existing login will be removed. Are you sure?"
      )
    ) {
      clearAllHistoryAndCache();
    }
  });

  function clearHistory(days) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeAgo = Date.now() - days * millisecondsPerDay;

    chrome.history.deleteRange({
      startTime: 0,
      endTime: timeAgo,
    });
  }

  function clearCache(days) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeAgo = Date.now() - days * millisecondsPerDay;

    chrome.browsingData.remove(
      {
        since: timeAgo,
      },
      {
        appcache: true,
        cache: true,
        cookies: true,
        downloads: true,
        fileSystems: true,
        formData: true,
        history: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        passwords: true,
        serviceWorkers: true,
        webSQL: true,
      },
      function () {
        displayMessage(
          `Your cache and history up to ${days} days ago has been cleared.`
        );
      }
    );
  }

  function clearAllHistoryAndCache() {
    chrome.browsingData.remove(
      {},
      {
        appcache: true,
        cache: true,
        cookies: true,
        downloads: true,
        fileSystems: true,
        formData: true,
        history: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        passwords: true,
        serviceWorkers: true,
        webSQL: true,
      },
      function () {
        chrome.history.deleteAll(function () {
          displayMessage("All history and cache have been cleared.");
        });
      }
    );
  }

  function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
  }
});
