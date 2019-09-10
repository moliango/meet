layui.config({
				base: '../../../layuiadmin/' //静态资源所在路径
			}).extend({
				index: 'lib/index' //主入口模块
			}).use(['index', 'form', 'laydate'], function() {
				var $ = layui.$,
					admin = layui.admin,
					element = layui.element,
					layer = layui.layer,
					laydate = layui.laydate,
					form = layui.form;

				$.ajax({
					async: false,
					type: "post",
					url: "https://www.longjuli.com/ajax",
					dataType: "json",
					//成功的回调函数
					data: {
						"a": "s1",
						"t": "roomlist"
					},
					success: function(msg) {

						var data = msg.data;
						$.each(data, function(idx, con) {
							
							$("#select_meet").after("<option value="+con.roomid+">"+con.roomname+"</option>");	
						})
						
						

					},
					//失败的回调函数
					error: function() {
						console.log("error")
					}
				})

				form.render(null, 'component-form-group');

				laydate.render({
					elem: '#LAY-component-form-group-date'
				});

				

				/* 监听指定开关 */
				form.on('switch(component-form-switchTest)', function(data) {
					layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
						offset: '6px'
					});
					layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
				});
				
				
				
				/* 监听提交 */
				form.on('submit(component-form-demo1)', function(data) {
					parent.layer.alert(JSON.stringify(data.field), {
						title: '最终的提交信息'
					})
					
					// var rowname = $("#select-room").find("option[value='"+data.field.interest+"']").text();
					var ruletype = 0;
					if(data.field.close == "on"){
						ruletype = 1;
					}
					
					console.log(ruletype);
					
					$.ajax({
						async: true,
						type: "post",
						url: "https://www.longjuli.com/ajax",
						dataType: "json",
						//成功的回调函数
						data: {
							"a": "add",
							"t": "rulelist",
							"name": data.field.user,
							"ruletype": ruletype,
							"rowname":  data.field.interest
						},
						success: function(msg) {
					
							var data = msg.data;
							console.log(data);
							
					
						},
						//失败的回调函数
						error: function() {
							console.log("error")
						}
					})
					
					return false;
				});

				
			});
			
		