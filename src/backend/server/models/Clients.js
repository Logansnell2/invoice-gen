import mongoose from "mongoose";
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    NAME: { type: String, required: true },
    SURNAME: { type: String, required: true },
    CELL: { type: String, unique: true, required: true },
    RATE: { type: String, required: true },
    ID: { type: String, required: true },
  },
  { collection: "Clients" }
);

const ClientModel = mongoose.model("Clients", ClientSchema);
export default ClientModel;
