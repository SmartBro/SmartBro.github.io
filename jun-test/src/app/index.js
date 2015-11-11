angular.module('app', [])
    .constant('$', jQuery)
    .controller('DomainCtrl', DomainCtrl);

DomainCtrl.$inject = ['$http', '$sce'];

function DomainCtrl($http, $sce) {
    var vm = this;

    vm.url = 'w3schools.com';

    $http.get('http://api.similarweb.com/site/' + vm.url + '/rankoverview?userkey=8124610b6f24fb784f676b65b1f0ac19')
        .success(showInfo)
        .error(showError);

    function showInfo(domain) {
        vm.clearUrl = $sce.trustAsResourceUrl('http://' + vm.url);
        vm.favicon = $sce.trustAsResourceUrl(domain.FavIcon);
        vm.title = domain.Title;
        vm.category = '#' + domain.Category;
        vm.globalRank = domain.GlobalRank;
        vm.countryRank = domain.CountryRank;
        vm.categoryRank = domain.CategoryRank;
        vm.similar = domain.SimilarSites;
        console.log('info:', domain);
    }

    function showError(error) {
        console.error('Ooops! Error:', error);
    }

    console.log('Hello from DomainCtrl!');
}