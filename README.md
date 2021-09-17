# Ryan's Ethereum Smart Contract Function-Call Sequencer
## (a.k.a Ethereum SCFCS)

### Intro
The main point of this was to be able to create your own vault/semi-autocompounder on any smart contract by simply creating a sequence of actions that can be triggered whenever the user wants, so you could, for example, collect your token yield, swap half for USDC, add USDC and yield to LP, deposit LP tokens into contract.  There are numerous uses for this however, as it is simply a way of collating muliple contracts into a collection of function calls that are executed in a given sequence.
This application sits directly on top of the blockchain with no proprietary solidity or smart contracts.  This is to ensure that there are no extra gas fees or buttons to click when executing the playlist.

### Potential Future Features
* Nested functions (allow the return values of functions to be used)
* Allow movement of elements (NOT functions, ordering is based on ABI, or args, final order of args must always be as expected by the function as they are passed to the call in the order they are given)

### Immediate To-do List
* Display arg names and expected type for active function
    * Allow for input of arg value
        * Shorthand options (e.g. "max" to use however much is in wallet, "new" to take value from most recent deposit of that token into user's wallet, "self" for own address)
    * Button to add function call to the list
* Allow deletion of elements (NOT functions or args)
