const ethers = require("ethers")
const solc = require("solc")
const fs = require("fs-extra")
require("dotenv").config();

//GET ALL CONSTS 

// const workerName = document.getElementById('name').value;
// const workerOccupation = document.getElementById('occupation').value;
// const workerSalary = document.getElementById('salary').value;



async function main() {
    // First, compile this!
    // And make sure to have your ganache network up!
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = wallet.connect(provider);
    const abi = fs.readFileSync("./workregistry_sol_Work_Attendance.abi", "utf8")
    const binary = fs.readFileSync(
        "./workregistry_sol_Work_Attendance.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    const owner = wallet.address;

    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy();
    // const contract = await contractFactory.deploy({ gasPrice: 100000000000 });

    // const deploymentReceipt = await contract.deployTransaction.wait(1)

    // console.log(deploymentReceipt);
    console.log(`Contract deployed by owner: ${owner}`);

    console.log(`Contract deployed to ${contract.address}`)
    




    

    
    //MY CODE

    // let balance = await contract.getBalance();
    // console.log(balance);
    
    const users = [
        {
            user: 'John',
            job: 'Architect',
            salary: 1229393
        },
        {
            user: 'Kante',
            job: 'Footballer',
            salary: 122039393
        },
        {
            user: 'Idowu',
            job: 'Graphics',
            salary: 122229393
        }
    ]
    
    
        
    let createWorker = await contract.createWorker('Ayo', 'Blockchain Developer', 130000 );

    createWorker.wait();

    let worker = await contract.getWorker('Ayo');
    console.log('Registration successful.....');
    console.log('Displaying Details.....');
    console.log(worker.name);

    const id = worker.id
    // console.log(id);
    // console.log(worker.occupation);
    const salary = worker.salary
    // console.log(salary);



    let occupation = await contract.getWorkerByID('Ayo');
    console.log(`Ayo is a ${occupation} and he earns ${salary}. His ID is: ${id}`);

    

    

    //END OF MY CODE


}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })





