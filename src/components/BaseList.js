import PropTypes from 'prop-types'

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

const setAsActive = (el) => {
    var list = el.parentElement

    // Remove active from elements in list
    for(let i=0; i<list.childElementCount; i++) {
        list.children[i].classList.remove("active")
    }

    // Add class active to clicked element
    el.classList.add("active")

    // Grab the name of the list without the list part
    let localName = el.parentElement.id.substr(0, el.parentElement.id.length-4)
    // Change the first letter to uppercase
    localName = localName.charAt(0).toUpperCase() + localName.substr(1)
    // Add selected item to local storage
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

const BaseList = ({ listId }) => {
    

    return (
        <div>
            <ul id={ listId } className="list-group list-group-flush">
                {/*<li className="list-group-item list-group-item-action" onClick={ (e) => setAsActive(e.target) }>test</li>*/}
            </ul>
        </div>
    )
}

BaseList.defaultProps = {
    listId: "",
}

BaseList.propTypes = {
    listId: PropTypes.string,
}

export default BaseList
