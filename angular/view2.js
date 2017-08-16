angular
    .module('viewTwo',[])
    .controller('v2Ctrl',v2Ctrl)
    .directive('bookDetail',bookDetail)
    .directive('charDetail',charDetail)
    .directive('houseDetail',houseDetail);


function v2Ctrl ($routeParams,getData) {
    var vm = this;
    var type, id;

    vm.t = $routeParams.t;
    
    if($routeParams.t == 'C'){
      type = 'characters';
      vm.sfor = 'DETAILS OF CLICKED ON CHARACTER';
    }
    else if($routeParams.t == 'B'){
      type = 'books';
      vm.sfor = 'DETAILS OF CLICKED ON BOOK';
    }
    else if($routeParams.t == 'H'){
      type = 'houses';
      vm.sfor = 'DETAILS OF CLICKED ON HOUSE';
    }
    
    id = $routeParams.id;
    
    getData.getDetail('https://www.anapioficeandfire.com/api/'+type+'/'+id)
                    .then(function(response){
                            vm.detail = response.data;
                            vm.apiData(type);
                        },function(){
                            console.log('error');
                        });

    
    vm.apiData = function(t){
        
        if(t == 'characters'){
            if (vm.detail.father != undefined && vm.detail.father != ''){
                getData.getmoreDetail(vm.detail.father)
                        .then(function(response){
                                vm.detail.fatherName = response.data.name;
                            },function(){
                                console.log('error');
                            });
            }
            if (vm.detail.mother != undefined && vm.detail.mother != ''){
                getData.getmoreDetail(vm.detail.mother)
                        .then(function(response){
                                vm.detail.motherName = response.data.name;
                            },function(){
                                console.log('error');
                            });
            }
            
            if (vm.detail.spouse != undefined && vm.detail.spouse != ''){
                getData.getmoreDetail(vm.detail.spouse)
                        .then(function(response){
                                vm.detail.spouseName = response.data.name;
                            },function(){
                                console.log('error');
                            });
            }
            
            if(vm.detail.books.length > 0 && vm.detail.books[0] != ''){
                vm.detail.charbookNames = [];
                vm.detail.books.forEach(function(v){
                    getData.getmoreDetail(v)
                            .then(function(response){
                                vm.detail.charbookNames.push(response.data.name);
                            },function(){
                                console.log('error');
                            });
                });
            }
        }
        else if(t == 'books'){
            
            if(vm.detail.povCharacters.length > 0 && vm.detail.povCharacters[0] != '')
                {   
                    vm.detail.bookpovchar = [];
                    vm.detail.povCharacters.forEach(function(v){
                        getData.getmoreDetail(v)
                            .then(function(response){
                                vm.detail.bookpovchar.push(response.data.name);
                            },function(){
                                console.log('error');
                            });
                    });
                }
      
        }
        else if(t == 'houses'){
            
            if (vm.detail.currentLord != undefined && vm.detail.currentLord != ''){
                getData.getmoreDetail(vm.detail.currentLord)
                        .then(function(response){
                                vm.detail.currentLordName = response.data.name;
                            },function(){
                                console.log('error');
                            });
            }
            
            if (vm.detail.founder != undefined && vm.detail.founder != ''){
                getData.getmoreDetail(vm.detail.founder)
                        .then(function(response){
                                vm.detail.founderName = response.data.name;
                            },function(){
                                console.log('error');
                            });
            }
            
            if(vm.detail.swornMembers.length > 0 && vm.detail.swornMembers[0] != '')
                {   
                    vm.detail.swornMembersName = [];
                    vm.detail.swornMembers.forEach(function(v){
                        getData.getmoreDetail(v)
                            .then(function(response){
                                vm.detail.swornMembersName.push(response.data.name);
                            },function(){
                                console.log('error');
                            });
                    });
                }
            
      
        }
    }
}


/*Three cards*/
function bookDetail () {
    return {
        restrict: 'E',
        templateUrl: 'templates/bookdetail.html'
    };
}

function charDetail () {
    return {
        restrict: 'E',
        templateUrl: 'templates/chardetail.html'
    };
}

function houseDetail () {
    return {
        restrict: 'E',
        templateUrl: 'templates/housedetail.html'
    };
}