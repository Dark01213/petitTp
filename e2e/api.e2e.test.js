const fetch = require('node-fetch');

describe('E2E API tests', () => {
  const baseUrl = process.env.API_URL || 'http://localhost:8080';

  test('/health endpoint should return 200', async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ status: 'ok' });
  });

  test('/hello endpoint should return Hello World', async () => {
    const res = await fetch(`${baseUrl}/hello`);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Hello World');
  });
});
