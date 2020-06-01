import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import Filter from './Filter'
import Films from './Films'
import get from 'lodash.get'
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
  width: 96%;
  height: ${window.screen.height - 120}px;
  margin-left: 2%;
`

const StyledModal = styled.div`
  position: fixed;
  z-index: 999;
  display: flex;
  width: 50%;
  height: 50%;
  flex-direction: column;
  left: 20%;
  top: 20%;
  padding: 3%;
  background: black;
  border: 1px solid white;
  color: ${COLORS.YELLOW};
`

const Cross = styled.div`
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: pointer;
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

const Name = styled.div`
  font-size: 25px;
`

const Box = styled.div`
  margin: 10px 0;
`

const Link = styled.a`
  color: ${COLORS.YELLOW};
`

const App = ({ filmLists }) => {
  const [shouldShowModal, setShouldShowModal] = React.useState(false)
  const [filmOnModal, setFilmOnModal] = React.useState(null)

  const [filters, setFilters] = React.useState(FILTERS)

  return (
    <Container>
      <FixedContainer>
        <TitleContainer>
          <Title>香港电影名单1979-2002</Title>
          <SubTitle>按照豆瓣评分排序</SubTitle>
        </TitleContainer>
        <Filter filters={filters} setFilters={setFilters} />
      </FixedContainer>
      <Scrollable>
        <Films
          filters={filters}
          filmLists={filmLists}
          setShouldShowModal={setShouldShowModal}
          setFilmOnModal={setFilmOnModal}
        />
        {shouldShowModal && (
          <Modal>
            <StyledModal>
              <Cross
                onClick={() => {
                  setShouldShowModal(false)
                }}
              >
                关闭
              </Cross>
              <Name>
                {filmOnModal.name} ({filmOnModal.year})
              </Name>
              <Box>类型: {get(filmOnModal, 'type', '').toString()}</Box>
              <div>豆瓣评分: {get(filmOnModal, 'rate', '').toString()}</div>
              <Box>主演: {get(filmOnModal, 'actor', '').toString()}</Box>
              <div>故事简介: {get(filmOnModal, 'story', '').toString()}</div>
              <Box>
                <Link
                  href={`https://movie.douban.com/subject/${filmOnModal.id}`}
                  target="_blank"
                >
                  查看豆瓣页面
                </Link>
              </Box>
            </StyledModal>
          </Modal>
        )}
      </Scrollable>
    </Container>
  )
}
export default withDataContext(App)
