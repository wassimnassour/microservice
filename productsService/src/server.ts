import { app } from "./app"

const port = 4000

app.listen(port || 8000, () => {
  console.log(`Server is running on port ${port}`)
})
