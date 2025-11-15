import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useCallback, useState } from 'react';
import type { FC } from 'react';

// You can use a CSS file for styling
import './SendSolForm.css';

export const SendSolForm: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [signature, setSignature] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = useCallback(async () => {
        if (!publicKey) {
            setError('Wallet not connected!');
            return;
        }
        if (!recipient || !amount) {
            setError('Please fill in both fields.');
            return;
        }

        setError('');
        setSignature('');
        setLoading(true);

        try {
            const recipientPubKey = new PublicKey(recipient);
            const lamports = Number(amount) * LAMPORTS_PER_SOL;

            if (lamports <= 0) {
                setError('Amount must be greater than 0.');
                setLoading(false);
                return;
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubKey,
                    lamports: lamports,
                })
            );

            // Get the latest blockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            // Sign and send the transaction
            const sig = await sendTransaction(transaction, connection);
            
            // Wait for confirmation
            await connection.confirmTransaction(sig, 'confirmed');
            
            setSignature(sig);
            setLoading(false);
            setRecipient('');
            setAmount('');

        } catch (error: any) {
            if (error.message.includes('Invalid public key')) {
                setError('Invalid recipient wallet address.');
            } else {
                setError(`Transaction failed: ${error.message}`);
            }
            setLoading(false);
        }
    }, [publicKey, sendTransaction, connection, recipient, amount]);

    return (
        <div className="send-sol-form">
            <h2>Send SOL (Devnet)</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={!publicKey || loading}
            />
            <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!publicKey || loading}
            />
            <button onClick={handleSend} disabled={!publicKey || loading}>
                {loading ? 'Sending...' : 'Send SOL'}
            </button>

            {error && <p className="error">{error}</p>}
            {signature && (
                <div className="success">
                    <p>Transaction Successful!</p>
                    <a 
                        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        View on Explorer
                    </a>
                </div>
            )}
        </div>
    );
};