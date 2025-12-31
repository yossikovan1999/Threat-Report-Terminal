import express from "express";
import * as reportsController from "../controller/reportsController.js";

const router = express.Router();

router.post("/", reportsController.addReport);

router.get("/", reportsController.getAllReports);

router.get("/high", reportsController.getAboveLevel);

router.put("/:id/confirm", reportsController.setConfirm);

router.delete("/:id", reportsController.deleteUser);

export default router;
