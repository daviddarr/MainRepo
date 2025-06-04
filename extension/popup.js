document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('analyze-btn');
  const output = document.getElementById('output');
  btn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' }, async (response) => {
      const text = (response && response.text) ? response.text.trim() : '';
      if (text) {
        output.textContent = 'Jobs copied!';
        try {
          const res = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
          });
          const data = await res.json();
          if (data && data.message) {
            output.textContent = data.message;
          }
        } catch (e) {
          console.error('Error sending to backend', e);
        }
      } else {
        output.textContent = 'No text selected.';
      }
    });
  });
});
