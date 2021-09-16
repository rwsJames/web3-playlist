import $ from 'jquery'
import Web3 from 'web3'
import { useEffect } from 'react'
import BaseList from './BaseList'
import { createNewListElement, setAsActive } from './ContractList'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

const FunctionList = ({ listIdToObserve }) => {
    useEffect(() => {
        // Observer to trigger on changes to the classlist of any child of the given (contract) list 
        const initObserver = () => {
            // Declare what the observer does on trigger
            let activeContractOberver = new MutationObserver((record) => { 
                console.log(record.at(-1).target)
                console.log(record.at(-1).target.innerText)

                parseContractForFunctions(record.at(-1).target.innerText)
            })

            // Specify what to observe, with options
            activeContractOberver.observe(document.getElementById(listIdToObserve), {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true,
            })
        }

        initObserver()
    }, []) // The "[]" is to use the effect once

    // Expecting string address
    const parseContractForFunctions = (toParse) => {
        // Get the ABI of the given contract
        // As per the EtherScan docs: https://docs.etherscan.io/api-endpoints/contracts
        // TODO: Look into proxy-ing this request to hide key in network reqs
        let url = "https://api.etherscan.io/api?module=contract&action=getabi&address="+toParse+"&apikey="+process.env.REACT_APP_ETHERSCAN_API_KEY
        console.log(url)
        $.getJSON(url, function(fetched) {
            // 0 if contract is not verified
            // Could maybe move this check to when the contract is added
            if(fetched.status === "0") {
                alert("The contract at "+toParse+" has not yet been verified.")
                document.getElementById("functionList").innerText = ""
            } else {
                let abi = JSON.parse(fetched.result)
                console.log(abi)
                
                if(abi !== "") {
                    let list = document.getElementById("functionList")
                    // Reset function list
                    list.innerText = ""

                    for(let i=0; i<abi.length; i++) {
                        // Add function names to their own list
                        if(abi[i].type === "function") {
                            console.log(abi[i].name)
                            list.append(createNewListElement(abi[i].name, i))
                        }
                    }
                } else {
                    console.log("ABI get failed")
                }
            }
        })
    }

    return (
        <div>
            <BaseList listId="functionList" />
        </div>
    )
}

export default FunctionList
