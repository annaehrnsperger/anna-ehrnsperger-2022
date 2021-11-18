# Eleventy Sanity Starter

> Starter template with [Sanity](https://sanity.io), [Eleventy](https://11ty.dev), [Tailwind CSS](https://tailwindcss.com/) + [esbuild](https://esbuild.github.io/)

## 💥 Getting Started

### 11ty

```
npm install
npm start
```

### Sanity

```
cd studio/
npm install
npm start
```

Run `sanity init` or change Sanity `projectId` + `dataset`:

1. [`studio/sanity.json`](studio/sanity.json)
2. [`src/utils/sanityClient.js`](src/utils/sanityClient.js)

### .env

```
API_KEY
```

## 🚀 Production

```sh
npm run build
# Deploy public folder to Netlify
```
