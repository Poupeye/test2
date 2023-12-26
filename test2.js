import { check, sleep } from "k6";
import {
    Writer,
    Reader,
    Connection,
    SchemaRegistry,
    SCHEMA_TYPE_AVRO,
} from "k6/x/kafka";

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'ramping-arrival-rate',
            startRate: 10,
            timeUnit: '1s',
            preAllocatedVUs: 20,

            stages: [
                { target: 10, duration: '3m' },
                { target: 20, duration: '3m' },
            ],
        },
    },
};

const brokers = ["localhost:29092"];
const topic = "In";

const writer = new Writer({
    brokers: brokers,
    topic: topic,
    autoCreateTopic: false,
});
const reader = new Reader({
    brokers: brokers,
    topic: topic,
});
const connection = new Connection({
    address: brokers[0],
});
const schemaRegistry = new SchemaRegistry();

if (__VU == 0) {
    connection.createTopic({ topic: topic });
}

const valueSchema = JSON.stringify({
    type: "record",
    name: "Value",
    namespace: "dev.mostafa.xk6.kafka",
    fields: [
        {
            name: "name",
            type: "string",
        },
    ],
});

export default function () {
        let messages = [
            {
                value: schemaRegistry.serialize({
                    data: {
                        name: "test",
                    },
                    schema: { schema: valueSchema },
                    schemaType: SCHEMA_TYPE_AVRO,
                }),
            },
        ];
        writer.produce({ messages: messages });

        sleep(1);
}

export function teardown(data) {
    writer.close();
    reader.close();
    connection.close();
}