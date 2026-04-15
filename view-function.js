// ============================================================
// view-function.js
// TOPSHIRIQ 5: View funksiyani chaqirib natijani konsolga chiqarish
// ============================================================

const { Web3 } = require("web3");
const { loadContractABI } = require("./contract-instance");

const LOCALHOST_RPC = "http://127.0.0.1:8545";
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// -------------------------------------------------------
// TOPSHIRIQ 5: View funksiyani chaqirish
// .call() — gas sarflamaydi, faqat o'qiydi
// -------------------------------------------------------
async function callViewFunction() {
  console.log("\n" + "=".repeat(60));
  console.log("  TOPSHIRIQ 5: View funksiyani chaqirish");
  console.log("=".repeat(60));

  const web3 = new Web3(new Web3.providers.HttpProvider(LOCALHOST_RPC));
  const { abi } = loadContractABI();
  const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

  // --- getValue() ni chaqirish ---
  console.log("\n📖 getValue() chaqirilmoqda...");
  const storedValue = await contract.methods.getValue().call();
  console.log(`✅ Saqlangan qiymat (getValue): ${storedValue}`);

  // --- getOwner() ni chaqirish ---
  console.log("\n📖 getOwner() chaqirilmoqda...");
  const ownerAddress = await contract.methods.getOwner().call();
  console.log(`✅ Kontrakt egasi (getOwner): ${ownerAddress}`);

  // --- Qo'shimcha ma'lumotlar ---
  const accounts = await web3.eth.getAccounts();
  console.log("\n📋 Mavjud Akkauntlar:");
  accounts.slice(0, 3).forEach((acc, i) => {
    console.log(`   [${i}] ${acc}`);
  });

  const balanceWei = await web3.eth.getBalance(accounts[0]);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");
  console.log(`\n💰 1-akkаunt balansi: ${parseFloat(balanceEth).toFixed(4)} ETH`);

  return { storedValue, ownerAddress };
}

// -------------------------------------------------------
// Asosiy ishga tushirish
// -------------------------------------------------------
async function main() {
  try {
    const result = await callViewFunction();
    console.log("\n" + "=".repeat(60));
    console.log("✅ TOPSHIRIQ 5 muvaffaqiyatli bajarildi!");
    console.log("=".repeat(60));
    return result;
  } catch (error) {
    console.error(`\n❌ View xato: ${error.message}`);
    console.log("💡 Kontrakt deploy qilinganligini tekshiring.");
  }
}

module.exports = { callViewFunction };

if (require.main === module) {
  main();
}
