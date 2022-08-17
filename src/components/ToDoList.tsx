import { useForm } from 'react-hook-form';

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onValid = (data: IFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          type="text"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: `ex) 'account@email.com' Only formats are allowed`,
            },
          })}
          placeholder="Email"
        />
        {errors.email ? <span>{errors.email.message}</span> : null}
        <input
          type="text"
          {...register('firstName', { required: 'First Name is required' })}
          placeholder="First Name"
        />
        {errors.firstName ? <span>{errors.firstName.message}</span> : null}
        <input
          type="text"
          {...register('lastName', { required: 'Last Name is required' })}
          placeholder="Last Name"
        />
        {errors.lastName ? <span>{errors.lastName.message}</span> : null}
        <input
          type="text"
          {...register('userName', {
            required: 'Username is required',
            minLength: {
              value: 6,
              message: 'Username is must be at least 6 characters long',
            },
          })}
          placeholder="Username"
        />
        {errors.userName ? <span>{errors.userName.message}</span> : null}
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
          placeholder="Password"
        />
        {errors.password ? <span>{errors.password.message}</span> : null}
        <input
          type="password"
          {...register('passwordConfirm', {
            required: 'Password Confirm is required',
            minLength: 8,
          })}
          placeholder="Password Confirm"
        />
        {errors.passwordConfirm ? (
          <span>{errors.passwordConfirm.message}</span>
        ) : null}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
