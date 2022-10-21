import React, { useState } from 'react'

export default function RunnerCreateForm(props) {

    const [newRunner, setNewRunner] = useState({})

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        // Creating a copy of newRunner state
        const runner = {...newRunner}
        runner[attributeToChange] = newValue
        console.log(runner)
        setNewRunner(runner)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addRunner(newRunner);
        event.target.reset();
    }

  return (
    <div>
        <h1>Create Runner</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input name="name" type="text" onChange={handleChange}></input>
            </div>

            <div>
                <label>Email Address</label>
                <input name="emailAddress" type="text" onChange={handleChange}></input>
            </div>

            <div>
                <label>Club</label>
                <input name="club" type="text" onChange={handleChange}></input>
            </div>

            <div>
                <input type="submit" value="Add Runner"></input>
            </div>
        </form>
    </div>
  )
}
