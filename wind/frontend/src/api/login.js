import service from "../service";

export function login(data)
{
    return service({
        method: 'post',
        url: '/login',
        data
    });
}

export function getStudents(params)
{
    return service({
        method: 'get',
        url: '/students',
        params: params,
    })
}

export function getLatestStudent()
{
    return service({
        method: 'get',
        url: '/students/latest',
    })
}

export function delStudent(id)
{
    return service({
        method: 'delete',
        url: `/student/del/${id}`
    })
}

export function getTeachers(params)
{
    return service({
        method: 'get',
        url: '/teachers',
        params: params,
    })
}

export function getLatestTeacher()
{
    return service({
        method: 'get',
        url: '/teachers/latest',
    })
}

export function delTeacher(id)
{
    return service({
        method: 'delete',
        url: `/teachers/del/${id}`
    })
}
export function addTeacher(data)
{
    // let info = qs.stringify(data);

    return service({
        method: 'post',
        url: `/teachers/add`,
        data
    })
}
export function getTeacher(id)
{
    return service({
        method: 'get',
        url: `/teachers/get/${id}`,
    })
}
export function modifyTeacher(data)
{
    return service({
        method: 'post',
        url: `/teachers/modify`,
        data,
    })
}

export function getChart()
{
    return service({
        method: 'get',
        url: '/charts/dataview'
    })
}


// ('202401009',"白1",'20','1','9','2','1',"四川省 眉山市",'18350292214'),
// ('202401010',"白2",'20','1','10','2','1',"四川省 眉山市",'18350292215'),
// ('202401011',"白3",'20','1','11','2','1',"四川省 眉山市",'18350292216'),
// ('202401012',"白4",'20','1','12','2','1',"四川省 眉山市",'18350292217'),
// ('202401013',"白5",'20','1','13','2','1',"四川省 眉山市",'18350292218'),
// ('202401014',"白6",'20','1','14','1','1',"四川省 眉山市",'18350292219'),
// ('202401015',"白7",'20','2','15','1','1',"四川省 眉山市",'18350292220'),
// ('202401016',"白8",'20','2','16','1','1',"福建省 泉州市",'18350292221'),
// ('202401017',"白9",'20','2','17','1','1',"福建省 泉州市",'18350292222'),
// ('202401018',"白10",'20','2','18','1','1',"福建省 泉州市",'18350292223'),
// ('202401019',"白11",'20','2','19','1','1',"福建省 泉州市",'18350292224'),
// ('202401020',"白12",'20','2','20','1','1',"福建省 泉州市",'18350292225'),
// ('202401021',"白13",'20','2','21','1','1',"福建省 泉州市",'18350292226'),
// ('202401022',"白14",'20','2','22','1','1',"福建省 泉州市",'18350292227'),
// ('202401023',"白15",'20','2','23','1','1',"福建省 泉州市",'18350292228'),
// ('202401024',"白16",'20','2','24','1','1',"福建省 泉州市",'18350292229'),
// ('202401025',"白17",'20','2','25','1','1',"福建省 泉州市",'18350292230'),
// ('202401026',"白18",'20','2','26','1','1',"福建省 泉州市",'18350292231'),
// ('202401027',"白19",'20','2','27','1','1',"福建省 泉州市",'18350292232'),
// ('202401028',"白20",'20','2','28','1','1',"福建省 泉州市",'18350292233'),
// ('202401029',"白21",'20','2','29','1','1',"福建省 泉州市",'18350292234'),
// ('202401030',"白22",'20','2','30','1','1',"福建省 泉州市",'18350292235'),
// ('202401031',"白23",'20','2','31','1','1',"福建省 泉州市",'18350292236'),
// ('202401032',"白24",'20','2','32','1','1',"福建省 泉州市",'18350292237'),
// ('202401033',"白25",'20','2','33','1','1',"福建省 泉州市",'18350292238'),
// ('202401034',"白26",'20','2','34','1','1',"福建省 泉州市",'18350292239'),
// ('202401035',"白27",'20','2','35','1','1',"福建省 厦门市",'18350292240'),
// ('202401036',"白28",'20','2','36','2','1',"福建省 厦门市",'18350292241'),
// ('202401037',"白29",'20','2','37','2','1',"福建省 厦门市",'18350292242'),
// ('202401038',"白30",'20','2','38','2','1',"福建省 厦门市",'18350292243'),
// ('202401039',"白31",'20','2','39','2','1',"福建省 厦门市",'18350292244'),
// ('202401040',"白32",'20','2','40','2','1',"福建省 厦门市",'18350292245'),
// ('202401041',"白33",'20','1','41','2','1',"福建省 厦门市",'18350292246'),
// ('202401042',"白34",'20','1','42','2','1',"福建省 厦门市",'18350292247'),
// ('202401043',"白35",'20','1','43','2','1',"福建省 漳州市",'18350292248'),
// ('202401044',"白36",'20','1','44','2','1',"福建省 漳州市",'18350292249'),
// ('202401045',"白37",'20','1','45','2','1',"福建省 漳州市",'18350292250'),
// ('202401046',"白38",'20','1','46','2','1',"福建省 漳州市",'18350292251'),
// ('202401047',"白39",'20','1','47','2','1',"福建省 漳州市",'18350292252'),
// ('202401048',"白40",'20','1','48','2','1',"福建省 漳州市",'18350292253'),
// ('202401049',"白41",'20','1','49','2','1',"福建省 漳州市",'18350292254'),
// ('202401050',"白42",'20','1','50','2','1',"福建省 漳州市",'18350292255'),
// ('202401051',"白43",'20','1','51','2','1',"福建省 漳州市",'18350292256'),
// ('202401052',"白44",'20','1','52','2','1',"福建省 漳州市",'18350292257'),
// ('202401053',"白45",'20','1','53','2','1',"福建省 漳州市",'18350292258');