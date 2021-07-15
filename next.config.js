const basePath = process.env.NODE_ENV === 'production' ? '/alurakut' : '';

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`
};
