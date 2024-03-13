var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/adapter.ts
import {
  BaseMessageSignerWalletAdapter,
  WalletConnectionError,
  WalletDisconnectionError,
  WalletNotConnectedError,
  WalletPublicKeyError,
  WalletReadyState,
  WalletSendTransactionError,
  WalletSignMessageError,
  isVersionedTransaction,
  WalletSignTransactionError
} from "@solana/wallet-adapter-base";
import {
  Transaction,
  VersionedTransaction
} from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { MoonGateEmbed } from "@moongate/solana-wallet-sdk";
var MoongateWalletName = "Ethereum Wallet";
var MoongateWalletAdapter = class extends BaseMessageSignerWalletAdapter {
  constructor(config) {
    super();
    this.name = MoongateWalletName;
    this.url = "https://moongate.one";
    this.icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKYXJpYS1sYWJlbD0iRXRoZXJldW0iIHJvbGU9ImltZyIKdmlld0JveD0iMCAwIDUxMiA1MTIiPjxyZWN0CndpZHRoPSI1MTIiIGhlaWdodD0iNTEyIgpyeD0iMTUlIgpmaWxsPSIjZmZmZmZmIi8+PHBhdGgKZmlsbD0iIzNDM0MzQiIgZD0ibTI1NiAzNjJ2MTA3bDEzMS0xODV6Ii8+PHBhdGgKZmlsbD0iIzM0MzQzNCIgZD0ibTI1NiA0MWwxMzEgMjE4LTEzMSA3OC0xMzItNzgiLz48cGF0aApmaWxsPSIjOEM4QzhDIiBkPSJtMjU2IDQxdjE1OGwtMTMyIDYwbTAgMjVsMTMyIDc4djEwNyIvPjxwYXRoCmZpbGw9IiMxNDE0MTQiIGQ9Im0yNTYgMTk5djEzOGwxMzEtNzgiLz48cGF0aApmaWxsPSIjMzkzOTM5IiBkPSJtMTI0IDI1OWwxMzItNjB2MTM4Ii8+PC9zdmc+";
    this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]);
    this._position = "top-right";
    this._readyState = typeof window === "undefined" || typeof document === "undefined" ? WalletReadyState.Unsupported : WalletReadyState.Installed;
    this._connecting = false;
    this._wallet = null;
    this._publicKey = null;
    if (config == null ? void 0 : config.position) {
      this._position = config.position;
    }
  }
  get publicKey() {
    return this._publicKey;
  }
  get connecting() {
    return this._connecting;
  }
  get connected() {
    return !!this._publicKey;
  }
  get readyState() {
    return this._readyState;
  }
  connect() {
    return __async(this, null, function* () {
      var _a;
      if (this.connected || this.connecting)
        return;
      if (this._wallet) {
        throw new WalletConnectionError("Already connected");
      }
      this._connecting = true;
      try {
        this._wallet = new MoonGateEmbed();
        const publicKeyData = yield this._wallet.sendCommand(
          "login",
          {
            host: window.location.origin
          }
        );
        if (publicKeyData) {
          let publicKey = new PublicKey(publicKeyData);
          this._publicKey = publicKey;
          this.emit("connect", publicKey);
          if (this == null ? void 0 : this._position) {
            this._wallet.moveModal(this == null ? void 0 : this._position);
          } else {
            this._wallet.moveModal();
          }
        } else {
          throw new WalletPublicKeyError("No response from MoonGate wallet.");
        }
      } catch (error) {
        console.error("Error encountered during connection:", error);
        throw new WalletConnectionError(error.message);
      } finally {
        this._connecting = false;
        console.log("Connected:", (_a = this._publicKey) == null ? void 0 : _a.toString());
      }
    });
  }
  disconnect() {
    return __async(this, null, function* () {
      var _a;
      try {
        yield (_a = this._wallet) == null ? void 0 : _a.disconnect();
        this._wallet = null;
        this._publicKey = null;
        this.emit("disconnect");
      } catch (error) {
        console.error("Error encountered during disconnection:", error);
        throw new WalletDisconnectionError(error.message);
      }
    });
  }
  sendTransaction(_0, _1) {
    return __async(this, arguments, function* (transaction, connection, options = {}) {
      let signature;
      if (!this._wallet) {
        throw new WalletNotConnectedError();
      }
      try {
        if (!isVersionedTransaction(transaction)) {
          transaction = yield this.prepareTransaction(
            transaction,
            connection,
            options
          );
        }
        const signedTx = yield this.signTransaction(transaction);
        signature = yield connection.sendRawTransaction(
          signedTx.serialize(),
          options
        );
        return signature;
      } catch (error) {
        console.error("Error encountered during transaction submission:", error);
        throw new WalletSendTransactionError(error.message);
      }
    });
  }
  signTransaction(transaction) {
    return __async(this, null, function* () {
      if (!this._wallet) {
        throw new WalletNotConnectedError();
      }
      if (isVersionedTransaction(transaction)) {
        const data = transaction.serialize();
        try {
          const signedTransaction = yield this._wallet.sendCommand(
            "signTransaction",
            {
              transaction: data,
              host: window.location.origin,
              isVersionedTransaction: true
            }
          );
          const finalTransaction = VersionedTransaction.deserialize(
            signedTransaction
          );
          return finalTransaction;
        } catch (error) {
          console.error("Error encountered during transaction signing:", error);
          throw new WalletSignTransactionError(error.message);
        }
      } else {
        try {
          const data = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
          const signedTransaction = yield this._wallet.sendCommand(
            "signTransaction",
            {
              transaction: data,
              host: window.location.origin,
              isVersionedTransaction: false
            }
          );
          const finalTransaction = Transaction.from(
            Uint8Array.from(signedTransaction)
          );
          return finalTransaction;
        } catch (error) {
          console.error("Error encountered during transaction signing:", error);
          throw new WalletSignTransactionError(error.message);
        }
      }
    });
  }
  signAllTransactions(transactions) {
    return __async(this, null, function* () {
      const signedTransactions = [];
      for (const transaction of transactions) {
        signedTransactions.push(yield this.signTransaction(transaction));
      }
      return signedTransactions;
    });
  }
  signMessage(message) {
    return __async(this, null, function* () {
      if (!this._wallet) {
        throw new WalletNotConnectedError();
      }
      try {
        const signedMessage = yield this._wallet.sendCommand(
          "signMessage",
          {
            host: window.location.origin,
            message
          }
        );
        const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
        return Uint8ArraySignedMessage;
      } catch (error) {
        console.error("Error encountered during message signature:", error);
        throw new WalletSignMessageError(error.message);
      }
    });
  }
};
export {
  MoongateWalletAdapter,
  MoongateWalletName
};
