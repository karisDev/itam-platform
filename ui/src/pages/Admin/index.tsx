import AuthStore from "@/stores/AuthStore";
import { observer } from "mobx-react-lite";

const AdminPage = observer(() => {
  return (
    <>
      <main className="w-full flex flex-col pb-8">
        <div className="bg-bg-primary w-full min-h-[128px] border-b-[1px] border-border-primary">
          <div className="max-w-screen-lg mx-auto w-full h-full flex items-center justify-start px-6">
            <h2 className="text-[32px] font-normal">Админка</h2>
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto w-full px-6 mt-12 flex flex-col">
          {/* {AuthStore} */}

          <div className="card"></div>
        </div>
      </main>
    </>
  );
});

export default AdminPage;
