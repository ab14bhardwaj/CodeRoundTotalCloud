/*
Problem statement: A school has created its timetable based on availability of six subject teachers (see Teacher wise class timetable PDF file). Using this as source, also available as csv files per teacher, answer the following questions:

1. Read the CSV files and generate class wise timetable (Write a simple csv parser)

2. Assuming that any teacher can be co-teacher to any other class, generate a new timetable such that no teacher is idle during the duration of school.

3. Identify when all teachers are busy and a class can not be assigned a co-teacher. Calculate minimum number of extra co-teachers needed to solve it.


Important points:
----------------
1. You need to commit the code to a GitHub repository and send us the link to it.
2. You can create the UI to your preferences as your backend code writing is more important.
3. You should solve the above problems yourself, i.e., you can't use plugins or libraries to solve the above problem. You can however use any sort of libraries on the front end.
4. You should provide clear instructions on how to run your code 
*/

const csv = require("csvtojson");
const path = require("path");
const fs = require('fs');

let CSV_DATA = {};
// Read all JSON files
const TIME_TABLE_MAP = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const DAY_MAP = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CLASS_LIST = ['6th', '7th', '8th', '9th', '10th'];
const SUBJECTS_LIST =  ["English", "Hindi", "Kannada", "Maths", "Science"];
const getJsonFromCsv = async () => {
    try {
        let buildFolder = fs.readdirSync(path.resolve(__dirname, './assets'));
        for (let file of buildFolder) {
            var filePath = path.resolve(__dirname, ('./assets' + '/' + file).toString())
            await csv()
                .fromFile(filePath)
                .then(function (jsonArrayObj) {
                    CSV_DATA[path.parse(file).name] = jsonArrayObj;
                })
        }
    } catch (error) {
        throw error;
    }
};
/*
 TOTO: generate class wise timetable.
*/
const generateTimeTable = async () => {
    await getJsonFromCsv();
    getFreeSlotsDayWise();
}

const getFreeSlotsDayWise = () => {
    var sortSubject = {};
    for (let data of SUBJECTS_LIST){
        sortSubject[data] = getSubjectTimeTable(CSV_DATA[data], data);
    }
    for (let classKey of CLASS_LIST){
        console.log("Time table generation for class: "+classKey);  
        generateTimeTableClassWise(classKey, sortSubject);    
    }
}

const getSubjectTimeTable = (subject) => {
    var mapOnBasisOfSubject = {};
    for (var i = 0; i < subject.length; i++) {
        var clonedObject = Object.assign({}, subject[i]);;
        var key = clonedObject["--"];
        delete clonedObject["--"];
        mapOnBasisOfSubject[key] = clonedObject;
    }
    return mapOnBasisOfSubject;
};

const generateTimeTableClassWise = (className, sortSubject) => {
    var classObject = {};
    for (let data of DAY_MAP){
        classObject[data] = {};
        for (let foo of TIME_TABLE_MAP){
            classObject[data][foo] = {};
            for (let key of SUBJECTS_LIST){
                if (sortSubject[key][foo][data] && sortSubject[key][foo][data] == className) {
                    classObject[data][foo] = key;
                }
            }
        }
    }
    console.log(classObject);
}
const generateTimeTableWithProxies = () => {

};
const findFreeTeacherByDayAndTime = () => {
/*
    - iterate subject and create 
*/
};
generateTimeTable(); // No proxy assigned for empty classes.
generateTimeTableWithProxies(); // Assign teachers which are free.