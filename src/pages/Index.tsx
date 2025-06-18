
import React from 'react';
import WalletConnection from '@/components/WalletConnection';
import RegionSelector from '@/components/RegionSelector';
import TransactionLoader from '@/components/TransactionLoader';
import AITaxAssistant from '@/components/AITaxAssistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Crypto Tax Whisperer{' '}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            AI
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Calculate your cryptocurrency taxes effortlessly
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <WalletConnection />
          <RegionSelector />
          <TransactionLoader />
        </div>

        {/* Bottom Row - AI Assistant */}
        <div className="max-w-4xl mx-auto">
          <AITaxAssistant />
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Index;
