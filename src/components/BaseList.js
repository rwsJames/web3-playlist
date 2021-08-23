import { useEffect } from 'react'
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

const createNewListElement = (eleText = "") => {
    let newLi = document.createElement("LI")
    newLi.classList = "list-group-item list-group-item-action"
    newLi.onclick = (e) => setAsActive(e.target)
    newLi.innerText = eleText
    newLi.style = "word-wrap: break-word;"
    
    return newLi
}

// Intended for use only as a side-effect
const initialiseListFromLocalStorage = (listId, delimiter=", ") => {
    let displayList = document.getElementById(listId)
    displayList.innerHTML = ""
    let localContractList = (localStorage.getItem(listId) || "").split(delimiter)
    localContractList.forEach((value) => {
        if(value !== "") {
            displayList.appendChild(createNewListElement(value))
        }
    })
}

const BaseList = ({ listId, inputId }) => {
    useEffect(() => { initialiseListFromLocalStorage(listId) })

    return (
        <div>
            <ul id={ listId } className="list-group list-group-flush">
                {/*<li className="list-group-item list-group-item-action" onClick={ (e) => setAsActive(e.target) }>test</li>*/}
            </ul>
            
        </div>
    )
}

export default BaseList
