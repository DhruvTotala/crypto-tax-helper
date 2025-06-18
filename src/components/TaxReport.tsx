
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader, Download, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PinataSDK } from 'pinata-web3';

interface Transaction {
  id: number;
  hash: string;
  type: string;
  amount: string;
  date: string;
  value: number;
  gainLoss: number;
}

const TaxReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  // Sample tax data - in real app this would come from actual transaction analysis
  const taxData = {
    totalGains: 12450.75,
    totalLosses: -3200.50,
    netGains: 9250.25,
    taxOwed: 2220.06,
    transactions: [
      { id: 1, hash: '0x123...abc', type: 'Buy', amount: '1.5 ETH', date: '2024-01-15', value: 3750, gainLoss: 0 },
      { id: 2, hash: '0x456...def', type: 'Sell', amount: '0.8 ETH', date: '2024-01-20', value: 2100, gainLoss: 350 },
      { id: 3, hash: '0x789...ghi', type: 'Sell', amount: '0.3 ETH', date: '2024-01-25', value: 780, gainLoss: 130 }
    ] as Transaction[]
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const reportElement = document.getElementById('tax-report-content');
      if (!reportElement) return;

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1e293b'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('crypto-tax-report.pdf');
      setReportGenerated(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadToPinata = async () => {
    setIsUploading(true);
    
    try {
      // Note: In a real implementation, you'd need proper Pinata API keys
      // For demo purposes, we'll simulate the upload
      console.log('Uploading to Pinata IPFS...');
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock IPFS hash
      const mockHash = 'QmTaxReport123abc456def789ghi';
      setIpfsHash(mockHash);
      
      console.log('Report uploaded to IPFS:', mockHash);
      alert(`Report uploaded to IPFS! Hash: ${mockHash}\nIPFS URL: https://gateway.pinata.cloud/ipfs/${mockHash}`);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      alert('Error uploading to IPFS. Please check your Pinata configuration.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">Tax Report</CardTitle>
        <p className="text-slate-400 text-sm">Generate your comprehensive crypto tax report</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div id="tax-report-content" className="space-y-6 p-6 bg-slate-900/50 rounded-lg">
          {/* Tax Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30">
              <h3 className="text-green-400 text-sm font-medium">Total Gains</h3>
              <p className="text-white text-lg font-bold">${taxData.totalGains.toLocaleString()}</p>
            </div>
            <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
              <h3 className="text-red-400 text-sm font-medium">Total Losses</h3>
              <p className="text-white text-lg font-bold">${taxData.totalLosses.toLocaleString()}</p>
            </div>
            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/30">
              <h3 className="text-blue-400 text-sm font-medium">Net Gains</h3>
              <p className="text-white text-lg font-bold">${taxData.netGains.toLocaleString()}</p>
            </div>
            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-600/30">
              <h3 className="text-purple-400 text-sm font-medium">Tax Owed</h3>
              <p className="text-white text-lg font-bold">${taxData.taxOwed.toLocaleString()}</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Transaction Details</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Value</TableHead>
                  <TableHead className="text-slate-300">Gain/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxData.transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-slate-600">
                    <TableCell className="text-slate-300">{tx.date}</TableCell>
                    <TableCell className="text-slate-300">{tx.type}</TableCell>
                    <TableCell className="text-slate-300">{tx.amount}</TableCell>
                    <TableCell className="text-slate-300">${tx.value.toLocaleString()}</TableCell>
                    <TableCell className={tx.gainLoss >= 0 ? "text-green-400" : "text-red-400"}>
                      ${tx.gainLoss.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Generate PDF Report
              </>
            )}
          </Button>

          <Button
            onClick={uploadToPinata}
            disabled={!reportGenerated || isUploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Uploading to IPFS...
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share on IPFS
              </>
            )}
          </Button>
        </div>

        {ipfsHash && (
          <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30">
            <h4 className="text-green-400 font-medium mb-2">Report Shared Successfully!</h4>
            <p className="text-slate-300 text-sm">
              IPFS Hash: <span className="font-mono text-green-400">{ipfsHash}</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Access your report at: https://gateway.pinata.cloud/ipfs/{ipfsHash}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxReport;
