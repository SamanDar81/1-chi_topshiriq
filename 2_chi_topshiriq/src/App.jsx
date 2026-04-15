import React, { useState, useEffect } from 'react';
import { 
  useAccount, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SimpleStorageABI from './abi/SimpleStorage.json';

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function App() {
  const { address, isConnected } = useAccount();
  const [inputValue, setInputValue] = useState('');
  
  const { 
    data: storedValue, 
    isPending: isReadPending, 
    refetch 
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SimpleStorageABI.abi,
    functionName: 'getValue',
  });

  const { 
    data: hash, 
    isPending: isWritePending, 
    error: writeError, 
    writeContract 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: SimpleStorageABI.abi,
      functionName: 'setValue',
      args: [BigInt(inputValue)],
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo" id="dapp-logo">DApp 2.0</div>
        <ConnectButton />
      </header>

      <main>
        <div className="glass-panel" id="main-panel">
          <h1>Smart Contract Interaction</h1>
          <p className="text-muted">
            Connect your wallet to read and write data to the Sepolia testnet.
          </p>

          <div className="grid">
            <div className="interaction-area" id="read-section">
              <h2>Current Stored Value</h2>
              <div className="value-display" id="value-display">
                {isReadPending ? '...' : storedValue?.toString() || '0'}
              </div>
              <p className="text-muted">Value fetched directly from the SimpleStorage contract.</p>
            </div>

            <div className="interaction-area" id="write-section">
              <h2>Update Value</h2>
              <form onSubmit={handleUpdate} id="update-form">
                <div className="input-group">
                  <label htmlFor="newValue-input">Enter New Numeric Value</label>
                  <input
                    id="newValue-input"
                    type="number"
                    placeholder="e.g. 42"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={!isConnected || isWritePending || isConfirming}
                  />
                </div>
                
                <button 
                  id="submit-btn"
                  type="submit" 
                  className="btn-primary" 
                  disabled={!isConnected || !inputValue || isWritePending || isConfirming}
                >
                  {isWritePending ? (
                    <><span className="spinner"></span> Confirm in Wallet...</>
                  ) : isConfirming ? (
                    <><span className="spinner"></span> Processing...</>
                  ) : (
                    'Update Blockchain Data'
                  )}
                </button>
              </form>

              <div className="status-container" id="status-container">
                {isConfirming && (
                  <div className="status-badge status-pending" id="pending-badge">
                    <span className="spinner"></span> Transaction is pending on-chain...
                  </div>
                )}
                {isConfirmed && (
                  <div className="status-badge status-success" id="success-badge">
                    ✅ Success! Data successfully updated.
                  </div>
                )}
                {(writeError || confirmError) && (
                  <div className="status-badge status-error" id="error-badge">
                    ❌ Error: {writeError?.shortMessage || confirmError?.message || 'Transaction failed'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {!isConnected && (
        <div style={{ marginTop: '2rem' }}>
          <p className="status-badge status-pending" id="connect-warning" style={{ fontSize: '1rem' }}>
            ⚠️ Please connect your wallet to interact with the contract.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
