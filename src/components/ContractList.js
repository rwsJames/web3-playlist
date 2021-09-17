import PropTypes from 'prop-types'
import BaseList from './BaseList'
import InputAndSubmit from './InputAndSubmit'

import { useEffect } from 'react'
import { createNewListElement } from './BaseList'

const addNewContract = (listId, inputId) => {
    let list = document.getElementById(listId)
    let newAddress = document.getElementById(inputId).value
    // Match the input to the standard form for an address, TODO: should check for ascii/valid chars only are present
    if(newAddress.length === 42 && newAddress.substr(0, 2) === "0x") {

        // Create new list element and display it
        list.append(createNewListElement(newAddress))

        // Add the new address to storage
        localStorage.setItem(listId, (localStorage.getItem(listId) || "") + newAddress + ", ")

        // Clear the input
        document.getElementById(inputId).value = ""
    }
    else {
        document.getElementById(inputId).value = ""
        alert("Please enter a valid address.\n" + newAddress + " is not valid.")
    }
}

// Intended for use only as a side-effect
const initialiseListFromLocalStorage = (listId, delimiter=", ") => {
    let displayList = document.getElementById(listId)
    displayList.innerHTML = ""
    let localContractList = (localStorage.getItem(listId) || "").split(delimiter)
    localContractList.forEach((value) => {
        if(value !== "") {
            displayList.append(createNewListElement(value))
        }
    })
    document.getElementById("functionList").innerText = ""
}

const ContractList = ({ listId, inputId }) => {
    useEffect(() => { initialiseListFromLocalStorage(listId) }, [listId])
    
    return (
        <div>
            <BaseList listId={ listId } />
            {inputId !== "" ? <InputAndSubmit 
            id={ inputId }
            labelText="Input contract address: " 
            placeholderText="Input contract address..." 
            buttonText="Submit contract address" 
            handleSubmit={ () => addNewContract(listId, inputId) }
            /> : ""}
        </div>
    )
}

ContractList.defaultProps = {
    listId: "",
    inputId: "",
}

ContractList.propTypes = {
    listId: PropTypes.string,
    inputId: PropTypes.string,
}

export default ContractList
