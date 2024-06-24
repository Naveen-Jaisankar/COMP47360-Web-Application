import React , {useState} from 'react'
import MainContent from '../components/maincontent';
import Sidebar from '../components/usersidebar';
import DashBoard from './UserDashboard';



export const UserPanel = () =>{

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleDrawer = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    return(
        <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
        <DashBoard isSidebarOpen={isSidebarOpen} />
        </div>
    )
}
