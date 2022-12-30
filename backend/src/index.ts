import httpServer from "./server";
import mongoConnect from "./mongo";

(async () => console.log('hello world!'))();

mongoConnect();

const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, () => { console.log(`listening on PORT ${PORT}`) });