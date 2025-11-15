import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SendSolForm } from './components/SendSolForm';
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
        <main className="App-main">
          <SendSolForm />
        </main>

    </div>
  );
}

export default App;