import { useState, useEffect, useCallback } from 'react';
import { walletService } from '../services/wallet.service.js';
import { stellarService } from '../services/stellar.service.js';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check wallet connection on mount
  useEffect(() => {
    checkWalletConnection();
    setIsInitialized(true);
  }, []);

  const checkWalletConnection = useCallback(async () => {
    try {
      // For now, we'll assume wallet is not connected until explicitly connected
      // This can be enhanced later with proper wallet state management
      if (walletAddress) {
        // Wallet is connected
        return;
      } else {
        // Reset state if wallet is not connected
        if (walletAddress !== null || selectedWallet !== null) {
          setWalletAddress(null);
          setSelectedWallet(null);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      // Reset state on error
      setWalletAddress(null);
      setSelectedWallet(null);
    }
  }, [walletAddress, selectedWallet]);

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const address = await walletService.connect();
      
      setWalletAddress(address);
      setSelectedWallet({ id: 'connected', name: 'Connected Wallet' });
      
      return { address, wallet: { id: 'connected', name: 'Connected Wallet' } };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      await walletService.disconnect();
      setWalletAddress(null);
      setSelectedWallet(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const signTransaction = useCallback(async (xdr) => {
    try {
      const result = await walletService.signTransaction(xdr);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  // Get network information
  const getNetworkInfo = useCallback(() => {
    return stellarService.environment();
  }, []);

  // Check if wallet is connected
  const isConnected = useCallback(() => {
    return walletAddress !== null;
  }, [walletAddress]);

  // Get current wallet address
  const getCurrentAddress = useCallback(() => {
    return walletAddress;
  }, [walletAddress]);

  // Get selected wallet info
  const getCurrentWallet = useCallback(() => {
    return selectedWallet;
  }, [selectedWallet]);

  // Force refresh wallet state
  const refreshWalletState = useCallback(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  // Clear any errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    walletAddress,
    selectedWallet,
    loading,
    error,
    isInitialized,
    connectWallet,
    disconnectWallet,
    signTransaction,
    getNetworkInfo,
    isConnected,
    getCurrentAddress,
    getCurrentWallet,
    checkWalletConnection,
    refreshWalletState,
    clearError
  };
}; 