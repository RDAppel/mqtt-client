
const mqtt = require('mqtt')
const wildcard = require('mqtt-wildcard')

const client = mqtt.connect(process.env.MQTT_HOST)

const publish = client.publish.bind(client)

const subscribe = (topic, callback) => {

	const subscribeTopic = topic
	client.subscribe(subscribeTopic)

	client.on('message', (topic, payload) => {
		const message = payload.toString()
		const fullTopic = topic
		const wildcards = wildcard(fullTopic, subscribeTopic)
		console.log({ message, fullTopic, wildcards })
		callback({ message, fullTopic, wildcards })
	})
}

module.exports = { publish, subscribe }