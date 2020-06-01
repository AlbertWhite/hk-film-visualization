1. Make a list (google sheet) of HK film from 1984 - 2019. Google Sheet
2. Export Google Sheet to Json file.
3. Use https://movie.douban.com/j/subject_suggest?q=互动杀人事件 to get ID. (Write a node project to add into json file)
4. Use https://api.douban.com/v2/movie/subject/1308381?apikey=0df993c66c0c636e29ecbb5344252a4a to write into json file for more information.

Google Sheet -> CSV -> JSON

### Techno

要么 Nodemon (or node-dev) + Babel Node。
要么 Typescript 就不要 babel 了。ts-node-dev (include ts-node） (autorestart)

With typescript, no need for babel support. Because typescript is a superset of javascript, es5 features have already been supported.

Use Cypress as web crawler

Not suitable to use typescript for d3 or nvd3.

fuck d3. d3 is going in the inverse way for development. why it devides into different lib ? why the doc is fucking difficult ?

### Helpful

[Basic node project setup](https://www.robinwieruch.de/minimal-node-js-babel-setup)
[Node with ts](https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d)
