import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet.js';
import { stellarService } from '../services/stellar.service.js';
import { ICrowdfundingContract } from '../interfaces/contract.interface.js';

const ActionButtons = ({ campaignAddress, onCampaignUpdate }) => {
  const { walletAddress, selectedWallet, isConnected, signTransaction } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionStatus, setActionStatus] = useState('');

  const handleAddContribute = async (amount) => {
    if (!isConnected()) {
      setActionStatus('Please connect a wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setActionStatus('Building contract transaction...');

      const contractClient = await stellarService.buildClient(walletAddress);

      // Convert amount to stroops (1 XLM = 10,000,000 stroops)
      const amountInStroops = Math.floor(parseFloat(amount) * 10000000);

      setActionStatus('Calling contract contribute method...');

      const xdr = (
        await contractClient.contribute({
          contributor: walletAddress,
          campaign_address: campaignAddress,
          amount: amountInStroops,
        })
      ).toXDR();

      setActionStatus('Signing transaction with wallet...');

      const signedTx = await signTransaction(xdr);

      setActionStatus('Submitting transaction to network...');

      const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr || signedTx);

      setActionStatus(`Contribution successful! Transaction Hash: ${hashId}`);

      // Update campaign state
      if (onCampaignUpdate) {
        onCampaignUpdate({
          type: 'contribute',
          amount,
          transactionHash: hashId,
          supporters: 1, // Increment supporters
          total_raised: amount // Add to total raised
        });
      }

    } catch (error) {
      console.error('Error making contribution:', error);
      setActionStatus(`Error: ${error.message || 'Transaction failed'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRefund = async () => {
    if (!isConnected()) {
      setActionStatus('Please connect a wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setActionStatus('Building refund transaction...');

      const contractClient = await stellarService.buildClient(walletAddress);

      setActionStatus('Calling contract refund method...');

      const xdr = (
        await contractClient.refund({
          contributor: walletAddress,
          campaign_address: campaignAddress,
        })
      ).toXDR();

      setActionStatus('Signing transaction with wallet...');

      const signedTx = await signTransaction(xdr);

      setActionStatus('Submitting transaction to network...');

      const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr || signedTx);

      setActionStatus(`Refund successful! Transaction Hash: ${hashId}`);

      // Update campaign state
      if (onCampaignUpdate) {
        onCampaignUpdate({
          type: 'refund',
          transactionHash: hashId,
          supporters: -1, // Decrement supporters
          total_raised: 0 // Reset total raised for this user
        });
      }

    } catch (error) {
      console.error('Error processing refund:', error);
      setActionStatus(`Error: ${error.message || 'Transaction failed'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected()) {
      setActionStatus('Please connect a wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setActionStatus('Building withdraw transaction...');

      const contractClient = await stellarService.buildClient(campaignAddress);

      setActionStatus('Calling contract withdraw method...');

      const xdr = (
        await contractClient.withdraw({
          creator: campaignAddress,
        })
      ).toXDR();

      setActionStatus('Signing transaction with creator key...');

      // For now, we'll use a mock secret key
      // In production, this should be securely managed
      const mockSecretKey = 'mock_secret_key_for_testing';

      const signedTx = await stellarService.signTransaction(xdr, mockSecretKey);

      setActionStatus('Submitting transaction to network...');

      const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr || signedTx);

      setActionStatus(`Withdraw successful! Transaction Hash: ${hashId}`);

      // Update campaign state
      if (onCampaignUpdate) {
        onCampaignUpdate({
          type: 'withdraw',
          transactionHash: hashId,
          campaignRemoved: true // Campaign is removed after withdraw
        });
      }

    } catch (error) {
      console.error('Error processing withdraw:', error);
      setActionStatus(`Error: ${error.message || 'Transaction failed'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const openContributeModal = () => {
    const amount = prompt('Enter contribution amount in XLM:');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      handleAddContribute(parseFloat(amount));
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={openContributeModal}
          disabled={!isConnected() || isProcessing}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Contribute'}
        </button>

        <button
          onClick={handleRefund}
          disabled={!isConnected() || isProcessing}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Refund'}
        </button>

        <button
          onClick={handleWithdraw}
          disabled={!isConnected() || isProcessing}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Withdraw'}
        </button>
      </div>

      {/* Status Messages */}
      {actionStatus && (
        <div className={`p-3 rounded ${
          actionStatus.includes('Error') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : actionStatus.includes('successful')
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-blue-100 border border-blue-400 text-blue-700'
        }`}>
          {actionStatus}
        </div>
      )}

      {/* Wallet Status */}
      {!isConnected() && (
        <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Connect your wallet to perform actions on this campaign.
          </p>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Processing transaction...</p>
        </div>
      )}
    </div>
  );
};

export default ActionButtons; 