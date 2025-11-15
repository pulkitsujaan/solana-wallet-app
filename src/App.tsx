import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SendSolForm } from './components/SendSolForm';
import { JupiterSwap } from './components/JupiterSwap';

import { JupiverseKitProvider } from 'jupiverse-kit';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// Import the component CSS
import './components/SendSolForm.css';

// Import your main App CSS
import './App.css';
import { clusterApiUrl, Connection } from '@solana/web3.js';

function App() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const rpcEndpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT || clusterApiUrl('devnet');
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Solana App</h1>
        <WalletMultiButton />
      </header>

<JupiverseKitProvider
        connection={new Connection(rpcEndpoint)}
        cluster="devnet"
        wallet={wallet}
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