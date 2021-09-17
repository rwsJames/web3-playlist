import PropTypes from 'prop-types'

// TODO: Refactor into separate Input and Submit components
const InputAndSubmit = ({ id, labelText, placeholderText, buttonText, handleChange, handleSubmit }) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor={ id }>{ labelText } </label>
                <input className="form-control" id={ id } type="text" placeholder={ placeholderText } onChange={ handleChange } />
            </div>
            <button className="btn btn-primary" type="button" onClick={ handleSubmit }>{ buttonText }</button> {/* Should refactor out and take id as an arg */}
        </form>
    )
}

InputAndSubmit.defaultProps = {
    id: "",
    labelText: "Input:",
    placeholderText: "Please input...",
    buttonText: "Submit",

    handleChange: (ev) => {
        console.log("changed!")
    },

    handleSubmit: (ev) => {
        console.log("submitted!")
    },
}

InputAndSubmit.propTypes = {
    id: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
    buttonText: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
}

export default InputAndSubmit
