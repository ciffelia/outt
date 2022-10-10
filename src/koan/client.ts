import got, { Got } from 'got';

export const createClient = (): Got =>
  got.extend({
    methodRewriting: true,
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    },
  });
