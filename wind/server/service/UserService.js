var query = require("../config/db");

const UserService = {
    login: (data) =>
    {
        const { username, password } = data;
        const sql = `SELECT * FROM users WHERE name="${username}" AND password="${password}"`;

        return query(sql).then(res => res[0] ? res[0] : res);
    }
}

module.exports = UserService;