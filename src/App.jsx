import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();


  function handleClick(place) {
    navigate(`/${place}`);
  }
  return (
    <div
      className=" w-screen h-screen bg-bg flex-col items-center place-content-center flex "
      id="container"
    >
      <div className="flex-col  flex h-1/2 mb-32">
        <div className=" text-2xl font-semibold mb-32">
          SHECHEM INVOICE MAKER
        </div>

        <button
          onClick={() => handleClick("invoice")}
          className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl my-5"
          type="button"
        >
          Make a new Invoice
        </button>

        <button
          onClick={() => handleClick("questions")}
          className=" border-4 border-main p-3 rounded-lg bg-main text-bg text-xl active:scale-95 shadow-2xl"
          type="button"
        >
          Add New Client
        </button>
      </div>
      <p className="mb-10 font-semibold">Powered By Edios Design ♆</p>
    </div>
  );
};

export default App;
