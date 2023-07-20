import React, { useEffect } from 'react'
import axios from 'axios'
import config from './config.json'
import React, { useEffect } from 'react'
import axios from 'axios'
import config from './config.json'

function App() {
    const [persons, setPersons] = React.useState([])
    useEffect(() => {
        axios
            .get(`${config.api_base_url}/person`)
            .then((response) => {
                setPersons(response.data)
            })
            .catch((error) => console.log(error))
    }, [])

    const [details, setDetails] = React.useState({ name: '', surname: '' })

    const handleChange = (event) => {
        setDetails((details) => {
            return {
                ...details,
                [event.target.name]: event.target.value,
            }
        })
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${config.api_base_url}/person/`,
                details
            )
        setPersons(response.data)
        } catch (error) {
            console.log('error  ', error)
        }
    }

    return (
        <div className='App'>
            <div>
                <ul>
                    {persons.length > 0
                        ? persons.map((person, index) => {
                              return (
                                  <li key={index}>
                                      {person.name} {' - '} {person.surname}
                                  </li>
                              )
                          })
                        : null}
                </ul>
            </div>

            <div style={{ marginLeft: '10px' }}>
                <input
                    name='name'
                    value={details.name}
                    onChange={handleChange}
                    placeholder='name'
                />
            </div>
            <div style={{ marginLeft: '10px' }}>
                <input
                    name='surname'
                    value={details.surname}
                    onChange={handleChange}
                    placeholder='surname'
                />
            </div>
            <button style={{marginLeft:'10px'}} onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default App
