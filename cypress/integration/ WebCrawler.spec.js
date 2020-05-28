import { film1979 } from '../../data/nameByYear'

describe('get doubanId', () => {
  it('get doubanId', () => {
    cy.visit('https://www.google.com/webhp')
    cy.get('.gLFyf').type(`豆瓣`)

    film1979.forEach((name) => {
      cy.get('.gLFyf').clear().type(`${name} 豆瓣 1979{enter}`)
      cy.get('.r')
        .first()
        .find('a')
        .invoke('attr', 'href')
        .then((url) => {
          cy.writeFile(
            'data/nameAndIdByYear/1979.json',
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
