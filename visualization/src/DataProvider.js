import React from 'react'

import data1979 from './data/1979.json'
import data1980 from './data/1980.json'
import data1981 from './data/1981.json'
import data1982 from './data/1982.json'
import data1983 from './data/1983.json'
import data1984 from './data/1984.json'
import data1985 from './data/1985.json'
import data1986 from './data/1986.json'
import data1987 from './data/1987.json'
import data1988 from './data/1988.json'
import data1989 from './data/1989.json'
import data1990 from './data/1990.json'
import data1991 from './data/1991.json'
import data1992 from './data/1992.json'
import data1993 from './data/1993.json'
import data1994 from './data/1994.json'
import data1995 from './data/1995.json'
import data1996 from './data/1996.json'
import data1997 from './data/1997.json'
import data1998 from './data/1998.json'
import data1999 from './data/1999.json'
import data2000 from './data/2000.json'
import data2001 from './data/2001.json'
import data2002 from './data/2002.json'

const sortByRate = (a, b) => b.rate - a.rate

const initialData = [
  data1979.sort(sortByRate),
  data1980.sort(sortByRate),
  data1981.sort(sortByRate),
  data1982.sort(sortByRate),
  data1983.sort(sortByRate),
  data1984.sort(sortByRate),
  data1985.sort(sortByRate),
  data1986.sort(sortByRate),
  data1987.sort(sortByRate),
  data1988.sort(sortByRate),
  data1989.sort(sortByRate),
  data1990.sort(sortByRate),
  data1991.sort(sortByRate),
  data1992.sort(sortByRate),
  data1993.sort(sortByRate),
  data1994.sort(sortByRate),
  data1995.sort(sortByRate),
  data1996.sort(sortByRate),
  data1997.sort(sortByRate),
  data1998.sort(sortByRate),
  data1999.sort(sortByRate),
  data2000.sort(sortByRate),
  data2001.sort(sortByRate),
  data2002.sort(sortByRate),
]

const DataContext = React.createContext(initialData)

export const DataContextProvider = (props) => {
  return (
    <DataContext.Provider value={initialData}>
      {props.children}
    </DataContext.Provider>
  )
}

export const withDataContext = (Component) => {
  return (props) => (
    <DataContext.Consumer>
      {(data) => <Component filmLists={data} {...props} />}
    </DataContext.Consumer>
  )
}
