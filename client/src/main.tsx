import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register PWA service worker
// Register PWA service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use.');
  },
});

// FORCE UNREGISTER OLD SERVICE WORKERS (Fix for "LoveVerse" cache issue)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      // Unregister if it's not the current one (or just unregister all to be safe during dev)
      // For now, we'll let the user manually clear if this persists, but this helps.
      // actually, let's just log for now to see if we can catch it.
      console.log('Found SW:', registration);

      // If we are in dev mode, we might want to unregister everything to be clean
      if (window.location.hostname === 'localhost') {
        registration.unregister();
        console.log('Unregistered stale service worker on localhost');
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
