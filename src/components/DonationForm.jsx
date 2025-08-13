import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet.js';
import { getCampaignDetails, getUserContributions } from '../actions/campaignActions.js';
import { stellarService } from '../services/stellar.service.js';
import { ICrowdfundingContract } from '../interfaces/contract.interface.js';

const DonationForm = ({ campaignAddress, onDonationComplete }) => {
  const {
    walletAddress,
    selectedWallet,
    loading,
    error,
    signTransaction,
    isConnected
  } = useWallet();

  const [amount, setAmount] = useState('');
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [userContribution, setUserContribution] = useState(null);
  const [donationStatus, setDonationStatus] = useState('');
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [isProcessingDonation, setIsProcessingDonation] = useState(false);

  // Load campaign details on mount and when wallet connects
  useEffect(() => {
    if (campaignAddress) {
      loadCampaignDetails();
    }
  }, [campaignAddress]);

  // Reload campaign details when wallet connects/disconnects
  useEffect(() => {
    if (campaignAddress) {
      loadCampaignDetails();
      if (isConnected() && walletAddress) {
        loadUserContribution();
      } else {
        // Reset user contribution when wallet disconnects
        setUserContribution(null);
      }
    }
  }, [campaignAddress, isConnected(), walletAddress]);

  const loadCampaignDetails = async () => {
    setIsLoadingCampaign(true);
    try {
      const campaign = await getCampaignDetails(campaignAddress);
      setCampaignDetails(campaign);
    } catch (error) {
      console.error('Error loading campaign details:', error);
    } finally {
      setIsLoadingCampaign(false);
    }
  };

  const loadUserContribution = async () => {
    try {
      const contribution = await getUserContributions('mock', campaignAddress);
      setUserContribution(contribution);
    } catch (error) {
      console.error('Error loading user contribution:', error);
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    
    if (!isConnected()) {
      setDonationStatus('Please connect a wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setDonationStatus('Please enter a valid amount');
      return;
    }

    if (!campaignAddress) {
      setDonationStatus('No campaign selected');
      return;
    }

    try {
      setIsProcessingDonation(true);
      setDonationStatus('Building contract transaction...');
      
      // Build the contract client
      const contractClient = await stellarService.buildClient(walletAddress);
      
      // Convert amount to stroops (1 XLM = 10,000,000 stroops)
      const amountInStroops = Math.floor(parseFloat(amount) * 10000000);
      
      setDonationStatus('Calling contract contribute method...');
      
      // Call the contract's contribute method directly on the Soroban client
      const contractResult = await contractClient.call(
        'contribute',
        walletAddress,  // contributor
        campaignAddress, // campaign_address
        amountInStroops  // amount
      );
      
      setDonationStatus('Converting to XDR...');
      
      // Convert the result to XDR
      const xdr = contractResult.toXDR();
      
      setDonationStatus('Signing transaction with wallet...');
      
      // Sign the transaction with the wallet
      const signedTx = await signTransaction(xdr);
      
      setDonationStatus('Submitting transaction to network...');
      
      // Submit the signed transaction
      const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr || signedTx);
      
      setDonationStatus(`Donation successful! Transaction Hash: ${hashId}`);
      setAmount('');
      
      // Reload campaign details and user contribution to show updated progress
      await loadCampaignDetails();
      await loadUserContribution();
      
      if (onDonationComplete) {
        onDonationComplete({
          success: true,
          transactionHash: hashId,
          walletType: selectedWallet?.id || 'unknown',
          amount: parseFloat(amount),
          campaignAddress,
          amountInStroops
        });
      }
    } catch (error) {
      console.error('Error making donation:', error);
      setDonationStatus(`Error: ${error.message || 'Transaction failed'}`);
    } finally {
      setIsProcessingDonation(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount);
  };

  const getProgressPercentage = () => {
    if (!campaignDetails) return 0;
    return Math.min((campaignDetails.total_raised / campaignDetails.goal) * 100, 100);
  };

  // Calculate remaining amount needed
  const getRemainingAmount = () => {
    if (!campaignDetails) return 0;
    return Math.max(0, campaignDetails.goal - campaignDetails.total_raised);
  };

  return (
    <div className="donation-form max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Campaign Details */}
      {campaignDetails && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Campaign Progress</h4>
          
          {isLoadingCampaign ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Updating campaign data...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Raised:</span>
                <span className="font-semibold text-green-600">
                  {formatAmount(campaignDetails.total_raised)} XLM
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Goal:</span>
                <span className="font-semibold">
                  {formatAmount(campaignDetails.goal)} XLM
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining:</span>
                <span className="font-semibold text-orange-600">
                  {formatAmount(getRemainingAmount())} XLM
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Supporters:</span>
                <span className="font-semibold">
                  {campaignDetails.supporters}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600">
                {getProgressPercentage().toFixed(1)}% Complete
              </div>
            </div>
          )}
        </div>
      )}

      {/* User Contribution */}
      {userContribution && isConnected() && (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Your Previous Contribution</h4>
          <div className="text-sm text-gray-700">
            Amount: <span className="font-semibold text-green-600">{formatAmount(userContribution.amount)} XLM</span>
          </div>
        </div>
      )}

      {/* Wallet Connection Status */}
      {!isConnected() && (
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800 font-medium">Wallet Not Connected</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Connect your wallet to make a donation and see real-time campaign updates.
          </p>
        </div>
      )}

      {/* Donation Form */}
      <form onSubmit={handleDonation} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Donation Amount (XLM)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.000001"
            step="0.000001"
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isProcessingDonation}
          />
          {campaignDetails && campaignDetails.min_donation && (
            <p className="text-xs text-gray-500 mt-1">
              Minimum donation: {formatAmount(campaignDetails.min_donation)} XLM
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Amount will be converted to stroops (1 XLM = 10,000,000 stroops)
          </p>
        </div>

        {!isConnected() ? (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">Please connect a wallet to make a donation</p>
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading || !amount || isProcessingDonation}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isProcessingDonation ? 'Processing...' : `Donate ${amount ? amount + ' XLM' : ''}`}
          </button>
        )}
      </form>

      {/* Status Messages */}
      {donationStatus && (
        <div className={`mt-4 p-3 rounded ${
          donationStatus.includes('Error') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : donationStatus.includes('successful')
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-blue-100 border border-blue-400 text-blue-700'
        }`}>
          {donationStatus}
        </div>
      )}

      {/* Connected Wallet Info */}
      {isConnected() && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-green-800">Wallet Connected</span>
          </div>
          <p className="text-sm text-green-700">
            Connected to: <strong>{selectedWallet?.name || 'Unknown Wallet'}</strong>
          </p>
          <p className="text-green-600 text-xs break-all mt-1">
            {walletAddress}
          </p>
        </div>
      )}

      {/* Contract Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-blue-800">Smart Contract</span>
        </div>
        <p className="text-xs text-blue-700">
          This donation will be processed through the Soroban smart contract on the Stellar network.
        </p>
      </div>
    </div>
  );
};

export default DonationForm; 