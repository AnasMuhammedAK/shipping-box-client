import React from 'react'
import Select from 'react-select'

function DropDown(props) {
    //handleChange
    const handleChange = value => {
        props.onChange("country", value);
    };
    //handleBlur
    const handleBlur = () => {
        props.onBlur("country", true);
    }
    const allCountries = [
        { value: 7.35, label: 'Sweden' },
        { value: 11.53, label: 'China' },
        { value: 15.63, label: 'Brazil' },
        { value: 50.09, label: 'Australia' }
    ]
    return (
        <Select
            onChange={handleChange}
            onBlur={handleBlur}
            id="country"
            options={allCountries}
            value={props?.value?.label}
        />
    )
}

export default DropDown