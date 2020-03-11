(function () {
    var $search = $('.search'),
        // $ul = $('ul', '.nav-list');
        $ul = $('ul');

    $search.on('input', function () {
        var value = $(this).val();
        // console.log(value);
        getData(value, 7);

    })
    function getData(value, num) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            data: 'q=' + value + '&count=' + num,
            dataType: 'jsonp',
            success: addItem
        })
    }
    function addItem(data) {
        var list = data.musics;
        var str = ''; 
        list.forEach(function (ele, index) {
            str += '<li><a href="https://www.douban.com/subject/' + ele.id + '/"><img src="' + ele.image + '"></li>';
        })
        $ul.html($(str));
    }
})()