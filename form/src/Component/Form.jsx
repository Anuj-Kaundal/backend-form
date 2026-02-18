import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Form() {
  const [formData, setFormData] = useState({ // object that store the value
    fullname: '', // same name that are in input feild names
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  // login part
  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  });
  console.log(loginData);
  const [update, setUpdate] = useState(false);
  const [showData, setShowData] = useState([]); // this line is use to fetch the data
  // ## useState is used to store and update data in a component.
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  console.log('edit Id : ', editId)
  const [error, setError] = useState('');
  console.log(formData); // just to check its print or not

  const handleclick = (e) => {
    const { name, value } = e.target; // e.target → the input field ## name → input’s name attribute ## value → current text typed by the user
    console.log(name, value);
    setFormData((e) => ({ // use to show the updated value into field 
      ...e, [name]: value
    }));
  }


   const handlelogin = (e) => {
    const { name, value } = e.target; // e.target → the input field ## name → input’s name attribute ## value → current text typed by the user
    console.log(name, value);
    setLoginData((e) => ({ // use to show the updated value into field 
      ...e, [name]: value
    }));
  }


  const fetchdata = async () => {
    const data = await axios.get(`${import.meta.env.VITE_BACKEND}/getdata`);
    console.log(data, 'all data');
    setShowData(data.data);
  }
  useEffect(() => {

    fetchdata();

  }, [])
  const registration = async (e) => {

    e.preventDefault(); // is used to reload the page after submit the data.
    setLoading(true)
    if (formData.password != formData.confirm_password) { // check both password and confirm_password are smae or not
      return setError('password not same');
    }
    console.log('trigger api for submitting form application');
    const res = await axios.post(`${import.meta.env.VITE_BACKEND}/post`, {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });


    setLoading(false);
    fetchdata();
    setFormData({
      fullname: '', // same name that are in input feild names
      email: '',
      phone: '',
      password: '',
      confirm_password: ''
    })
    return setSuccess('Form Submitted', res)
  }

  const UserLogin= async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post()


    }catch(err){
      console.log('err : ', err.message)
    }
  }


  const userUpdate = async ({ e, user }) => {
    e.preventDefault();
    setEditId(user._id)
    setUpdate(true);
    const id = user._id
    console.log(id);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      password: user.password,
      confirm_password: user.password
    });
  }
  const deleteUser = async (id) => {
    console.log('usser Id ', id)

    try {

      const res = await axios.delete(`${import.meta.env.VITE_BACKEND}/delete/${id}`)
      console.log('user deleted : ', res)
      fetchdata();


    } catch (err) {
      console.log('Getting erro while deleting :', err)
    }
  }
  const update_user = async (e, id) => {
    e.preventDefault();
    const user_update = await axios.put(`${import.meta.env.VITE_BACKEND}/update/${id}`, {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    console.log('update User : ', user_update)
    fetchdata();
    setFormData({
      fullname: '', // same name that are in input feild names
      email: '',
      phone: '',
      password: '',
      confirm_password: ''
    })
  }
  return (
    <>
      <div className='bg-linear-to-t from-purple-900 to-purple-400 min-h-screen flex justify-center p-5'>
        <div className='p-10 border-2 border-purple-950 w-full max-w-xl bg-white rounded-xl'>
          <h1 className='text-center text-purple-900 text-3xl font-bold'>Registration Form</h1><br />

          <form action="" className='flex flex-col gap-4'>
            <label htmlFor="name" className='text-lg font-semibold'>Full Name</label>
            <input type="text" name="fullname" id="fullname" value={formData.fullname} onChange={handleclick} placeholder='Enter your fullname....' className='rounded-sm p-2 border border-purple-300 bg-gray-100 text-black' />
            <label htmlFor="email" className='text-lg font-semibold'>Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleclick} placeholder='Enter your email....' className='rounded-sm p-2 border border-purple-300 bg-gray-100 text-black' />
            <label htmlFor="phone" className='text-lg font-semibold'>Phone Number</label>
            <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleclick} placeholder='Enter your phone number....' className='rounded-sm p-2 border border-purple-300 bg-gray-100 text-black' />
            <div className='flex justify-between'>
              <label htmlFor="password" className='text-lg font-semibold'>Password</label>
              {
                error != '' && (
                  <>
                    <span className='text-red-600 font-semibold'>*{error}*</span>
                  </>
                )
              }
            </div>

            <input type="password" name="password" id="password" value={formData.password} onChange={handleclick} placeholder='Enter your password....' className='rounded-sm p-2 border border-purple-300 bg-gray-100 text-black' />
            <label htmlFor="confirm_password" className='text-lg font-semibold'>Confirm Password</label>
            <input type="password" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleclick} placeholder='Confirm your password' className='rounded-sm p-2 border border-purple-300 bg-gray-100 text-black' />
            <button type='submit' onClick={(e) => {
              if (editId) {
                update_user(e, editId)
              } else {
                registration(e)
              }
            }} className='w-full bg-purple-900 text-white p-2 rounded-sm font-senibold text-xl cursor-pointer'>{loading ? 'Submit....' : update ? 'Update' : 'Submit'}</button>
            {
              success != '' && (
                <>
                  <span className='text-red-700 font-bold text-center'>{success}</span>
                </>
              )
            }
          </form>
        </div>
      </div>

      {/* show data */}
      <div className="min-h-screen bg-gradient-to-t from-purple-900 to-purple-400 p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          All Users
        </h1>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl max-w-6xl mx-auto overflow-x-auto">

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Password</th>
                <th className="p-4">Delete</th>
                <th className="p-4">Update</th>
              </tr>
            </thead>

            <tbody>
              {showData.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-purple-100 transition"
                >
                  <td className="p-4 font-medium">{user.fullname}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    {user.password}
                  </td>
                  <td className="p-4 text-red-500 font-bold cursor-pointer" onClick={() => deleteUser(user._id)}  >Delete</td>
                  <td className="p-4 text-red-500 font-bold cursor-pointer " onClick={(e) => userUpdate({ e, user })}>Update</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {showData.length === 0 && (
            <p className="text-center p-6 text-gray-500">
              No users found
            </p>
          )}
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <form className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4">

          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Login
          </h2>

          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handlelogin}
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={handlelogin}
            placeholder="Enter your password"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="submit"
            name="Submit"
            id="submit"
            value="Login"
            className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
            onClick={UserLogin}
          />

        </form>
      </div>

    </>
  )
}

export default Form