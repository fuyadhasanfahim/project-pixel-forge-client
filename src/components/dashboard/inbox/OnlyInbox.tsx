import Sidebar from './Sidebar'

export default function OnlyInbox() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="border-l h-full"></div>
        </div>
    )
}
