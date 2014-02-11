var query = require("./query");

module.exports = {
	
	isLogin:function(req,res,next){
		if(req.session.user){
			next();
		}else{
			res.send(["请先登录！"]);
		}
	},
	validat_num:function(req, res, next) {
	    if (req.body.validat_num && req.session.validat_num === req.body.validat_num) {
			next();
	    } else {
			res.send(["验证码错误！"]);
	    }
	},
	hasReqUser:function(req,res,next){
		if(req.user){
			next();
		}else{
			res.send("error");
		}
	},
	
	// dev hasReqUser / isLogin 芳草地
	userNoSelf:function(req,res,next){	 
		if(req.user.id !== req.session.user.id){
			res.send("success");
		}else{
			next();
		}
	},
	
	// dev hasReqUser / isLogin
	userSelf:function(req,res,next){	 
		if(req.user.id === req.session.user.id){
			res.send("success");
		}else{
			next();
		}
	},
	
	// dev isLogin
	isAdmin:function(req,res,next){
		if(req.result === "success"){
			next();
		}else{
			if(req.session.user.role === 1){
				req.result = "success";
			}else{
				req.result = "error";
			}
			next();			
		}
	},
	
	hasTopic:function(req,res,next){
		if(req.topic){
			next();
		}else{
			res.send("error");
		}
	},
	
	// dev isLogin / hasTopic
	isTopicManager:function(req,res,next){
		query.column(req.topic.columnId,function(col){
			if(
				req.topic.authorId === req.session.user.id || 
				col.managerId === req.session.user.id || 
				req.session.user.role === 1 ){
					
					next();
			}else{
				res.send("error");
			}			
		});
	}
	
	
}