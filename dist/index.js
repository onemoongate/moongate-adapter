var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
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

// src/index.ts
import {
  BaseSignInMessageSignerWalletAdapter,
  WalletConnectionError,
  WalletDisconnectionError,
  WalletNotConnectedError,
  WalletPublicKeyError,
  WalletReadyState as WalletReadyState2,
  WalletSignMessageError,
  isVersionedTransaction as isVersionedTransaction2,
  WalletSignTransactionError,
  WalletSendTransactionError
} from "@solana/wallet-adapter-base";
import {
  Transaction as Transaction2,
  VersionedTransaction as VersionedTransaction2
} from "@solana/web3.js";

// src/wallet.ts
import { isVersionedTransaction, WalletReadyState } from "@solana/wallet-adapter-base";
import { isSolanaChain } from "@solana/wallet-standard-chains";

// node_modules/@solana/wallet-standard-features/lib/esm/signAndSendTransaction.js
var SolanaSignAndSendTransaction = "solana:signAndSendTransaction";

// node_modules/@solana/wallet-standard-features/lib/esm/signIn.js
var SolanaSignIn = "solana:signIn";

// node_modules/@solana/wallet-standard-features/lib/esm/signMessage.js
var SolanaSignMessage = "solana:signMessage";

// node_modules/@solana/wallet-standard-features/lib/esm/signTransaction.js
var SolanaSignTransaction = "solana:signTransaction";

// src/wallet.ts
import { getEndpointForChain } from "@solana/wallet-standard-util";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import { getWallets } from "@wallet-standard/app";

// node_modules/@wallet-standard/features/lib/esm/connect.js
var StandardConnect = "standard:connect";

// node_modules/@wallet-standard/features/lib/esm/disconnect.js
var StandardDisconnect = "standard:disconnect";

// node_modules/@wallet-standard/features/lib/esm/events.js
var StandardEvents = "standard:events";

// src/wallet.ts
import { arraysEqual, bytesEqual, ReadonlyWalletAccount } from "@wallet-standard/wallet";
import bs58 from "bs58";
var _adapter;
var _SolanaWalletAdapterWalletAccount = class _SolanaWalletAdapterWalletAccount extends ReadonlyWalletAccount {
  constructor({
    adapter,
    address,
    publicKey,
    chains
  }) {
    const features = [SolanaSignAndSendTransaction];
    if ("signTransaction" in adapter) {
      features.push(SolanaSignTransaction);
    }
    if ("signMessage" in adapter) {
      features.push(SolanaSignMessage);
    }
    if ("signIn" in adapter) {
      features.push(SolanaSignIn);
    }
    super({ address, publicKey, chains, features });
    __privateAdd(this, _adapter, void 0);
    if (new.target === _SolanaWalletAdapterWalletAccount) {
      Object.freeze(this);
    }
    __privateSet(this, _adapter, adapter);
  }
};
_adapter = new WeakMap();
var SolanaWalletAdapterWalletAccount = _SolanaWalletAdapterWalletAccount;
var _listeners, _adapter2, _supportedTransactionVersions, _chain, _endpoint, _account, _connected, connected_fn, _disconnected, disconnected_fn, _connect, _disconnect, _on, _emit, emit_fn, _off, off_fn, _deserializeTransaction, deserializeTransaction_fn, _signAndSendTransaction, _signTransaction, _signMessage, _signIn;
var _SolanaWalletAdapterWallet = class _SolanaWalletAdapterWallet {
  constructor(adapter, chain, endpoint) {
    __privateAdd(this, _connected);
    __privateAdd(this, _disconnected);
    __privateAdd(this, _emit);
    __privateAdd(this, _off);
    __privateAdd(this, _deserializeTransaction);
    __privateAdd(this, _listeners, {});
    __privateAdd(this, _adapter2, void 0);
    __privateAdd(this, _supportedTransactionVersions, void 0);
    __privateAdd(this, _chain, void 0);
    __privateAdd(this, _endpoint, void 0);
    __privateAdd(this, _account, void 0);
    __privateAdd(this, _connect, (..._0) => __async(this, [..._0], function* ({ silent } = {}) {
      if (!__privateGet(this, _adapter2).connected) {
        yield __privateGet(this, _adapter2).connect();
      }
      __privateMethod(this, _connected, connected_fn).call(this);
      return { accounts: this.accounts };
    }));
    __privateAdd(this, _disconnect, () => __async(this, null, function* () {
      yield __privateGet(this, _adapter2).disconnect();
    }));
    __privateAdd(this, _on, (event, listener) => {
      var _a;
      ((_a = __privateGet(this, _listeners)[event]) == null ? void 0 : _a.push(listener)) || (__privateGet(this, _listeners)[event] = [listener]);
      return () => __privateMethod(this, _off, off_fn).call(this, event, listener);
    });
    __privateAdd(this, _signAndSendTransaction, (...inputs) => __async(this, null, function* () {
      const outputs = [];
      if (inputs.length === 1) {
        const input = inputs[0];
        if (input.account !== __privateGet(this, _account))
          throw new Error("invalid account");
        if (!isSolanaChain(input.chain))
          throw new Error("invalid chain");
        const transaction = __privateMethod(this, _deserializeTransaction, deserializeTransaction_fn).call(this, input.transaction);
        const { commitment, preflightCommitment, skipPreflight, maxRetries, minContextSlot } = input.options || {};
        const endpoint = getEndpointForChain(input.chain, __privateGet(this, _endpoint));
        const connection = new Connection(endpoint, commitment || "confirmed");
        const latestBlockhash = commitment ? yield connection.getLatestBlockhash({
          commitment: preflightCommitment || commitment,
          minContextSlot
        }) : void 0;
        const signature = yield __privateGet(this, _adapter2).sendTransaction(transaction, connection, {
          preflightCommitment,
          skipPreflight,
          maxRetries,
          minContextSlot
        });
        if (latestBlockhash) {
          yield connection.confirmTransaction(
            __spreadProps(__spreadValues({}, latestBlockhash), {
              signature
            }),
            commitment || "confirmed"
          );
        }
        outputs.push({ signature: bs58.decode(signature) });
      } else if (inputs.length > 1) {
        for (const input of inputs) {
          outputs.push(...yield __privateGet(this, _signAndSendTransaction).call(this, input));
        }
      }
      return outputs;
    }));
    __privateAdd(this, _signTransaction, (...inputs) => __async(this, null, function* () {
      if (!("signTransaction" in __privateGet(this, _adapter2)))
        throw new Error("signTransaction not implemented by adapter");
      const outputs = [];
      if (inputs.length === 1) {
        const input = inputs[0];
        if (input.account !== __privateGet(this, _account))
          throw new Error("invalid account");
        if (input.chain && !isSolanaChain(input.chain))
          throw new Error("invalid chain");
        const transaction = __privateMethod(this, _deserializeTransaction, deserializeTransaction_fn).call(this, input.transaction);
        const signedTransaction = yield __privateGet(this, _adapter2).signTransaction(transaction);
        const serializedTransaction = isVersionedTransaction(signedTransaction) ? signedTransaction.serialize() : new Uint8Array(
          signedTransaction.serialize({
            requireAllSignatures: false,
            verifySignatures: false
          })
        );
        outputs.push({ signedTransaction: serializedTransaction });
      } else if (inputs.length > 1) {
        for (const input of inputs) {
          if (input.account !== __privateGet(this, _account))
            throw new Error("invalid account");
          if (input.chain && !isSolanaChain(input.chain))
            throw new Error("invalid chain");
        }
        const transactions = inputs.map(({ transaction }) => __privateMethod(this, _deserializeTransaction, deserializeTransaction_fn).call(this, transaction));
        const signedTransactions = yield __privateGet(this, _adapter2).signAllTransactions(transactions);
        outputs.push(
          ...signedTransactions.map((signedTransaction) => {
            const serializedTransaction = isVersionedTransaction(signedTransaction) ? signedTransaction.serialize() : new Uint8Array(
              signedTransaction.serialize({
                requireAllSignatures: false,
                verifySignatures: false
              })
            );
            return { signedTransaction: serializedTransaction };
          })
        );
      }
      return outputs;
    }));
    __privateAdd(this, _signMessage, (...inputs) => __async(this, null, function* () {
      if (!("signMessage" in __privateGet(this, _adapter2)))
        throw new Error("signMessage not implemented by adapter");
      const outputs = [];
      if (inputs.length === 1) {
        const input = inputs[0];
        if (input.account !== __privateGet(this, _account))
          throw new Error("invalid account");
        const signature = yield __privateGet(this, _adapter2).signMessage(input.message);
        outputs.push({ signedMessage: input.message, signature });
      } else if (inputs.length > 1) {
        for (const input of inputs) {
          outputs.push(...yield __privateGet(this, _signMessage).call(this, input));
        }
      }
      return outputs;
    }));
    __privateAdd(this, _signIn, (...inputs) => __async(this, null, function* () {
      if (!("signIn" in __privateGet(this, _adapter2)))
        throw new Error("signIn not implemented by adapter");
      if (inputs.length > 1) {
        const outputs = [];
        for (const input of inputs) {
          outputs.push(yield __privateGet(this, _adapter2).signIn(input));
        }
        return outputs;
      } else {
        return [yield __privateGet(this, _adapter2).signIn(inputs[0])];
      }
    }));
    if (new.target === _SolanaWalletAdapterWallet) {
      Object.freeze(this);
    }
    const supportedTransactionVersions = [...adapter.supportedTransactionVersions || ["legacy"]];
    if (!supportedTransactionVersions.length) {
      supportedTransactionVersions.push("legacy");
    }
    __privateSet(this, _adapter2, adapter);
    __privateSet(this, _supportedTransactionVersions, supportedTransactionVersions);
    __privateSet(this, _chain, chain);
    __privateSet(this, _endpoint, endpoint);
    adapter.on("connect", __privateMethod(this, _connected, connected_fn), this);
    adapter.on("disconnect", __privateMethod(this, _disconnected, disconnected_fn), this);
    __privateMethod(this, _connected, connected_fn).call(this);
  }
  get version() {
    return "1.0.0";
  }
  get name() {
    return __privateGet(this, _adapter2).name;
  }
  get icon() {
    return __privateGet(this, _adapter2).icon;
  }
  get chains() {
    return [__privateGet(this, _chain)];
  }
  get features() {
    const features = {
      [StandardConnect]: {
        version: "1.0.0",
        connect: __privateGet(this, _connect)
      },
      [StandardDisconnect]: {
        version: "1.0.0",
        disconnect: __privateGet(this, _disconnect)
      },
      [StandardEvents]: {
        version: "1.0.0",
        on: __privateGet(this, _on)
      },
      [SolanaSignAndSendTransaction]: {
        version: "1.0.0",
        supportedTransactionVersions: __privateGet(this, _supportedTransactionVersions),
        signAndSendTransaction: __privateGet(this, _signAndSendTransaction)
      }
    };
    let signTransactionFeature;
    if ("signTransaction" in __privateGet(this, _adapter2)) {
      signTransactionFeature = {
        [SolanaSignTransaction]: {
          version: "1.0.0",
          supportedTransactionVersions: __privateGet(this, _supportedTransactionVersions),
          signTransaction: __privateGet(this, _signTransaction)
        }
      };
    }
    let signMessageFeature;
    if ("signMessage" in __privateGet(this, _adapter2)) {
      signMessageFeature = {
        [SolanaSignMessage]: {
          version: "1.0.0",
          signMessage: __privateGet(this, _signMessage)
        }
      };
    }
    let signInFeature;
    if ("signIn" in __privateGet(this, _adapter2)) {
      signInFeature = {
        [SolanaSignIn]: {
          version: "1.0.0",
          signIn: __privateGet(this, _signIn)
        }
      };
    }
    return __spreadValues(__spreadValues(__spreadValues({}, features), signTransactionFeature), signMessageFeature);
  }
  get accounts() {
    return __privateGet(this, _account) ? [__privateGet(this, _account)] : [];
  }
  get endpoint() {
    return __privateGet(this, _endpoint);
  }
  destroy() {
    __privateGet(this, _adapter2).off("connect", __privateMethod(this, _connected, connected_fn), this);
    __privateGet(this, _adapter2).off("disconnect", __privateMethod(this, _disconnected, disconnected_fn), this);
  }
};
_listeners = new WeakMap();
_adapter2 = new WeakMap();
_supportedTransactionVersions = new WeakMap();
_chain = new WeakMap();
_endpoint = new WeakMap();
_account = new WeakMap();
_connected = new WeakSet();
connected_fn = function() {
  var _a;
  const publicKey = (_a = __privateGet(this, _adapter2).publicKey) == null ? void 0 : _a.toBytes();
  if (publicKey) {
    const address = __privateGet(this, _adapter2).publicKey.toBase58();
    const account = __privateGet(this, _account);
    if (!account || account.address !== address || account.chains.includes(__privateGet(this, _chain)) || !bytesEqual(account.publicKey, publicKey)) {
      __privateSet(this, _account, new SolanaWalletAdapterWalletAccount({
        adapter: __privateGet(this, _adapter2),
        address,
        publicKey,
        chains: [__privateGet(this, _chain)]
      }));
      __privateMethod(this, _emit, emit_fn).call(this, "change", { accounts: this.accounts });
    }
  }
};
_disconnected = new WeakSet();
disconnected_fn = function() {
  if (__privateGet(this, _account)) {
    __privateSet(this, _account, void 0);
    __privateMethod(this, _connected, connected_fn);
    __privateMethod(this, _emit, emit_fn).call(this, "change", { accounts: this.accounts });
  }
};
_connect = new WeakMap();
_disconnect = new WeakMap();
_on = new WeakMap();
_emit = new WeakSet();
emit_fn = function(event, ...args) {
  var _a;
  (_a = __privateGet(this, _listeners)[event]) == null ? void 0 : _a.forEach((listener) => listener.apply(null, args));
};
_off = new WeakSet();
off_fn = function(event, listener) {
  var _a;
  __privateGet(this, _listeners)[event] = (_a = __privateGet(this, _listeners)[event]) == null ? void 0 : _a.filter((existingListener) => listener !== existingListener);
};
_deserializeTransaction = new WeakSet();
deserializeTransaction_fn = function(serializedTransaction) {
  const transaction = VersionedTransaction.deserialize(serializedTransaction);
  if (!__privateGet(this, _supportedTransactionVersions).includes(transaction.version))
    throw new Error("unsupported transaction version");
  if (transaction.version === "legacy" && arraysEqual(__privateGet(this, _supportedTransactionVersions), ["legacy"]))
    return Transaction.from(serializedTransaction);
  return transaction;
};
_signAndSendTransaction = new WeakMap();
_signTransaction = new WeakMap();
_signMessage = new WeakMap();
_signIn = new WeakMap();
var SolanaWalletAdapterWallet = _SolanaWalletAdapterWallet;
function registerWalletAdapter(adapter, chain, endpoint, match = (wallet) => wallet.name === adapter.name) {
  const { register, get, on } = getWallets();
  const destructors = [];
  function destroy() {
    destructors.forEach((destroy2) => destroy2());
    destructors.length = 0;
  }
  function setup() {
    if (adapter.readyState === WalletReadyState.Unsupported || get().some(match))
      return true;
    const ready = adapter.readyState === WalletReadyState.Installed || adapter.readyState === WalletReadyState.Loadable;
    if (ready) {
      const wallet = new SolanaWalletAdapterWallet(adapter, chain, endpoint);
      destructors.push(() => wallet.destroy());
      destructors.push(register(wallet));
      destructors.push(
        on("register", (...wallets) => {
          if (wallets.some(match)) {
            destroy();
          }
        })
      );
    }
    return ready;
  }
  if (!setup()) {
    let listener2 = function() {
      if (setup()) {
        adapter.off("readyStateChange", listener2);
      }
    };
    var listener = listener2;
    adapter.on("readyStateChange", listener2);
    destructors.push(() => adapter.off("readyStateChange", listener2));
  }
  return destroy;
}

// src/index.ts
import { PublicKey } from "@solana/web3.js";
import { MoonGateEmbed } from "@moongate/solana-wallet-sdk";
var registerMoonGateWallet = ({
  authMode = "Google",
  position = "top-right"
}) => {
  if (typeof window === "undefined") {
    return () => {
      return;
    };
  }
  return registerWalletAdapter(
    new MoongateWalletAdapter2({
      authMode,
      position
    }),
    "solana:mainnet"
  );
};
var MoongateWalletName = "Ethereum Wallet";
var MoongateWalletAdapter2 = class extends BaseSignInMessageSignerWalletAdapter {
  constructor(config) {
    super();
    this.name = MoongateWalletName;
    this.url = "https://moongate.one";
    this.icon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE3MyIgdmlld0JveD0iMCAwIDE3MSAxNzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIiByeD0iNiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0IDc4LjA0M0w2OS44MTY2IDk5LjExNjhWMTI4LjI5OEwzNCA3OC4wNDNaIiBmaWxsPSIjRjdDQkJGIiBzdHJva2U9IiMyQjFFQkMiIHN0cm9rZS13aWR0aD0iMC42MjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTM0IDcxLjIzNDdMNjkuODE2NiA1NC45ODY3VjEyTDM0IDcxLjIzNDdaIiBmaWxsPSIjRjdDQkJGIiBzdHJva2U9IiMyQjFFQkMiIHN0cm9rZS13aWR0aD0iMC42MjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTM0IDcxLjIzNjJMNjkuODE2NiA1NC45ODgzVjkyLjMzOThMMzQgNzEuMjM2MloiIGZpbGw9IiM4MUE5RjgiIHN0cm9rZT0iIzJCMUVCQyIgc3Ryb2tlLXdpZHRoPSIwLjYyNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTA1LjYzMyA3OC4wNDNMNjkuODE2NCA5OS4xMTY4VjEyOC4yOThMMTA1LjYzMyA3OC4wNDNaIiBmaWxsPSIjQ0RBRkZBIiBzdHJva2U9IiMyQjFFQkMiIHN0cm9rZS13aWR0aD0iMC42MjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwNS42MzMgNzEuMjM0N0w2OS44MTY0IDU0Ljk4NjdWMTJMMTA1LjYzMyA3MS4yMzQ3WiIgZmlsbD0iI0E0RkNGNSIgc3Ryb2tlPSIjMkIxRUJDIiBzdHJva2Utd2lkdGg9IjAuNjI1IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMDUuNjMzIDcxLjIzNjJMNjkuODE2NCA1NC45ODgzVjkyLjMzOThMMTA1LjYzMyA3MS4yMzYyWiIgZmlsbD0iI0NEQUZGQSIgc3Ryb2tlPSIjMkIxRUJDIiBzdHJva2Utd2lkdGg9IjAuNjI1IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMTgzN18zNTczKSI+CjxyZWN0IHg9IjkxIiB5PSI4OSIgd2lkdGg9Ijc1LjEyIiBoZWlnaHQ9Ijc1LjEyIiByeD0iMzcuNTYiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzMuMDU5IDEzNS44ODRDMTM1LjQyMiAxMzMuNzQ2IDEzNi42IDEzMS4wMTggMTM2LjYgMTI3LjcwNkMxMzYuNiAxMjQuODU0IDEzNS42OCAxMjIuNDA1IDEzMy44NDYgMTIwLjM2MUMxMzEuNzMyIDExNy45NzQgMTI5LjAyNiAxMTYuNzg1IDEyNS43MzQgMTE2Ljc4NUMxMjIuOTAyIDExNi43ODUgMTIwLjQ2IDExNy43MTggMTE4LjQwOSAxMTkuNTc2QzExNi4wNDUgMTIxLjcxMyAxMTQuODY3IDEyNC40MjYgMTE0Ljg2NyAxMjcuNzA2QzExNC44NjcgMTMwLjU1OSAxMTUuNzg4IDEzMy4wMjMgMTE3LjYyMSAxMzUuMDk5QzExOS43NjYgMTM3LjQ4NSAxMjIuNDczIDEzOC42NzQgMTI1LjczNCAxMzguNjc0QzEyOC41OTcgMTM4LjY3NCAxMzEuMDM4IDEzNy43NDkgMTMzLjA1OSAxMzUuODg0Wk0xMTkuNTc5IDEyNy43MDZDMTE5LjU3OSAxMjUuODQ5IDEyMC4wNzggMTI0LjMxIDEyMS4wNjkgMTIzLjEwNUMxMjIuMjE2IDEyMS42ODIgMTIzLjc3NiAxMjAuOTY3IDEyNS43MzQgMTIwLjk2N0MxMjcuNDQyIDEyMC45NjcgMTI4Ljg2MiAxMjEuNTI3IDEyOS45NzcgMTIyLjYzOEMxMzEuMjggMTIzLjg4MiAxMzEuOTM1IDEyNS41NjkgMTMxLjkzNSAxMjcuNzA2QzEzMS45MzUgMTI5LjU2NCAxMzEuNDIgMTMxLjExMSAxMzAuMzk4IDEzMi4zNTVDMTI5LjI0NCAxMzMuNzQ2IDEyNy42OTIgMTM0LjQ0NiAxMjUuNzM0IDEzNC40NDZDMTI0LjA1NiAxMzQuNDQ2IDEyMi42MzcgMTMzLjkwMiAxMjEuNDkgMTMyLjgyMUMxMjAuMjE5IDEzMS41NDYgMTE5LjU3OSAxMjkuODQ0IDExOS41NzkgMTI3LjcwNloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNTAuOTY4IDExNi43ODVDMTQ4LjE0NCAxMTYuNzg1IDE0NS43MDIgMTE3LjcxOCAxNDMuNjUxIDExOS41NzZDMTQxLjI4NyAxMjEuNzEzIDE0MC4xMDIgMTI0LjQyNiAxNDAuMTAyIDEyNy43MDZDMTQwLjEwMiAxMzAuNTU5IDE0MS4wMjIgMTMzLjAyMyAxNDIuODU1IDEzNS4wOTlDMTQ1IDEzNy40ODUgMTQ3LjcwNyAxMzguNjc0IDE1MC45NjggMTM4LjY3NEMxNTMuODMxIDEzOC42NzQgMTU2LjI3MiAxMzcuNzQyIDE1OC4yOTMgMTM1Ljg4NEMxNjAuNjU2IDEzMy43NDYgMTYxLjgzNCAxMzEuMDI2IDE2MS44MzQgMTI3LjcwNkMxNjEuODM0IDEyNC44NTQgMTYwLjkyMiAxMjIuNDA1IDE1OS4wODggMTIwLjM2MUMxNTYuOTc1IDExNy45NzQgMTU0LjI2OCAxMTYuNzg1IDE1MC45NjggMTE2Ljc4NVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xMDUuMzM1IDExMi44ODNDMTA1Ljg0MiAxMTMuMjg3IDEwNi41NzUgMTEzLjIxIDEwNi45ODEgMTEyLjcwNEMxMTEuNTgzIDEwNi45OTkgMTE4LjQyNCAxMDMuNzI2IDEyNS43NTcgMTAzLjcyNkMxMzMuNTI3IDEwMy43MjYgMTQwLjg1OSAxMDcuNDk2IDE0NS4zNzYgMTEzLjgxNkMxNDUuNjAyIDExNC4xMzUgMTQ1Ljk2MSAxMTQuMzA2IDE0Ni4zMjcgMTE0LjMwNkMxNDYuNTYyIDExNC4zMDYgMTQ2LjgwMyAxMTQuMjM2IDE0Ny4wMDYgMTE0LjA4OEMxNDcuNTI5IDExMy43MTUgMTQ3LjY1NCAxMTIuOTg0IDE0Ny4yNzkgMTEyLjQ2M0MxNDIuMzM0IDEwNS41MyAxMzQuMjgzIDEwMS4zOTUgMTI1Ljc1NyAxMDEuMzk1QzExNy43MTUgMTAxLjM5NSAxMTAuMjAyIDEwNC45ODYgMTA1LjE1NSAxMTEuMjQzQzEwNC43NSAxMTEuNzQ4IDEwNC44MzUgMTEyLjQ3OSAxMDUuMzM1IDExMi44ODNaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQ3LjAzNiAxNDEuMjg1QzE0Ni41MDYgMTQwLjkxMiAxNDUuNzgxIDE0MS4wMzcgMTQ1LjQwNiAxNDEuNTY1QzE0MC44ODkgMTQ3LjkgMTMzLjU0OSAxNTEuNjg2IDEyNS43NTYgMTUxLjY4NkMxMjUuMTA5IDE1MS42ODYgMTI0LjU4NiAxNTIuMjA3IDEyNC41ODYgMTUyLjg1MkMxMjQuNTg2IDE1My40OTcgMTI1LjEwOSAxNTQuMDE4IDEyNS43NTYgMTU0LjAxOEMxMzQuMzA2IDE1NC4wMTggMTQyLjM1NiAxNDkuODY3IDE0Ny4zMDkgMTQyLjkxQzE0Ny42ODQgMTQyLjM4MSAxNDcuNTU5IDE0MS42NTggMTQ3LjAzNiAxNDEuMjg1WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzE4MzdfMzU3MyIgeD0iODciIHk9Ijg5IiB3aWR0aD0iODMuMTIxMSIgaGVpZ2h0PSI4My4xMjExIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC41NjExMTEgMCAwIDAgMCAwLjU2MTExMSAwIDAgMCAwIDAuNTYxMTExIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18xODM3XzM1NzMiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTgzN18zNTczIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=`;
    this.supportedTransactionVersions = /* @__PURE__ */ new Set([
      "legacy",
      0
    ]);
    this._position = "top-right";
    this._authMode = "Ethereum";
    this._readyState = typeof window === "undefined" || typeof document === "undefined" ? WalletReadyState2.Unsupported : WalletReadyState2.Installed;
    this._connecting = false;
    this._wallet = null;
    this._disconnected = false;
    this._publicKey = null;
    if (typeof window !== "undefined") {
      window.addEventListener("message", this._handleMessage.bind(this));
    }
    if (config == null ? void 0 : config.position) {
      this._position = config.position;
    }
    if (config == null ? void 0 : config.authMode) {
      this._authMode = config.authMode;
      if (config.authMode === "Google") {
        this.name = "Sign in with Google";
        this.icon = `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI2OCAyNjgiIHdpZHRoPSIyNjgiIGhlaWdodD0iMjY4Ij4KCTx0aXRsZT5nb29nbGUtaWNvbi1sb2dvLXN2Z3JlcG8tY29tLXN2ZzwvdGl0bGU+Cgk8c3R5bGU+CgkJLnMwIHsgZmlsbDogI2ZmZmZmZiB9IAoJCS5zMSB7IGZpbGw6ICM0Mjg1ZjQgfSAKCQkuczIgeyBmaWxsOiAjMzRhODUzIH0gCgkJLnMzIHsgZmlsbDogI2ZiYmMwNSB9IAoJCS5zNCB7IGZpbGw6ICNlYjQzMzUgfSAKCQkuczUgeyBmaWxsOiAjMDAwMDAwIH0gCgk8L3N0eWxlPgoJPHBhdGggaWQ9IlNoYXBlIDIiIGNsYXNzPSJzMCIgZD0ibTAgMzVjMC0xOS4zIDE1LjctMzUgMzUtMzVoMTk4YzE5LjMgMCAzNSAxNS43IDM1IDM1djE5OGMwIDE5LjMtMTUuNyAzNS0zNSAzNWgtMTk4Yy0xOS4zIDAtMzUtMTUuNy0zNS0zNXoiLz4KCTxwYXRoIGlkPSJMYXllciIgY2xhc3M9InMxIiBkPSJtMjM2IDEzNi40YzAtOC42LTAuNy0xNC44LTIuMi0yMS4zaC05Ny43djM4LjZoNTcuM2MtMS4xIDkuNi03LjQgMjQuMS0yMS4zIDMzLjhsLTAuMiAxLjMgMzAuOSAyMy45IDIuMiAwLjJjMTkuNi0xOC4xIDMxLTQ0LjggMzEtNzYuNXoiLz4KCTxwYXRoIGlkPSJMYXllciIgY2xhc3M9InMyIiBkPSJtMTM2LjEgMjM4LjFjMjguMSAwIDUxLjctOS4yIDY4LjktMjUuMmwtMzIuOS0yNS40Yy04LjcgNi4xLTIwLjUgMTAuNC0zNiAxMC40LTI3LjYgMC01MC45LTE4LjItNTkuMi00My4zbC0xLjMgMC4yLTMyLjEgMjQuOC0wLjQgMS4yYzE3LjEgMzQgNTIuMyA1Ny4zIDkzIDU3LjN6Ii8+Cgk8cGF0aCBpZD0iTGF5ZXIiIGNsYXNzPSJzMyIgZD0ibTc2LjkgMTU0LjZjLTIuMi02LjQtMy41LTEzLjQtMy41LTIwLjUgMC03LjIgMS4zLTE0LjEgMy4zLTIwLjZ2LTEuNGwtMzIuNS0yNS4zLTEuMSAwLjZjLTcuMSAxNC4xLTExLjEgMjkuOS0xMS4xIDQ2LjcgMCAxNi43IDQgMzIuNiAxMS4xIDQ2Ljd6Ii8+Cgk8cGF0aCBpZD0iTGF5ZXIiIGNsYXNzPSJzNCIgZD0ibTEzNi4xIDcwLjJjMTkuNSAwIDMyLjcgOC41IDQwLjIgMTUuNWwyOS40LTI4LjZjLTE4LjEtMTYuOC00MS41LTI3LjEtNjkuNi0yNy4xLTQwLjcgMC03NS45IDIzLjQtOTMgNTcuNGwzMy42IDI2LjFjOC41LTI1LjEgMzEuOC00My4zIDU5LjQtNDMuM3oiLz4KCTxnIGlkPSJGb2xkZXIgMSI+CgkJPHBhdGggaWQ9IlNoYXBlIDEiIGNsYXNzPSJzNSIgZD0ibTIxMi43IDI2Ny44Yy0zMC45IDAtNTUuOS0yNC45LTU1LjktNTUuOCAwLTMwLjkgMjUtNTUuOCA1NS45LTU1LjggMzAuOCAwIDU1LjggMjQuOSA1NS44IDU1LjggMCAzMC45LTI1IDU1LjgtNTUuOCA1NS44eiIvPgoJCTxwYXRoIGlkPSJQYXRoIDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9InMwIiBkPSJtMjEyLjIgMTcxLjNjMi4yIDAuMSA1LjMgMC40IDYuOSAwLjggMS41IDAuMyA0LjQgMS4xIDYuMiAxLjggMS45IDAuNyA0LjkgMi4xIDYuNiAzLjIgMS43IDEgNC4zIDIuOSA1LjcgNC4xIDEuNCAxLjIgMy40IDMuMyA0LjUgNC41IDEuMSAxLjMgMi4yIDIuOCAyLjQgMy40IDAuNCAwLjggMC4zIDEuMi0wLjQgMS44LTAuNSAwLjYtMS4xIDAuOC0xLjggMC43LTAuNS0wLjItMS40LTAuOS0yLTEuOC0wLjYtMC44LTIuNS0yLjgtNC4zLTQuNS0xLjktMS44LTQuNi0zLjktNi42LTUtMS45LTEuMS01LjEtMi41LTcuMi0zLjEtMi0wLjctNS41LTEuNS03LjctMS43LTMtMC40LTQuOC0wLjMtOCAwLjEtMi4zIDAuMy01LjYgMS4xLTcuOCAxLjgtMi4xIDAuOC01LjMgMi4yLTcuMSAzLjMtMS45IDEuMi00LjYgMy4zLTYuNyA1LjUtMi40IDIuNC0zLjggMy41LTQuNSAzLjUtMC41IDAtMS4yLTAuMi0xLjUtMC41LTAuMi0wLjMtMC41LTAuOS0wLjUtMS4zIDAtMC41IDEtMS45IDIuMi0zLjIgMS4xLTEuNCAzLjUtMy41IDUuMS00LjggMS43LTEuNCA0LjctMy4yIDYuNi00LjIgMS45LTEgNS4xLTIuMiA3LjEtMi44IDEuOS0wLjYgNC43LTEuMiA2LjEtMS40IDEuNS0wLjIgNC41LTAuMyA2LjctMC4yem0zNy40IDIzLjdjMC42IDAgMi4xIDAuMSAzLjQgMC40IDEuNCAwLjIgMy40IDAuOSA0LjUgMS40IDEuMSAwLjUgMyAxLjkgNC4yIDMuMSAxLjIgMS4yIDIuNyAzLjIgMy4zIDQuNCAwLjcgMS4zIDEuNCAzLjcgMS42IDUuMyAwLjQgMi4yIDAuNCAzLjYgMCA1LjYtMC4yIDEuNC0wLjkgMy41LTEuNCA0LjctMC42IDEuMi0yIDMuMS0zLjIgNC40LTEuMyAxLjQtMyAyLjctNC43IDMuNS0yLjUgMS4yLTIuOCAxLjMtNy41IDEuMy00LjQgMC01LTAuMS03LjEtMS4xLTEuMi0wLjYtMy4yLTEuOS00LjQtMy0xLjUtMS40LTIuNi0yLjktMy42LTUtMS40LTIuOS0xLjUtMy4xLTEuNS03LjkgMC00LjUgMC4xLTUgMS4yLTcuMiAwLjctMS41IDIuMS0zLjQgMy40LTQuNyAxLjMtMS4zIDMuMS0yLjcgNC4xLTMuMiAxLTAuNSAyLjktMS4yIDQuMy0xLjUgMS4zLTAuMyAyLjgtMC41IDMuNC0wLjV6bS03IDM3LjVjMC4yIDAgMC43IDAuMyAxLjIgMC42IDAuNSAwLjQgMSAxLjEgMSAxLjYgMCAwLjUtMSAyLjEtMi40IDMuNy0xLjMgMS42LTMuNiAzLjktNS4xIDUuMi0xLjYgMS4zLTQgMy4xLTUuNSAzLjktMS40IDAuOS00LjEgMi4yLTUuOCAyLjktMS44IDAuNy00LjkgMS42LTYuOSAyLTIgMC40LTUgMC44LTYuNiAwLjgtMi42IDAtMy0wLjEtMy40LTAuOS0wLjMtMC43LTAuMy0xLjIgMC0xLjkgMC4zLTAuNSAwLjktMSAxLjQtMS4xIDAuNS0wLjEgMi4zLTAuMiAzLjktMC4zIDEuNy0wLjIgNC43LTAuNyA2LjctMS4zIDItMC42IDUuMS0xLjggNi45LTIuOCAxLjgtMC45IDQuNC0yLjYgNS44LTMuNyAxLjQtMS4xIDMuNS0zLjEgNC43LTQuNCAxLjEtMS4zIDIuNC0yLjggMi45LTMuMyAwLjUtMC41IDEtMSAxLjItMXptLTMyLjItMzcuNWMwLjUgMCAyLjEgMC4xIDMuNCAwLjQgMS40IDAuMiAzLjQgMC44IDQuNiAxLjQgMS4xIDAuNSAzLjEgMS45IDQuMyAzLjEgMS4xIDEuMiAyLjUgMi45IDMgMy45IDAuNiAxIDEuMiAyLjggMS41IDMuOSAwLjMgMS4xIDAuNiAzLjIgMC42IDQuNiAwIDEuNS0wLjMgMy42LTAuNiA0LjctMC4zIDEuMS0wLjkgMi44LTEuNCAzLjctMC41IDEtMS44IDIuNy0zIDMuOC0xLjIgMS4yLTMuMiAyLjctNC43IDMuNC0yLjUgMS4xLTMgMS4yLTcuMyAxLjItNC40IDAtNC44LTAuMS03LjMtMS4zLTEuNy0wLjgtMy40LTIuMS00LjctMy41LTEuMi0xLjMtMi42LTMuMy0zLjItNC42LTAuNi0xLjMtMS4zLTMuNC0xLjUtNC43LTAuMy0xLjgtMC4zLTMuMyAwLTUuNSAwLjMtMS43IDEtNCAxLjYtNS4zIDAuNi0xLjIgMi4xLTMuMSAzLjItNC4yIDEuMS0xLjEgMy0yLjUgNC4xLTMgMS0wLjYgMi45LTEuMiA0LjItMS41IDEuMi0wLjMgMi42LTAuNSAzLjItMC41em0tNC45IDguOGMtMC43IDAuNi0xLjggMS43LTIuMyAyLjUtMC41IDAuOC0xLjEgMi40LTEuMyAzLjYtMC4zIDEuMi0wLjQgMy0wLjIgNCAwLjEgMSAwLjUgMi41IDAuOSAzLjMgMC4zIDAuOCAxIDEuOSAxLjYgMi42IDAuNiAwLjYgMS45IDEuNSAyLjggMS45IDAuOSAwLjQgMi41IDAuNyAzLjcgMC43IDEuMiAwIDIuOC0wLjIgMy42LTAuNiAwLjktMC4zIDIuMi0xLjIgMi45LTEuOSAwLjgtMC43IDEuNy0yIDIuMS0yLjkgMC41LTEuMSAwLjgtMi42IDAuOC00LjcgMC0yLjUtMC4yLTMuNC0xLjEtNS4yLTAuNy0xLjQtMS43LTIuNy0yLjctMy40LTAuOS0wLjYtMi4zLTEuMi0zLjEtMS4zLTAuOC0wLjEtMS43LTAuMy0yLTAuNC0wLjMgMC0xLjQgMC4xLTIuNCAwLjMtMSAwLjItMi41IDAuOC0zLjMgMS41eiIvPgoJPC9nPgo8L3N2Zz4=`;
      }
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
  _handleMessage(event) {
    return __async(this, null, function* () {
      if (event.data && event.data.type === "moongate") {
        const { command } = event.data;
        if (command === "disconnect") {
          this._disconnected = true;
          this._connecting = false;
          yield this.disconnect();
        }
      }
    });
  }
  connect() {
    return __async(this, null, function* () {
      var _a;
      if (this.connected || this.connecting)
        return;
      if (this._wallet) {
        throw new WalletConnectionError("Already connected");
      }
      try {
        this._wallet = new MoonGateEmbed({ authModeAdapter: this._authMode });
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
      if (this._wallet) {
        try {
          yield this._wallet.disconnect();
          this._wallet = null;
          this._publicKey = null;
          this._connecting = false;
          this.emit("disconnect");
          console.log("MoonGate wallet disconnected.");
        } catch (error) {
          console.error("Error encountered during disconnection:", error);
          throw new WalletDisconnectionError(error.message);
        } finally {
          this._disconnected = false;
          this._connecting = false;
        }
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
        if (!isVersionedTransaction2(transaction)) {
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
      if (isVersionedTransaction2(transaction)) {
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
          const finalTransaction = VersionedTransaction2.deserialize(
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
          const finalTransaction = Transaction2.from(
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
  signIn(input) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    });
  }
};
export {
  MoongateWalletAdapter2,
  MoongateWalletName,
  registerMoonGateWallet
};
