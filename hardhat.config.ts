import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://skilled-polished-firefly.ethereum-goerli.discover.quiknode.pro/12b947d51a52238cf13bd0c81d7ddf4061722fb8",
      accounts: [process.env.GORELI_PRIVATE_KEY || ""],
    },
  },
};

export default config;
