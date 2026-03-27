# Plan: Convert CryptoCalk to Android App via Capacitor

## Context
CryptoCalk — статический Astro-сайт (React + Tailwind, 100+ калькуляторов, 6 языков). Нужно обернуть в Android-приложение для Google Play Store через Capacitor. Сайт генерирует статический HTML в `dist/`, иконки 192/512 уже есть.

## App Config
- **Name**: CryptoCalk
- **Package ID**: `com.cryptocalk.calculator`
- **Web Dir**: `dist`

## Steps

### 1. Install Capacitor dependencies
```
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/splash-screen @capacitor/status-bar
```

### 2. Create `capacitor.config.ts`
- appId: `com.cryptocalk.calculator`
- appName: `CryptoCalk`
- webDir: `dist`
- server.url для dev-режима (опционально)
- Настройки splash screen и status bar

### 3. Build Astro site
```
npm run build
```

### 4. Add Android platform
```
npx cap add android
```

### 5. Generate app icons
- Использовать существующие `icon-192.png` и `icon-512.png` из `public/`
- Разместить в `android/app/src/main/res/` (mipmap-* директории)
- Создать скрипт или использовать `@capacitor/assets` для генерации всех размеров

### 6. Configure Android project
- Обновить `android/app/src/main/AndroidManifest.xml`: internet permission, theme
- Обновить `android/app/src/main/res/values/strings.xml`: app name
- Настроить `android/variables.gradle`: minSdkVersion, compileSdkVersion

### 7. Add offline support (Service Worker)
- Создать `public/sw.js` — кеширование статических ассетов (HTML, CSS, JS)
- Зарегистрировать SW в `Layout.astro`
- Стратегия: Network-first для HTML, Cache-first для `_astro/*` ассетов

### 8. Add PWA manifest
- Создать `public/manifest.json` с иконками, именем, цветами
- Подключить в `Layout.astro`

### 9. Sync & verify
```
npx cap sync
```

## Files to create
- `capacitor.config.ts` — конфиг Capacitor
- `public/manifest.json` — PWA-манифест
- `public/sw.js` — Service Worker для оффлайна

## Files to modify
- `package.json` — новые зависимости + скрипты (`cap:sync`, `cap:open`)
- `src/layouts/Layout.astro` — подключить manifest.json + регистрация SW

## Generated (не трогаем руками)
- `android/` — весь Android-проект (генерируется `cap add android`)

## Verification
1. `npm run build` — сайт собирается без ошибок
2. `npx cap sync` — ассеты копируются в Android-проект
3. Открыть в Android Studio: `npx cap open android`
4. Run на эмуляторе → калькуляторы работают, оффлайн-режим работает

## Что останется сделать вручную (после нашей работы)
- Открыть `android/` в Android Studio
- Build > Generate Signed Bundle (AAB)
- Загрузить AAB в Google Play Console
- Настроить listing (скриншоты, описание)
