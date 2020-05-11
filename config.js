const isDev = process.env.ENV === 'development';

export const config = {
  port: 8080,
  bodyLimit: '100kb',
  corsHeaders: ['Link'],
  frontendApp: 'https://forum-h66whbie1.now.sh',
  cookieDomain: isDev ? 'localhost' : 'forum-p1vwlq731.now.sh',
};
