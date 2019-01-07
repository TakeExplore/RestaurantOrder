
$("#show_1").bind("click",function(){
    $("#login").css("display","none")
    $("#registered").css("display","block")
})

$("#show_2").bind("click",function(){
    $("#login").css("display","block")
    $("#registered").css("display","none")
})



$("#login .reserv-form input[name = 'login']").bind('click',function(){
    console.log(1);
    var user=$("#login .reserv-form .user input[name='user']").val()
    var password=$("#login .reserv-form .password input[name='password']").val()
    var url='http://localhost:3003/api/login'
    var data={'user':user,'password':password}
    // post请求
    $.ajax({
        type:'post',
        url:url,
        data:data,
        success:function(data){
            console.log(data);
            if (data.msg === 1) {
                alert("登录成功")
                window.location.href = 'index.html'
                document.cookie = `name = ${user}`
            }else{
                alert("用户名或者密码错误")
                window.location.href = 'login.html'
            }
            
        },
        error:function(err){
            console.log(err)
        }
    })
})

$("#registered .reserv-form input[name = 'registered']").bind('click',function(){
    console.log(1);
    var user=$("#registered .reserv-form .user input[name='user']").val()
    var password=$("#registered .reserv-form .password input[name='password']").val()
    var url='http://localhost:3003/api/registered'
    var data={'user':user,'password':password}
    // post请求
    $.ajax({
        type:'post',
        url:url,
        data:data,
        success:function(data){
            console.log(data);
            if (data.msg === 1) {
                alert("注册成功")
                window.location.href = 'login.html'
            }else{
                alert("有点小问题哦~重新注册一下吧")
                window.location.href = 'login.html'
            }
        },
        error:function(err){
            console.log(err)
        }
    })
})