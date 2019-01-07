var json

async function InsertMenu(){
    await $.ajax({
        type:'get',
        url:'http://localhost:3003/api/menu',
        success:function(data){
            json = JSON.parse(data)
            console.log(json);
        },
        error:function(err){
            console.log(err)
        }
    })
    var owl_demo = document.getElementById("owl-demo")
    var rice = document.getElementById("rice")
    var greens = document.getElementById("greens")
    var iron = document.getElementById("iron")
    var vegetables = document.getElementById("vegetables")
    var steaming = document.getElementById("steaming")
    var soup = document.getElementById("soup")
    var water = document.getElementById("water")
    var owl_demoInsert = ''
    var RiceInsert = ''
    var greensInsert = ''
    var ironInsert = ''
    var vegetablesInsert = ''
    var steamingInsert = ''
    var soupInsert = ''
    var waterInsert = ''
    for (var i = json.length - 1; i >= 0; i--) {
        if (json[i].foodtype === "炒饭系列") {
            owl_demoInsert += `<div class="owl-item"><div class="item-grid"><div class="item-pic"><img src="images/d1.jpg" title="dish-name" /></div><div class="item-info"><div class="item-info-left"><h4>${json[i].foodname}</h4><span class="item-rate"> </span></div><div class="item-info-right"><label>${json[i].price}</label></div><div class="clearfix"> </div></div></div></div>`
            RiceInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onclick="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "小炒菜系列") {
            greensInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "铁板系列") {
            ironInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "青菜系列") {
            vegetablesInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "清蒸系列") {
            steamingInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "靓汤") {
            soupInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
        if (json[i].foodtype === "酒水系列") {
            waterInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><select onchange="OrderMenu(value)"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="item-price"><label class="price">￥${json[i].price}</label></div></div>`
        }
    }
    owl_demo.innerHTML = owl_demoInsert
    rice.innerHTML = RiceInsert
    greens.innerHTML = greensInsert
    iron.innerHTML = ironInsert
    vegetables.innerHTML = vegetablesInsert
    steaming.innerHTML = steamingInsert
    soup.innerHTML = soupInsert
    water.innerHTML = waterInsert
}

InsertMenu()

function OrderMenu(value){
    var name = document.cookie.split(";")[0].split("=")[1]
    console.log(document.cookie.split(";")[0].split("=")[1])
    console.log(value)
    var num = value
    var price = event.target.parentNode.nextSibling.childNodes[0].innerText.slice(1)
    console.log(price)
    var foodname = event.target.parentNode.previousSibling.childNodes[0].innerText
    var foodid = event.target.parentNode.previousSibling.childNodes[1].innerText
    console.log(foodname)
    console.log(foodid)
    if (name === undefined) {
        alert("请先登录！")
        window.location.href = 'login.html'
    }else{
        getFood(name,num,price,foodname,foodid)
    }
}

function getFood(name,num,price,foodname,foodid){
    $.ajax({
        type:'post',
        url:'http://localhost:3003/api/order',
        data:{
            name:name,
            foodid:foodid,
            foodname:foodname,
            num:num,
            price:price
        },
        success:function(data){
            console.log(data);
        },
        error:function(err){
            console.log(err)
        }
    })
}