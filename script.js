
/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
var student_array = []; 
var ajaxConfig = {
      data: {api_key:'LTCfS9b4jQ'},
      dataType:'json',
      method: 'POST',
      url: 'https://s-apis.learningfuze.com/sgt/get',
      success: getData
};
$.ajax(ajaxConfig);



/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
      getData();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $('#add-button').on('click', handleAddClicked);
      $('#cancel-button').on('click', handleCancelClick);
      $('#get-data').on('click', getData)
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
      addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
      var name = $('#studentName').val();
      var course = $('#course').val();
      var grade = $('#studentGrade').val();
      var combineObj = {'name': name, 'course': course, 'grade': grade}
      addStudentToDb(combineObj);
      student_array.push(combineObj)
      updateStudentList(student_array);
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $('#studentName').val('');
      $('#course').val('');
      $('#studentGrade').val('');
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(student_object) {
      var studentName = $('<td>').append(student_object.name)
      var studentCourse = $('<td>').append(student_object.course)
      var studentGrade = $('<td>').append(student_object.grade)
      var deleteButton = $('<button>', {
            text:'Delete', 
            addClass: 'btn btn-danger btn-sm',
            on: {
                  click: function() {
                     var deletePosition = student_array.indexOf(student_object);
                     student_array.splice(deletePosition, 1);  
                     delStudentDb(student_object.id);
                     console.log(student_array); 
                     updateStudentList(student_array);
                  }
            } 
      });
      var tdDeleteButton = $('<td>').append(deleteButton)
      var combineStuff = $('<tr>').append(studentName, studentCourse, studentGrade, tdDeleteButton)
      $('.tBody').append(combineStuff); 
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student_array){
      $('.tBody').empty(); 
      for (var i=0; i < student_array.length; i++) {
            var student_object = student_array[i]
            renderStudentOnDom(student_object);
      }
      renderGradeAverage(calculateGradeAverage(student_array));
  
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_array){
      var totalGrade = 0;
      for (var i=0; i<student_array.length; i++) {
            totalGrade += parseFloat(student_array[i].grade);
      }
      var averageGrade = (totalGrade/student_array.length)
      var fixedAvgGrade = parseInt(averageGrade) + '%'
      return fixedAvgGrade;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number){
      if (student_array.length <= 0) {
            $('.avgGrade').text('0')
            return;
      }
      $('.avgGrade').text(number)
}

function getData(responseData) {
      var ajaxConfig = {
            data: {
                  api_key:'LTCfS9b4jQ', 
                  // 'force-failure': 'timeout'
            },
            dataType:'json',
            method: 'POST',
            // timeout: 5000,
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function (responseData) {
                  console.log(responseData);
                  student_array = responseData.data
                  updateStudentList(student_array);
            },
            error: function (responseData) {
                  console.log('is there an error?', responseData)
                  var errorMsg = $('.errorBody').text(responseData.statusText);
                  $('#error').modal('show');
            }
      }
      $.ajax(ajaxConfig);
}

function addStudentToDb(studentObj, responseData) {
      var ajaxConfig = {
            data: {
                  api_key:'LTCfS9b4jQ',
                  name: studentObj.name,
                  course: studentObj.course,
                  grade: studentObj.grade,
                  // 'force-failure': 'server'
            },
            dataType:'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/create',
            success: function (responseData) {
                  console.log(responseData);
            },
            error: function (responseData) {
                  console.log(responseData.statusText)
                  var errorMsg = $('.errorBody').text(responseData.statusText);
                  $('#error').modal('show');
            }
      }
      $.ajax(ajaxConfig);
}
function delStudentDb(studentID, responseData) {
      var ajaxConfig = {
            data: {api_key:'LTCfS9b4jQ', student_id: studentID},
            dataType:'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            success: function (responseData) {
                  console.log(responseData);
            }
      }
      $.ajax(ajaxConfig);
}

