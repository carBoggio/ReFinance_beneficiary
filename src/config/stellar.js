// Stellar Network Configuration
export const STELLAR_CONFIG = {
  // Default to testnet, can be overridden by environment variables
  NETWORK: import.meta.env.VITE_STELLAR_NETWORK || 'testnet',
  HORIZON_URL: import.meta.env.VITE_STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  SOROBAN_RPC_URL: import.meta.env.VITE_STELLAR_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org',
  CONTRACT_ID: import.meta.env.VITE_CONTRACT_ID || '',
  TOKEN_ID: import.meta.env.VITE_TOKEN_ID || '',
};

// Network-specific configurations
export const NETWORKS = {
  testnet: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
  },
  public: {
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban.stellar.org',
  },
};

// Get current network configuration
export const getCurrentNetwork = () => {
  const network = STELLAR_CONFIG.NETWORK;
  return NETWORKS[network] || NETWORKS.testnet;
};

// Export network passphrase for transaction signing
export const getNetworkPassphrase = () => {
  return getCurrentNetwork().networkPassphrase;
}; 