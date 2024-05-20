import { app } from "./app.js";
import { connectDb } from "./data/database.js";


connectDb;
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
        console.log(`server is working on ${process.env.PORT}`);
});
