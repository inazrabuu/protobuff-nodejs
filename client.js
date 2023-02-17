const PROTO_PATH = __dirname + '/proto/employee.proto'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
let employeeProto = grpc.loadPackageDefinition(packageDefinition).employee

function main() {
    let client = new employeeProto.Employee('localhost:4500', grpc.credentials.createInsecure())
    let employeeId = 1

    if (process.argv.length >= 3) {
        employeeId = process.argv[2]
    }
    
    client.getDetails({id: employeeId}, (err, response) => {
        if (err) console.error(`Error ${err}`)
        console.log(response.message)
    })
}

main()