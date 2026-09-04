# CI/CD कॉन्फ़िगरेशन

## अवलोकन

Memesplora निरंतर एकीकरण और डिप्लॉयमेंट के लिए GitHub Actions का उपयोग करता है। तीन CI वर्कफ़्लो कॉन्फ़िगर किए गए हैं:

## वर्कफ़्लो

### 1. बैकएंड CI (`.github/workflows/backend.yml`)

`master`/`develop` (backend/ बदलाव) पर push/PR पर ट्रिगर:

| चरण | क्रिया |
|:----:|--------|
| बिल्ड | `go build -v ./...` |
| टेस्ट | `go test -v ./...` |
| Vet | `go vet ./...` |

### 2. फ्रंटएंड CI (`.github/workflows/frontend.yml`)

| चरण | क्रिया |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| बिल्ड | `npm run build` |

### 3. दस्तावेज़ CI और डिप्लॉय (`.github/workflows/docs.yml`)

| चरण | क्रिया |
|:----:|--------|
| बिल्ड | `npm run build` (VitePress) |
| डिप्लॉय | GitHub Pages पर डिप्लॉय |

## स्थिति बैज

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## स्थानीय CI जांच

```bash
# बैकएंड
cd backend && go build ./... && go test ./... && go vet ./...

# फ्रंटएंड
cd frontend && npx tsc --noEmit && npm run build

# दस्तावेज़
cd docs && npm run build
```

## दस्तावेज़ डिप्लॉयमेंट

- **URL**: https://maicarons.github.io/memesplora/
- **ट्रिगर**: `master` पर push जिसमें docs/ बदलाव हों
- **वातावरण**: `github-pages`