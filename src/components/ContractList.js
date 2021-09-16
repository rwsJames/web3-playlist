import Web3 from 'web3'
import { useEffect } from 'react'
import InputAndSubmit from './InputAndSubmit'
import BaseList from './BaseList'
import PropTypes from "prop-types"

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

export const setAsActive = (el) => {
    var list = el.parentElement

    // Remove active from elements in list
    for(let i=0; i<list.childElementCount; i++) {
        list.children[i].classList.remove("active")
    }

    // Add class "active" to clicked element
    el.classList.add("active")

    // Grab the name of the list without the list part
    let localName = el.parentElement.id.substr(0, el.parentElement.id.length-4)
    // Change the first letter to uppercase
    localName = localName.charAt(0).toUpperCase() + localName.substr(1)
    localName = "active"+localName
    localStorage.setItem(localName, el.innerText)
}



export const createNewListElement = (eleText, eleId="") => {
    let newLi = document.createElement("LI")
    
    newLi.classList = "list-group-item list-group-item-action"
    newLi.onclick = (e) => setAsActive(e.target)
    newLi.innerText = eleText
    newLi.style = "word-wrap: break-word;"
    newLi.id = eleId
    
    return newLi
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
    useEffect(() => { initialiseListFromLocalStorage(listId) }, [])
    
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
