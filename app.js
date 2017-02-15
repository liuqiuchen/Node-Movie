// 入口文件
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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
app.use(bodyParser.urlencoded());

// index 主页
app.get('/', (req, res) => {
    Movie.fetch((err, movies) => {
        if(err) {
            console.log(err);
        }
        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        });
    });

    // index是index.jade文件
    /*res.render('index', {
        title: 'imooc 首页',
        movies: [
            {
                _id:'01',
                poster: '//gpic.qpic.cn/gbar_pic/2nSOicJXDnzJPtwmaReia9rK4EFA5Zs2KthSwsicbaZ6t6fTHOATUbJl4DeJRbziawUE/1000',
                title: '你的名字'
            },
            {
                _id:'02',
                poster: '//gpic.qpic.cn/gbar_pic/m4Q5ITkVHPuhuiaOEctVSbdOY8XNjqoaTGMXjsmUOur66SvQGcVTe3g/1000',
                title: '风夏'
            }
        ]
    });*/
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
            title: 'detail 详情页',
            movie: movie
        });
    });

    // res.render('detail', {
    //     title: 'detail 详情页',
    //     movies: [
    //         /*{
    //             flash: 'http://player.yinyuetai.com/video/player/2740090/v_0.swf',
    //             title: '你的名字',
    //             doctor: '新海诚',
    //             country: '日本',
    //             language: '日语',
    //             year: '2016年',
    //             summary: '连续好几天去影院看了5遍,想想都有点疯,画面好看,歌好听,剧情感动. 完美完美.打算还想去看一遍.台州还有人吗?'
    //         },*/
    //         {
    //             flash: 'http://player.yinyuetai.com/video/player/2769096/v_0.swf',
    //             title: '风夏',
    //             doctor: '濑尾公治',
    //             country: '日本',
    //             language: '日语',
    //             year: '2017年',
    //             summary: '刚搬到东京来和三个姐妹一起生活的榛名优，是个性格内向消极、整天拿著手机不放的高中生。' +
    //             '视手机如命的他因为种种意外而认识了个性活泼却有点古怪，而且居然没有手机的少女·秋月风夏。而另一方面，优在推特上与自己的儿时玩伴·当红歌手冰无小雪联系上了。小雪邀请优前来欣赏自己的演唱会，' +
    //             '但是优却早已跟风夏约好要出去了。两女一男的三角关系，就此开始。'
    //         }
    //     ]
    // });
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

// list 目录页
app.get('/list', (req, res) => {
    res.render('list', {title: 'list 目录页'});
});

console.log('Imooc started on port ' + port);