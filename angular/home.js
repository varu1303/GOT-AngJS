angular
    .module('GOT',['route','apiService','viewOne','viewTwo'])
    .controller('mainCtrl',mainCtrl);


function mainCtrl () {
    var vm = this;
    vm.text = 'CLICK TO EXPLORE';
}