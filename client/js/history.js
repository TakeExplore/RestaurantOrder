var json
var name = document.cookie.split(";")[0].split("=")[1]

async function getShopping(){
    await $.ajax({
        type:'post',
        data:{
            name:name
        },
        url:'http://localhost:3003/api/history',
        success:function(data){
            json = data
            console.log(data);
        },
        error:function(err){
            console.log(err)
        }
    })

    var shopping = document.getElementById("order")
    var shoppingInsert = ''
    for (var i = json.length - 1; i >= 0; i--) {
        if (json[i].state === '0') {
            shoppingInsert += `<div class="reviews-grid text-center">
                            <div class="reviews-people">
                                <img src="images/d${i+1}.jpg" title="name" />
                                <h3>${name}</h3>
                                <span>${json[i].orderid}</span>
                                <h4 style="text-decoration:line-through">$${json[i].be_money}</h4>
                                <h3>$${json[i].af_money}</h3>

                            </div>
                            <div class="reviews-comment">
                                <p><span>"</span>Morbi aliquet dignissim risus, a convallis mauris sagittis id. Cras nisl mauris, semper ac magna porta, imperdiet accumsan diam. Quisque hendrerit at elit ut convallis. Nulla eget vestibulum diam, semper rutrum nulla. In consectetur risus id placerat dictum. Mauris eu nunc ac orci vulputate pharetra.<span>"</span></p>
                                <label class="date-reviws"> ${json[i].ordertime}</label>
                            </div>
                            <div class="reviews-pagenation text-center"><ul><li><a onclick="pay()">支付</a></li></ul></div>
                        </div>`
        }else{
            shoppingInsert += `<div class="reviews-grid text-center">
                            <div class="reviews-people">
                                <img src="images/d${i+1}.jpg" title="name" />
                                <h3>${name}</h3>
                                <span>${json[i].orderid}</span>
                                <h4 style="text-decoration:line-through">$${json[i].be_money}</h4>
                                <h3>$${json[i].af_money}</h3>

                            </div>
                            <div class="reviews-comment">
                                <p><span>"</span>Morbi aliquet dignissim risus, a convallis mauris sagittis id. Cras nisl mauris, semper ac magna porta, imperdiet accumsan diam. Quisque hendrerit at elit ut convallis. Nulla eget vestibulum diam, semper rutrum nulla. In consectetur risus id placerat dictum. Mauris eu nunc ac orci vulputate pharetra.<span>"</span></p>
                                <label class="date-reviws"> ${json[i].ordertime}</label>
                            </div>
                        </div>`
        }
        
    }
    shopping.innerHTML = shoppingInsert
}

getShopping()

function pay(){
    console.log('clicksuccess')
    $.ajax({
        type:'post',
        data:{
            name:name
        },
        url:'http://localhost:3003/api/pay',
        success:function(data){
            json = data
            console.log(data)
            alert("支付成功~")
            window.location.href = 'order.html'
        },
        error:function(err){
            alert("请重新提交~")
            console.log(err)
        }
    })
}