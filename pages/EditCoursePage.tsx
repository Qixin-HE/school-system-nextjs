import Dashboard from "../lib/components/Dashboard";
import Link from 'next/link'

const EditCoursePage = () => {

    return (
        <>
            <Dashboard>
                <div>
                    <h1>This is the Edit course page.</h1>

                    <h1>
                        Go{' '}back{' '}
                        <Link href="/">
                            <a>Home?</a>
                        </Link>
                    </h1>
                </div>
            </Dashboard>
        </>
    )
}

export default EditCoursePage;