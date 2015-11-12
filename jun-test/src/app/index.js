angular.module('app', [])
    .constant('$', jQuery)
    .controller('DomainCtrl', DomainCtrl);

DomainCtrl.$inject = ['$http', '$log', '$sce'];

function DomainCtrl($http, $log, $sce) {
    var vm = this;

    vm.checkInput = function(event) {
        if (event.keyCode === 13) {
            getInfo();
        }
    }

    function getInfo() {      
        $http.get('http://api.similarweb.com/site/' + vm.tempUrl + '/rankoverview?userkey=8124610b6f24fb784f676b65b1f0ac19')
            .success(showInfo)
            .error(showError);
    }

    function showInfo(domain) {
        $log.info('Domain Info:', domain);
        vm.url = vm.tempUrl;
        vm.clearUrl = $sce.trustAsResourceUrl('http://' + vm.url);
        vm.favicon = $sce.trustAsResourceUrl(domain.FavIcon);
        vm.title = domain.Title;
        vm.category = '#' + domain.Category;
        vm.globalRank = domain.GlobalRank;
        vm.countryRank = domain.CountryRank;
        vm.categoryRank = domain.CategoryRank;
        vm.similar = domain.SimilarSites;
    }

    function showError(error) {
        $log.error('Ooops! Error:', error);
    }
}