import {
  AlbedoModule,
  FREIGHTER_ID,
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
} from "@creit.tech/stellar-wallets-kit";
import { stellarService } from "./stellar.service.js";

class WalletService {
  constructor() {
    this.stellarService = stellarService;
    this.kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: [new xBullModule(), new FreighterModule(), new AlbedoModule()],
    });
  }

  async connect() {
    return new Promise((resolve) => {
      this.kit.openModal({
        onWalletSelected: async (option) => {
          this.kit.setWallet(option.id);
          const { address } = await this.kit.getAddress();

          resolve(address);
        },
      });
    });
  }

  async disconnect() {
    await this.kit.disconnect();
  }

  async signTransaction(xdr) {
    const environment = this.stellarService.environment();
    return await this.kit.signTransaction(xdr, {
      networkPassphrase: environment.networkPassphrase,
    });
  }
}

export const walletService = new WalletService(); 