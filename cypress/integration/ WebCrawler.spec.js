import { film1988 } from '../../data/nameByYear'

describe('get doubanId', () => {
  it('get doubanId', () => {
    film1988.forEach((name) => {
      cy.visit('https://search.douban.com/movie/subject_search?search_text=')
      cy.get('#inp-query').type(`${name} 1988`)
      cy.get('form').submit()
      cy.get('.title-text').first().click()
      cy.url().then((url) => {
        cy.writeFile(
          'data/nameAndIdByYear/1988.json',
          {
            name,
            doubanId: url.match(/\d+/g)[0],
          },
          { flag: 'a+' }
        )
      })
    })
  })
})
