##Устанавливаем зависимости
#FROM node:20.11-alpine as dependencies
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#
##Билдим приложение
##Кэширование зависимостей — если файлы в проекте изменились,
##но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
#FROM node:20.11-alpine as builder
#WORKDIR /app
#COPY . .
#COPY --from=dependencies /app/node_modules ./node_modules
#RUN pnpm run build:production
#
##Стейдж запуска
#FROM node:20.11-alpine as runner
#WORKDIR /app
#ENV NODE_ENV production
#COPY --from=builder /app/ ./
#EXPOSE 3000
#CMD ["npm", "start"]

# 1. Установка зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Устанавливаем pnpm через corepack (встроен в Node.js 16.13+)
RUN corepack enable

# Копируем package.json и pnpm-lock.yaml для кэширования зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем только production-зависимости (или все, если нужно билдить)
RUN pnpm install --frozen-lockfile

# 2. Сборка приложения
FROM node:20.11-alpine AS builder
WORKDIR /app
RUN corepack enable

# Копируем все файлы проекта
COPY . .

# Копируем node_modules из предыдущего этапа
COPY --from=dependencies /app/node_modules ./node_modules

# Собираем приложение
RUN pnpm run build:production

# 3. Запуск приложения
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

# Копируем собранное приложение и зависимости
COPY --from=builder /app ./

EXPOSE 3000

CMD ["pnpm", "start"]

