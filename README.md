问题：
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