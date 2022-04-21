mui.ready(function(){
	var post_id=plus.webview.currentWebview().post_id;
	new Vue({
		el:"#app",
		data:{
			post_id:localStorage.getItem("post_id"), 
			writer_name:"",
			writer_photo:"",
			circle:"",
			post_time:"",
			post_text:"",
			comments:[]
		},
		mmounted:function(){
			var ref=this;
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/loadthisPost",
				data:{
					post_id:ref.post_id
				},
				success:function(json){
					ref.writer_name=json.username;
					ref.writer_photo=json.photo_path;
					ref.post_time=json.create_time;
					ref.post_text=json.post_detail;
					ref.circle=json.name;
				},
				error:function(){
					mui.toast("执行异常")
				}
			});
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/loadCommentList",
				data:{
					post_id:ref.post_id
				},
				success:function(json){
					ref.comment=json;
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
		},
		methods:{
			toLike:function(){
				$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/addLike",
				data:{
					post_id:this.post_id
				},
				success:function(){
					mui.toast("经验加10");
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
			},
			toComment:function(){
				mui.openWindow({
					url:"../comment/comment.html",
					id:"comment.html",
					extras:{
						ID:post_id
					}
				});
			}
		}
	});
});
mui.plusReady(function(){
	plus.navigator.setStatusBarBackground("#FFFFFF");//OS顶部状态栏背景色为白色
	plus.navigator.setStatusBarStyle("dark");//OS顶部文字黑色(白色light，黑色dark)
	plus.screen.lockOrientation("portrait-primary");//禁止横屏切换
	//隐藏滚动条
	plus.webview.currentWebview().setStyle({
		scrollIndicator:'none'
	});
});

mui.init();