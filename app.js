// 入口文件
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const _ = require('underscore');
const Movie = require('./models/movie');
const serveStatic = require('serve-static');
// 用于将表单中的数据格式化
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/imooc');

let app = express();
let port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.set('views', './views/pages');
app.set('port', 3000);
app.listen(port);

app.use(serveStatic(path.join(__dirname, 'bower_components')));

// 解析表单数据，可以用req.body.movie访问数据
app.use(bodyParser.urlencoded({extended: true}));
// 解析json
app.use(bodyParser.json());

// index 主页
app.get('/', (req, res) => {
    Movie.fetch((err, movies) => {
        if(err) {
            console.log(err);
        }
        res.render('index', {
            title: 'Movie 首页',
            movies: movies
        });
    });
});
// 也是index主页
app.get('/index', (req, res) => {
    Movie.fetch((err, movies) => {
        if(err) {
            console.log(err);
        }
        res.render('index', {
            title: 'Movie 首页',
            movies: movies
        });
    });
});

// detail 详情页
app.get('/movie/:id', (req, res) => {
    // 拿到url上的那个id参数值
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        if(err) {
            console.log(err);
        }
        res.render('detail', {
            title: '详情页 - ' + movie.title,
            movie: movie
        });
    });
});

// admin 后台录入页
app.get('/admin/movie', (req, res) => {
    res.render('admin', {
        title: 'admin 后台录入页',
        movie: {
            _id: '',
            title: '',
            doctor: '',
            country: '',
            language: '',
            poster: '',
            flash: '',
            year: '',
            summary: ''
        }
    });
});

// admin post movie
app.post('/admin/movie/new', (req, res) => {
    let movieObj = req.body.movie;

    let _movie = new Movie({
        doctor: movieObj.doctor,
        title: movieObj.title,
        country: movieObj.country,
        language: movieObj.language,
        year: movieObj.year,
        poster: movieObj.poster,
        summary: movieObj.summary,
        flash: movieObj.flash
    });

    _movie.save((err, movie) => {
        if(err) {
            console.log(err);
        } else {
            console.log(movie);
        }

        res.redirect('/movie/' + movie._id);
    });

});

// list 目录页
app.get('/list', (req, res) => {
    res.render('list', {title: 'list 目录页'});
});

console.log('Imooc started on port ' + port);