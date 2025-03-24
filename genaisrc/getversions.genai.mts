
script({
    group: "mcp",
    accept: "none",
    title: "Get Version",
    description: "Use this tool to get the version number of a CLI/Tool",
    parameters: {
        selectedTool: {
            type: "string",
            required: true,
            description: "Tool's executable name. For example: python3, node, etc. The version number will be fetched using the --version flag by default.",
        },
        versionFlag: {
            type: "string",
            required: true,
            description: " Flag for getting the the version number. Default is --version.",
        }        
    },    
})
const log = host.logger(">>>get_version<<<:");
log("Starting script...");
const { output } = env
const {selectedTool, versionFlag} = env.vars;
log(`Getting version number for ${selectedTool}...`);
if(!selectedTool){
    log(JSON.stringify(env.vars));
}
let { stdout, stderr } = await host.exec(selectedTool, [versionFlag]);
log(stdout);
if(stderr){
    log(`Error getting version: ${stderr}`);
    output.fence(`Error getting version: ${stderr}`);
}
else{
    output.fence(`Version of ${selectedTool}: ${stdout}`);
}