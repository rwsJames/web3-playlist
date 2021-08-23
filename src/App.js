import Web3 from 'web3'
import './App.css'
import InputAndSubmit from './components/InputAndSubmit'
import CollectionList from './components/CollectionList'
import ContractList from './components/ContractList'
import FunctionList from './components/FunctionList'
import ArgumentList from './components/ArgumentList'
import PlayList from './components/PlayList'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

function App() {
   // State setup
   const [data, setData] = useState([
      {
         userAddress: "",
      },
   ])

   // Establish connection to blockchain
   useEffect(() => {
      const loadBlockchainData = async () => {
         const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
         const network = await web3.eth.net.getNetworkType()
         const accounts = await web3.eth.getAccounts()

         setData({ userAddress: accounts[0] })
      }

      loadBlockchainData()
   }, [])

   return (
      <div className="container mw-100">
         <Header />

         <h1>Hello</h1>
         <p>Your address: { data.userAddress }</p>

         

         <div className="row">
            <div className="col border-primary border-end">
               <h1 className="d-flex justify-content-center">Collections</h1>

               <CollectionList />
               <InputAndSubmit id="collectionNameInput" labelText="Input name: " placeholderText="Input name..." buttonText="Create new collection" />
            </div>
            <div className="col-3 border-primary border-end"> {/* Strict col-3 to prevent long address from stretching box */}
               <h1 className="d-flex justify-content-center">Contracts</h1>

               <ContractList />
               
            </div>
            <div className="col border-primary border-end">
               <h1 className="d-flex justify-content-center">Functions</h1>

               <FunctionList />
               {/* Search functions */}
            </div>
            <div className="col border-primary border-end">
               <h1 className="d-flex justify-content-center">Arguments</h1>

               <ArgumentList />
            </div>
            <div className="col">
               <h1 className="d-flex justify-content-center">Playlist</h1>

               <PlayList />
            </div>
         </div>

         <Footer />
      </div>
   );
}

export default App;
