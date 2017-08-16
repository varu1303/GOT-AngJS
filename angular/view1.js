angular
    .module('viewOne',[])
    .controller('v1Ctrl',v1Ctrl)
    .directive('bookCard',bookCard)
    .directive('charCard',charCard)
    .directive('houseCard',houseCard)
    .filter('searchbyRegaut',searchbyRegaut);


function v1Ctrl (getData) {

        
    var vm = this;
    var err = false;
    vm.mf = false;
    vm.mftext = 'MORE FILTERS';
    vm.moreFil = function (varmf) {
        if (varmf == false){
            vm.mftext = "HIDING FILTERS";
        }else{
            vm.mftext = "MORE FILTERS";
        }
        vm.mf = !varmf;
    }
    vm.alldata = [];
    vm.showbook= true;
    vm.showhouse= true;
    vm.showchar= true;
    vm.searchgender = '';
    vm.searchregaut = '';
    vm.wantregauth = 'region';
    vm.f = 'r';
    vm.des = 'applicable on REGIONS OF HOUSES';
    vm.newValue = function(text,find){
        vm.des = text;
        vm.f = find;
    }

    vm.t= 'BOOKS,HOUSES and CHARACTERS from ASOIAF Universe';
    vm.order = 'ALPHABETICALLY (FORWARD)';
    vm.reverse = false;
    
    vm.reverseOrder = function () {
        
        if (vm.reverse == false) {
            vm.reverse =  true;
            vm.order = 'ALPHABETICALLY (REVERSE)';
        } else if (vm.reverse == true) {           
            vm.reverse =  false;
            vm.order = 'ALPHABETICALLY (FORWARD)';
        }
        
    }
    
/*Getting Books*/
    var bookget = getData.getBook();
/*Getting characters */
    var charget = getData.getChar();
/*Getting houses*/
    var houseget = getData.getHouse();
/*Checking Promises returned were successful or not */
    bookget.then(function(response){
        var val = response.data;
        val.forEach(function(v,i){
            v.dirtype='B';
            v.urlid = i+1;
            vm.alldata.push(v);
        });
    },function(){
        console.log('error');
        err = true;
    });

    charget.then(function(response){
        var val = response.data;
        val.forEach(function(v,i){
            v.dirtype='C';
            v.urlid = i+1;
            vm.alldata.push(v);
        });
    },function(){
        console.log('error');
        err = true;
    });

    houseget.then(function(response){
        var val = response.data;
        val.forEach(function(v,i){
            v.dirtype='H';
            v.urlid = i+1;
            vm.alldata.push(v);
        });
    },function(){
        console.log('error');
        err = true;
    });
    
    if (!err){
        vm.BCHarray = vm.alldata;
    }
   
    
}

/*Three cards*/
function bookCard () {
    return {
        restrict: 'E',
        templateUrl: 'templates/bookcard.html'
    };
}

function charCard () {
    return {
        restrict: 'E',
        templateUrl: 'templates/charcard.html'
    };
}

function houseCard () {
    return {
        restrict: 'E',
        templateUrl: 'templates/housecard.html'
    };
}

/*Custom Filter*/


function searchbyRegaut () {
    return function (items , search, find){
        var filtered = [];
        if(find == 'r'){
            if (search == ''){
                return items;
            }

            items.forEach(function(v,i){
                if(v.region == undefined){
                    filtered.push(v);
                }else{
                    var searchText = search.toLowerCase();
                    var region = v.region.toLowerCase();
                    if (region.indexOf(searchText) >= 0){
                       filtered.push(v); 
                    }
                }
            });
        }else if(find == 'a'){
            if (search == ''){
                return items;
            }
            
            items.forEach(function(v,i){
                if(v.authors == undefined){
                    filtered.push(v);
                }else{
                    var found = false;
                    var res = v;
                    var author = [];
                    var searchText = search.toLowerCase();
                    v.authors.forEach(function(v){
                        author.push(v.toLowerCase());   
                    });
                    author.forEach(function(v){
                      if (v.indexOf(searchText) >= 0){
                          found = true;
                      } 
                    });
                    if (found == true){
                        filtered.push(res);
                    }
                }
            });
            
        }
        
        return filtered;
    }
}