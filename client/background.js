chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.CloseMe) {
    chrome.tabs.remove(sender.tab.id);
  }
});

let activeTabInfo = {};

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTab) => {
    const { url } = currentTab;
    const currentTime = new Date().getTime();
    activeTabInfo = {
      url,
      timeSpent: convertMillisecondsToHours(currentTime),
    };
    saveActivity(activeTabInfo.url, activeTabInfo.timeSpent);
    console.log(activeTabInfo);
  });
});

function convertMillisecondsToHours(milliseconds) {
  return Math.floor(milliseconds / (1000 * 60 * 60));
}

async function saveActivity(url, timeSpent) {
  try {
    const response = await fetch(
      "https://activity-tracker-extension.onrender.com/api/v1/tab/new",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ url, timespent: timeSpent }),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
