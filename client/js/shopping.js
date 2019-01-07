var json
var name = document.cookie.split(";")[0].split("=")[1]

async function getShopping(){
    await $.ajax({
        type:'post',
        data:{
            name:name
        },
        url:'http://localhost:3003/api/form',
        success:function(data){
            json = data
            console.log(data);
        },
        error:function(err){
            console.log(err)
        }
    })


    var shopping = document.getElementById("shopping")
    var shoppingInsert = ''
    if (json.length === 0) {
        shoppingInsert += `<div class="recent-news-grid"><p>您还没有点餐哦~</p></div>`
        $("#shoppingBtn").css("display","none")
    }
    for (var i = json.length - 1; i >= 0; i--) {
        shoppingInsert += `<div class="recent-news-grid">
                            <div class="recent-news-grid-left">
                                <a href="#"><img src="images/d3.jpg" title="name" /></a>
                            </div>
                            <div class="recent-news-grid-right">
                                <h3>${json[i].foodname}</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquam at lectus sed imperdiet.Cras hendrerit lectus non enim vulputate, eget ornare lectus tincidunt. Quisque at est cursus lectus aliquet sagittis sed id lacus. Vivamus eu adipiscing enim</p>
                                <p>${json[i].foodid}</p>
                                <p>数量：${json[i].num}</p>
                                <p>价格：${json[i].price}</p>
                            </div>
                            <div class="clearfix"> </div>
                        </div>`
    }
    shopping.innerHTML = shoppingInsert
}

getShopping()

function getPrice(){
    console.log('clicksuccess')
    $.ajax({
        type:'post',
        data:{
            name:name
        },
        url:'http://localhost:3003/api/price',
        success:function(data){
            json = data
            console.log(data)
            alert("提交成功~")
            window.location.href = 'order.html'
        },
        error:function(err){
            alert("重新提交~")
            console.log(err)
        }
    })
}
    
