import express from "express";
import * as reportsController from "../controller/reportsController.js";

const router = express.Router();

router.post("/", reportsController.addReport);

router.get("/", reportsController.getAllReports);

export default router;