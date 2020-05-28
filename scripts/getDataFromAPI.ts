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
const YEAR = '1979'

const getMovieInfo = (doubanID: string) =>
  fetch(
    `https://api.douban.com/v2/movie/subject/${doubanID}?apikey=${process.env.KEY}`
  )

;(async () => {
  let data = await readFile(`./data/nameAndIdByYear/${YEAR}.json`, 'utf8')
  const films = JSON.parse(data)

  const wrongFilms: Film[] = []
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
  //console.log(results)
  writeFile(`data/filmInfoByYear/${YEAR}.json`, JSON.stringify(results))
  console.log('write file success')
  console.log('wrong films')
  console.log(wrongFilms)
})()
