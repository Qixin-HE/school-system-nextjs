问题:
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