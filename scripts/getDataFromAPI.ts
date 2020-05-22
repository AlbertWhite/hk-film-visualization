import 'dotenv/config'
import fs from 'fs'
import { promisify } from 'util'
import fetch from 'node-fetch'

interface Film {
  year: string
  name: string
  director: string
  actors: string
  date: string
}

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const getMovieId = (movieName: string) =>
  fetch(
    encodeURI(`https://movie.douban.com/j/subject_suggest?q=${movieName}%27,`)
  )
const getMovieInfo = (doubanID: string) =>
  `https://api.douban.com/v2/movie/subject/?apikey=${doubanID}${process.env.KEY}`

;(async () => {
  let data = await readFile('./test.json', 'utf8')
  const films = JSON.parse(data)

  console.log(films)
  const results = await Promise.all(
    films.map(async (film: Film) => {
      console.log(`https://movie.douban.com/j/subject_suggest?q=${film.name}`)
      console.log('1')
      console.log(film)
      const data = await getMovieId(film.name)
      console.log('2')
      console.log(data)
      const json = await data.json()
      console.log('3')
      console.log(json)
      // data = data.find((d: any) => d.year === film.year)
      return json
    })
  )
  console.log(results)
})()
