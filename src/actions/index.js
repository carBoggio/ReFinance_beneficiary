// Export wallet-related functions and hooks
export { useWallet } from '../hooks/useWallet.js';

// Export services
export { walletService } from '../services/wallet.service.js';
export { stellarService } from '../services/stellar.service.js';

// Export contract interface
export { ICrowdfundingContract } from '../interfaces/contract.interface.js';

// Export stellar utilities
export * from '../utils/stellarUtils.js';

// Export stellar configuration
export * from '../config/stellar.js';

// Export campaign actions
export * from './campaignActions.js';

// Export donation functions
export * from './makeDonations.js'; 