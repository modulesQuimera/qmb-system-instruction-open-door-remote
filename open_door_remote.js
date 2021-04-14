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
                        { pulse_door_1:  parseInt(node.pulse_door_one) },
                        { pulse_door_2:  parseInt(node.pulse_door_two) },
                        { pulse_length:  parseInt(node.pulse_length) },
                        { pulse_interval:  parseInt(node.pulse_interval) },
                        { edge: node.edge === "true" ? true : false }
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