var sum_to_n_a = function(n) {
    let sum=0;
    for (let i=n; i!=0; i--){
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    let sum=0;
    if (n%2 == 0) {
        sum = (n/2)*(1+n)
    } else {
        sum = Math.floor(n/2)*(1+n) + Math.ceil(n/2);
    }
    return sum;
};

var sum_to_n_c = function(n) {
    if (n===1) return 1;
    else {
        return n + sum_to_n_c(n-1);
    }
};

