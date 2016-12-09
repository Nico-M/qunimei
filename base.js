var app = angular.module('nico', ['ionic']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        url: '/index'
        , templateUrl: 'templates/content.html'
        , controller: 'indexCtrl'
    }).state('neihan', {
        url: '/neihan'
        , templateUrl: "templates/neihan.html"
        , controller: 'neihanCtrl'
    }).state('detail', {
        url: '/detail/:id',
        params:{'id':null}
        , templateUrl: 'templates/detail.html'
        , controller: 'detailCtrl'
    }).state('crazy', {
        url: '/crazy'
        , templateUrl: 'templates/crazy.html'
        , controller: 'crazyCtrl'
    }).state('sister', {
        url: '/sister'
        , templateUrl: 'templates/sister.html'
        , controller: 'sisterCtrl'
    })
    $urlRouterProvider.when('', '/index');
})
app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

        var page = 0;
        // var count = 10;
        // function listResultProcess(data){
        //   return data
        // }
        var url = 'info.php';
        $scope.details = [];
        $scope.loadMore = function () {
            page++;
            $http({
                method: 'GET'
                , url: url, //这里callback有点问题
                params: {
                    page: page
                }
            }).success(function (data) {
                console.log('加载数据')
                $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
                console.log(data);
                //发送事件
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).error(function (state) {
                console.log('获取失败')
            });
            // $scope.loadMore();
        };
        //事件接收
        $scope.$on('stateChangeSuccess', function () {
            console.log('触发事件');
            $scope.loadMore();
        });
        //初始调用
        $scope.loadMore()
}])
    //内涵控制器
app.controller('neihanCtrl', function ($scope, $http) {
    var page = 0;
    $scope.load = function () {
        page++;
        var url = 'http://route.showapi.com/978-2?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&page=' + page + '&'
        $http.get(url).success(function (data) {
            $scope.datas = data.showapi_res_body.pagebean.contentlist;
            console.log($scope.datas)
        })
    };
    $scope.load();
});
//内涵详情页面
app.controller('detailCtrl', function ($scope, $state, $http) {
    var id = ($state.params.id);
    console.log(id)
    var url = 'http://route.showapi.com/978-1?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&id=/xe/' + id + '.shtml&';
    $http.get(url).success(function (data) {
        $scope.img = (data);
    })
});
//蛇精病控制器
app.controller('crazyCtrl', function ($scope, $http) {
        $scope.details = [];
        var page = 0;
        $scope.loadMore = function () {
            page++;
            var url = 'http://route.showapi.com/341-2?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&page=' + page + '&maxResult=20&';
            $http.get(url).success(function (data) {
                console.log(data);
                $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
                console.log(data);
                //发送事件
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).error(function (state) {
                console.log('获取失败')
            });
            // $scope.loadMore();
        };
        //事件接收
        $scope.$on('stateChangeSuccess', function () {
            console.log('触发事件');
            $scope.loadMore();
        });
        //初始调用
        $scope.loadMore()
    })
    //不得姐控制器

app.controller('sisterCtrl', function ($scope, $http,$ionicLoading) {
    $ionicLoading.show({
        template:'客观,稍等',
    })
    var url = 'http://route.showapi.com/255-1?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&type=&title=&page=&';
    $http.get(url).success(function (data) {
        $ionicLoading.hide();
        $scope.dataArr = (data.showapi_res_body.pagebean.contentlist);
        console.log($scope.dataArr)
    })
})
app.filter('formate', function () {
    return function (str) {
        var newstr = (str.split('').slice(5).join(''))
        return newstr;
    }
});
app.filter('getNumber', function () {
    return function (str) {
        return str.match(/(\d+)/g)[0]
    }
});
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])