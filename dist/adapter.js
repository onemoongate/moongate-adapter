var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseMessageSignerWalletAdapter, WalletConnectionError, WalletDisconnectionError, WalletNotConnectedError, WalletPublicKeyError, WalletReadyState, WalletSendTransactionError, WalletSignMessageError, isVersionedTransaction, WalletSignTransactionError, } from "@solana/wallet-adapter-base";
import { Transaction, VersionedTransaction, } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { MoonGateEmbed } from "@anishde12020/moongate-solana-wallet-sdk";
export const MoongateWalletName = "Ethereum Wallet";
export class MoongateWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor(config) {
        super();
        this.name = MoongateWalletName;
        this.url = "https://moongate.one";
        this.icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKYXJpYS1sYWJlbD0iRXRoZXJldW0iIHJvbGU9ImltZyIKdmlld0JveD0iMCAwIDUxMiA1MTIiPjxyZWN0CndpZHRoPSI1MTIiIGhlaWdodD0iNTEyIgpyeD0iMTUlIgpmaWxsPSIjZmZmZmZmIi8+PHBhdGgKZmlsbD0iIzNDM0MzQiIgZD0ibTI1NiAzNjJ2MTA3bDEzMS0xODV6Ii8+PHBhdGgKZmlsbD0iIzM0MzQzNCIgZD0ibTI1NiA0MWwxMzEgMjE4LTEzMSA3OC0xMzItNzgiLz48cGF0aApmaWxsPSIjOEM4QzhDIiBkPSJtMjU2IDQxdjE1OGwtMTMyIDYwbTAgMjVsMTMyIDc4djEwNyIvPjxwYXRoCmZpbGw9IiMxNDE0MTQiIGQ9Im0yNTYgMTk5djEzOGwxMzEtNzgiLz48cGF0aApmaWxsPSIjMzkzOTM5IiBkPSJtMTI0IDI1OWwxMzItNjB2MTM4Ii8+PC9zdmc+";
        this.supportedTransactionVersions = new Set(["legacy", 0]);
        this._position = "top-right";
        this._readyState = typeof window === "undefined" || typeof document === "undefined"
            ? WalletReadyState.Unsupported
            : WalletReadyState.Installed;
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (config === null || config === void 0 ? void 0 : config.position) {
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected || this.connecting)
                return;
            if (this._wallet) {
                throw new WalletConnectionError("Already connected");
            }
            this._connecting = true;
            try {
                this._wallet = new MoonGateEmbed();
                const publicKeyData = yield this._wallet.sendCommand("login", {
                    host: window.location.origin,
                });
                if (publicKeyData) {
                    let publicKey = new PublicKey(publicKeyData);
                    this._publicKey = publicKey;
                    this.emit("connect", publicKey);
                    if (this === null || this === void 0 ? void 0 : this._position) {
                        this._wallet.moveModal(this === null || this === void 0 ? void 0 : this._position);
                    }
                    else {
                        this._wallet.moveModal();
                    }
                }
                else {
                    throw new WalletPublicKeyError("No response from MoonGate wallet.");
                }
            }
            catch (error) {
                console.error("Error encountered during connection:", error);
                throw new WalletConnectionError(error.message);
            }
            finally {
                this._connecting = false;
                console.log("Connected:", (_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toString());
            }
        });
    }
    disconnect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.disconnect());
                this._wallet = null;
                this._publicKey = null;
                this.emit("disconnect");
            }
            catch (error) {
                console.error("Error encountered during disconnection:", error);
                throw new WalletDisconnectionError(error.message);
            }
        });
    }
    sendTransaction(transaction, connection, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let signature;
            if (!this._wallet) {
                throw new WalletNotConnectedError();
            }
            try {
                if (!isVersionedTransaction(transaction)) {
                    transaction = (yield this.prepareTransaction(transaction, connection, options));
                }
                const signedTx = yield this.signTransaction(transaction);
                signature = yield connection.sendRawTransaction(signedTx.serialize(), options);
                return signature;
            }
            catch (error) {
                console.error("Error encountered during transaction submission:", error);
                throw new WalletSendTransactionError(error.message);
            }
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._wallet) {
                throw new WalletNotConnectedError();
            }
            if (isVersionedTransaction(transaction)) {
                const data = transaction.serialize();
                try {
                    const signedTransaction = yield this._wallet.sendCommand("signTransaction", {
                        transaction: data,
                        host: window.location.origin,
                        isVersionedTransaction: true,
                    });
                    const finalTransaction = VersionedTransaction.deserialize(signedTransaction);
                    return finalTransaction;
                }
                catch (error) {
                    console.error("Error encountered during transaction signing:", error);
                    throw new WalletSignTransactionError(error.message);
                }
            }
            else {
                try {
                    const data = transaction
                        .serialize({ requireAllSignatures: false, verifySignatures: false })
                        .toString("base64");
                    const signedTransaction = yield this._wallet.sendCommand("signTransaction", {
                        transaction: data,
                        host: window.location.origin,
                        isVersionedTransaction: false,
                    });
                    const finalTransaction = Transaction.from(Uint8Array.from(signedTransaction));
                    return finalTransaction;
                }
                catch (error) {
                    console.error("Error encountered during transaction signing:", error);
                    throw new WalletSignTransactionError(error.message);
                }
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            // take an array of transactions and sign them all one by one using the signTransaction method. Wait for the result of each one before moving on to the next.
            // log transactions
            const signedTransactions = [];
            for (const transaction of transactions) {
                signedTransactions.push(yield this.signTransaction(transaction));
            }
            return signedTransactions;
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._wallet) {
                throw new WalletNotConnectedError();
            }
            try {
                const signedMessage = yield this._wallet.sendCommand("signMessage", {
                    host: window.location.origin,
                    message: message,
                });
                const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
                return Uint8ArraySignedMessage;
            }
            catch (error) {
                console.error("Error encountered during message signature:", error);
                throw new WalletSignMessageError(error.message);
            }
        });
    }
}
