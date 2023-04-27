import { useState } from "react";
import "./App.css";
import { registerUser } from "./services/registerUser";
import { useForm } from "react-hook-form";

export function App() {
  const {register, handleSubmit, formState: {errors}} = useForm();

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState("");

  console.log(password)

  const onSubmit = (data) => {
    if (password !== passwordCheck) {
      setError("passwords do not match")
    }

    registerUser(data);
    console.log(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input type="email" placeholder="Email"
              {...register("email", {required: true, pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})}/>
          </label>
          {errors.email?.type === 'required' && <span className="error" role="alert">email is required</span>}
          {errors.email?.type === 'pattern' && <span className="error" role="alert">email is invalid</span>}
        </div>
        <div>
          <label>
            Name
            <input type="text" placeholder="Name"
            {...register("name", {required: true})} />
            {errors?.name && <span className="error" role="alert">name is required</span>}
          </label>
          
        </div>
        <div>
          <label>
            Age
            <input type="number" placeholder="Age" 
            {...register("age", {required: true, min:18})}  />
            {errors.age?.type === 'required' && <span className="error" role="alert">age is required</span>}
            {errors.age?.type === 'min' && <span className="error" role="alert">you must be above 18 to register</span>}
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" placeholder="Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            {...register("password", {required: true, minLength:5 })}/>
            {errors.password?.type === 'required' && <span className="error" role="alert">password is required</span>}
            {errors.password?.type === 'minLength' && <span className="error" role="alert">password is too short</span>}
          </label>
        </div>
        <div>
          <label>
            Password check
            <input type="password" placeholder="Password check"
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
            {...register("passwordCheck", {required: true, minLength:5  })} /> 
            {errors && <span className="error" role="alert">{error}</span>}
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox"
            {...register("check", {required: true})} />
            {errors?.check && <span className="error" role="alert">please read and accept the terms and conditions</span>}
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
