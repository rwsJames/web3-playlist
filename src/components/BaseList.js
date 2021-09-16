import PropTypes from "prop-types"

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
