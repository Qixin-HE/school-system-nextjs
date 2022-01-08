import Dashboard from "../components/Dashboard";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { getCourseService } from "../lib/api/courseService";
import { Card, List } from "antd";
import { getCourseResponse } from "../lib/model/course";

const allcourse = () => {
    const [courses, setCourses] = useState<getCourseResponse[]>()

    useEffect(() => {
        getCourseService().then(
            (response) => {
                setCourses(response)
                console.log(response)
            }
        )



    }, []);
    return (
        <>
            <Dashboard>
                <br/>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={courses}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.name}>Card content</Card>
                        </List.Item>
                    )}
                />
            </Dashboard>
        </>
    )
}

export default allcourse;