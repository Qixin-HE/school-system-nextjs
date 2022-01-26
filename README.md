问题：
1.course/[id].tsx 没办法把steps换行 （现在它太长了穿过了当前row和col）
2. when refresh, status not displaying correctly, but after making modification on the file and saving it, the status is correct 
    -have to write 2 useEffect - each for one state

//
已解决问题：
1. (solved) style the skills sections on teacher add and edit => todo: change it to rows and cols
2. skills and rateValue not destroy when modal close (have to set it manually when onClose) 
    - maybe related to form item
3. getting 500 (Internal Server Error)when update the skills fields of a teacher from the putEditTeacherService() and then the following getTeacherListService() 

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