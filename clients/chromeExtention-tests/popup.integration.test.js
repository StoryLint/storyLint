// popup.integration.test.js
// Full coverage for popup.js DOM and event logic


/**
 * @jest-environment jsdom
 */
const { waitFor } = require('@testing-library/dom');

describe('popup.js integration', () => {
  let inputText, sendBtn, copyBtn, clearBtn, status, outputText, errorBox;
  beforeEach(() => {
    document.body.innerHTML = `
      <textarea id="inputText"></textarea>
      <button id="sendBtn"></button>
      <button id="copyBtn"></button>
      <button id="clearBtn"></button>
      <div id="status"></div>
      <pre id="outputText"></pre>
      <div id="errorBox"></div>
    `;
    inputText = document.getElementById('inputText');
    sendBtn = document.getElementById('sendBtn');
    copyBtn = document.getElementById('copyBtn');
    clearBtn = document.getElementById('clearBtn');
    status = document.getElementById('status');
    outputText = document.getElementById('outputText');
    errorBox = document.getElementById('errorBox');
    // Mock localStorage
    global.localStorage = {
      store: {},
      getItem: function (key) { return this.store[key] || null; },
      setItem: function (key, value) { this.store[key] = value; },
      removeItem: function (key) { delete this.store[key]; },
      clear: function () { this.store = {}; }
    };
    // Mock fetch
    global.fetch = jest.fn();
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      write: jest.fn(),
      writeText: jest.fn()
    };
    // Load popup.js
    jest.isolateModules(() => {
      require('../chromeExtention/popup.js');
    });
  });

  it('should disable sendBtn when input is empty', () => {
    inputText.value = '';
    inputText.dispatchEvent(new Event('input'));
    expect(sendBtn.disabled).toBe(true);
  });

  it('should enable sendBtn when input is not empty', () => {
    inputText.value = 'foo';
    inputText.dispatchEvent(new Event('input'));
    expect(sendBtn.disabled).toBe(false);
  });

  it('should clear all fields when clearBtn is clicked', () => {
    inputText.value = 'foo';
    outputText.textContent = 'bar';
    errorBox.textContent = 'baz';
    clearBtn.click();
    expect(inputText.value).toBe('');
    expect(outputText.textContent).toBe('');
    expect(errorBox.textContent).toBe('');
  });

  it('should show error if sendBtn clicked with empty input', async () => {
    inputText.value = '';
    sendBtn.disabled = false;
    sendBtn.click();
    await waitFor(() => {
      expect(errorBox.textContent).toMatch(/Enter requirement text/);
    });
  });

  it('should call fetch and set output on sendBtn click', async () => {
    inputText.value = 'foo';
    sendBtn.disabled = false;
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ rewrites: { gwt: ['given: foo'] } })
    });
    await sendBtn.click();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(outputText.innerHTML).toContain('Given:');
    });
  });

  it('should show error on fetch failure', async () => {
    inputText.value = 'foo';
    sendBtn.disabled = false;
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await sendBtn.click();
    await waitFor(() => {
      expect(errorBox.textContent).toMatch(/Request failed/);
    });
  });

  it('should copy output text on copyBtn click', async () => {
    outputText.textContent = 'bar';
    await copyBtn.click();
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('bar');
  });
});
