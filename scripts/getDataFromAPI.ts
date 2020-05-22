// film id list-> film data list

import 'dotenv/config'
import fs from 'fs'
import { promisify } from 'util'
import fetch from 'node-fetch'

interface Film {
  name: string
  doubanId: string
}

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const getMovieInfo = (doubanID: string) =>
  fetch(
    `https://api.douban.com/v2/movie/subject/${doubanID}?apikey=${process.env.KEY}`
  )

;(async () => {
  let data = await readFile('./data.json', 'utf8')
  const films = JSON.parse(data)
  console.log(films)
  const results = await Promise.all(
    films.map(async (film: Film) => {
      const data = await getMovieInfo(film.doubanId)
      const json = await data.json()
      return {
        name: film.name,
        year: json.year,
        id: film.doubanId,
        type: json.genres,
        rate: json.reviews_count,
        story: json.summary,
        director: json.director,
        actor: json.cast,
      }
    })
  )
  console.log(results)
  writeFile('data/filmInfoByYear/1984.json', JSON.stringify(results))
})()
