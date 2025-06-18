
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WalletConnection = () => {
  const [manualWallet, setManualWallet] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectMetaMask = () => {
    // Simulated connection - in real app would use wagmi/ethers
    setIsConnected(true);
    console.log('MetaMask connection simulated');
  };

  const handleManualConnect = () => {
    if (manualWallet.length > 20) {
      setIsConnected(true);
      console.log('Manual wallet connected:', manualWallet);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">Connect Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleConnectMetaMask}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Connect MetaMask'}
        </Button>
        
        <div className="text-center text-slate-400 text-sm">
          Or manually enter wallet...
        </div>
        
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Enter wallet address"
            value={manualWallet}
            onChange={(e) => setManualWallet(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
          />
          <Button 
            onClick={handleManualConnect}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
            disabled={isConnected || manualWallet.length < 20}
          >
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;
