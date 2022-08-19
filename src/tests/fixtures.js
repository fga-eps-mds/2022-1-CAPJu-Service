import mongoose from "mongoose";
import supertest from "supertest";

export const createStage = async (name, time, app) => {
  return await supertest(app).post("/newStage").send({
    name: name,
    time: time,
    deleted: false
  });
};

export const createFlow = async (app, name='flow1') => {
  const resStage1 = await createStage('stage1', '15', app);
  const resStage2 = await createStage('stage2', '15', app);
  const resStage3 = await createStage('stage3', '15', app);
  const stageArray = [resStage1.body._id, resStage2.body._id, resStage3.body._id];
  const sequenceArray = [
    {
      from: resStage1.body._id,
      to: resStage2.body._id,
    },
    {
      from: resStage2.body._id,
      to: resStage3.body._id,
    },
  ];

  const responseFlow = await supertest(app).post("/newFlow").send({
    name: name,
    stages: stageArray,
    sequences: sequenceArray,
  });
  return {
    responseFlow: responseFlow,
    name: name,
    stageArray: stageArray,
    sequenceArray: sequenceArray
  }
}

export const mongoDB = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(
      process.env.MONGODB_URI_TESTE || "mongodb+srv://capju:3npIZt0BDreDRJTI@cluster0.aqleb.mongodb.net/AquilesTeste?retryWrites=true&w=majority"
    );
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
