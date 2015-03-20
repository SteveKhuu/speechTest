var namespace = function(namespace){
    
    if(typeof window[namespace] === 'undefined'){
        window[namespace] = {};
    }
    
    return window[namespace];
};