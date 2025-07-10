import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/Image/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/auth/sign-up', // Исходный путь (главная страница)
        has: [
          // Условия для срабатывания редиректа
          {
            type: 'query', // Проверяем query-параметры
            key: 'code', // Параметр `code` должен существовать
            value: '(?<code>.*)', // Регулярка: любое значение (и сохраняем в группу `code`)
          },
        ],
        destination: '/auth/confirm-email?code=:code', // Куда перенаправляем
        permanent: false, // 301 (постоянный) или 302 (временный) редирект
      },
      {
        source: '/auth/forgot-password',
        has: [
          {
            type: 'query',
            key: 'code',
            value: '(?<code>.*)',
          },
          {
            type: 'query', // Проверяем query-параметры
            key: 'email', // Параметр `code` должен существовать
            value: '(?<email>.*)', // Регулярка: любое значение (и сохраняем в группу `code`)
          },
        ],
        destination: '/auth/check-code-password?code=:code&email=:email',
        permanent: false,
      },
    ]
  },

  // ...other config

  // собрать проект не смотря на предупреждения/ошибки в проекте
  // eslint: {
  // ignoreDuringBuilds: true,
  // },
  // typescript: {
  // ignoreBuildErrors: true,
  // },
}

export default nextConfig
