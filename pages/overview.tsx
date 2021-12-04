import Dashboard from "../components/Dashboard";
import Link from 'next/link'

const OverviewPage = () => {

    return (
        <>
            <Dashboard>
                <div>
                    <h1>This is the Overview page.</h1>

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

export default OverviewPage;