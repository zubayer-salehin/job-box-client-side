import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";


const EmployerRegistration = () => {

  const { user: { email } } = useSelector(state => state.auth)
  const { handleSubmit, register, control, reset } = useForm({ defaultValues: { email } });
  const term = useWatch({ control, name: "term" });
  const navigate = useNavigate();
  const [postUser] = useRegisterMutation();


  const numberOfPeople = [
    "Above 100",
    "Above 200",
    "Above 300",
    "Above 400",
    "Above 500",
    "Above 600",
    "Above 700",
    "Above 800",
    "Above 900",
    "Above 1000"
  ];

  const category = [
    "Education",
    "Doctor",
    "Engineer",
    "Farmer"
  ];

  const onSubmit = (data) => {
    postUser({ ...data, role: "employer" })
    toast.success("Successfully Create Employer Account")
    reset()
    navigate("/");
  };

  return (
    <div className='pt-14'>
      <div
        onClick={() => navigate("/register")}
        className='cursor-pointer w-fit mt-5 flex items-center'
      >
        <FaChevronLeft />
        <p>back</p>
      </div>
      <div className='flex justify-center items-center overflow-auto p-10'>
        <form
          className='bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='w-full text-2xl text-primary mb-5'>Employer</h1>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='firstName'>
              First Name
            </label>
            <input type='text' id='firstName' {...register("firstName")} />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='lastName'>
              Last Name
            </label>
            <input type='text' id='lastName' {...register("lastName")} />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='email'>
              Email
            </label>
            <input className="cursor-not-allowed" type='email' id='email' {...register("email")} disabled />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <h1 className='mb-3'>Gender</h1>
            <div className='flex gap-3'>
              <div>
                <input
                  type='radio'
                  id='male'
                  {...register("gender")}
                  value='male'
                />
                <label className='ml-2 text-lg' for='male'>
                  Male
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='female'
                  {...register("gender")}
                  value='female'
                />
                <label className='ml-2 text-lg' for='female'>
                  Female
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='other'
                  {...register("gender")}
                  value='other'
                />
                <label className='ml-2 text-lg' for='other'>
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className='w-full mt-2 bg-black' />
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='address'>
              Company's Name
            </label>
            <input type='text' {...register("companyName")} id='companyName' />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-3' for='country'>
              Number of Employee
            </label>
            <select {...register("numberOfEmployee")} id='numberOfEmployee'>
              {numberOfPeople.map((people) => (
                <option value={people}>{people}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-3' for='country'>
              Company's Category
            </label>
            <select {...register("category")} id='category'>
              {category.map((people) => (
                <option value={people}>{people}</option>
              ))}
            </select>
          </div>
          <div className='flex justify-between items-center w-full mt-3'>
            <div className='flex  w-full max-w-xs'>
              <input
                className='mr-3'
                type='checkbox'
                {...register("term")}
                id='terms'
              />
              <label for='terms'>I agree to terms and conditions</label>
            </div>
            <button disabled={!term} className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;
