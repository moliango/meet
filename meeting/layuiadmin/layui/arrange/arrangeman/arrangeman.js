layui.config({
				base: '../../../layuiadmin/' //静态资源所在路径
			}).extend({
				index: 'lib/index' //主入口模块
			}).use(['index', 'table', 'jquery'], function() {
				var table = layui.table,
					admin = layui.admin,
					$ = layui.jquery;

				// #test-table-operate

				$.ajax({
					async: true,
					type: "post",
					url: "https://www.longjuli.com/ajax",
					dataType: "json",
					//成功的回调函数
					data: {
						"a": "s1",
						"t": "rulelist"
					},
					success: function(msg) {

						var data = msg.data;
						data.reverse()
						// console.log(data)

						table.render({
							elem: '#test-table-operate',
							data: data,
							height: 515,
							cols: [
								[
									// 表头
									{
										type: 'checkbox',
										fixed: 'left'
									},
									{
										field: 'ruleid',
										title: 'id',
										sort: true,
										align: 'left',
										width: '5%',
										event: 'seeDetail',
										style: 'cursor: pointer;'
									}, {
										field: 'rulename',
										title: '会议名',
										width: '20%',
										align: "center",

									}, {
										field: 'roomname',
										title: '会议室地点',
										width: '15%',
										align: "center",

									}, {
										field: 'stauts',
										title: '会议规则',
										width: '8%',
										align: "center",

									}, {
										field: 'modifytime',
										title: '更新时间',
										width: '15%',
										sort: true,
										align: "center",

									}, {
										width: 178,
										align: 'center',
										flxed: 'right',
										toolbar: '#test-table-operate-barDemo'
									}
								]
							],
							skin: 'row', //表格风格
							even: true, //隔行背景
							page: true, //是否显示分页
							limits: [5, 10, 15], //显示
							limit: 10 //每页默认显示的数量
						});

					},
					//失败的回调函数
					error: function() {
						console.log("error")
					}
				})

				//监听表格复选框选择
				table.on('checkbox(test-table-operate)', function(obj) {
					console.log(obj)
				});
				//监听工具条
				table.on('tool(test-table-operate)', function(obj) {
					var data = obj.data;
					if (obj.event === 'detail') {
						layer.msg('ID：' + data.id + ' 的查看操作');
					} else if (obj.event === 'del') {
						/**
						 * @param {Object} index
						 * 编排规则的借口提供之后需要接入删除
						 */
						// layer.confirm('真的删除行么', function(index) {
						// 	obj.del();
						// 	
						// 	$.ajax({
						// 		async: false,
						// 		type: "post",
						// 		url: "https://www.longjuli.com/ajax",
						// 		dataType: "json",
						// 		//成功的回调函数
						// 		data: {
						// 			"a": "d",
						// 			"id": obj.data.meetingid
						// 		},
						// 		success: function(msg) {
						// 	
						// 			if(msg.state==1){
						// 				layer.msg("删除成功");
						// 			}else {
						// 				layer.msg("删除失败");
						// 
						// 			}
						// 	
						// 		},
						// 		//失败的回调函数
						// 		error: function() {
						// 			console.log("error")
						// 		}
						// 	})
						// 	layer.close(index);
						// });
					} else if (obj.event === 'edit') {
						layer.open({
							type: 2,
							//title: '收藏管理 (考生姓名：张无忌)',
							title: '编辑信息',
							shadeClose: true, //弹出框之外的地方是否可以点击
							offset: '10%',
							area: ['60%', '80%'],
							content: 'from_bj.html',
							success: function(layero, index) {
								 var body = layui.layer.getChildFrame('body', index);
								if (data) {
									// 取到弹出层里的元素，并把编辑的内容放进去
									body.find(".id").val(data.ruleid); //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据

									body.find(".meetname").val(data.rulename); //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据
									body.find(".meetaddress").val(data.roomname); //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据
									body.find(".meetgz").val(data.stauts); //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据
									body.find(".meettime").val(data.modifytime); //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据

									// 记得重新渲染表单
									form.render();
								}
							}
						});
					}
				});

				var $ = layui.$,
					active = {
						getCheckData: function() { //获取选中数据
							var checkStatus = table.checkStatus('test-table-operate'),
								data = checkStatus.data;
							layer.alert(JSON.stringify(data));
						},
						getCheckLength: function() { //获取选中数目
							var checkStatus = table.checkStatus('test-table-operate'),
								data = checkStatus.data;
							layer.msg('选中了：' + data.length + ' 个');
						},
						isAll: function() { //验证是否全选
							var checkStatus = table.checkStatus('test-table-operate');
							layer.msg(checkStatus.isAll ? '全选' : '未全选')
						},
						add: function() {
							layer.open({
								type: 2,
								title: '增加规则',
								shadeClose: true, //弹出框之外的地方是否可以点击
								offset: '10%',
								area: ['60%', '80%'],
								content: 'group.html'
								// content: '/gkzytb/franchiser/rigthColumnJsonList'
							});
						},
					};

				$('.test-table-operate-btn .layui-btn').on('click', function() {
					var type = $(this).data('type');
					active[type] ? active[type].call(this) : '';
				});

			});