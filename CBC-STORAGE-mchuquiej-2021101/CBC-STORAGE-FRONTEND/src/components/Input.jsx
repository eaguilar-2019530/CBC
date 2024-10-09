import PropTypes from 'prop-types'

export const Input=({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea
})=>{
    const handleValueChange=(e)=>{
        onChangeHandler(e.target.value, field)
    }

    const handleOnBlur=(e)=>{
        onBlurHandler(e.target.value, field)
    }

    return(
        <>
            <div className='auth-form-label'>
                <span>{label}</span>
            </div>
            {
                textarea ? (
                    <textarea
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleOnBlur}
                        rows={5}
                        style={{maxWidth: '400px'}}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleOnBlur}
                    />
                )
            }
            <span className='auth-form-validation-message'>
                {showErrorMessage && validationMessage}
            </span>
        </>
    )
}

Input.propTypes={
    field: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.any.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.any,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool
}