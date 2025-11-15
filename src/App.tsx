import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SendSolForm } from './components/SendSolForm';
import { JupiterSwap } from './components/JupiterSwap';

import { JupiverseKitProvider } from 'jupiverse-kit';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// Import the component CSS
import './components/SendSolForm.css';

// Import your main App CSS
import './App.css';

function App() {
  const { connection } = useConnection();
  const wallet = useWallet();
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Solana App</h1>
        <WalletMultiButton />
      </header>

<JupiverseKitProvider
        connection={connection}
        cluster="devnet"
        wallet={wallet}
        // You can set your platform fee here (e.g., 50 bps = 0.5%)
        // platformFeeBps={50} 
      >
        <main className="App-main">
          <SendSolForm />
          <JupiterSwap />
        </main>
      </JupiverseKitProvider>
    </div>
  );
}

export default App;