# OctoFit Tracker frontend

This React 19 presentation tier uses `react-router-dom` and the backend API on port 8000.

In Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` by copying `.env.example`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend requests `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When the variable is unset, it safely falls back to `http://localhost:8000` for local development.