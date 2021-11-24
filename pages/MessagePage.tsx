import Dashboard from "../components/Dashboard";
import Link from 'next/link'

const MessagePage = () => {

    return (
        <>
            <Dashboard>
                <div>
                    <h1>This is the Message page.</h1>

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

export default MessagePage;