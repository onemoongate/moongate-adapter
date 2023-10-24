import type { SendTransactionOptions, WalletName } from "@solana/wallet-adapter-base";
import { BaseMessageSignerWalletAdapter, WalletReadyState } from "@solana/wallet-adapter-base";
import { Connection, Transaction, TransactionSignature, VersionedTransaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
export declare const MoongateWalletName: WalletName<"MoonGate">;
export declare class MoongateWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"MoonGate">;
    url: string;
    icon: string;
    readonly supportedTransactionVersions: null;
    private _connecting;
    private _wallet;
    private _position;
    private _publicKey;
    private _readyState;
    constructor(config: {
        position: string;
    });
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}
