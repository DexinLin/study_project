var query = require("../config/db");

const StudentService = {
    getStudents: (params) =>
    {
        // console.log("params >>>>>", params);
        // const name = params.get('name');
        const { name } = params;
        let sql = `SELECT * FROM students WHERE 1=1`;

        if (name)
        {
            sql += ` AND name like '%${name}%'`
        }
        return query(sql).then(res => res[0] ? res[0] : res);
    },
    getLatestStudent: () =>
    {
        let sql = `SELECT * FROM students ORDER BY createTime DESC limit 1`;

        return query(sql).then(res => res[0] ? res[0] : res);
    },
    delStudentById: (id) =>
    {
        const sql = `DELETE FROM students WHERE id = ${id} `;
        return query(sql).then(res => res[0] ? res[0] : res);
    }
}

module.exports = StudentService;