
module.exports = function uniqueArray(array) {
    var uniqueArray = [];
    
    for(i=0; i < array.length; i++){
        array[i] = array[i].toLowerCase().replace(/^\s+|\s+$/gm,'');
        if(uniqueArray.indexOf(array[i]) === -1) {
            
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;

}
