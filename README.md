# 🌐 Web3.js — 8 Ta Topshiriq Loyihasi

## 📋 Topshiriqlar ro'yxati

| # | Topshiriq | Fayl | Status |
|---|-----------|------|--------|
| 1 | Web3.js kutubxonasini o'rnatish | `web3-setup.js` | ✅ |
| 2 | Localhostni MetaMask'ga ulash | `web3-setup.js` | ✅ |
| 3 | Smart-kontrakt ABI faylini yuklash | `contract-instance.js` | ✅ |
| 4 | Kontrakt adresi orqali obyekt yaratish | `contract-instance.js` | ✅ |
| 5 | View funksiyani chaqirib konsolga chiqarish | `view-function.js` | ✅ |
| 6 | send() orqali tranzaksiya yuborish | `send-transaction.js` | ✅ |
| 7 | Xatoliklarni ushlash mexanizmi | `error-handling.js` | ✅ |
| 8 | Gas limit va gas price sozlamalari | `gas-settings.js` | ✅ |

---

## 📁 Loyiha Tuzilmasi

```
1_chi_8talik/
│
├── contract/
│   ├── SimpleStorage.sol       ← Solidity smart-kontrakt
│   └── SimpleStorage.json      ← ABI fayli (TOPSHIRIQ 3)
│
├── web3-setup.js               ← TOPSHIRIQ 1 & 2
├── contract-instance.js        ← TOPSHIRIQ 3 & 4
├── view-function.js            ← TOPSHIRIQ 5
├── send-transaction.js         ← TOPSHIRIQ 6
├── error-handling.js           ← TOPSHIRIQ 7
├── gas-settings.js             ← TOPSHIRIQ 8
├── index.js                    ← BARCHA topshiriqlar birga
├── package.json
└── README.md
```

---

## ⚙️ O'rnatish va Ishga Tushirish

### 1. Dependencylarni o'rnatish
```bash
npm install
```

### 2. Local blockchain ishga tushirish

**Variant A — Hardhat:**
```bash
npx hardhat node
```

**Variant B — Ganache:**
```bash
npx ganache-cli
```

### 3. MetaMask sozlamalari

MetaMask → Tarmoqlar → Yangi tarmoq qo'shish:

| Maydon | Qiymat |
|--------|--------|
| Network Name | Localhost 8545 |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 1337 |
| Currency | ETH |

---

## 🚀 Skriptlarni Ishga Tushirish

```bash
# Barcha 8 topshiriqni birga
npm start
# yoki
node index.js

# Alohida topshiriqlar
node web3-setup.js        # 1 & 2-topshiriq
node contract-instance.js # 3 & 4-topshiriq
node view-function.js     # 5-topshiriq
node send-transaction.js  # 6-topshiriq
node error-handling.js    # 7-topshiriq
node gas-settings.js      # 8-topshiriq
```

---

## 📚 Topshiriqlar Tushuntirmasi

### TOPSHIRIQ 1 — Web3.js o'rnatish
```bash
npm install web3
```
```js
const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
```

### TOPSHIRIQ 2 — MetaMask'ga ulash
```js
const networkId   = await web3.eth.net.getId();
const chainId     = await web3.eth.getChainId();
const isListening = await web3.eth.net.isListening();
```

### TOPSHIRIQ 3 — ABI faylini yuklash
```js
const fs  = require("fs");
const abi = JSON.parse(fs.readFileSync("contract/SimpleStorage.json")).abi;
```

### TOPSHIRIQ 4 — Kontrakt obyektini yaratish
```js
const contract = new web3.eth.Contract(abi, "0xKONTRAKT_ADRESI");
```

### TOPSHIRIQ 5 — View funksiyani chaqirish
```js
// .call() — gas sarflamaydi
const value = await contract.methods.getValue().call();
console.log("Qiymat:", value);
```

### TOPSHIRIQ 6 — Tranzaksiya yuborish
```js
// .send() — gas sarflaydi, blockchain'ni o'zgartiradi
const receipt = await contract.methods.setValue(42).send({
  from: accounts[0],
  gas: 100000,
  gasPrice: "20000000000"
});
```

### TOPSHIRIQ 7 — Xato ushlash
```js
try {
  await contract.methods.getValue().call();
} catch (error) {
  if (error.message.includes("ECONNREFUSED")) {
    console.log("❌ Node ulana olmadi!");
  } else if (error.message.includes("revert")) {
    console.log("❌ Kontrakt tranzaksiyani rad etdi!");
  } else {
    console.log("❌ Xato:", error.message);
  }
}
```

### TOPSHIRIQ 8 — Gas sozlamalari
```js
// 1. Gas taxminini olish
const estimated = await contract.methods.setValue(99).estimateGas({ from: sender });

// 2. Gas bilan tranzaksiya yuborish
await contract.methods.setValue(99).send({
  from: sender,
  gas: Math.ceil(Number(estimated) * 1.2), // +20% xavfsizlik
  gasPrice: "20000000000",                  // 20 Gwei
});
```

---

## 🔑 Muhim Tushunchalar

| Tushuncha | Izoh |
|-----------|------|
| `.call()` | View funksiya — gas sarflamaydi |
| `.send()` | Tranzaksiya — gas sarflaydi |
| `gas` | Gas limit — maksimal gas miqdori |
| `gasPrice` | Har bir gas uchun narx (Wei) |
| `1 Gwei` | 1,000,000,000 Wei |
| `ABI` | Application Binary Interface — kontrakt "interfeysi" |
| `receipt` | Tranzaksiya tasdiqlanganidan keyin qaytadigan ma'lumot |

---

## ⚠️ Muhim Eslatma

Loyihani to'liq ishga tushirish uchun avval **Smart-kontraktni deploy qilish** kerak:

```bash
# Hardhat bilan deploy:
npx hardhat run scripts/deploy.js --network localhost
```

Deploy qilinganidan keyin `CONTRACT_ADDRESS` ni barcha fayllarda o'zgartiring.
