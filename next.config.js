const basePath = process.env.NODE_ENV === 'production' ? '/alurakut' : '';

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    FB_KEY: process.env.FB_KEY,
    FB_AUTH: process.env.FB_AUTH,
    FB_PID: process.env.FB_PID,
    FB_BUK: process.env.FB_BUK,
    FB_SND: process.env.FB_SND,
    FB_AID: process.env.FB_AID
  }
};
