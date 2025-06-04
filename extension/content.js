chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SELECTION') {
    const text = window.getSelection().toString();
    sendResponse({ text });
  }
});
