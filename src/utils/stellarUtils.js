import { Networks, Asset, Operation, TransactionBuilder, Horizon } from "@stellar/stellar-sdk";
import { STELLAR_CONFIG, getCurrentNetwork, getNetworkPassphrase } from "../config/stellar.js";

// Utility functions for Stellar operations

/**
 * Format Stellar amount from stroops to XLM
 * @param {string} stroops - Amount in stroops (1 XLM = 10^7 stroops)
 * @returns {string} Formatted amount in XLM
 */
export const formatStellarAmount = (stroops) => {
  const xlm = parseFloat(stroops) / 10000000;
  return xlm.toFixed(7);
};

/**
 * Convert XLM amount to stroops
 * @param {number} xlm - Amount in XLM
 * @returns {string} Amount in stroops
 */
export const convertToStroops = (xlm) => {
  return Math.floor(xlm * 10000000).toString();
};

/**
 * Validate Stellar address format
 * @param {string} address - Stellar address to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidStellarAddress = (address) => {
  try {
    // Basic validation - Stellar addresses are 56 characters long and start with G, M, or S
    const stellarAddressRegex = /^[G-M][A-Z2-7]{55}$/;
    return stellarAddressRegex.test(address);
  } catch (error) {
    return false;
  }
};

/**
 * Get account balance for a specific asset
 * @param {string} publicKey - Account public key
 * @param {string} assetCode - Asset code (XLM for native, or custom asset code)
 * @param {string} assetIssuer - Asset issuer (only for custom assets)
 * @returns {Promise<number>} Account balance
 */
export const getAccountBalance = async (publicKey, assetCode = 'XLM', assetIssuer = null) => {
  try {
    const server = new Horizon.Server(getCurrentNetwork().horizonUrl);
    const account = await server.loadAccount(publicKey);
    
    if (assetCode === 'XLM') {
      return parseFloat(account.balances.find(b => b.asset_type === 'native').balance);
    } else {
      const balance = account.balances.find(b => 
        b.asset_code === assetCode && b.asset_issuer === assetIssuer
      );
      return balance ? parseFloat(balance.balance) : 0;
    }
  } catch (error) {
    console.error('Error getting account balance:', error);
    throw error;
  }
};

/**
 * Check if account has sufficient balance for a transaction
 * @param {string} publicKey - Account public key
 * @param {number} amount - Required amount in XLM
 * @param {string} assetCode - Asset code
 * @param {string} assetIssuer - Asset issuer
 * @returns {Promise<boolean>} True if sufficient balance
 */
export const hasSufficientBalance = async (publicKey, amount, assetCode = 'XLM', assetIssuer = null) => {
  try {
    const balance = await getAccountBalance(publicKey, assetCode, assetIssuer);
    return balance >= amount;
  } catch (error) {
    console.error('Error checking balance:', error);
    return false;
  }
};

/**
 * Calculate transaction fee based on network conditions
 * @param {string} operationCount - Number of operations in transaction
 * @returns {string} Fee in stroops
 */
export const calculateTransactionFee = (operationCount = 1) => {
  // Base fee is 100 stroops per operation
  const baseFee = 100;
  return (baseFee * operationCount).toString();
};

/**
 * Create a payment operation
 * @param {string} destination - Destination public key
 * @param {string} amount - Amount in XLM
 * @param {string} assetCode - Asset code
 * @param {string} assetIssuer - Asset issuer
 * @returns {Operation} Stellar operation object
 */
export const createPaymentOperation = (destination, amount, assetCode = 'XLM', assetIssuer = null) => {
  const asset = assetCode === 'XLM' ? Asset.native() : new Asset(assetCode, assetIssuer);
  
  return Operation.payment({
    destination,
    asset,
    amount: convertToStroops(amount)
  });
};

/**
 * Get transaction status from Horizon
 * @param {string} transactionHash - Transaction hash
 * @returns {Promise<Object>} Transaction details
 */
export const getTransactionStatus = async (transactionHash) => {
  try {
    const server = new Horizon.Server(getCurrentNetwork().horizonUrl);
    const transaction = await server.transactions().transaction(transactionHash).call();
    return transaction;
  } catch (error) {
    console.error('Error getting transaction status:', error);
    throw error;
  }
};

/**
 * Wait for transaction confirmation
 * @param {string} transactionHash - Transaction hash
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<Object>} Confirmed transaction
 */
export const waitForTransactionConfirmation = async (transactionHash, timeout = 30000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const transaction = await getTransactionStatus(transactionHash);
      if (transaction.successful !== undefined) {
        return transaction;
      }
    } catch (error) {
      // Transaction might not be available yet
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error('Transaction confirmation timeout');
};

/**
 * Get network information
 * @returns {Object} Network details
 */
export const getNetworkInfo = () => {
  const network = getCurrentNetwork();
  return {
    name: STELLAR_CONFIG.NETWORK,
    passphrase: getNetworkPassphrase(),
    horizonUrl: network.horizonUrl,
    sorobanRpcUrl: network.sorobanRpcUrl,
    isTestnet: STELLAR_CONFIG.NETWORK === 'testnet'
  };
};

/**
 * Format error message for user display
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const formatStellarError = (error) => {
  if (error.response && error.response.data) {
    const stellarError = error.response.data;
    if (stellarError.extras && stellarError.extras.result_codes) {
      return `Stellar Error: ${stellarError.extras.result_codes.operations.join(', ')}`;
    }
    return stellarError.detail || stellarError.title || error.message;
  }
  return error.message;
};

/**
 * Check if transaction was successful
 * @param {Object} transaction - Transaction response
 * @returns {boolean} True if successful
 */
export const isTransactionSuccessful = (transaction) => {
  return transaction && transaction.successful === true;
};

/**
 * Get account sequence number for transaction building
 * @param {string} publicKey - Account public key
 * @returns {Promise<string>} Account sequence number
 */
export const getAccountSequence = async (publicKey) => {
  try {
    const server = new Horizon.Server(getCurrentNetwork().horizonUrl);
    const account = await server.loadAccount(publicKey);
    return account.sequence;
  } catch (error) {
    console.error('Error getting account sequence:', error);
    throw error;
  }
}; 