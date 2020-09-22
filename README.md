```AuthHeader: Basic R0dZU1dJOjIwMTVTVyFHR1k=```

POST /api/v1/testing/employee/enter

Req:
```
{
	"employee_id": string
}
```
Res

```
{
	"status": "successfully marked entered"
}
```

POST /api/v1/testing/employee/exit

```
{
	"employee_id": string
}
```
Res

```
{
	"status": "successfully marked exit"
}
```

```
GET /api/v1/testing/employee/enter?e_id=<id>&date=<date>
```
```
GET /api/v1/testing/employee/exit?e_id=<id>&date=<date>
```

To connect to mysql use:

```
mysql -u root -h localhost -p
```
When prompted for password type password as "password" (without quotes)

Select database using
```select attendance```

