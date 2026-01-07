import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

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
