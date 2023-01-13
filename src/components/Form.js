import React, {useContext} from 'react'

import {DataContext} from '../context/State'
import { ACTIONS } from '../context/Actions'

import {postData, putData} from '../utils/fetchData'

const Form = ({formData, setFormData}) => {
    const { dispatch} = useContext(DataContext)

    const { subject, body, id } = formData

    const handleOnchange = e => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!subject || !body) return
    
        const post = {message: {subject, body}}

        if(!id){
            const res = await postData(post)
            if(res.err) return console.log(res.err)
    
            dispatch({ type: ACTIONS.ADD_MESSAGE, payload: res.data })
            setFormData({...formData, subject: '', body: ''})
        }else {
            const res = await putData(id, post)
            if(res.err) return console.log(res.err)
    
            dispatch({ type: ACTIONS.UPDATE_MESSAGE, payload: res.data })
            setFormData({...formData, subject: '', body: '', id: ''})
        }
    }

  return (
    <div className="w-full max-w-sm mx-auto lg:m-0">
        <form 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        >
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="text" 
             placeholder="Subject" 
             name="subject"
             value={subject} 
             onChange={handleOnchange}
             />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Body
            </label>
            <textarea 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Body"
            name="body"
            onChange={handleOnchange}
            value={body}
            >
            </textarea>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Send
            </button>
            </div>
        </form>
    </div>
  )
}

export default Form