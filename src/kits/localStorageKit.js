const key = 'buygCount';
export function getItem() {
    var gStr = localStorage.getItem(key);
    // console.log(gStr)
    var obj = JSON.parse(gStr);
    // console.log(obj)
    if (!obj) {
        localStorage.setItem(key, JSON.stringify('{}'));
        return {};
    }
    return obj;
}

//规定传入的参数goodsinfo为----{gid:102,bCount:1}
export function setItem(goodsinfo) {
    var goodsObj = getItem(); //goodsObj里面存的是什么？
    if (goodsObj[goodsinfo.gid]) {
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bCount;
    } else {
        goodsObj[goodsinfo.gid] = goodsinfo.bCount;
    }
    localStorage.setItem(key, JSON.stringify(goodsObj));
}

export function removeItem(goodsid) {
    var goodsObj = getItem();
    delete goodsObj[goodsid];
    // localStorage.removeItem(goodsid)  //可不可以这样删除呢？
    localStorage.setItem(key, JSON.stringify(goodsObj));
}