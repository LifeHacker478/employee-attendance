var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mysql = require('mysql');
var moment = require('moment');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "attendance"
});

router.post('/entry', function(req, res){
	const authHeader = req.headers.authorization;
	if (!authHeader || authHeader !== 'Basic R0dZU1dJOjIwMTVTVyFHR1k=') {
	    return res.status(403).json({
	      message: 'FORBIDDEN'
	    });
    }
	var {employee_id} = req.body;
	var date = moment().format('MM-DD-YYYY');
	var time = moment().format('hh:mm:ss');

	var q = `INSERT INTO entry (employee_id, entry_date, entry_time) VALUES ("${employee_id}", "${date}", "${time}")`;

	con.query(q, (err, reso) => {
		if (err) {
			return res.json({"status": "failed to mark enter"});
		}
		return res.json({"status": "successfully marked entered"});
	});
});


router.post('/exit', function(req, res){
	const authHeader = req.headers.authorization;
	if (!authHeader || authHeader !== 'Basic R0dZU1dJOjIwMTVTVyFHR1k=') {
	    return res.status(403).json({
	      message: 'FORBIDDEN'
	    });
    }
	var {employee_id} = req.body;
	var date = moment().format('MM-DD-YYYY');
	var time = moment().format('hh:mm:ss');

	var q = `INSERT INTO exits (employee_id, exit_date, exit_time) VALUES ("${employee_id}", "${date}", "${time}")`;

	con.query(q, (err, reso) => {
		if (err) {
			return res.json({"status": "failed to mark exit"});
		}
		return res.json({"status": "successfully marked exited"});
	});
});

router.get('/entry', (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || authHeader !== 'Basic R0dZU1dJOjIwMTVTVyFHR1k=') {
	    return res.status(403).json({
	      message: 'FORBIDDEN'
	    });
    }
    var {e_id, date} = req.query;
    var q = `select * from entry where employee_id="${e_id}" and entry_date="${date}"`;
    con.query(q, (err, reso) => {
		if (err) {
			res.json({"status": "some error occured"});
		}
		if(reso && reso.length > 0) {
		   return res.json({"details": reso[0]});
	    } else {
	    	return res.json({"details": "no record found"});
	    }
	});
});

router.get('/exit', (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || authHeader !== 'Basic R0dZU1dJOjIwMTVTVyFHR1k=') {
	    return res.status(403).json({
	      message: 'FORBIDDEN'
	    });
    }
    var {e_id, date} = req.query;
    var q = `select * from exits where employee_id="${e_id}" and exit_date="${date}"`;
    con.query(q, (err, reso) => {
		if (err) {
			return res.json({"status": "some error occured"});
		}
		if(reso && reso.length > 0) {
		   return res.json({"details": reso[0]});
	    } else {
	    	return res.json({"details": "no record found"});
	    }
	});
});





app.use('/api/v1/employee', router);
app.listen(8081, () => {console.log("server started on port 8081. You can access it via http://localhost:8081/");});
