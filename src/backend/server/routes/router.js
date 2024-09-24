import express from "express";
import { Router } from "express";
import ClientModel from "../models/Clients.js";

const router = Router();

router.get("/clients", async (req, res) => {
  try {
    const clientData = await ClientModel.find({}).exec();

    if (clientData && clientData.length > 0) {
      res.status(200).json(clientData);
    } else {
      res.status(404).json({ message: "no Clients found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retriving users", Error: error });
  }
});

router.put("/createNewClient", async (req, res) => {
  const { Name, Surname, Cell, Rate, ID } = req.body;

  try {
    const newClient = await ClientModel.create({
      NAME: Name,
      SURNAME: Surname,
      CELL: Cell,
      RATE: Rate,
      ID: ID,
    });
    return res.status(201).json({ message: "Client Created" });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error creating Client", Error: error });
  }
});

router.get("/client/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    const clientData = await ClientModel.findOne({ ID: id }).exec();

    if (clientData) {
      res.status(200).json(clientData);
    } else {
      res.status(404).json({ message: "no Client found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retriving users", Error: error });

    console.error(error);
  }
});

router.put("/client/:ID/:update", async (req, res) => {
  const update = req.params.update;
  const id = req.params.ID;

  try {
    const updatedClient = await ClientModel.findOneAndUpdate(
      { ID: id },
      { ID: update },
      { new: true } // This returns the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res
      .status(200)
      .json({ message: "Updated successfully", client: updatedClient });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating client", error: error.message });
  }
});

export default router;
