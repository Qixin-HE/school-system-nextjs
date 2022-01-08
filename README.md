问题：
1. (solved) style the skills sections on teacher add and edit => todo: change it to rows and cols
2. skills and rateValue not destroy when modal close (have to set it manually when onClose) 
    - maybe related to form item
3. getting 500 (Internal Server Error)when update the skills fields of a teacher from the putEditTeacherService() and then the following getTeacherListService() 
//
Features:
Course information display:
- Display all course in a Grid

Work Items:
All course display:
(allcourse.tsx)
    a. create card component
    one card display for one course on the allcourse page
    b. import the card component 
    pass the course information to the card component and display it on the page
    c. set up grid on the page
    make the cards auto scale on the page using grid

a. create card component : 
1)create components/CourseCard.tsx 

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




//
search a student -> service.ts(search a student using an id) -> using get student with axios
//已解决问题：
1.edit student 无法更改type（student type) - 是1和2 而不是0或1
//
form control: edit student 
try1: default value x (actually null in the form value field)
try2: initialvalue x (too slow to get it set when rowKey changed)
try3: useEffect ✅
//
已解决问题：
1.在student list page里面， 刚进去点击最后一页，然后add student（直接点fill student），然后添加，总是不能添加成功，两处console.log 都会显示四个值undefined，这是为什么呢？怎么处理呢？
2.用shouldUpdate做一个number的useState,每次添加一个学生就setShouldUpdate + 1使得useEffect再次trigger来刷新页面 是一个好的做法吗？

//
已解决问题：
1.在studentlist的页面的问题，如果logout不成功则不router.push应该怎么写呢？
2.我的文件夹标红，写着“Contains emphasized items",怎么解决呢？

//
已解决问题：
1. Axios.get<any, AxiosResponse<any, any>, any> 这个<>之间的是什么？
2. Type里面， String 和 string有什么区别？最好用哪个呢？ e.g. name: String / name: string 
    回答：https://stackoverflow.com/questions/14727044/what-is-the-difference-between-types-string-and-string
    - Simple answer:
        string => is a type. e.g. console.log(typeof 'foo') // string
        String => is an object with some methods to create and manipulate strings.
    - For quick readers:

        Don’t ever use the types Number, String, Boolean, Symbol, or Object These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.
    - TypeScript: String vs string
        Argument of type 'String' is not assignable to parameter of type 'string'.

        'string' is a primitive, but 'String' is a wrapper object.

        Prefer using 'string' when possible.
    结论： 用string。
3. 为什么要给response写type？是因为怕到时候api返回的东西不一样吗？是出于安全考虑吗？