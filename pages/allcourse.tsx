import Dashboard from "../components/Dashboard";
import Link from 'next/link'

const allcourse = () => {

    return (
        <>
            <Dashboard>
                <div>
                    <h1>This is the All course page.</h1>

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

export default allcourse;