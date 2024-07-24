import { app } from "./app"

const port = process.env.PORT

app.listen(8080, () => {
  console.log(`Server is running on port ${port}`)
})
