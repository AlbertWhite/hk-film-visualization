import React from 'react'
import styled from 'styled-components'

import { FILTERS } from './constant'

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 992px) {
    width: 90%;
    overflow-x: scroll;
    justify-content: inherit;
    margin-left: 2%;
  }
`

const FilterContainer = styled.div`
  margin-left: 5px;
`

export default ({ filters, setFilters }) => {
  return (
    <FiltersContainer>
      <>
        <FilterContainer>
          <input
            type="checkbox"
            id="全选"
            name="全选"
            checked={filters.length === FILTERS.length}
            onChange={() => {
              filters.length === FILTERS.length
                ? setFilters([])
                : setFilters(FILTERS)
            }}
          />
          <label for="全选">全选</label>
        </FilterContainer>
        {FILTERS.map((filter) => {
          const isChecked = filters.includes(filter)
          return (
            <FilterContainer>
              <input
                type="checkbox"
                id={filter}
                name={filter}
                checked={isChecked}
                onChange={() => {
                  let newFilters = filters.includes(filter)
                    ? filters.filter((a) => a !== filter)
                    : filters.concat([filter])
                  setFilters(newFilters)
                }}
              />
              <label htmlFor={filter}>{filter}</label>
            </FilterContainer>
          )
        })}
      </>
    </FiltersContainer>
  )
}
