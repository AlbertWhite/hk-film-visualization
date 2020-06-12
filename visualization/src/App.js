import React from 'react'
import styled from 'styled-components'
import { FilmModal, AboutModal } from './Modal'
import Filter from './Filter'
import Films from './Films'
import { FILTERS, COLORS } from './constant'
import { withDataContext } from './DataProvider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: ${COLORS.YELLOW};
`

const FixedContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: black;
`

const Scrollable = styled.div`
  overflow: scroll;
  height: ${window.screen.height - 180}px;
  width: 90%;
  margin: auto;
  scroll-behavior: smooth;

  @media screen and (max-width: 992px) {
    height: ${window.screen.height - 80}px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`

const Title = styled.div`
  font-size: 30px;
`

const SubTitle = styled.div`
  font-size: 20px;
`

const About = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;

  @media screen and (max-width: 992px) {
    right: auto;
    top: auto;
    bottom: 20px;
    right: 20px;
  }
`

const ScrollerLeft = styled.div`
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  padding-left: 30px;
  margin-top: 10%;
  @media screen and (max-width: 992px) {
    margin-top: 25%;
    padding-left: 10px;
  }
`

const ScrollerRight = styled.div`
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid white;
  padding-right: 30px;
  margin-top: 10%;
  @media screen and (max-width: 992px) {
    margin-top: 25%;
    padding-right: 10px;
  }
`

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const App = ({ filmLists }) => {
  const [filmOnModal, setFilmOnModal] = React.useState(null)
  const [shouldShowModal, setShouldShowModal] = React.useState(false)
  const [shouldShowAboutModal, setShouldShowAboutModal] = React.useState(false)
  const filmsContainer = React.useRef(null)
  const [filters, setFilters] = React.useState(['喜剧'])

  return (
    <Container>
      <FixedContainer>
        <TitleContainer>
          <Title>香港电影名单1979-2002</Title>
          <SubTitle>按照豆瓣评分排序</SubTitle>
        </TitleContainer>
        <Filter filters={filters} setFilters={setFilters} />
        <ScrollContainer></ScrollContainer>
      </FixedContainer>

      <ContentContainer>
        <ScrollerLeft
          onClick={() => {
            filmsContainer.current.scrollLeft -= 500
          }}
        />
        <Scrollable ref={filmsContainer}>
          <Films
            filters={filters}
            filmLists={filmLists}
            setShouldShowModal={setShouldShowModal}
            setFilmOnModal={setFilmOnModal}
          />
        </Scrollable>
        <ScrollerRight
          onClick={() => {
            filmsContainer.current.scrollLeft += 500
          }}
        />
      </ContentContainer>
      {shouldShowAboutModal && (
        <AboutModal setShouldShowAboutModal={setShouldShowAboutModal} />
      )}
      {shouldShowModal && (
        <FilmModal
          setShouldShowModal={setShouldShowModal}
          filmOnModal={filmOnModal}
        />
      )}
      <About
        onClick={() => {
          setShouldShowAboutModal(true)
        }}
      >
        关于本站
      </About>
    </Container>
  )
}
export default withDataContext(App)
