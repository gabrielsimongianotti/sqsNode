import { AWSError, SQS } from "aws-sdk";

export interface ISqsClient {
  sendMessage: ({ name, value, body }:{ name:string, value:string, body: object }) => Promise<SQS.Types.SendMessageResult | AWSError>
  receiveMessage({name}:{name:string}): Promise<SQS.Types.ReceiveMessageResult | AWSError>
  deleteMessage({ReceiptHandle}:{ReceiptHandle:string}):  Promise<SQS.Types.ReceiveMessageResult | AWSError>
}
