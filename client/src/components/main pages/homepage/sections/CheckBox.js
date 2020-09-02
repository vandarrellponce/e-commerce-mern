import React, { useState } from 'react'
import {Checkbox, Collapse} from 'antd'


const CheckBox = (props) => {
    const [checked, setChecked] = useState(['Milk Tea', 'Shake'])
    const categories = [
        {
            _id: 1,
            name: 'Milk Tea'
        },
        {
            _id: 2,
            name: 'Shake'
        }
    ]
    
    const handleChange = (value) => {
        const newChecked = [...checked]
        // IF VALUE IS NOT IN ARRAY, ADD IT
        if(!checked.includes(value)){
            newChecked.push(value)
        }
        // IF VALUE IS IN ARRAY, REMOVE IT
        else{
            newChecked.splice(checked.indexOf(value), 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Collapse.Panel header='Category' key="1">
                    {categories.map((category, i) => (
                        <React.Fragment key={i}>
                            <Checkbox
                                onChange={ e => handleChange(category.name)}
                                type="checkbox"
                                checked={checked.includes(category.name)} 
                            />
                            <span>{category.name}</span>
                        </React.Fragment>
                    ))}
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox

