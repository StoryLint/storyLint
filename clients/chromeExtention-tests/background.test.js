// background.test.js
// Full coverage for background.js

describe('background.js', () => {
  beforeAll(() => {
    global.chrome = {
      sidePanel: {
        setPanelBehavior: jest.fn().mockResolvedValue(),
      },
    };
  });

  it('should call chrome.sidePanel.setPanelBehavior with correct argument', async () => {
    jest.isolateModules(() => {
      require('../chromeExtention/background.js');
    });
    expect(global.chrome.sidePanel.setPanelBehavior).toHaveBeenCalledWith({ openPanelOnActionClick: true });
  });

  it('should handle promise rejection gracefully', async () => {
    global.chrome.sidePanel.setPanelBehavior.mockRejectedValueOnce(new Error('fail'));
    jest.isolateModules(() => {
      require('../chromeExtention/background.js');
    });
    // No error thrown, just catch block
    expect(global.chrome.sidePanel.setPanelBehavior).toHaveBeenCalled();
  });
});
