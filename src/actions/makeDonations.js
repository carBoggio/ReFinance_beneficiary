import {
  contract,
  Horizon,
  Keypair,
  Networks,
  TransactionBuilder,
  xdr,
} from "@stellar/stellar-sdk";
import { FreighterApi } from "@stellar/freighter-api";
import { STELLAR_CONFIG, getCurrentNetwork, getNetworkPassphrase } from "../config/stellar.js";
import { stellarService } from "../services/stellar.service.js";
import { ICrowdfundingContract } from "../interfaces/contract.interface.js";

// Initialize Stellar services - using Horizon instead of Server
const horizonServer = new Horizon.Server(getCurrentNetwork().horizonUrl);

// Wallet connection functions
export const connectFreighter = async () => {
  try {
    if (!window.freighter) {
      throw new Error("Freighter wallet not found. Please install Freighter extension.");
    }

    const freighterApi = new FreighterApi();
    await freighterApi.connect();
    
    const publicKey = await freighterApi.getPublicKey();
    const network = await freighterApi.getNetwork();
    
    return {
      type: 'freighter',
      publicKey,
      network,
      api: freighterApi,
      isConnected: true
    };
  } catch (error) {
    console.error("Error connecting to Freighter:", error);
    throw error;
  }
};

export const connectXBull = async () => {
  try {
    if (!window.xBull) {
      throw new Error("xBull wallet not found. Please install xBull extension.");
    }

    // xBull connection logic
    const publicKey = await window.xBull.connect();
    
    return {
      type: 'xbull',
      publicKey,
      network: STELLAR_CONFIG.NETWORK,
      api: window.xBull,
      isConnected: true
    };
  } catch (error) {
    console.error("Error connecting to xBull:", error);
    throw error;
  }
};

export const connectAlbedo = async () => {
  try {
    // Albedo connection logic
    const albedo = window.Albedo;
    if (!albedo) {
      throw new Error("Albedo wallet not found. Please install Albedo extension.");
    }

    const result = await albedo.publicKey({
      network: STELLAR_CONFIG.NETWORK,
      token: 'albedo'
    });

    return {
      type: 'albedo',
      publicKey: result.pubkey,
      network: STELLAR_CONFIG.NETWORK,
      api: albedo,
      isConnected: true
    };
  } catch (error) {
    console.error("Error connecting to Albedo:", error);
    throw error;
  }
};

// Get wallet addresses
export const getWalletAddresses = async (walletType) => {
  try {
    switch (walletType) {
      case 'freighter':
        const freighterWallet = await connectFreighter();
        return freighterWallet.publicKey;
      
      case 'xbull':
        const xbullWallet = await connectXBull();
        return xbullWallet.publicKey;
      
      case 'albedo':
        const albedoWallet = await connectAlbedo();
        return albedoWallet.publicKey;
      
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  } catch (error) {
    console.error(`Error getting wallet address for ${walletType}:`, error);
    throw error;
  }
};

// Main donation function using Soroban contract
export const makeDonation = async (walletType, campaignAddress, amount, tokenAddress = null) => {
  try {
    let wallet;
    
    // Connect to the specified wallet
    switch (walletType) {
      case 'freighter':
        wallet = await connectFreighter();
        break;
      case 'xbull':
        wallet = await connectXBull();
        break;
      case 'albedo':
        wallet = await connectAlbedo();
        break;
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }

    if (!wallet.isConnected) {
      throw new Error("Wallet not connected");
    }

    // Build the contract client
    const contractClient = await stellarService.buildClient(wallet.publicKey);
    
    // Convert amount to stroops (1 XLM = 10,000,000 stroops)
    const amountInStroops = Math.floor(parseFloat(amount) * 10000000);
    
    // Call the contract's contribute method
    const contractResult = await contractClient.contribute({
      contributor: wallet.publicKey,
      campaign_address: campaignAddress,
      amount: amountInStroops
    });
    
    // Convert the result to XDR
    const xdr = contractResult.toXDR();
    
    // Sign the transaction based on wallet type
    let signedTransaction;
    
    switch (walletType) {
      case 'freighter':
        signedTransaction = await wallet.api.signTransaction(xdr, {
          network: wallet.network
        });
        break;
      
      case 'xbull':
        signedTransaction = await wallet.api.signTransaction(xdr);
        break;
      
      case 'albedo':
        signedTransaction = await wallet.api.sign(xdr, {
          network: wallet.network
        });
        break;
    }

    // Submit the transaction using the stellar service
    const hashId = await stellarService.submitTransaction(signedTransaction);
    
    return {
      success: true,
      transactionHash: hashId,
      walletType,
      amount,
      amountInStroops,
      campaignAddress
    };

  } catch (error) {
    console.error("Error making donation:", error);
    throw error;
  }
};

// Check if wallet is connected
export const isWalletConnected = (walletType) => {
  try {
    switch (walletType) {
      case 'freighter':
        return window.freighter && window.freighter.isConnected;
      case 'xbull':
        return window.xBull && window.xBull.isConnected;
      case 'albedo':
        return window.Albedo !== undefined;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};

// Disconnect wallet
export const disconnectWallet = (walletType) => {
  try {
    switch (walletType) {
      case 'freighter':
        if (window.freighter) {
          window.freighter.disconnect();
        }
        break;
      case 'xbull':
        if (window.xBull) {
          window.xBull.disconnect();
        }
        break;
      case 'albedo':
        // Albedo doesn't have a disconnect method
        break;
    }
  } catch (error) {
    console.error(`Error disconnecting ${walletType}:`, error);
  }
};

// Get campaign details from contract
export const getCampaignFromContract = async (campaignAddress) => {
  try {
    // This would use the actual contract to get campaign details
    // For now, we'll return mock data
    const mockCampaign = {
      id: '1',
      name: 'Construcción de Escuela Rural',
      description: 'Construir una escuela rural para niños en comunidades remotas',
      goal: 10000,
      total_raised: 3500,
      supporters: 45,
      min_donation: 1,
      creator: 'campaign_creator_address',
      deadline: '2024-12-31',
      status: 'active'
    };
    
    return mockCampaign;
  } catch (error) {
    console.error('Error getting campaign from contract:', error);
    throw error;
  }
};

// Get user contribution from contract
export const getUserContributionFromContract = async (campaignAddress, userAddress) => {
  try {
    // This would use the actual contract to get user contribution
    // For now, we'll return mock data
    const mockContribution = {
      amount: 50,
      timestamp: Date.now(),
      campaign_address: campaignAddress,
      contributor: userAddress
    };
    
    return mockContribution;
  } catch (error) {
    console.error('Error getting user contribution from contract:', error);
    throw error;
  }
};
