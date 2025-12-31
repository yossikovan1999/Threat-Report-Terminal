import db from "../database/connection.js";
import { ObjectId } from "mongodb";

/**
 * add Report
 * @param {*} data 
 * @returns 
 */
export async function addReport(data) {
  const { threatLevel, confirmed = false } = data;

  //check is boolean
  if (typeof confirmed !== "boolean") {
    throw new Error("confirmed must be a boolean");
  }

  //check threat level is a number
  if (isNaN(threatLevel)) {
    throw new Error("threat level must be a number!");
  }

  //check threat level is in range
  if (Number(threatLevel) < 1 || Number(threatLevel) > 5) {
    throw new Error("threat level not in range (1-5)");
  }

  const sendData = { ...data, threatLevel: Number(threatLevel), confirmed : confirmed, timestamp : new Date()};

  const result = await db
    .collection("intel_reports")
    .insertOne(sendData);

  return result;
}

/**
 * get all the reports
 */
export async function getAllReports(){

    return await db.collection("intel_reports").find().toArray();
}

/**
 * get Above Level
 * @param {*} level 
 * @returns 
 */
export async function getAboveLevel(level){

    const query = {threatLevel : {$gt : level}}
    const result = await db.collection("intel_reports").find(query).toArray();

    return result;
}

/**
 * set Confirm
 * @param {*} id 
 * @returns 
 */
export async function setConfirm(id){
  
  console.log(id);

  const query = {$set : {confirmed : false}};
  const document = {_id : new ObjectId(id)};

  const result =  await db.collection("intel_reports").updateOne(document, query);

  return result;
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
export async function deleteUser(id){
  
  const result = await db.collection("intel_reports").deleteOne({_id : new ObjectId(id)});

  return result;

}