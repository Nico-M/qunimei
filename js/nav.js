 var clickOn = true;
 $('.menubar a').click(function () {
     var $menu = $(this)
     if (clickOn) {
         $menu.find('span').text('收起分类');
         $('.openmenu').attr('src', '../images/index/menuclose.gif');

         //                    $('#goodslist').css('display', 'block');
         $('#goodslist').fadeIn();
         clickOn = false;
         $('#goodslist').not('.menubar').find('a').hover(function () {
             $(this).css({
                 color: 'red',
                 textDecoration: 'underline'
             })
         }, function () {
             $(this).css({
                 color: '#000',
                 textDecoration: 'none'
             })
         })
     } else {
         clickOn = true;
         $menu.find('span').text('查看分类');
         $('.openmenu').attr('src', '../images/index/menu-icon.png');
         //                    $('#goodslist').css('display', 'none');
         $('#goodslist').fadeOut();
     }
     return false;
 })
 $('.category ul li').mouseenter(function () {
     $(this).parent().find('li').removeClass('cur');
     $(this).addClass('cur');

     var ele = '.selection' + ($(this).index() + 1);
     $(ele).siblings().not('.category').css('display', 'none');
     console.log(ele)
     $(ele).css('display', 'block');
 })