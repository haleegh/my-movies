import React, { useState } from 'react'

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('')
  // const [state, setstate] = useState(initialState)

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value)
  }

  const resetInputField = () => {
    setSearchValue('')
    //바뀐상태를 공백으로 설정
  }
  
  const callSearchFunction = (e) => {
    e.preventDefault()
    /* js의 search 메소드는 조건 문자열(searchValue : 사용자 입력)이
     대상 문자열(props)에 포함됐다면 몇번째 위치에서 처음 확인되는지 반환함 */
    props.search(searchValue)
    resetInputField()
  }

  return(
    <form className='search'>
      <input value={searchValue} onChange={handleSearchInputChanges} type='text' />
      <input onClick={callSearchFunction} type='submit' value='Search' />
    </form>
  )
}

export default Search