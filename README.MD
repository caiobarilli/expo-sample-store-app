# Expo Sample Store App

...

### Visão Geral

...

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

Node.js (versão 14 ou superior) <br/>
Expo CLI (npm install -g expo-cli)


### Configuração do Projeto

Clone este repositório para o seu ambiente local:

```bash
git clone git@github.com:caiobarilli/expo-sample-store-app.git
cd expo-sample-store-app
```

Instale as dependências do projeto:

```bash
npm install
```

Inicie o servidor de desenvolvimento do Expo:

```bash
npx expo start
```

Escaneie o QR code com o aplicativo Expo Go (disponível na App Store e Google Play) ou utilize um emulador para ver o aplicativo em execução.

Estrutura do Projeto
A estrutura básica do projeto é a seguinte:

```bash
expo-sample-store-app/src/
├── App
│   ├── (navigation)
│   │   ├── Auth
│   │   │   └── index.tsx
│   │   └── Authenticated
│   │       └── index.tsx
│   └── _layout.tsx
├── assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── fonts
│   │   ├── Roboto-Bold.ttf
│   │   ├── Roboto-Medium.ttf
│   │   └── Roboto-Regular.ttf
│   ├── icon.png
│   └── splash.png
├── components
│   └── Nav
│       └── index.tsx
├── hooks
│   ├── use-auth
│   │   └── index.tsx
│   └── use-cart
│       └── index.tsx
├── lib
│   ├── types
│   │   ├── auth.ts
│   │   └── cart.ts
│   └── utils
│       └── icons
│           └── index.tsx
├── redux
│   ├── favorite-slice.ts
│   ├── provider.tsx
│   ├── store.ts
│   └── ui-slice.ts
└── screens
    ├── About
    │   └── index.tsx
    ├── Cart
    │   └── index.tsx
    ├── Chat
    │   └── index.tsx
    ├── Config
    │   └── index.tsx
    ├── Contact
    │   └── index.tsx
    ├── Forgot
    │   └── index.tsx
    ├── Home
    │   └── index.tsx
    ├── Login
    │   └── index.tsx
    ├── Orders
    │   └── index.tsx
    ├── Profile
    │   └── index.tsx
    └── Register
        └── index.tsx
```
