import MainChat from '@/components/MainChat'
import Sidebar from '@/components/Sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import Topbar from '@/components/Topbar'
import React, { useRef } from 'react'

const HomeChat = () => {
    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden h-screen flex flex-col">
        {/* <Sidebar/> */}

        <Topbar />
       
        <div className=''>
        <MainChat/>
        </div>
        

  
     
    </div>
  )
}

export default HomeChat