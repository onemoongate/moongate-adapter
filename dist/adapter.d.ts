import { WalletName, BaseMessageSignerWalletAdapter, WalletReadyState, SendTransactionOptions } from '@solana/wallet-adapter-base';
import { TransactionVersion, PublicKey, Transaction, VersionedTransaction, Connection, TransactionSignature } from '@solana/web3.js';

declare const MoongateWalletName: WalletName<"MoonGate">;
declare class MoongateWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"MoonGate">;
    url: string;
    icon: string;
    readonly supportedTransactionVersions: ReadonlySet<TransactionVersion>;
    private _connecting;
    private _wallet;
    private _position;
    private _authMode;
    private _publicKey;
    private _readyState;
    constructor(config?: {
        position?: string;
        authMode?: string;
    });
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    private _handleMessage;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export { MoongateWalletAdapter, MoongateWalletName };
