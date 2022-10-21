import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Runner from './Runner';
import RunnerCreateForm from './RunnerCreateForm';
import RunnerEditForm from './RunnerEditForm';

export default function RunnerList() {

const [runners, setRunners] = useState([]);
const [isEdit, setIsEdit] = useState(false);
const [currentRunner, setCurrentRunner] = useState({})



useEffect(() => {

    loadRunnerList()
}, [])

const loadRunnerList = () => {

    Axios.get("runner/index")
    .then(response => {
        console.log(response);
        setRunners(response.data.runners)
    })
    .catch(error => {
        console.log("Error when retrieving runners")
        console.log(error);
    })
}

const loadRaceList = (runner) => {
    console.log(runner)
    if(runner.race){
        const races = runner.race.map((item, key) => (
            <td key={key}>
                <li>{item.event}</li>
            </td>
        ))
        return races;
    }
}

const addRunner = (runner) => {
    Axios.post("runner/add", runner, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        console.log("Runner Added succesfully")
        loadRunnerList();
    })
    .catch(error => {
        console.log("Error when adding runners")
        console.log(error);
    })
}

const editView = (id) => {
    Axios.get(`runner/edit?id=${id}`, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        console.log(response.data.runner)
        let runner = response.data.runner
        console.log("Loaded Runner information for edit")
        setIsEdit(true)
        setCurrentRunner(runner)
    })
    .catch(error => {
        console.log("Eroror loading author information")
        console.log(error)
    })
}

const editRunner = (runner) => {
    Axios.put("runner/update", runner, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        console.log("Runner updated succesfully")
        console.log(response)
        loadRunnerList();
    })
    .catch(error => {
        console.log("Error editing Runner")
        console.log(error);
    })
}

const deleteRunner = (id) => {
    Axios.delete(`runner/delete/?id=${id}`, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        console.log("record deleted succesfully")
        console.log(response)
        loadRunnerList();
    })
    .catch(error => {
        console.log(error);
    })
}

console.log(runners)

const allRunners = runners.map((runner, index) => (
    <tr key={index}>
        <Runner {...runner} 
        editView={editView} 
        deleteRunner={deleteRunner}/>
        {loadRaceList(runner)}
    </tr>
))
  return (
    <div>
        <h1> Runner List </h1>
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>emailAddress</th>
                    <th>Club</th>
                </tr>
                {allRunners}
                </tbody>
            </table>
        </div>
        {(!isEdit) ?
        <RunnerCreateForm 
        addRunner={addRunner} />
        :
        <RunnerEditForm 
        key={currentRunner._id} 
        runner={currentRunner} 
        editRunner={editRunner}/>}
    </div>
  )
}
