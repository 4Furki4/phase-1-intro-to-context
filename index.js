// Your code here
function createEmployeeRecord(employeeArray) {
    const [firstName, familyName, title, payPerHour] = employeeArray
    const employee = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(ArrayOfEmployeeArrays) {
    return ArrayOfEmployeeArrays.map(employeeArray => createEmployeeRecord(employeeArray))
}

function createTimeInEvent(employeeObject, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })
    return employeeObject
}
function createTimeOutEvent(employeeObject, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })
    return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {
    const timeIn = employeeObject.timeInEvents.find(event => event.date === date)
    const timeOut = employeeObject.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeObject, date) {
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
}

function allWagesFor(employeeObject) {
    const dates = employeeObject.timeInEvents.map(event => event.date)
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeObject, date), 0)
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0)
}