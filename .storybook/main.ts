import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "docs": {
    "autodocs": "tag",
  },
  "staticDirs": [
    "../public"
  ],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = config.resolve.plugins || [];
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        })
      );
    }
    return config;
  },
};
export default config;