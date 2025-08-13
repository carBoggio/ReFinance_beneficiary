import {
  contract,
  Horizon,
  Keypair,
  Networks,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

export class StellarService {
  constructor() {
    const serverUrl = "https://horizon-testnet.stellar.org";

    this.server = new Horizon.Server(serverUrl);
    this.serverUrl = serverUrl;
    this.rpcUrl = "https://soroban-testnet.stellar.org";

    this.networkPassphrase = Networks.TESTNET;
    this.contractAddress =
      "CDBWA6QGQZZR5XLFESB7ANVIP5O4IRF56X6VVLCVSE2B6YL7MNWCFKLV";
  }

  async loadAccount(address) {
    return await this.server.loadAccount(address);
  }

  async getTransactions(address) {
    return await this.server.transactions().forAccount(address).call();
  }

  async getPayments(address) {
    return await this.server.payments().forAccount(address).call();
  }

  async buildClient(publicKey) {
    const client = await contract.Client.from({
      contractId: this.contractAddress,
      rpcUrl: this.rpcUrl,
      networkPassphrase: this.networkPassphrase,
      publicKey,
    });

    return client;
  }

  async signTransaction(xdr, secretKey) {
    const tx = TransactionBuilder.fromXDR(xdr, this.networkPassphrase);

    const keyPair = Keypair.fromSecret(secretKey);
    tx.sign(keyPair);

    return tx.toXDR();
  }

  async submitTransaction(xdr) {
    try {
      const result = await this.server.submitTransaction(
        TransactionBuilder.fromXDR(xdr, this.networkPassphrase)
      );

      return result.hash;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  environment() {
    return {
      rpc: this.serverUrl,
      networkPassphrase: this.networkPassphrase,
    };
  }

  getNetwork() {
    return 'testnet';
  }

  isTestnet() {
    return true;
  }
}

export const stellarService = new StellarService(); 