const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    회사명: { type: String, required: true },
    제목: { type: String, required: true },
    링크: { type: String, required: true },
    지역: { type: String, required: true },
    경력: { type: String, required: true },
    학력: { type: String, required: true },
    고용형태: { type: String, required: true },
    마감일: { type: String, required: true },
    직무분야: { type: String, required: true },
    연봉정보: { type: String }
});

module.exports = mongoose.model('Job', JobSchema);
