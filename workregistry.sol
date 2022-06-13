// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

contract Work_Attendance {
    uint256 workerID = 47134;
    struct Work{
        uint256 id;
        string name;
        string occupation;
        uint256 salary;

    }

    uint public age  = 2001;
    event Log(address _sender, string text);
    event IndexedLog(string indexed name);


    mapping (string=>Work) public WorkersRegistry;
    Work[] public TotalWorkers;
    mapping (string=>string) public occupation;

    function createWorker(string  calldata _name, string calldata _occupation, uint256 _salary) public {
        workerID++;
        // WorkersRegistry[workerID]=Work(workerID,_name,_occupation,_salary);
        Work memory work = Work(workerID, _name, _occupation, _salary);
        TotalWorkers.push(work);
        WorkersRegistry[_name]= work;
        occupation[_name]=_occupation;

        emit Log(msg.sender, 'deployed successfully');
        emit IndexedLog('Ayo Kante');
    }

    function getWorkerByID (string calldata _name) public view returns (string memory) {
        return occupation[_name];
    }

    function getBalance() external view returns(uint){
        return address(this).balance;
    }

    function getWorker(string calldata _name) external view returns(Work memory) {
        return WorkersRegistry[_name];
    }
    

}