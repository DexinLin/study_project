var StudentService = require("../service/StudentService");

const StudentManager = {
    getStudents: async (req, res) =>
    {
      // const url = new URL(req.url, "http://localhost:3000");
      // const params = url.searchParams;
      const params = req.query;
      const data = await StudentService.getStudents(params);

      res.send({
        ok: 1,
        message: 'get student success',
        students: data
      })
    },
    getLatestStudent: async (req, res) =>
    {
      const data = await StudentService.getLatestStudent();

      res.send({
        message: 'get total student count',
        data,
      })
    },
    
    del: async (req, res) =>
    {
      const { id } = req.params;
      const data = await StudentService.delStudentById(id);

      if (data.affectedRows===1)
      {
        res.send({ ok: 1, data});
      }
      else
      {
        res.status(600).send({errCode: -1, errInfo: '删除数据出错'});
      }
    }
}

module.exports = StudentManager;