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
  height: auto;
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

const About = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;
`

const App = ({ filmLists }) => {
  const [filmOnModal, setFilmOnModal] = React.useState(null)
  const [shouldShowModal, setShouldShowModal] = React.useState(false)
  const [shouldShowAboutModal, setShouldShowAboutModal] = React.useState(false)

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
      <About
        onClick={() => {
          setShouldShowAboutModal(true)
        }}
      >
        关于本站
      </About>
      {shouldShowAboutModal && (
        <Modal>
          <StyledModal>
            <Cross
              onClick={() => {
                setShouldShowAboutModal(false)
              }}
            >
              关闭
            </Cross>
            <Box>
              <b>1. 这个网站怎么用？</b>
            </Box>
            <p>
              电影按照豆瓣评分排序。点击Filter筛选电影类型。点击电影显示详情。
            </p>
            <Box>
              <b>2. 数据来源是什么？</b>
            </Box>
            <p>通过Cypress按照片名获得豆瓣ID。通过豆瓣API获得数据。</p>
            <Box>
              <b>3. 为什么设计这么丑？</b>
            </Box>
            <p>
              <del>我不是设计师</del>。丑的设计永不落伍。
            </p>
            <Box>
              <b>4. 为什么是1979-2002？</b>
            </Box>
            <p>
              1979年是香港电影新浪潮的开始。2002年是合拍片浪潮的开始，
              <del>一个时代的结束</del>。
            </p>
            <Box>
              <b>5. 为什么要做这个网站？</b>
            </Box>
            <p>致敬香港电影，打捞片海遗珠。</p>
          </StyledModal>
        </Modal>
      )}
    </Container>
  )
}
export default withDataContext(App)
