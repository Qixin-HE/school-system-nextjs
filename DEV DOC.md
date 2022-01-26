Features:
add a new course

(course/addcourse.tsx)
    a. make use of antd library and the course type, create required input fields for adding a course

Work Item:
    add course ui:
    (addcourse.tsx)

    a. Steps - Course Detail, Course Schedule, success
    b. input fields and related states using antd form
    - Text input: Course Name, Type, Student Limit(integer), Duration, Description, Cover
    - Text input with dropdown: Duration (month, days, year)
    - Cover: image upload
    - Text input field with dollar sign: Price
    - Text input with date picker: Start Date(not required)
    - Auto generated text field: Course Code
    - Dropdown: Teacher

    add course service: 
    api/courseService.ts

    c. postCourseService()
//
Features:
Individual course details display:
- Display all details of a course in a page

Course detail display:
(course/[id].tsx)
    a. make use of the type response and arrange the information display
    b. make use of the student/[id].tsx page to re-arrange it for course detail page
    have to change the Breadcrumb href as well
    c. understand the relation of status and chapters
    d. create status part
    set an apporiate icon and map through the data then return it

//
Features:
Course information display:
- Display all course in an antd List

Work Items:
All course display:
(allcourse.tsx)
    a. make use of antd list component to display course list
    b. implement cards in the list and style the card
    c. Add a "more" button onto the card to make it direct to the course detail page
Course api:
(api/courseService.ts)
    a. get, add, edit, delete course service using axios api service
    b. implement the getACourseByIdService() for the course detail page - course/[id].tsx
Course type:
(lib/model/course.ts)
    a. move Course from student.ts
    b. type the course response from api get call
    c. type the course detail response and make use of the exsiting type (Teacher from model/teacher.ts and getCourseResponse in the same file)
    d. export necessary types for the page to use


//
Features:
Teacher information display:
- All teacher in a list: search, sort, filter
- Teacher Details
Teacher management: 
- Teacher:  add, delete, Edit

Work Items:
1. Teacher List:
(teacher/teacherlist.tsx)
    a. Listing all Teachers in a table 
    with pagination control (can choose the number of records displaying per page and the page number)
    b. a search bar to search the teacher by name (teacher/teacherlist.tsx)
    after inputing and clicking the search button, corresponding records will show in the table.
    c. sorters on columns id and name
    d. a filter on column "Country"
    Have all countries as options to choose; also with a "reset" button to clear the selected options.
    e. make teacher names as links to the teacher detail page (teacher/[id].tsx)
    f. add an "Add" button on top of the table to achieve add a teacher functionality
    will pop up a modal and allow teacher information input
    g. "Edit" link in column "Action" will allow editing a teacher
    will pop up a modal and corresponding teacher information will show in the input fields and allow teacher information editing
    h. "Delete" link in column "Action" will allow deleting a teacher
    will pop up a little window and ask for deletion confirmation. If click "Yes" the teacher records will be deleted via api call then from the database.
2. Teacher Detail:
(teacher/[id].tsx)
    a. change files/routing structure
    change tacherlist.tsx to teacher/teacherlist.tsx; change the link in component/Dashboard.tsx
    b. modify the /student/[id].tsx page, make it align with the teacher details
    delete unrelated details, add "Skills" section, add Rate tag, modify Breadcrumb link
3. Teacher api service:
(lib/api/teacherService.ts)
    a. create teacherService.ts and rename the service.ts to studentService.ts
    b. move the getTeacherListService() from studentService.ts to the teacherService.ts
    c. create postDeleteTeacherService() for deleting a techer record by id
    d. create postAddTeacherService() to add a teacher
    e. create putEditTeacherService() to edit a teacher
    f. getATeacherByIDService() to query a teacher and will be used for teacher detail page
    

1.a:
1)Call api to get teacher info - teacher/teacherlist.tsx - useEffect - imported getTeacherListService() 
2)add typing - lib/model/teacher.ts
3)transform get teacher response data structure - lib/api/teacherService.ts - getTeacherListService() 
4)modify <Table> and its column - teacher/teacherlist.tsx - <Table>
5)use hook and add a data source for the <Table> - teacher/teacherlist.tsx - <Table> / const [data, setData] 
6)modify get teacher query with the pagination setting - lib/api/teacherService.ts - getTeacherListService() & teacher/teacherlist.tsx - const pagination

1.b:
1)add a searchbar - teacher/teacherlist.tsx
2)set up api call with query - getTeacherListService() 
3)change the data scource of the tabel with getting data - modify useEffect's trigger

1.c
1)set up sorters using ant table built-in functionality on column "id" and "Name" to make it sort base on the id number and the name length (desending)

1.d
1)map the data to extract the countries from all data
2)set up a filter for "Country" column

1.e
1)change the column "Name" render setting to make it render as a link
2)set up a right path for the link to make it route to the coresponding detail page base on the teacher record id

1.f
1)set up hooks for edting a resuable modal (for both edit and add use) - modal title, modal button
2)modify modal properties to make it display empty form fields when it pop up for "Add" 
3)when required fields is filled in, the "Add" button on modal will call api and post a teacher record to db via backend
4)modify useEffect to trigger data reload after adding a teacher

1.g. "Edit" link in column "Action" will allow editing a teacher
1)modify column "Action" to make render "Edit" as a link
2)modify modal related hooks to change the modal title and button name 
3)add "Edit" button related function, add an if statement to change button behavior when the title is different
4)call api to put a edited teacher
5)check useEffect trigger to see if changing a record will trigger table reload

1.h. "Delete" link in column "Action" will allow deleting a teacher
1)set up popup to ask for confirmation
2)when "Yes" button clicked, call api to delete the corresponding record
3)check useEffect trigger to see if deleting a record will trigger table reload

2.a. change files/routing structure
1)create teacher folder, move teacherlist.tsx under /teacher
2)change the link in Dashboard.tsx
3)create teacher's [id].tsx in teacher folder

2.b. modify the /student/[id].tsx page, make it align with the teacher details
1)scale /student/[id].tsx in /teacher/[id].tsx
2)change the get student detail api call to get teacher detail api call
3)modify column and the information, make it teacher details specific - Skills,birthday - <Row>
4)modify Breadcrumb text and link - /teacher/[id].tsx - <Breadcrumb>
