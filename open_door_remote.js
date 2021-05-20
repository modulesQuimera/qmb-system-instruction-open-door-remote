module.exports = function(RED) {

	function open_door_remoteNode(config) {
		RED.nodes.createNode(this,config);
		this.pulse_door_one = config.pulse_door_one;
		this.pulse_door_two = config.pulse_door_two;
        this.pulse_interval = config.pulse_interval;
        this.pulse_length = config.pulse_length;
        this.edge = config.edge;


		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "open_door_remote",
                payload: {
                    attributes: [
                        { name: "pulse_door_1", value: parseInt(node.pulse_door_one) },
                        { name: "pulse_door_2", value: parseInt(node.pulse_door_two) },
                        { name: "pulse_length", value: parseInt(node.pulse_length) },
                        { name: "pulse_interval", value: parseInt(node.pulse_interval) },
                        { name: "edge", value: node.edge === "true" ? true : false }
                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("open_door_remote", open_door_remoteNode);
}