import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import get from 'lodash.get'
import { COLORS } from './constant'

const modalRoot = document.getElementById('portal')

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
  overflow-y: scroll;
  @media screen and (max-width: 992px) {
    left: 7%;
    top: 5%;
    width: 80%;
    overflow-y: scroll;
    height: 80%;
  }
`

const Cross = styled.div`
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: pointer;
`
const Name = styled.div`
  font-size: 25px;
  @media screen and (max-width: 992px) {
    margin-top: 25px;
  }
`

const Box = styled.div`
  margin: 10px 0;
`

const Link = styled.a`
  color: ${COLORS.YELLOW};
`

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export const FilmModal = ({ setShouldShowModal, filmOnModal }) => (
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
)

const AboutTitle = styled.h2`
  text-align: center;
`

export const AboutModal = ({ setShouldShowAboutModal }) => (
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
        <AboutTitle>致敬香港电影，打捞片海遗珠</AboutTitle>
      </Box>
      <p>
        该网站集结了1979年-2012年的香港电影名单，电影按照豆瓣评分排序。点击电影可以显示电影导演、演员、评分和豆瓣链接。
      </p>
      <p>
        为什么是1979年-2002年？
        因为1979年是香港电影新浪潮的开始，香港电影由此起飞。2002年合拍片浪潮兴起，香港电影开始走向下一阶段。
      </p>
      <p>
        本人酷爱香港电影，观看港影是我业余时间的最大爱好。希望这个网站也可以帮你找到心爱的电影。
      </p>
      <p>
        若名单有遗漏、修正，请
        <a target="_blank" href="mailto:albert.yuebai@gmail.com">
          联系
        </a>
        我。
      </p>
      <p>2020年6月11日</p>
    </StyledModal>
  </Modal>
)
