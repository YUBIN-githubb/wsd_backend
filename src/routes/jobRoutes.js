const express = require('express');
const { getAllJobs, addJob } = require('../controllers/jobController');
const router = express.Router();

// 모든 채용 공고 조회
router.get('/', getAllJobs);

// 채용 공고 추가
router.post('/', addJob);

module.exports = router;
