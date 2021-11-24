问题：
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