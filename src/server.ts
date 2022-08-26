import {SqsClient} from "./infra/sqs";

const sqs = new SqsClient();
const call = async () => {
	// await sqs.sendMessage({name:"gatao", body: { seila: "xczgsdr" }, value: "sdfsdf" })
	const data = await sqs.receiveMessage({name: "gatao" });
	data.Messages.map((message:{ReceiptHandle:string})=>{
		sqs.deleteMessage({ReceiptHandle:message.ReceiptHandle});

	});
};
call();
