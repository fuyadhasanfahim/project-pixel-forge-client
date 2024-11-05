import Messages from './Messages'
import Sidebar from './Sidebar'

export default function Inbox() {
    return (
        <div className="flex">
            <Sidebar />
            <Messages />
        </div>
    )
}
