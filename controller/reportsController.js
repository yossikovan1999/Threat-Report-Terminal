import * as reportService from "../services/reportService.js";

/**
 * add a report to the db.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function addReport(req, res, next) {
  try {
    const { fieldCode, location, description, threatLevel } = req.body;

    if (!(fieldCode && location && description && threatLevel)) {
      throw new Error(
        "must include the field code, location, threat level and the description."
      );
    }

    const { insertedId } = await reportService.addReport(req.body);

    console.log(insertedId.toString());

    return res.status(201).json({ message: "data inserted successfully." });
  } catch (error) {
    next(error);
  }
}

/**
 * get All Reports
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function getAllReports(req, res, next) {
  try {
    const reports = await reportService.getAllReports();
    return res.json(reports);
  } catch (error) {
    next(error);
  }
}

export async function getAboveLevel(req, res, next) {
  try {
    const { level = 4 } = req.query;
    const reports = await reportService.getAboveLevel(level);
    return res.status(201).json(reports);
  } catch (error) {}
}
