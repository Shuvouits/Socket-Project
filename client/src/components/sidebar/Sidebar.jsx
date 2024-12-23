import React from 'react'
import { useState } from "react";
import SidebarHeader from './header/SidebarHeader'
import Notification from './notifications/Notification'
import { Search } from './search'
import { Conversations } from "./conversations";

export default function Sidebar() {

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[40%] h-full select-none"> 

     <SidebarHeader />

     <Notification />

     <Search searchLength={searchResults.length} />

      {/*Conversations*/}
      <Conversations />
    
    </div>
  )
}
