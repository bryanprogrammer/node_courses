var asycAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('arguments must be numbers');
            }
            
        },1500);
    });
};

/*
var some_promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('hey it worked');
        reject('hey it dint worked');
    }, 2500);
});

some_promise.then((message) => {
    console.log('success', message);
}, (error_message) => {
    console.log('unsuccessful', error_message);
});*/

asycAdd(5, "sdf3").then((res) =>{
    console.log('addition ', res);
    return asycAdd(res, 3);
}).then((res) => {
        console.log('addition 2 ', res);
}).catch((error_message) => {
    console.log('unsuccessful ', error_message);
});
