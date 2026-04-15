import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <h1>1-chi topshiriq: Blockchain Kirish</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Web3 dunyosiga xush kelibsiz!</p>
      <ConnectButton />
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        maxWidth: '500px'
      }}>
        <h3>O'rganilgan mavzular:</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Blockchain nima va u qanday ishlaydi?</li>
          <li>Wallet (Hamyon) tushunchasi va turlari</li>
          <li>Ethereum va Sepolia test tarmog'i</li>
          <li>DApp arxitekturasi</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
