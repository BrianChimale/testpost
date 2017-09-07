var	express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

mongoose.connect('mongodb://localhost/social', function(){
	console.log('mongodb connected')
});

var postSchema = new mongoose.Schema ({
	username:{ type: String, required:true},
	body:{type:String, required:true},
	date:{type:Date, required:true, default:Date.now}
});
var Post = mongoose.model('Post', postSchema);

app.get('/api/posts', function(req, res, next){
	console.log('app.get:' + 'executing');
	Post.find(function(err, posts){
		if (err) {
			return next(err)
		}
		console.log('Post.find:' + 'posts: ' + posts)
		res.json(posts)
	});
});

app.post('/api/posts', function(res, req, next){
	console.log('app.post:' + ' executing');
	console.log('app.post:' + ' we are here');
	console.log('app.post:' + ' res: ' + res);
	console.log('app.post:' + ' req.body: ' + req.body);
	console.log('app.post:' + ' and now here');
	var post = new Post({
		username : req.body.username,
		body : req.body.body
	});
	post.save(function(err, post){
		if (err) {
			return next(err)
		}
		console.log('Post.save:' + 'posts: ' + posts)
		res.json(201, post)
	});
});

app.listen(3000, function(){
	console.log('Server listening on ', 3000)
});