# Hong kong films list from 1979 - 2002

[https://hkfilm.netlify.app/](https://hkfilm.netlify.app/)

## Tools

NodeJs, Cypress, React, Google Analytics

## How I build it

#### 1. List of movie names -> List of movie ids

The aim for the first step is to get id (imdb id, or doubanId). With id, we can acquire more information with IMDB API or Douban API. (Douban is the largest website for movie, book information in China).

The first step takes most of the time. I have known the idea [web crawler](https://en.wikipedia.org/wiki/Web_crawler) or [web scraping](https://en.wikipedia.org/wiki/Web_scraping) and I want to give it try. However, as a javascript developer, I am looking for a solution based on javascript.
[Cypress](https://www.cypress.io/) comes into my mind. It is a end to end test tool and it works like a human. What if it can extract the information and log it locally ? With `cy.writeFile()`, it can be easily done.

My final solution is to search in google with Cypress, and extract the id from the url.

```js
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
```

#### 2. List of movie ids -> List of movie info

How to query the same API 100 times and get an array of data ? `Promise.all()` helps with it.

```js
const results = await Promise.all(
  films.map(async (film: Film) => {
    if (film.doubanId !== '404') {
      const data = await getMovieInfo(film.doubanId)
      const json = await data.json()
      if (json.year !== YEAR) {
        wrongFilms.push(film)
      }
      return {
        name: film.name,
        year: json.year,
        id: film.doubanId,
        type: json.genres,
        rate: json.rating?.average,
        story: json.summary,
        director: json.directors?.map((director: any) => director.name),
        actor: json.casts?.map((cast: any) => cast.name),
      }
    }
    return {
      name: film.name,
      year: YEAR,
    }
  })
)
```

#### 3. List of movie info -> Visualization

I use React, because it's the fastest way for me to build a UI interface. I have also tried to improve the performance with `React.PureComponent.`

This website may attracts (or not) people from many regions because there are huge funs everywhere in the world ! So I add google analytics to track the region of visits.

Maybe the design of the website is kind of "awful", but it quites suit the subject I think. They are really old movies (40 ~ 20 years ago), but they are the best in my mind. It's the best period for the movie industry in Hong kong.

The website is in simplified Chinese because the data comes from douban.com, a Chinese website.

## How to visit

[https://hkfilm.netlify.app/](https://hkfilm.netlify.app/)
