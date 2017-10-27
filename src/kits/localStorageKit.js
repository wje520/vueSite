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
    var goodsObj = getItem();
    // console.log(goodsObj)  //{}
    if (goodsObj[goodsinfo.gid]) {
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bCount;
    } else {
        goodsObj[goodsinfo.gid] = goodsinfo.bCount;
    }
    // console.log(goodsObj)  //{88:1}
    localStorage.setItem(key, JSON.stringify(goodsObj));
}

export function removeItem(goodsid) {
    var goodsObj = getItem();
    delete goodsObj[goodsid];
    // localStorage.removeItem(goodsid)  //可不可以这样删除呢？
    localStorage.setItem(key, JSON.stringify(goodsObj));
}
//更新购买的某个商品的数量
export function updateItem(obj) {
    var goodsObj = getItem();
    goodsObj[obj.gid] = obj.bCount; //实现某个商品的数量的更新
    localStorage.setItem(key, JSON.stringify(goodsObj));

}