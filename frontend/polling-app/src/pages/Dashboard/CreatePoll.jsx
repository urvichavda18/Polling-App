import React, { useContext, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth';
import { UserContext } from '../../context/UserContext';

function CreatePoll() {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = (key, value)=>{
    setPollData((prev)=>({
      ...prev,
      [key]:value,
    }));
  };

  return (
    <DashboardLayout activeMenu='Create Poll'>
      <div className='bg-gray-100/80 my-5 p-5 rounded-lg mx-auto'>
        <h2 className="text-lg text-black font-medium">Create Poll</h2>
        <div className="mt-3">
          <label className='text-xs font-medium text-slate-600 '>QUESTION</label>
          <textarea
          placeholder="what's in your mind"
          className='w-full text-[13px] text-black outline-none bg-slate-200/80 rounded-md mt-2'
          rows={4}
          value={pollData.question}
          onChange={({target})=>{
            handleValueChange("question",target.value)
          }}
          />
        </div>
        <div className="mt-3">
        <label className='text-xs font-medium text-slate-600 '>POLL TYPE</label>
        <div className="flex gap-4 flex-wrap mt-3"></div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreatePoll;
