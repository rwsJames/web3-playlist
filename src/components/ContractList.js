import Web3 from 'web3'
import InputAndSubmit from './InputAndSubmit'

const setAsActive = (el) => {
    var list = document.getElementById("contractList")
    // Remove active from elements in list
    for(let i=0; i<list.childElementCount; i++) {
        list.children[i].classList.remove("active")
    }
    // Add active to clicked element
    el.classList.add("active")
}
// Untested
const getActiveElement = () => {
    let list = document.getElementById("contractList")
    for(let i=0; i<list.childElementCount; i++) {
        if(list.children[i].classList.contains("active"))
        {
            return list.children[i]
        }
    }
    return false
}
// Generalise to allow adding to any list, factor into new LI component
const addNewContractToList = () => {
    let list = document.getElementById("contractList")
    let newAddress = document.getElementById("contractAddressInput").value
    // Match the input to the standard form for an address, TODO: should check for ascii/valid chars only are present
    if(newAddress.length === 42 && newAddress.substr(0, 2) === "0x") {
        let newLi = document.createElement("LI")
        newLi.classList = "list-group-item list-group-item-action"
        newLi.onclick = (e) => setAsActive(e.target)
        newLi.innerText = newAddress
        newLi.style = "word-wrap: break-word;"
        list.appendChild(newLi)
    }
    else {
        alert("Please enter a valid address.\n" + newAddress + " is not valid.")
    }
}

const ContractList = () => {
    return (
        <div>
            <ul id="contractList" className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action" onClick={ (e) => setAsActive(e.target) }>test</li>
                <li className="list-group-item list-group-item-action" onClick={ (e) => setAsActive(e.target) }>test</li>
            </ul>

            <InputAndSubmit 
            id="contractAddressInput" 
            labelText="Input contract address: " 
            placeholderText="Input contract address..." 
            buttonText="Submit contract address" 
            handleSubmit={ addNewContractToList }
            />
        </div>
    )
}

export default ContractList
