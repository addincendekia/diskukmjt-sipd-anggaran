const DEFAULT_ORIGIN = "https://sipd-ri.kemendagri.go.id";
const DEFAULT_PATH = "src/sidepanel/index.html";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (!tab?.url) return;

  const url = new URL(tab.url);
  const options = {
    tabId: tab.id as number,
    path: DEFAULT_PATH,
    enabled: url.origin === DEFAULT_ORIGIN,
  };

  // Enable or disable the side panel for this tab based on origin
  chrome.sidePanel.setOptions(options);
});
