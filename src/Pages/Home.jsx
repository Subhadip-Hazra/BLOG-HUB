import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Sidebar from "../Slidebar/Sidebar";
import Card from "../Components/Card";
import Newsletter from "../Components/NewsLetter";
import Blogs from "./Blogs";
import Loading from "../Components/Loading"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://blog-app-backend-toa9.onrender.com/all-blogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setIsLoading(false);
            });
    }, []);

    // ----------- Input Filter -----------
    const [query, setQuery] = useState("");
    
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    
    
    //.............Input Blogger Filter.............
    const [bloggerQuery,setBloggerQuery] = useState("");

    const handleUserChange = (event) => {
        setBloggerQuery(event.target.value);
        //console.log("nice"+event.target.value)
    };

    const filteredItems = blogs.filter(
        (blog) => blog.blogTitle && blog.blogTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    const filteredBlogger = blogs.filter(
        (blog) => blog.yourName && blog.yourName.toLowerCase().indexOf(bloggerQuery.toLowerCase()) !== -1
    );

    // ----------- Radio Filtering -----------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };



    // ------------ Button Filtering -----------
    const handleClick = (event) => {
        //console.log('handle click event ' + event.target.value);
        setSelectedCategory(event.target.value);

    };

    const filteredData = (blogs, selected, query ,bloggerQuery) => {
        let filteredBlogs = blogs;

        // Filtering Input Items
        if (query) {
            filteredBlogs = filteredItems;
        }

        if(bloggerQuery){
            filteredBlogs = filteredBlogger;
            //console.log(filteredBlogger)
        }

        // Applying selected filter
        if (selected) {
            if (selected === 'Technology' || selected === 'Fashion' || selected === 'Photography' || selected === 'Travel' || selected === 'Programming') {
                // Filter by selected category
                filteredBlogs = filteredBlogs.filter(blog =>
                    blog.tags && blog.tags.some(tag => tag.label === selected)
                );
            } else if (selected === 'Last 24 hours' || selected === 'Last 7 days' || selected === 'Last 30 days') {
                //console.log("just check the date " + selected);
                // Filter by posting date range
                const currentDate = new Date();
                const selectedDate = new Date();
                if (selected === 'Last 24 hours') {
                    selectedDate.setDate(selectedDate.getDate() - 1);
                } else if (selected === 'Last 7 days') {
                    selectedDate.setDate(selectedDate.getDate() - 7);
                } else if (selected === 'Last 30 days') {
                    selectedDate.setDate(selectedDate.getDate() - 30);
                }
                filteredBlogs = filteredBlogs.filter(blog => new Date(blog.postingDate) >= selectedDate && new Date(blog.postingDate) <= currentDate);
            } else {
                // Filter by other criteria
                alert("Server error 500");
            }
        }

        // Slice the data based on the current page
        return filteredBlogs.map((data, i) => <Card key={i} data={data} imageSrc={data.imageSrc} />);
    };

    const result = filteredData(blogs, selectedCategory, query,bloggerQuery);

    return (
        <div>
            <Banner query={query} handleUserChange={handleUserChange}  handleInputChange={handleInputChange}  bloggerQuery={bloggerQuery}/>

            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} handleClick={handleClick} />
                </div>
                <div className="col-span-2 bg-white p-4 rounded">
                    {isLoading ? ( // Loading indicator
                        <Loading/>
                    ) : result.length > 0 ? (
                        <Blogs result={result} />
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-2">{result.length} Blogs</h3>
                            <p>No data found</p>
                        </>
                    )}
                </div>
                <div className="bg-white p-4 rounded">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default Home;
