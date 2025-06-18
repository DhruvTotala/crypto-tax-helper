
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';

const TransactionLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleLoadTransactions = async () => {
    setIsLoading(true);
    console.log('Loading transactions...');
    
    // Simulate API call
    setTimeout(() => {
      setTransactions([
        { id: 1, hash: '0x123...abc', type: 'Buy', amount: '1.5 ETH', date: '2024-01-15' },
        { id: 2, hash: '0x456...def', type: 'Sell', amount: '0.8 ETH', date: '2024-01-20' },
        { id: 3, hash: '0x789...ghi', type: 'Transfer', amount: '0.3 ETH', date: '2024-01-25' }
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">Fetch Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleLoadTransactions}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Load Transactions'
          )}
        </Button>
        
        {transactions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-white font-medium">Recent Transactions:</h4>
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-slate-700/30 p-3 rounded-lg border border-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{tx.type}</span>
                  <span className="text-purple-400">{tx.amount}</span>
                </div>
                <div className="text-slate-400 text-sm mt-1">{tx.date}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionLoader;
