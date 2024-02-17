import React, { useState, useEffect } from "react";
import Web3 from "web3";
 
import coinabi from "./TokenContract.json";
import "./App.css";
const rpcEndpoint = "22a7702fee2a450690e92a4c7a601102"; // Replace with your custom testnet RPC endpoint
const infuraUrl = rpcEndpoint;

const Connect = () => {
  const [sidesl, setsidesl] = useState("Token");
  const standard_adr = "0xB6E27b5bA611f49319BAED9B4C3a87AFA5213060";
  const [account, setaccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  // ===
  const [spender, setSpender] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [allowanceOwner, setAllowanceOwner] = useState("");
  const [allowanceSpender, setAllowanceSpender] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [balanceAddress, setBalanceAddress] = useState("");
  const [transferAmount, settransferAmount] = useState("");
  const handleTAmountChange = (e) => {
    settransferAmount(e.target.value);
  };
  const handleSpenderChange = (e) => {
    setSpender(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmountValue(e.target.value);
  };

  const handleTransferAddressChange = (e) => {
    setTransferAddress(e.target.value);
  };

  const handleAllowanceOwnerChange = (e) => {
    setAllowanceOwner(e.target.value);
  };

  const handleAllowanceSpenderChange = (e) => {
    setAllowanceSpender(e.target.value);
  };

  const handleMintAmountChange = (e) => {
    setMintAmount(e.target.value);
  };

  const handleBurnAmountChange = (e) => {
    setBurnAmount(e.target.value);
  };

  const handleStakeAmountChange = (e) => {
    setStakeAmount(e.target.value);
  };

  const handleBalanceAddressChange = (e) => {
    setBalanceAddress(e.target.value);
  };

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      await updateContract(standard_adr, coinabi, setTokenContract, web3);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setaccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const updateContract = async (contractAddress, abi, setstate, web3) => {
    const readcontract = new web3.eth.Contract(abi, contractAddress);
    setstate(readcontract);
  };

  const transfer = async () => {
    try {
      const tres = await tokenContract.methods
        .transfer(transferAddress, web3.utils.toWei(transferAmount.toString(), 'ether'))
        .send({
          from: account,
        });
      if (tres) {
        alert("token transfered");
      } else {
        alert("transfer failed");
      }
    } catch (error) {}
  };
  const balance = async () => {
    try {
      const bres = await tokenContract.methods.balanceOf(balanceAddress).call();
      alert(bres);
    } catch (error) {}
  };
  const burn = async () => {
    try {
      const bres = await tokenContract.methods
        .burn(burnAmount)
        .send({ from: account });
      alert("burnt successfully");
    } catch (error) {}
  };
  const mint = async () => {
    try {
      const mres = await tokenContract.methods
        .mint(mintAmount)
        .send({ from: account });
      alert("Mint was successfull");
    } catch (error) {}
  };
  const approve = async () => {
    try {
      const ares = await tokenContract.methods
        .approve(spender, amountValue)
        .send({ from: account });
      alert("Allowance approved successfully");
    } catch (error) {}
  };
  const allowance = async () => {
    try {
      const ares = await tokenContract.methods
        .allowance(allowanceOwner, allowanceSpender)
        .call();
      alert(ares);
    } catch (error) {}
  };
  const stake = async () => {
    try {
      const currentAllowance = await tokenContract.methods
        .allowance(account, tokenContract._address)
        .call();
      const currentAllowanceNumber = Number(currentAllowance);
      const desiredAllowance = Number(stakeAmount);

      if (currentAllowanceNumber < desiredAllowance) {
        // const approveAmount = Number(desiredAllowance - currentAllowanceNumber);
        await tokenContract.methods
          .approve(tokenContract._address, desiredAllowance)
          .send({
            from: account,
          });
      }
      const sres = await tokenContract.methods
        .stake(stakeAmount)
        .send({ from: account });
      alert("staked successfully");
    } catch (error) {}
  };
  const withdraw = async () => {
    try {
      const wres = await tokenContract.methods
        .withdraw()
        .send({ from: account });
      alert("withrawed successfully");
    } catch (error) {}
  };
  return (
    <div>
    <nav className="navbar">
      <div className="container">
        <a href="/" className="logo">CodeWarriorsCoin (CWC)</a> <br/><br/>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
      </nav>
    {!account ? (
      <div className="container">
        <button className="connect-button" onClick={initializeWeb3}>
          Connect to Metamask
        </button>
      </div>
      
    ) : (
      <>
      <nav className="navbar">
        <div className="address-container">
          <span><center>Account: {account}</center> </span>
        </div>
        
      </nav>
          <div className="container-sidebar">
            <div className="sidebar">
              <ul>
                <li>
                  onClick={() => {
                    setsidesl("Token");
                  }}
                
                   
                </li>
              </ul>
            </div>
            <div className="swap-container">
              <div className="token_intraction">
                <div className="token_row">
                  <div className="intraction-form">
                     
                     
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="text"
                        placeholder="address"
                        name="address"
                        value={transferAddress}
                        onChange={handleTransferAddressChange}
                      />
                    </div>

                    <div className="form-field">
                      <input
                        type="number"
                        placeholder="Amount"
                        name="Amount"
                        value={transferAmount}
                        onChange={handleTAmountChange}
                      />
                    </div>
                    <button className="submit" onClick={transfer}>
                      Transfer
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="text"
                        placeholder="Owner"
                        name="address"
                        value={allowanceOwner}
                        onChange={handleAllowanceOwnerChange}
                      />
                    </div>

                    <div className="form-field">
                      <input
                        className="form_input"
                        type="text"
                        placeholder="Spender"
                        name="spender"
                        value={allowanceSpender}
                        onChange={handleAllowanceSpenderChange}
                      />
                    </div>
                    <button className="submit" onClick={allowance}>
                      Allowance
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="number"
                        placeholder="Amount"
                        name="Amount"
                        value={mintAmount}
                        onChange={handleMintAmountChange}
                      />
                    </div>
                    <button className="submit" onClick={mint}>
                      Mint
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="number"
                        placeholder="Amount"
                        name="Amount"
                        value={burnAmount}
                        onChange={handleBurnAmountChange}
                      />
                    </div>
                    <button className="submit" onClick={burn}>
                      Burn
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="number"
                        placeholder="Amount"
                        name="Amount"
                        value={stakeAmount}
                        onChange={handleStakeAmountChange}
                      />
                    </div>
                    <button className="submit" onClick={stake}>
                      Stake
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <div className="form-field">
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={balanceAddress}
                        onChange={handleBalanceAddressChange}
                      />
                    </div>
                    <button className="submit" onClick={balance}>
                      Balance
                    </button>
                  </div>
                </div>
                <div className="token_row">
                  <div className="intraction-form">
                    <button className="submit" onClick={withdraw}>
                      withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Connect;