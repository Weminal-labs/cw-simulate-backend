const {
  SimulateCosmWasmClient,
  DownloadState,
} = require("@oraichain/cw-simulate");
const cors = require("cors");

const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use(cors());

const sender = "orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m";
const funds = [];

const client = new SimulateCosmWasmClient({
  chainId: "Oraichain-testnet",
  bech32Prefix: "orai",
});

let resultContractAddress = "";

// import the wasm bytecode

app.get("/deploy-contract", async (req, res, next) => {
  const bytes = fs.readFileSync(
    "/home/asus/Workspace/Oraichain101/cosmwasm-poc/artifacts/cosmwasm_poc.wasm"
  );

  const unit8Array = new Uint8Array(bytes);

  const { codeId } = await client.upload(
    sender,
    unit8Array,
    "auto",
    "normal disorder endorse legal kiwi mask behind grunt inherit license battle garment"
  );

  const { contractAddress } = await client.instantiate(
    sender,
    codeId,
    { count: 0 },
    "Counter",
    "auto"
  );
  resultContractAddress = contractAddress;

  fs.mkdirSync(path.resolve(__dirname, "data", resultContractAddress), { recursive: true });


  // execute the contract

  //   console.log('executeContract:', result.constructor.name, JSON.stringify(result, null, 2));

  // query the contract
  //   const query_result = await client.app.wasm.query(contractAddress, { get_count: {} });
  //   console.log('query:', result.constructor.name, JSON.stringify(result, null, 2));

  res.json({ codeId, contractAddress });
});

app.get("/execute", async (req, res, next) => {
  const execute_result = await client.app.wasm.executeContract(
    sender,
    funds,
    resultContractAddress,
    {
      increment: {},
    }
  );

  
  const downloadState = new DownloadState(
    "https://testnet-lcd.orai.io",
    path.resolve(__dirname, "data")
  );
  await downloadState.loadState(
    client,
    sender,
    resultContractAddress,
    "label"
  );
  res.json(execute_result);
});

app.get("/query", async (req, res, next) => {
  const query_result = await client.app.wasm.query(resultContractAddress, {
    get_count: {},
  });
  res.json(query_result);
});

app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
