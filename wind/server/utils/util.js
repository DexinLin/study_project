function time()
{
    return Math.floor(Date.now() / 1000);
}

function timeToday()
{
    return Math.floor(new Date().setHours(0, 0, 0, 0)/1000);
}