import mongoose from "mongoose"

const mongoUri =
  "mongodb+srv://loop:8nz3NrVvJ4qBmmUp@cluster0.1hc8nrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUri, {})

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected")
})

mongoose.connection.on("error", () => {
  console.log("Mongoose connection error")
})

process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    console.log("Mongoose connection closed")
    process.exit(0)
  })
})

export const databaseConnection = mongoose.connection
