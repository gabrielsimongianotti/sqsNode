import AWS, { SQS } from "aws-sdk";

AWS.config.update({region:"us-east-1"});

const sqs = new AWS.SQS({apiVersion: "2012-11-05"});
const QueueUrl = "https://sqs.sa-east-1.amazonaws.com/061219497582/gataoSqs";


export class SqsClient {

	async sendMessage({ name, value, body }:{ name:string,value:string, body: object }) {

		const params:SQS.Types.SendMessageRequest={
			DelaySeconds:10,
			MessageAttributes:{
				[name]: {
					DataType: "String",
					StringValue: value
				},
			},
			QueueUrl,
			MessageBody: JSON.stringify(body),
		};
    

    
		const data = await sqs.sendMessage(params).promise();
		return data;
	}

	async receiveMessage({name, MaxNumberOfMessages=10}:{name:string,MaxNumberOfMessages?: number}) {
		const params = {
			AttributeNames: [
				"SentTimestamp"
			],
			MaxNumberOfMessages,
			MessageAttributeNames: [
				name
			],
			QueueUrl,
			VisibilityTimeout: 20,
			WaitTimeSeconds: 0
		};

		const data = await sqs.receiveMessage(params).promise();
     
		return data;
	}

	deleteMessage({ReceiptHandle}:{ReceiptHandle:string}){
		const params = {
			QueueUrl,
			ReceiptHandle
		};

		const data = sqs.deleteMessage(params).promise();
		return data;
	}
}

