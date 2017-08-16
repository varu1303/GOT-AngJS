angular
    .module('apiService',[])
    .service('getData',getData);


function getData ($http) {
    this.getBook = function() {
        return $http.get('https://www.anapioficeandfire.com/api/books?pageSize=50');
    }
    this.getChar = function() {
        return $http.get('https://www.anapioficeandfire.com/api/characters?pageSize=50');
    }
    this.getHouse = function() {
        return $http.get('https://www.anapioficeandfire.com/api/houses?pageSize=50');
    }
    

    this.getDetail = function (url) {
        return $http.get(url);
    }
    
    this.getmoreDetail = function (url) {
        return $http.get(url);
    }
    


}