import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SendSolForm } from './components/SendSolForm';
import { JupiterSwap } from './components/JupiterSwap';

import { JupiverseKitProvider } from 'jupiverse-kit';
// We can remove 'useWallet' as it's no longer needed in this file

import './components/SendSolForm.css';
import './App.css';

function App() {
  // We no longer need the 'wallet' const here

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Solana App</h1>
        <WalletMultiButton />
      </header>

      {/* This is the simplest form.
        The provider just needs to be *inside* your
        WalletContextProvider, and it finds everything
        (wallet, connection, cluster) automatically.
      */}
      <JupiverseKitProvider>
        <main className="App-main">
          <SendSolForm />
          <JupiterSwap />
        </main>
      </JupiverseKitProvider>
    </div>
  );
}

export default App;