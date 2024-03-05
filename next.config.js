//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  nx: {
      // Set this to true if you would like to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: false,
      trailingSlash: true,
      reactStrictMode: false
    },
    env: {
      DOMAIN_PATH:process.env.DOMAIN_PATH,
      SERVICE_API:process.env.SERVICE_API,
      IDENTITY_SERVER_PATH:process.env.IDENTITY_SERVER_PATH
    }
  }

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);