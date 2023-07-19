
const mqtt = require('mqtt')
const wildcard = require('mqtt-wildcard')

const host = process.env.MQTT_HOST || 'wxs://192.168.1.9'
const client = mqtt.connect(host)

const publish = client.publish.bind(client)

const subscribe = (topic, callback) => {

	const subscribeTopic = topic
	client.subscribe(subscribeTopic)

	client.on('message', (topic, payload) => {
		const message = payload.toString()
		const fullTopic = topic
		const wildcards = wildcard(fullTopic, subscribeTopic)
		console.log({ message, fullTopic, wildcards })
		callback({ message, fullTopic, wildcards, subscribeTopic })
	})
}

module.exports = { publish, subscribe }