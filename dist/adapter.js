"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoongateWalletAdapter = exports.MoongateWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
const solana_wallet_sdk_1 = require("@moongate/solana-wallet-sdk");
exports.MoongateWalletName = 'MoonGate';
class MoongateWalletAdapter extends wallet_adapter_base_1.BaseMessageSignerWalletAdapter {
    constructor() {
        super();
        this.name = exports.MoongateWalletName;
        this.url = 'https://moongate.one';
        this.icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCI+Cgk8dGl0bGU+bWctc3ZnPC90aXRsZT4KCTxzdHlsZT4KCQkuczAgeyBmaWxsOiAjMDAwMDAwIH0gCgkJLnMxIHsgZmlsbDogI2ZmZmZmZiB9IAoJPC9zdHlsZT4KCTxwYXRoIGlkPSJMYXllciAxIiBjbGFzcz0iczAiIGQ9Im0tMzEgMGgxMDYxLjh2MTAwMGgtMTA2MS44eiIvPgoJPHBhdGggaWQ9IkxheWVyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsYXNzPSJzMSIgZD0ibTQxOS4yIDY1Ni4xYy00OC4zLTAuMS04OC4zLTE3LjgtMTIwLjEtNTMuMy0yNy4xLTMwLjktNDAuNy02Ny41LTQwLjctMTA5LjkgMC4xLTQ4LjcgMTcuNi04OSA1Mi42LTEyMC44IDMwLjQtMjcuNiA2Ni42LTQxLjQgMTA4LjUtNDEuNCA0OC43IDAuMSA4OC44IDE3LjggMTIwLjEgNTMuMyAyNy4xIDMwLjQgNDAuNyA2Ni44IDQwLjcgMTA5LjItMC4xIDQ5LjItMTcuNSA4OS43LTUyLjYgMTIxLjUtMjkuOSAyNy43LTY2LjEgNDEuNC0xMDguNSA0MS40em0tNjIuOC04Ny4xYzE3IDE2LjEgMzggMjQuMiA2Mi45IDI0LjIgMjkgMCA1Mi0xMC4zIDY5LjEtMzEgMTUuMS0xOC41IDIyLjgtNDEuNSAyMi44LTY5LjEgMC0zMS43LTkuNy01Ni44LTI4LjktNzUuMy0xNi41LTE2LjYtMzcuNi0yNC45LTYyLjktMjQuOS0yOSAwLTUyLjEgMTAuNi02OS4xIDMxLjctMTQuNyAxNy45LTIyLjEgNDAuOC0yMi4xIDY4LjQgMCAzMS43IDkuNCA1NyAyOC4yIDc2em01NTctMTg0LjdjMjcuMiAzMC40IDQwLjYgNjYuOCA0MC42IDEwOS4yIDAgNDkuMy0xNy41IDg5LjctNTIuNSAxMjEuNS0zMCAyNy42LTY2LjIgNDEuNC0xMDguNiA0MS40LTQ4LjItMC4xLTg4LjMtMTcuOC0xMjAuMS01My4zLTI3LjEtMzAuOC00MC43LTY3LjUtNDAuNi0xMDkuOSAwLTQ4LjcgMTcuNi04OSA1Mi42LTEyMC44IDMwLjQtMjcuNSA2Ni42LTQxLjQgMTA4LjQtNDEuMyA0OC45IDAgODkgMTcuNyAxMjAuMiA1My4yem0tNzk4LjYtMTM2LjJjNzQuOC05Mi45IDE4Ni4xLTE0Ni4yIDMwNS4yLTE0Ni4xIDEyNi4zIDAuMSAyNDUuNSA2MS43IDMxOC42IDE2NC44IDUuNiA3LjcgMy43IDE4LjYtNCAyNC4xLTMuMSAyLjItNi42IDMuMi0xMC4xIDMuMi01LjQgMC0xMC43LTIuNS0xNC4xLTcuMy02Ni44LTkzLjktMTc1LjMtMTUwLTI5MC40LTE1MC4xLTEwOC42LTAuMS0yMDkuOSA0OC40LTI3OC4yIDEzMy4yLTYgNy41LTE2LjggOC42LTI0LjQgMi42LTcuMy02LTguNi0xNi45LTIuNi0yNC40em02MjMuOSA0NzEuMmMtNzMuNCAxMDMuMy0xOTIuNyAxNjQuOS0zMTkuMyAxNjQuOC05LjYgMC0xNy40LTcuOC0xNy4zLTE3LjMgMC05LjYgNy43LTE3LjQgMTcuMy0xNy40IDExNS40IDAuMSAyMjQuMi01NiAyOTEuMS0xNTAuMSA1LjYtNy45IDE2LjMtOS43IDI0LjItNC4yIDcuNyA1LjYgOS41IDE2LjMgNCAyNC4yeiIvPgo8L3N2Zz4=";
        this.supportedTransactionVersions = null;
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? wallet_adapter_base_1.WalletReadyState.Unsupported
            : wallet_adapter_base_1.WalletReadyState.Loadable;
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
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
            if (this._wallet) {
                throw new wallet_adapter_base_1.WalletConnectionError('Already connected');
            }
            this._connecting = true;
            try {
                this._wallet = new solana_wallet_sdk_1.MoonGateEmbed();
                const publicKeyData = yield this._wallet.sendCommand('login', {
                    host: window.location.origin,
                });
                if (publicKeyData) {
                    let publicKey = new web3_js_2.PublicKey(publicKeyData);
                    this._publicKey = publicKey;
                    this.emit('connect', publicKey);
                }
                else {
                    throw new wallet_adapter_base_1.WalletPublicKeyError("No response from MoonGate wallet.");
                }
            }
            catch (error) {
                console.error('Error encountered during connection:', error);
                throw new wallet_adapter_base_1.WalletConnectionError(error.message);
            }
            finally {
                this._connecting = false;
                console.log('Connected:', (_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toString());
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
                this.emit('disconnect');
            }
            catch (error) {
                console.error('Error encountered during disconnection:', error);
                throw new wallet_adapter_base_1.WalletDisconnectionError(error.message);
            }
        });
    }
    sendTransaction(transaction, connection, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let signature;
            if (!this._wallet) {
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            }
            try {
                const signedTx = yield this.signTransaction(transaction);
                signature = yield connection.sendRawTransaction(signedTx.serialize());
                return signature;
            }
            catch (error) {
                console.error('Error encountered during transaction submission:', error);
                throw new wallet_adapter_base_1.WalletSendTransactionError(error.message);
            }
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._wallet) {
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            }
            try {
                const data = transaction.serialize( /* { requireAllSignatures: false, verifySignatures: false } */).toString('base64');
                const signedTransaction = yield this._wallet.sendCommand('signTransaction', {
                    transaction: data,
                    host: window.location.origin,
                });
                const finalTransaction = web3_js_1.Transaction.from(Uint8Array.from(signedTransaction));
                return finalTransaction;
            }
            catch (error) {
                console.error('Error encountered during transaction signing:', error);
                throw new wallet_adapter_base_1.WalletSignTransactionError(error.message);
            }
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._wallet) {
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            }
            try {
                const signedMessage = yield this._wallet.sendCommand('signMessage', {
                    host: window.location.origin,
                    message: message,
                });
                const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
                return Uint8ArraySignedMessage;
            }
            catch (error) {
                console.error('Error encountered during message signature:', error);
                throw new wallet_adapter_base_1.WalletSignMessageError(error.message);
            }
        });
    }
}
exports.MoongateWalletAdapter = MoongateWalletAdapter;
