import React from 'react'
import styled from 'styled-components'
import get from 'lodash.get'

const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 140px;
  width: 3000px;
`

const Year = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 10px 0;
`

const FilmBar = styled.div`
  flex: 1;
  flex-direction: column;
  border-right: 1px solid #ffffff59;
  margin-right: 10px;
`

const Film = styled.div`
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Films = ({ filmLists, filters, setShouldShowModal, setFilmOnModal }) => (
  <FilmContainer>
    {filmLists.map((filmList, key) => (
      <FilmBar>
        <>
          <Year>{key + 1979}</Year>
          {filmList.map((film) => {
            const shouldShowFilm = get(film, 'type', []).some((filter) =>
              filters.includes(filter)
            )
            if (shouldShowFilm) {
              return (
                <Film
                  onClick={() => {
                    setShouldShowModal(true)
                    console.log(film)
                    setFilmOnModal(film)
                  }}
                >
                  {film.name}
                </Film>
              )
            }
            return null
          })}
        </>
      </FilmBar>
    ))}
  </FilmContainer>
)

const areEqual = (prevProps, nextProps) => {
  return prevProps.filters === nextProps.filters
}

export default React.memo(Films, areEqual)
