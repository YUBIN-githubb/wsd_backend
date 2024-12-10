const fs = require('fs');
const csvParser = require('csv-parser');
const Job = require('../models/Job');

// CSV 데이터를 MongoDB에 삽입하는 함수
const importCsvToMongo = async (filePath) => {
    try {
        const jobs = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                jobs.push({
                    회사명: row['회사명'],
                    제목: row['제목'],
                    링크: row['링크'],
                    지역: row['지역'],
                    경력: row['경력'],
                    학력: row['학력'],
                    고용형태: row['고용형태'],
                    마감일: row['마감일'],
                    직무분야: row['직무분야'],
                    연봉정보: row['연봉정보'] || null, // 연봉정보가 없을 경우 null 처리
                });
            })
            .on('end', async () => {
                console.log('CSV parsing complete. Inserting into MongoDB...');
                await Job.insertMany(jobs);
                console.log('Data successfully inserted into MongoDB');
            });
    } catch (error) {
        console.error('Error importing data:', error);
    }
};

// 모든 채용 공고 조회
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            status: 'success',
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 채용 공고 추가
const addJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ status: 'success', data: newJob });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    importCsvToMongo,
    getAllJobs,
    addJob,
};
