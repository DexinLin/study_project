var JWT = require("../utils/JWT");
var UserService = require("../service/UserService");

const UserManager = {
    login: async (req, res) =>
    {
        const data = await UserService.login(req.body);
        if (data.length)
        {
          const { id, name } = data[0];
          const token = JWT.generate({ id, name }, '1h');
          res.header("Authorization", token);
          res.send({
            id: id,
            username: name,
            ok: 1,
            message: 'login success'
          })
        }
        else
        {
          res.status(404).send({errCode: -1, errInfo: "用户不存在或密码错误"});
        }
    }
}

module.exports = UserManager;