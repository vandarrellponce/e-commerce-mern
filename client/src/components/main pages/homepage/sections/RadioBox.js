import React, { useState } from 'react'
import {price} from './data'
import { Collapse, Radio } from 'antd'

const RadioBox = (props) => {
    const [value, setValue] = useState(0)

    const renderRadioBox = price.map((value, i) => (
            <Radio key={i} value={value.range}>{value.name}</Radio>
        ))
    const handleChange = (e) => {
        setValue(e.target.value)
        props.handleFilters(e.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Collapse.Panel header='Price' key="1">
                    <Radio.Group onChange={handleChange} value = {value}>
                        {renderRadioBox}
                    </Radio.Group>
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
