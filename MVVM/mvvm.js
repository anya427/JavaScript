//创建一个mvvm构造函数
//使用es6方法将options赋一个初始值，防止没传
function Mvvm(options = {}){
     // vm.$options Vue上是将所有属性挂载到上面
    // 所以我们也同样实现,将所有属性挂载到了$options
    this.$options = options;
    // this._data 这里也和Vue一样
    let data = this._data = this.$options.data;
    
    // 数据劫持
    observe(data);

}

function Observe(data){
    //先遍历一遍对象包括其属性
    for(let key in data){
        let val = data[key];
        //递归遍历
        observe(val);//用外部函数？
        Object.defineProperty(data, key, {
            //可以删除属性
            configurable: true,
            get(){
                return val;
            },
            set(newval){
                if(val === newval){ //当更改后的值和以前值相同时不做操作
                    return;
                }
                val = newval;
                observe(newval);
            }
        });
    }
}

// 外面再写一个函数
// 不用每次调用都写个new
// 也方便递归调用
function observe(data) {
    // 如果不是对象的话就直接return掉
    // 防止递归溢出
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}
