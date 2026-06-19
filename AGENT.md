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
│ ├── components #reusable component
│ ├── pages
│ ├── App.tsx
│ ├── index.html
│ └── main.tsx
├── content/
│ ├── components
│ ├── App.tsx
│ └── main.tsx #this where content-script belongs
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

Coding conventions

- Component filenames should use a capitalized base name and dot-suffix convention, for example:
  - `App.tsx` for the component
  - `App.skeleton.tsx` for the skeleton UI
  - `App.hook.tsx` for the custom hook
  - `App.styles.css` for the component-specific styles
- Custom React hooks should be named with `use*` and reflect the owner, for example `useApp` for an App-specific hook.
- Boolean attributes and props should use clear prefixes like `is`, `has`, or `can`, for example `isLoading`, `isCollapsed`, `isError`, `hasValue`.
- Avoid nested conditional expressions in JSX; extract the logic into a helper function.
- Treat `pages/` as a folder of page components. When a page contains multiple related pieces:
  - Create a page folder for the page component.
  - Add `index.ts` that exports the main page component, for example `PageComponent.tsx`.
  - Place any small component used only by that page inside the same page folder.
  - If a small component may be reused by another page, place it in the shared `components/` folder at the same level as `pages/`.
