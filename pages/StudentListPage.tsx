import Dashboard from "./Dashboard";
import Link from 'next/link'

const StudentListPage = () => {

    return (
        <>
            <Dashboard>
                <div>
                    <h1>This is the Student list page.</h1>

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

export default StudentListPage;