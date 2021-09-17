import Web3 from 'web3'
import './App.css'
import InputAndSubmit   from './components/InputAndSubmit'
import CollectionList   from './components/CollectionList'
import ContractList     from './components/ContractList'
import FunctionList     from './components/FunctionList'
import ArgumentList     from './components/ArgumentList'
import PlayList         from './components/PlayList'
import Header           from './components/Header'
import Footer           from './components/Footer'

import { useState, useEffect } from 'react'

/*
LOCAL STORAGE POTENTIAL CONTENTS LIST:
activeContract
activeFunction
contractList



*/

function App() {
   // State setup
   const [data, setData] = useState([
      {
         networkName: "",
         userAddress: "",
         contractList: localStorage.getItem("contractList") || "",
         activeContract: "",
         activeFunction: "",
      },
   ])

   // Establish connection to blockchain
   useEffect(() => {
      const loadBlockchainData = async () => {
         const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

         const networkName = await web3.eth.net.getNetworkType()
         const accounts = await web3.eth.getAccounts()
         
         setData({ 
            userAddress: accounts[0],
            networkName: networkName,
         })
      }

      loadBlockchainData()
   }, [])
   
   return (
      <div className="container mw-100">
         <Header />

         <h1>Hello</h1>
         <p>Your address: { data.userAddress } on { data.networkName }</p>
         <p>Please ensure any contracts used are verified on etherscan (other networks tba)</p>
         <hr />

         <div className="row">
            <div className="col-2 border-primary border-end">
               <h1 className="d-flex justify-content-center">Collections</h1>
               <CollectionList />
               <InputAndSubmit id="collectionNameInput" labelText="Input name: " placeholderText="Input name..." buttonText="Create new collection" />
            </div>

            <div className="col-4 border-primary border-end"> {/* Strict col-3 to prevent long address from stretching box */}
               <h1 className="d-flex justify-content-center">Contracts</h1>
               <ContractList listId="contractList" inputId="contractAddressInput" />
            </div>

            <div className="col-2 border-primary border-end">
               <h1 className="d-flex justify-content-center">Functions</h1>
               <FunctionList listIdToObserve="contractList" />
               {/* Search functions */}
            </div>

            <div className="col-2 border-primary border-end">
               <h1 className="d-flex justify-content-center">Arguments</h1>
               <ArgumentList listIdToObserve="functionList" />
            </div>

            <div className="col-2">
               <h1 className="d-flex justify-content-center">Playlist</h1>
               <PlayList />
            </div>
         </div>

         <Footer />
      </div>
   );
}

export default App;
