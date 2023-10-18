import axios from 'axios';

const MAIN_MACHINE_API_BASE_URL = "http://localhost:8081/api/v1/maintenanceMachines";

class MaintenanceMachineService{
    getMachines(){
        return axios.get(MAIN_MACHINE_API_BASE_URL);
    }

    createMachine(machine){
        return axios.post(MAIN_MACHINE_API_BASE_URL, machine);
    }

    getMachineById(machineId){
        return axios.get(MAIN_MACHINE_API_BASE_URL + '/' + machineId)
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
    return axios.put(MAIN_MACHINE_API_BASE_URL + '/' + machineId, machine);
}


    deleteMachine(machineId){
        return axios.delete(MAIN_MACHINE_API_BASE_URL + '/' + machineId);
    }

    getMachinesByArea(area) {
        return axios.get(`${MAIN_MACHINE_API_BASE_URL}/byArea/${area}`)
        .then((response) => {
            console.log("Response:", response.data);
            return response;
        })
        .catch((error) => {
            console.log("Error:", error);
            throw error;
        });
    }
}

const machineServiceInstance = new MaintenanceMachineService();

export default machineServiceInstance;