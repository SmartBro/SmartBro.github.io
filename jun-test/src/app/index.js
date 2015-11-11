angular.module('app', [])
    .controller('DomainCtrl', DomainCtrl);

function DomainCtrl() {
    this.$inject = [];
    var vm = this;

    console.log('Hello from DomainCtrl!');
}