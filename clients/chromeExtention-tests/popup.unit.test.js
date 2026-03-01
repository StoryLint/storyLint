const {
  escapeHtml,
  renderInlineBold,
  sanitizeInput,
  normalizeWhitespace,
  stripFormattingChars,
  beautifyGwtText,
  formatIssue,
  formatResponse
} = require('../chromeExtention/popupUtils');

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    expect(escapeHtml('<div>&"\'')).toBe('&lt;div&gt;&amp;&quot;&#39;');
  });
});

describe('renderInlineBold', () => {
  it('renders bold and italic markdown', () => {
    expect(renderInlineBold('**bold** _italic_')).toContain('<strong>bold</strong>');
    expect(renderInlineBold('_italic_')).toContain('<em>italic</em>');
  });
});

describe('sanitizeInput', () => {
  it('normalizes and trims input', () => {
    expect(sanitizeInput('  foo\r\nbar\n\n\n')).toBe('foo\nbar');
  });
});

describe('normalizeWhitespace', () => {
  it('normalizes whitespace and tabs', () => {
    expect(normalizeWhitespace('foo\r\nbar\n\t')).toBe('foo\nbar');
  });
});

describe('stripFormattingChars', () => {
  it('removes markdown formatting', () => {
    expect(stripFormattingChars('# Title\n* Bullet\n1. Numbered')).toContain('- Bullet');
  });
});

describe('beautifyGwtText', () => {
  it('beautifies GWT text', () => {
    expect(beautifyGwtText('given: foo when: bar then: baz')).toContain('Given: foo');
    expect(beautifyGwtText('when: bar')).toContain('When: bar');
    expect(beautifyGwtText('then: baz')).toContain('Then: baz');
  });
});

describe('formatIssue', () => {
  it('formats issue object', () => {
    expect(formatIssue({ code: 'ERR', message: 'Bad', severity: 'high' }, 0)).toContain('1. ERR (high): Bad');
  });
});

describe('formatResponse', () => {
  it('formats API report with GWT', () => {
    const report = { rewrites: { gwt: ['given: foo'] } };
    expect(formatResponse(report)).toContain('Given: foo');
  });
  it('formats API report with issues', () => {
    const report = { pattern: 'pat', score: 5, issues: [{ code: 'ERR', message: 'Bad' }] };
    expect(formatResponse(report)).toContain('Score: 5');
    expect(formatResponse(report)).toContain('Pattern: pat');
    expect(formatResponse(report)).toContain('Issues:');
  });
});
