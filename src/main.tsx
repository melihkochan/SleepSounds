import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// iOS Safari detection and fixes
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (isIOS) {
  // Force hardware acceleration for better rendering
  document.documentElement.style.webkitTransform = 'translate3d(0,0,0)';
  document.documentElement.style.transform = 'translate3d(0,0,0)';
  
  // Fix for icon rendering on iOS
  const style = document.createElement('style');
  style.textContent = `
    svg, [class*="lucide"] {
      display: inline-block !important;
      opacity: 1 !important;
      visibility: visible !important;
      -webkit-transform: translate3d(0, 0, 0) !important;
      transform: translate3d(0, 0, 0) !important;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
}

// Error handling for mobile
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Add error boundary at root level
try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; text-align: center; color: white;">
      <h1>Yükleme Hatası</h1>
      <p>Uygulama yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>
    </div>
  `;
}
