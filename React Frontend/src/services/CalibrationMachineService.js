import axios from 'axios';

const CAL_MACHINE_API_BASE_URL = "http://localhost:8081/api/v1/calibrationMachines";

class calibrationMachineServices{

    getMachines(){
        return axios.get(CAL_MACHINE_API_BASE_URL);
    }

    createMachine(machine){
        return axios.post(CAL_MACHINE_API_BASE_URL, machine);
    }

    getMachineById(machineId){
        return axios.get(CAL_MACHINE_API_BASE_URL + '/' + machineId)
            .then((response) => {
                console.log("Response:", response.data);
                return response;
            })
            .catch((error) => {
                console.log("Error:", error);
                throw error;
            })
    }

    updateMachine(machine, machineId){
        return axios.put(CAL_MACHINE_API_BASE_URL + '/' + machineId, machine);
    }

    deleteMachine(machineId){
        return axios.delete(CAL_MACHINE_API_BASE_URL + '/' + machineId);
    }

    getMachinesByArea(area){
        return axios.get(`${CAL_MACHINE_API_BASE_URL}/byArea/${area}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
    }

    updateStatusOfAllMachines(){
        return axios.put(`${CAL_MACHINE_API_BASE_URL}/updateAllMachinesStatus`);
    }
}

const machineServiceInstance = new calibrationMachineServices();

export default machineServiceInstance;