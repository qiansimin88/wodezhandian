// JavaScript Document
function Field(params){
    this.field_id=params.fid;     //要验证的字段的ID
    this.validators=params.val;   //验证器对象数组
    this.on_suc=params.suc;       //当验证成功的时候执行的事件
    this.on_error=params.err;     //当验证失败的时候执行的事件
    this.checked=false;           //是否通过验证
}

Field.prototype.validate=function(){
    //循环每一个验证器
    for(item in this.validators){
        //给验证器附加验证成功和验证失败的回调事件
        this.set_callback(this.validators[item]);
        //执行验证器上的Validate方法，验证是否符合规则
        if(!this.validators[item].validate(this.data())){
            break; //一旦任意一个验证器失败就停止
        }
    }
}

Field.prototype.data=function(){
     return document.getElementById(this.field_id).value;
 }
 
Field.prototype.set_callback=function(val){
    var self=this;              //换一个名字来存储this，不然函数的闭包中会覆盖这个名字
    val.on_suc=function(){      //验证成功执行的方法
        self.checked=true;      //将字段设置为验证成功        
        self.on_suc(val.tips);  //执行验证成功的事件
    }
    val.on_error=function(){    //验证失败的时候执行的方法
        self.checked=false;     //字段设置为验证失败
        self.on_error(val.tips);//执行验证失败的事件
    }
}
//长度验证的验证器类
function Len_val(min_l,max_l,tip){
    this.min_v=min_l;
    this.max_v=max_l;
    this.tips=tip;
    this.on_suc=null;
    this.on_error=null;
}
Len_val.prototype.validate=function(fd){
    if(fd.length<this.min_v||fd.length>this.max_v){
        this.on_error();
        return false;
    }
    this.on_suc();
    return true;
}
//正则表达式验证器
function Exp_val(expresion,tip){
    this.exps=expresion;
    this.tips=tip;
    this.on_suc=null;
    this.on_error=null;
}
Exp_val.prototype.validate=function(fd){
    if(!fd){
        this.on_suc();
        return true;
    }
    if(this.exps.test(fd)){
        this.on_suc();
        return true;
    }else{
        this.on_error();
        return false;
    }
}
//远程验证器
function Remote_val(url,tip){
    this.p_url=url;
    this.tips=tip;
    this.on_suc=null;
    this.on_error=null;
}
Remote_val.prototype.validate=function(fd){
    var self=this;
    $.post(this.p_url,{f:fd},
        function(data){
            if(data.rs){
                self.on_suc();
                return;
            }else{
                self.on_error();
            }
        },"json"
    );
    return false;
}
//自定义函数验证器
function Man_val(tip,func){
    this.tips=tip;
    this.val_func=func;
    this.on_suc=null;
    this.on_error=null;
}
Man_val.prototype.validate=function(fd){
    if(this.val_func(fd)){
        this.on_suc();
    }else{
        this.on_error();
    }
}


/********************************************************/
function UserForm(items){
    this.f_item=items;                             //把字段验证对象数组复制给属性
    for(idx=0;idx<this.f_item.length;idx++){       //循环数组
        var fc=this.get_check(this.f_item[idx]);   //获取封装后的回调事件
        $("#"+this.f_item[idx].field_id).blur(fc); //绑定到控件上
    }
}
//绑定验证事件的处理器，为了避开循环对闭包的影响
UserForm.prototype.get_check=function(v){
    return function(){   //返回包装了调用validate方法的事件
        v.validate();
    }
}


/********************************************************/

UserForm.prototype.set_submit=function(bid,bind){
    var self=this;
    $("#"+bid).click(
        function(){
            if(self.validate()){
                bind();
            }
        }
    );
}


/********************************************************/

UserForm.prototype.validate=function(){
    for(idx in this.f_item){             //循环每一个验证器
        this.f_item[idx].validate();     //再检测一遍
        if(!this.f_item[idx].checked){   
            return false;                //如果错误就返回失败，阻止提交
        }
    }
    return true;                         //一个都没错就返回成功执行提交
}

/********************************************************/