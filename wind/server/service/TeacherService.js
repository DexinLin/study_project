var query = require("../config/db");

const TeacherService = {
    getTeachers: (params) =>
    {
        // console.log("params >>>>>", params);
        // const name = params.get('name');
        const { name } = params;
        let sql = `SELECT * FROM teachers WHERE 1=1`;

        if (name)
        {
            sql += ` AND name like '%${name}%'`
        }
        return query(sql).then(res => res[0] ? res[0] : res);
    },
    getLatestTeacher: () =>
    {
        let sql = `SELECT * FROM teachers ORDER BY id DESC limit 1`;

        return query(sql).then(res => res[0] ? res[0] : res);
    },
    delTeacherById: (id) =>
    {
        const sql = `DELETE FROM teachers WHERE id = ${id} `;
        return query(sql).then(res => res[0] ? res[0] : res);
    },
    getTeacherById: (id) =>
    {
        const sql = `SELECT * FROM teachers WHERE id = ${id} `;
        return query(sql).then(res => res[0] ? res[0] : res);
    },
    addTeacher: (data) =>
    {
        const { id, name, gender, age, address, phone, workTime } = data;
        const sql = "INSERT INTO teachers (`id`, `name`, `gender`, `age`, `address`, `phone`, `workTime`)" +
            `VALUES ('${id}','${name}', '${gender}', '${age}', '${address}', '${phone}', '${workTime}');`

        return query(sql).then(res => res[0] ? res[0] : res);
    },
    modifyTeacher: (data) =>
    {
        const { id, name, gender, age, address, phone } = data;

        let sql = "UPDATE teachers SET `name`="+`'${name}'`+",`gender`="+`'${gender}'`+",`age`="+`'${age}'` +",`address`="+`'${address}'` +",`phone`="+`'${phone}'`+"WHERE (`id` = "+`'${id}')`;
        console.log("modify sql .>>", sql);
        return query(sql).then(res => res[0] ? res[0] : res);
    }
}

module.exports = TeacherService;