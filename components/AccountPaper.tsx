import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Alert from './Alert';
import Input from './Input'

interface Props {
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

const AccountPaper: React.FC<Props> = ({data}) => {
    const [show, setShow] = useState(false);
    const router = useRouter();


    const defaultValues = {
    email: data?.email,
    password: "",
    firstName: data?.firstName,
    lastName: data?.lastName,
  }

  const schemaSignup = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstName: z.string().min(2, { message: "Fist Name must be 2 or more characters" }),
    lastName: z.string().min(2, { message: "Last Name must be 2 or more characters" }),
  })
    const {register, handleSubmit, getValues, formState} = useForm({resolver: zodResolver(schemaSignup), defaultValues: defaultValues});
    const {errors} = formState;

  const onSubmit = useCallback(async (formValues: object) => {
    try {
      await axios.put('/api/user', formValues);
      setShow(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
     } catch (error: any) {
      console.error('Error in the auth submit function: ' + error);
      throw new Error(error);
     }

  },[router])

  const onDelete = useCallback(async (e:any ) => {
    try {
      e.preventDefault();
      await axios.delete('/api/user', {data: {email: data?.email}});
      await signOut();
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
     } catch (error: any) {
      console.error('Error in the auth submit function: ' + error);
      throw new Error(error);
     }

  },  [data?.email, router])

  return (
    <div className="bg-black py-4 px-10 rounded-lg items-center w-5/6 md:w-3/4 lg:w-3/5 m-auto content-center">
          <h1 className='text-xl md:text-3xl font-bold mb-10'>Account Settings</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input disabled error={errors['email']?.message} register={register} getValues={() => getValues()} placeholder="email"/>
                  <Input disabled isPassword error={errors['password']?.message} register={register} getValues={() => getValues()} placeholder="password" />
                  <Input error={errors['firstName']?.message} register={register} getValues={() => getValues()} placeholder="firstName" />
                  <Input error={errors['lastName']?.message} register={register} getValues={() => getValues()} placeholder="lastName" />
                </div>
                  <div className='flex'>
                    <button type="submit" className="w-fit mt-10 bg-blue-700 text-white px-2 py-3 rounded-md text-sm font-bold transition hover:bg-blue-600">
                      Update Account
                    </button>
                    <button onClick={onDelete} className="w-fit mt-10 ml-5 bg-red-700 text-white px-2 py-3 rounded-md text-sm font-bold transition hover:bg-red-600">
                      Delete Account
                    </button>
                </div>
              </form>
               <Alert title="Updated!" description="Your information has been updated!" type="success" show={show} setShow={setShow}  />
            </div>
  )
}

export default AccountPaper