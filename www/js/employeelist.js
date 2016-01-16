//var serviceURL = "http://192.168.1.100/";
var serviceURL = "http://109.104.163.243/";
//var serviceURL = "http://google.com.ua/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	console.log(serviceURL);
	$.ajax({
		url: serviceURL + 'getemployees.php',
		//url: serviceURL,
		dataType: 'json',
		type:'GET',
		//data: data,
		success: getEmployeeListDone,
		error: errorEmployeeListGet,
		timeout: 3000 //3 second timeout
	});

}

function getEmployeeListDone(data){
	$('#employeeList li').remove();
	employees = data.items;
	$.each(employees, function(index, employee) {
		//console.log(employee.lastName);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
			'<img src="pics/' + employee.picture + '"/>' +
			'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
			'<p>' + employee.title + '</p>' +
			'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
	});
	$('#employeeList').listview('refresh');
}

function errorEmployeeListGet( jqxhr, textStatus, error ){
	var err = JSON.stringify(jqxhr) + ", " + textStatus + ", " + error;
	console.log( "Request Failed: " + err );
}