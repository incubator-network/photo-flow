const config = {
  core: { builder: 'webpack5' },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    config.module.rules.unshift({
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    })

    // ...твой SVG loader
    config.module.rules = config.module.rules.map(rule => {
      if (
        rule.test &&
        rule.test.toString().includes('svg') &&
        rule.type === 'asset/resource'
      ) {
        // Убрать svg из теста file-loader
        const newTest = new RegExp(
          rule.test.toString().replace('svg|', '').replace('|svg', '')
        )
        return { ...rule, test: newTest }
      }
      return rule
    })

    // Добавь SVGR loader для svg
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true },
        },
      ],
    })
    return config
  },
  docs: {
    autodocs: true,
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
