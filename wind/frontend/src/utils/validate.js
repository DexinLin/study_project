export function nameRule(rule, value, callback) {
    // 输入 4-10的昵称
    let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    if (value === '')
        callback(new Error('请输入用户名'));
    else if (!reg.test(value))
        callback(new Error('请输入4-10位用户名'))
    else
        callback();
}

export function passRule(rule, value, callback) {
    // 请输入6-12位密码，需要包含大小写和数字及特殊符号
    // let reg = /^\S*(?=\S{6,10})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    // 请输入6-12的密码
    let reg = /(^[a-zA-Z0-9]{6,12}$)/;
    if (value === '')
        callback(new Error('请输入密码'));
    else if (!reg.test(value))
        callback(new Error('请输入6-12位密码'))
        // callback(new Error('请输入6-12位密码，需要包含大小写和数字及特殊符号'))
    else
        callback();
}