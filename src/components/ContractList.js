import Web3 from 'web3'
import InputAndSubmit from './InputAndSubmit'
import BaseList from './BaseList'
import createNewListElement from './BaseList'

const addNewContract = (listId, inputId) => {
    let list = document.getElementById(listId)
    let newAddress = document.getElementById(inputId).value
    // Match the input to the standard form for an address, TODO: should check for ascii/valid chars only are present
    if(newAddress.length === 42 && newAddress.substr(0, 2) === "0x") {
        // Create new list element and display it
        list.append(createNewListElement(newAddress))
        // Add the new address to storage
        localStorage.setItem(listId, localStorage.getItem(listId) + newAddress + ", ")
    }
    else {
        alert("Please enter a valid address.\n" + newAddress + " is not valid.")
    }
}

const ContractList = () => {
    // On initial load, check for previous uses and load their contracts
    

    return (
        <div>
            <BaseList listId="contractList" inputId="contractAddressInput" />
            <InputAndSubmit 
            id="contractAddressInput"
            labelText="Input contract address: " 
            placeholderText="Input contract address..." 
            buttonText="Submit contract address" 
            handleSubmit={ () => addNewContract("contractList", "contractAddressInput") }
            />
            
        </div>
    )
}

export default ContractList
