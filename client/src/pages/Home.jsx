
import Sidebar from "../components/sidebar/Sidebar";
export default function Home() {

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/*container*/}
      <div className="container min-h-screen flex">
        {/*Sidebar*/}
        <Sidebar />
      </div>
    </div>
  );
}