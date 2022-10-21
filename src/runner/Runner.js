import React from 'react'

export default function Runner(props) {
  return (
    <>
    <td>{props.name}</td>
    <td>{props.emailAddress}</td>
    <td>{props.club}</td>
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteRunner(props._id)}}>Delete</button></td>
    </>
  )
}
