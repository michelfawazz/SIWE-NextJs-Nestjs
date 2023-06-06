import withAuthorization from "./middlewares/withAuthorization";
import { NextMiddleware, NextResponse } from "next/server";


const mainMiddleware: NextMiddleware = (request) => {
  const res = NextResponse.next();

  return res;
};
export default withAuthorization(mainMiddleware,
  ["/profile"],
  ["/login","/signup"]

);


