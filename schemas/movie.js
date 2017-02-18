const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 每次在存储数据之前都会调用这个方法
MovieSchema.pre('save', (next) => {
    /*if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }*/
    next();
});

MovieSchema.statics = {
    // 取出数据库里所有的数据，cb是回调方法
    fetch (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    // 查询单条的数据
    findById (id, cb) {
        return this
            .findOne({_id: id})
            .sort('meta.updateAt')
            .exec(cb);
    }
};

module.exports = MovieSchema;














