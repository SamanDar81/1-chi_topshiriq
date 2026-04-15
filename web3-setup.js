// ============================================================
// web3-setup.js
// TOPSHIRIQ 1: Web3.js kutubxonasini o'rnatish va ulanish
// TOPSHIRIQ 2: Localhostni MetaMask'ga ulash
// ============================================================

const { Web3 } = require("web3");

// -------------------------------------------------------
// TOPSHIRIQ 1: Web3 instansiyasini yaratish
// npm install web3 buyrug'i bilan o'rnatilgan kutubxona
// -------------------------------------------------------
async function connectToLocalhost() {
  console.log("=".repeat(60));
  console.log("  TOPSHIRIQ 1 & 2: Web3.js ulanish");
  console.log("=".repeat(60));

  // Localhost Ganache yoki Hardhat node bilan ulanish
  const LOCALHOST_RPC = "http://127.0.0.1:8545";

  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(LOCALHOST_RPC));

    // Ulanishni tekshirish
    const isListening = await web3.eth.net.isListening();
    console.log("\n✅ TOPSHIRIQ 1: Web3.js muvaffaqiyatli o'rnatildi!");
    console.log(`✅ TOPSHIRIQ 2: Localhost (${LOCALHOST_RPC}) ga ulandi!`);
    console.log(`   Network tinglayapti: ${isListening}`);

    // Network ma'lumotlari
    const networkId = await web3.eth.net.getId();
    const blockNumber = await web3.eth.getBlockNumber();
    const chainId = await web3.eth.getChainId();

    console.log(`\n📡 Network ID: ${networkId}`);
    console.log(`🔗 Chain ID: ${chainId}`);
    console.log(`📦 Joriy blok: ${blockNumber}`);

    // MetaMask uchun eslatma
    console.log("\n💡 MetaMask sozlamalari:");
    console.log("   Network Name: Localhost 8545");
    console.log("   RPC URL: http://127.0.0.1:8545");
    console.log(`   Chain ID: ${chainId}`);
    console.log("   Currency Symbol: ETH");

    return web3;
  } catch (error) {
    console.error(`\n❌ Ulanish xatosi: ${error.message}`);
    console.log("\n💡 Yechim: Ganache yoki Hardhat node ishga tushiring:");
    console.log("   npx hardhat node  YOKI  ganache-cli");
    return null;
  }
}

module.exports = { connectToLocalhost };

// To'g'ridan-to'g'ri ishga tushirish
if (require.main === module) {
  connectToLocalhost();
}
