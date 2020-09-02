import React, { useState } from 'react'
import { Input } from 'antd'
const {Search} = Input

const SearchFeature = (props) => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleOnchange = e => {
        setSearchTerm(e.target.value)
       
    }
    const handleSearch = e => {
        props.updateSearchTerm(searchTerm)
    }

    return (
        <div>   
            <Search
                value={searchTerm}
                onChange={handleOnchange}
                placeholder='Search by typing...'
                onSearch={handleSearch}
                />
        </div>
    )
}

export default SearchFeature
