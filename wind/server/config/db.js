const mysql2 = require("mysql2");
const config = getDBConfig();
const poolPromise = mysql2.createPool(config).promise();

function getDBConfig() {
    return {
        host: "127.0.0.1",
        port: 3306,
        user: 'root',
        password: "123456",
        database: 'linor_wind',
        connectionLimit: 1, //创建一个连接池
    }
}

function query(sql, arr=[])
{
    return poolPromise.query(sql, arr);
};

module.exports = query;
