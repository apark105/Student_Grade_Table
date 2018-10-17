
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
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
      console.log('is this being clicked?')
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
      console.log('did the cancel button work?')
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
      student_array.push({'name': name, 'course': course, 'grade': grade})
      console.log(student_array)
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
      $('.tBody').text(''); 
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




