//instead of fetch method,we use axios..it is one package
import axios from "axios";

import { useState, useCallback, useEffect } from "react";

const url = "https://dummyjson.com"

//when we design a component,the structure of API is nothing but a custom hook..so we have to design a custom hook
//when we create a custom hook,never return jsx..
//custom hook always be the custom function

//custom hook
function useCategoryApi() {
    const [category,setCategory] = useState([])

    // custom function  to read the categories
    const readCategories = async () => {
        const out = await axios.get(`${url}/products/categories`);
        console.log(`category =`,out);
            setCategory(out.data)
    }

    const initValue = useCallback(() => {
            readCategories()
    },[])

    //callback
    useEffect(() => {
        initValue()
    },[initValue])

    //Here we write return the same state as an object.
    return {
        category: [category,setCategory]
    }
}

export default useCategoryApi

//we got output twice in console,why b'coz of 1.browser delay,2.await call