import { WalletName, BaseSignInMessageSignerWalletAdapter, WalletReadyState, SendTransactionOptions } from '@solana/wallet-adapter-base';
import { TransactionVersion, PublicKey, Transaction, VersionedTransaction, Connection, TransactionSignature } from '@solana/web3.js';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

type CustomSolanaSignInInput = SolanaSignInInput | (() => Promise<SolanaSignInInput>);
declare const registerMoonGateWallet: ({ authMode, position, }: {
    authMode?: string;
    position?: string;
}) => () => void;
declare const MoongateWalletName: WalletName<"MoonGate">;
declare class MoongateWalletAdapter2 extends BaseSignInMessageSignerWalletAdapter {
    name: WalletName<"MoonGate">;
    url: string;
    icon: string;
    readonly supportedTransactionVersions: Set<TransactionVersion>;
    private _connecting;
    private _wallet;
    private _position;
    private _authMode;
    private _disconnected;
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
    _handleMessage(event: MessageEvent): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signIn(input?: CustomSolanaSignInInput): Promise<SolanaSignInOutput>;
}

export { type CustomSolanaSignInInput, MoongateWalletAdapter2, MoongateWalletName, registerMoonGateWallet };
