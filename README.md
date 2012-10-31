# rest for jQuery

## How to use:

### Rest API

#### 获取用户信息
* GET /users?limit=10&sort=id&order=asc
* 输出：
Content-Type: application/json  
<pre>
[
		{
			"id": 1,
			"username": "user1"
		}, 
		{
			"id": 2,
			"username": "user2"
		}, ...
]
</pre>

#### 用户登录
* POST /login
* 输入：  
Content-Type: application/json
<pre>
{
		"username": "user1",
		"password": "password1"
}
</pre>
* 输出：  
HTTP/1.1 200 OK  
HTTP/1.1 401 Unauthorized

#### 修改用户
* PUT /user/:id
* 输入：  
Content-Type: application/json
<pre>
{
		"email": "email@xx.com"
}
</pre>
* 输出：  
HTTP/1.1 200 OK  

#### 删除用户
* DELETE /user/:id
* 输出：  
HTTP/1.1 200 OK 

### JavaScript for Rest API

#### 引用 jquery 和 rest.js 文件
<pre>
&lt;script type="text/javascript" src="jquery.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="rest.js"&gt;&lt;/script&gt;
</pre>

#### 定义 Rest
<pre>
var methods = ['get:/users', 'post:/login', 'put:/user', 'delete:/user'];
var rest = new Rest(methods);
</pre>
<pre>
var methods = ['get:/path/users', 'post:/path/login', 'put:/path/user', 'delete:/path/user'];
var rest = new Rest('/path', methods);//baseurl: '/path'
</pre>

#### GET 
<pre>
//获取用户信息: rest.getUsers(callback);
rest.getUsers(function(status, users) {
	console.log(status);//200 or 401
	console.log(users);//user list
});
</pre>
<pre>
//根据条件获取用户信息: rest.getUsers(callback, params);
rest.getUsers(function(status, users) {
	console.log(status);//200 or 401
	console.log(users);//user list
}, {
	limit: 10,
	sort: 'id',
	order: 'asc'
});
</pre>

#### POST
<pre>
//登录: rest.postLogin(callback, params);
rest.postLogin(function(status, users) {
	console.log(status);//200 or 401
}, {
	username: 'user1',
	password: 'password1'
});
</pre>

#### PUT
<pre>
//修改用户: rest.putUser(callback, id, params);
rest.putUser(function(status) {
	console.log(status);
}, 1, {
	email: 'email@xx.com'
});
</pre>

#### DELETE
<pre>
//删除用户: rest.deleteUser(callback, id);
rest.deleteUser(function(status) {
	console.log(status);
}, 1);
</pre>


### 支持多级 url
<pre>
var method = ['get:/path/root/test', 'get:/path/root/hello', ];
var rest = new Rest(method);
rest.path.root.getTest(function(status, data) {
	console.log(status, data);
});
rest.path.root.getHello(function(status) {
	console.log(status, data);
});
</pre>



## author: 
* 邮箱: wenzhixin2010@gmail.com  
* 微博: <a href="http://weibo.com/2292826740">@_文翼_</a> 