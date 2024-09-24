import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { rgb } from "pdf-lib";
import {
  incrementInvoice,
  updateCell,
  updateName,
  updateRate,
  updateSurname,
  updateTime,
} from "../redux/Slices/dataSlice";
import { PDFDocument } from "pdf-lib";
import PDf from "../assets/form.pdf";

const PdfGen = () => {
  const [data, setData] = useState();
  const [date, setDate] = useState("");
  const [que, setQue] = useState(0);
  const [time, setTime] = useState("");
  let ClientId = useSelector((state) => state.Client.ID);
  let ClientName = useSelector((state) => state.Client.NAME);
  let ClientSurname = useSelector((state) => state.Client.SURNAME);
  let ClientCell = useSelector((state) => state.Client.CELL);
  let ClientRATE = useSelector((state) => state.Client.RATE);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let invoiceNo = useSelector((state) => state.Client._ID);

  function getClient() {
    const url = `http://192.168.1.3:3001/client/${ClientId}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data); // Log the data after it's fetched
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }

  function handleNext(page) {
    if (page == 0) {
      let input = document.getElementById("input").value;
      setTime(input);
      dispatch(updateName(data.NAME));
      dispatch(updateCell(data.CELL));
      dispatch(updateSurname(data.SURNAME));
      dispatch(updateRate(data.RATE));
      setQue(1);
      let date = new Date();

      let localDate = date.toLocaleDateString("en-za");
      setDate(localDate);
    } else if (page == 1 && ClientName != "") {
      console.log("creaying pdf");
      setQue(2);
    } else if (page == 2) {
      console.log("showing pdf");
      createPdf(PDf, "src/assets/results.pdf");
      updateDb(ClientId);
      navigate("/");
    }
  }
  useEffect(() => {
    getClient();
  }, []);

  async function createPdf(input, output) {
    try {
      const pdfDoc = await PDFDocument.load(
        await fetch(PDf).then((res) => res.arrayBuffer())
      );

      //-----no of form fields----
      const formFields = pdfDoc.getForm().getFields();
      const fieldNames = formFields.map((f) => {
        f.getName();
      });

      //------access and edit fields-----
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      let fullName = ClientName + " " + ClientSurname;
      //-------------------top header----------
      firstPage.drawText(ClientId, {
        //----------invoice ID
        x: 130,
        y: height / 2 + 212,
        size: 20,
        color: rgb(0.54, 0.29, 0.17),
      });

      firstPage.drawText(date, {
        //----------Date
        x: 40,
        y: height / 2 + 190,
        size: 20,
        color: rgb(0.54, 0.29, 0.17),
      });

      firstPage.drawText(fullName, {
        //-----------Name
        x: width / 2 + 160,
        y: height / 2 + 214,
        size: 16,
        color: rgb(0.54, 0.29, 0.17),
      });
      firstPage.drawText(ClientCell, {
        //--------- CEll
        x: width / 2 + 182,
        y: height / 2 + 195,
        size: 15,
        color: rgb(0.54, 0.29, 0.17),
      });
      firstPage.drawText(ClientRATE, {
        //--------- Rate
        x: width / 2 - 15,
        y: height / 2 + 70,
        size: 16,
        color: rgb(0.54, 0.29, 0.17),
      });
      firstPage.drawText(time, {
        //--------- time
        x: width / 2 + 100,
        y: height / 2 + 70,
        size: 16,
        color: rgb(0.54, 0.29, 0.17),
      });
      let price = Number(time) * Number(ClientRATE);
      firstPage.drawText("R" + price, {
        //--------- price
        x: width / 2 + 172,
        y: height / 2 + 70,
        size: 16,
        color: rgb(0.54, 0.29, 0.17),
      });

      firstPage.drawText("R" + price, {
        //--------- price
        x: width / 2 + 172,
        y: height / 2 - 187,
        size: 16,
        color: rgb(0.54, 0.29, 0.17),
        
      });

      firstPage.drawText("R" + price, {
        //--------- price
        x: width / 2 + 170,
        y: height / 2 - 217,
        size: 20,
        color: rgb(0.54, 0.29, 0.17),
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "result";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(fieldNames);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateDb(ID) {
    let update = Number(ID) + 1;
    update = String(update);
    axios.put(`http://192.168.1.3:3001/client/${ID}/${update}`);
  }

  switch (que) {
    case 0:
      return (
        <div
          className=" w-screen h-screen bg-bg flex-col items-center place-content-center flex "
          id="container"
        >
          <p className="text-2xl"> How Long Was today's Session?</p>
          <div className="flex text-xl">
            <input
              type="number"
              defaultValue="1"
              id="input"
              className=" text-right w-10"
            />
            <p>Hours</p>
          </div>
          <button
            onClick={() => handleNext(0)}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl my-5"
            type="button"
          >
            Next
          </button>
        </div>
      );

      break;

    case 1:
      return (
        <div
          className=" w-screen h-screen bg-bg flex-col items-center place-content-center flex "
          id="container"
        >
          This is a invoice for {ClientName}
          <button
            className=" border-4 border-main p-3 rounded-lg bg-main text-bg text-xl active:scale-95 shadow-2xl"
            onClick={() => handleNext(1)}
          >
            Create Invoice
          </button>
        </div>
      );

      break;
    case 2:
      return (
        <div
          className=" w-screen h-screen bg-bg flex-col items-center place-content-center flex "
          id="container"
        >
          <div className="text-2xl">This is a invoice for {ClientName}</div>

          <button
            className=" border-4 border-main p-3 rounded-lg bg-main text-bg text-xl active:scale-95 shadow-2xl"
            onClick={() => handleNext(2)}
          >
            SHOW INVOICE
          </button>
        </div>
      );

      break;

    default:
      break;
  }
};

export default PdfGen;
