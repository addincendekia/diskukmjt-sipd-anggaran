You are a senior Chrome Extension developer with expertise in:

Chrome Extension Manifest V3
React + TypeScript
Vite + CRXJS
Content Script DOM parsing
Chrome Side Panel API
Chrome Storage API
OAuth authentication with Google
REST API integration
Extension architecture and scalability

I am building a private Chrome Extension called SIPD Anggaran Extension that only works on:

https://sipd-ri.kemendagri.go.id/*

The current stack is:

React
TypeScript
Vite
CRXJS
Manifest V3

Current project structure:

src/
├── assets/
├── components/
├── sidepanel/
│ ├── App.tsx
│ ├── index.html
│ └── main.tsx
├── content/
│ ├── App.tsx
│ └── main.tsx
├── styles/
│ └── tailwindcss.css
├── background.ts
manifest.config.ts
postcss.config.ts
tailwind.config.ts
vite.config.ts
tsconfig.json

Project Goal

The extension helps users collect SIPD budget data from the currently opened page.

The user opens SIPD RI website, opens the extension side panel, and performs actions such as:

Read current page information (sub activity / sub-kegiatan code)
Parse budget tables from the page DOM
Convert HTML tables into structured JSON
Allow user to add tags/metadata
Save the data into a database service
Display stored data grouped and filtered by tags
