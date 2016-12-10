function updateEndTime() {
    var date = new Date();
    var time = date.getTime(); //当前时间距1970年1月1日之间的毫秒数

    $(".settime").each(function (i) {

        var endDate = this.getAttribute("endTime"); //结束时间字符串
        //转换为时间日期类型
        var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) {
            return parseInt(a, 10) - 1;
        }).match(/\d+/g) + ')');

        var endTime = endDate1.getTime(); //结束时间毫秒数

        var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
        if (lag > 0) {
            var second = Math.floor(lag % 60);
            var minite = Math.floor((lag / 60) % 60);
            var hour = Math.floor((lag / 3600) % 24); //小时
            //Math.floor((lag / 3600)); 
            var day = Math.floor((lag / 3600) / 24);
            second = second >= 10 ? second : '0' + second;
            minite = minite >= 10 ? minite : '0' + minite;
            day = day >= 10 ? day : '0' + day;
            hour = hour >= 10 ? hour : '0' + hour;
            $(this).html("" + day + "天" + hour + ":" + minite + ":" + second);
        } else {
            $(this).removeClass("settime");
            //alert($(this).attr("id"));
            $(this).html("抢购已经结束啦！");
        }
    });
    setTimeout("updateEndTime()", 1000);
}