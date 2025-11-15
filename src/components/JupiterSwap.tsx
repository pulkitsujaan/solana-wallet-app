import React, { FC } from 'react';
// 1. IMPORT THE NEW REACT COMPONENT
import { IntegratedTerminal } from 'jupiverse-kit';
import './JupiterSwap.css';

// 2. DEFINE YOUR DEVNET TOKEN MINTS
const DEVNET_SOL_MINT = "So11111111111111111111111111111111111111112";
const DEVNET_USDC_MINT = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";

export const JupiterSwap: FC = () => {
  return (
    <div className="jupiter-swap-container">
      <h2>Swap Tokens (Jupiter)</h2>

      {/* 3. RENDER THE COMPONENT. THAT'S IT! */}
      <IntegratedTerminal
        defaultInputMint={DEVNET_SOL_MINT}
        defaultOutputMint={DEVNET_USDC_MINT}
      />
    </div>
  );
};