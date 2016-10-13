function test(a) {
    if(a==1){
        return false;
    };
    if(a==2){
        return 1;
    }
    return b();
    function b(){
        a=10;
        return 19; 
    }
}
console.log(test(6));
// test(6);