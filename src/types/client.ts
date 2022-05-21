import ClientWritable from "./client-writable";

type Client = {
  clientId: number;
  userId: number;
} & ClientWritable;

export default Client;
