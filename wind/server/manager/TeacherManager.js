var TeacherService = require("../service/TeacherService");

const TeacherManager = {
    getTeachers: async (req, res) =>
    {
      const params = req.query;
      const data = await TeacherService.getTeachers(params);

      res.send({
        ok: 1,
        message: 'get student success',
        teachers: data
      })
    },
    getLatestTeacher: async (req, res) =>
    {
      const data = await TeacherService.getLatestTeacher();

      res.send({
        message: 'get total student count',
        id: data[0]?.id,
      })
    },
    
    del: async (req, res) =>
    {
      const { id } = req.params;
      const data = await TeacherService.delTeacherById(id);

      if (data.affectedRows===1)
      {
        res.send({ ok: 1, data});
      }
      else
      {
        res.status(600).send({errCode: -1, errInfo: '删除数据出错'});
      }
    },

    add: async (req, res) =>
    {
      const data = await TeacherService.addTeacher(req.body);

      res.send({ 
        ok : 1,
        message: 'add teacher success',
        data
      });
    },

    modify: async (req, res) =>
    {
      const data = await TeacherService.modifyTeacher(req.body);
      
      res.send({ 
        ok : 1,
        message: 'modify teacher success',
        data
      });
    },

    get: async (req, res) =>
    {
      const { id } = req.params;
      console.log("get teacher >>>>", id);
      const data = await TeacherService.getTeacherById(id);

      res.send({
        ok: 1,
        message: 'get teacher success',
        data
      });
    }
}

module.exports = TeacherManager;