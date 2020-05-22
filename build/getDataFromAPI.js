"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var getDoubanSearchApi = function (movieName) {
    return "https://movie.douban.com/j/subject_suggest?q=" + movieName;
};
var getDoubanMovieApi = function (doubanID) {
    return "https://api.douban.com/v2/movie/subject/?apikey=" + doubanID + process.env.KEY;
};
console.warn('hello world2');
