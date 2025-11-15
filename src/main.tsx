import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WalletContextProvider from './contexts/WalletContextProvider.tsx'
import "jupiverse-kit/dist/styles.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContextProvider>
    <App /> 
    </WalletContextProvider>
  </StrictMode>,
)
