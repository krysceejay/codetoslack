import React, {useState, useEffect, useContext} from 'react';

import Form from './components/Form'

import {DataContext} from './context/State'
import { ACTIONS } from './context/Actions'

import {getData, deleteData} from './utils/fetchData'

function App() {

  const {state, dispatch} = useContext(DataContext)
  const {messages} = state

  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    id: ''
  })

  useEffect(() => {
    getData().then(res => {
            if(res.err) return console.log(res.err)
            dispatch({ type: ACTIONS.GET_MESSAGES, payload: res.data })
        }).catch(err => console.log(err))
  }, [dispatch])

  const deleteMessage = async id => {
    const res = await deleteData(id)
    if(res.err) return console.log(res.err)

    dispatch({ type: ACTIONS.DELETE_MESSAGES, payload: id })
}

const updateMessage = msg => {
  setFormData({...formData, subject: msg.subject, body: msg.body, id: msg.id})
}

  return (
    <main className="mb-8 mt-[92px]">
      <section className="mx-4 lg:mx-16 block lg:flex lg:space-x-10 items-start">
        <Form formData={formData} setFormData={setFormData}  />
        <div className="flex-1 mt-8 lg:mt-0">
          {messages.length === 0 ? <h3>No Message</h3> : 
               <table className="border-collapse w-full text-sm font-normal table-fixed">
              <thead>
                <tr className="bg-[#0D70BF] text-white">
                    
                    <th className="border-0 text-left p-4">
                      <span className="text-sm mr-2">Subject</span>
                    </th>
                    <th className="border-0 text-left p-4">
                      <span className="text-sm mr-2">Body</span>
                    </th>
                    <th className="border-0 text-left p-4">
                      <span className="text-sm mr-2">Actions</span>
                    </th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => {
                      return <tr key={msg.id} className="bg-[#F8F9FF]">
                      <td data-heading="Subject" className="text-left p-4 break-words border-r-0 border-l-0">{msg.subject}</td>
                      <td data-heading="Body" className="text-left p-4 break-words border-r-0 border-l-0">{msg.body}</td>
                      <td data-heading="Actions" className="text-left p-4 break-words border-r-0 border-l-0 flex space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        onClick={() => updateMessage(msg)}
                        className="w-6 h-6 cursor-pointer">
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        onClick={() => deleteMessage(msg.id)}
                        className="w-6 h-6 cursor-pointer">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    })
                  }
              </tbody>
            </table>
            }
        </div>
      </section>
    </main>
  );
}

export default App;
