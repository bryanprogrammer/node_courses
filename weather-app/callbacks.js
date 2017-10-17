var get_user = (id, callback) =>{
    var user = {
        id: id,
        name: "Bryan"
    };
    
    setTimeout(() =>{
        callback(user);
    }, 3000);
};

get_user(31, (user) => {
    console.log(user);
});