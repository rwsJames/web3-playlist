import PropTypes from 'prop-types'
import BaseList from './BaseList'

import { useEffect } from 'react'
import { createNewListElement } from './BaseList'

const ArgumentList = ({ listIdToObserve }) => {
    // TODO: Potentially abstract this effect/observer creation to make more general; only need function (what happens when triggered) as input
    useEffect(() => {
        const initObserver = () => {
            // Declare the observer and what it does on trigger
            let activeContractOberver = new MutationObserver((record) => { 
                console.log(record.at(-1).target)
                console.log(record.at(-1).target.innerText)

                
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
    }, [listIdToObserve])

    const parseContractForFunctionArgs = () => {
        // We have the currently selected contract and function in local storage
        // 
    }

    return (
        <div>
            <BaseList listId="argumentList" />
        </div>
    )
}

ArgumentList.defaultProps = {
    listIdToObserve: "",
}

ArgumentList.propTypes = {
    listIdToObserve: PropTypes.string,
}

export default ArgumentList
