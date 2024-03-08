var express = require('express');
var UserManager = require('../manager/UserManager');
var StudentManager = require('../manager/StudentManager');
var TeacherManager = require('../manager/TeacherManager');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res) => UserManager.login(req, res));

router.get('/students', (req, res) => StudentManager.getStudents(req, res));
router.get('/students/latest', (req, res) => StudentManager.getLatestStudent(req, res));
router.delete('/student/del/:id', (req, res) => StudentManager.del(req, res));

router.get('/teachers', (req, res) => TeacherManager.getTeachers(req, res));
router.get('/teachers/latest', (req, res) => TeacherManager.getLatestTeacher(req, res));
router.post('/teachers/add', (req, res) => TeacherManager.add(req, res));
router.delete('/teachers/del/:id', (req, res) => TeacherManager.del(req, res));
router.post('/teachers/modify', (req, res) => TeacherManager.modify(req, res));
router.get('/teachers/get/:id', (req, res) => TeacherManager.get(req, res));

router.get('/charts/dataview', (req, res) => {
    res.send({
        "status": 200,
        "message": "获取数据成功",
        "data": {
            "legend": ["技术总监", "产品经理", "后端开发", "前端开发", "运维/测试"],
            "xAxis": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            "series": [
                {
                    "name": "技术总监",
                    "type": "line",
                    "stack": "总量",
                    "data": [80, 83, 84, 40, 44, 11, 12]
                },
                {
                    "name": "产品经理",
                    "type": "line",
                    "stack": "总量",
                    "data": [66, 34, 39, 42, 45, 20, 30]
                },
                {
                    "name": "后端开发",
                    "type": "line",
                    "stack": "总量",
                    "data": [66, 65, 59, 44, 33, 10, 20]
                },
                {
                    "name": "前端开发",
                    "type": "line",
                    "stack": "总量",
                    "data": [33, 33, 44, 55, 55, 11, 23]
                },
                {
                    "name": "运维/测试",
                    "type": "line",
                    "stack": "总量",
                    "data": [33, 55, 44, 66, 77, 11, 3]
                }
            ]
        }
    })
})
module.exports = router;
