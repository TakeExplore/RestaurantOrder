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
    var owl_demoInsert = ''
    var RiceInsert = ''
    for (var i = json.length - 1; i >= 0; i--) {
        if (json[i].foodtype === "炒饭系列") {
            owl_demoInsert += `<div class="item"><div class="item-grid"><div class="item-pic"><img src="images/d1.jpg" title="dish-name" /></div><div class="item-info"><div class="item-info-left"><h4>${json[i].foodname}</h4><span class="item-rate"> </span></div><div class="item-info-right"><label>${json[i].price}</label></div><div class="clearfix"> </div></div></div></div>`
            RiceInsert += `<div class="col-md-6 menus-left-grid menus-left"><div class="item"><h3>${json[i].foodname}</h3><span>${json[i].foodid}</span></div><div class="item-setion" style="display:inline"><div class="item-line"><span> </span></div></div><div class="item-price"><label>￥${json[i].price}</label></div></div>`
        }
    }
    // console.log(owl_demoInsert)
    // owl_demo.innerHTML = owl_demoInsert
    rice.innerHTML = RiceInsert
}

InsertMenu();