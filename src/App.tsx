
import { useForm, type SubmitHandler } from 'react-hook-form';
import './App.scss';
import { Checkbox } from './Checkbox';
import { useEffect } from 'react';

export interface Iform {
  firstName: string;
  lastName: string;
  message: string;
  isImportant?: boolean;
}

function App() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<Iform>({ mode: 'onBlur' });

  const watchFirstName = watch('firstName');

   useEffect(() => {
     console.log(`Email field value changed: ${watchFirstName}`);
   }, [watchFirstName]);

  useEffect(() => {
    // При первом рендере приходит обект с backend
    reset({
      lastName: 'Pop@gmail.com',
      message: 'Hello, this is a test message!',
    });
  }, [reset]);

  const onSubmit: SubmitHandler<Iform> = (data) => {
   console.log(data)
   reset();
    
  };
  // console.log('isValid', isValid);
  
  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First Name"
          {...register('firstName', {
            required: 'Заполни поле!',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
        {errors?.firstName && <p>{errors?.firstName?.message || 'Error!'}</p>}
        <input
          type="text"
          placeholder="Last Name"
          {...register('lastName', {
            required: 'Заполни поле!',
            minLength: {
              value: 5,
              message: 'Минимум 5 символа',
            },
          })}
        />
        {errors?.lastName && <p>{errors?.lastName?.message || 'Error!'}</p>}
        <textarea
          placeholder="Enter message:"
          {...register('message',{
            required: 'This field is required',
            minLength: {
              value: 10,
              message: 'Минимум 10 символов',
            },
          })}
        ></textarea>
        {errors?.message && <p>{errors?.message?.message || 'Error!'}</p>}

        {/* можно сделать через useFormContext() чтобы не пробрасывать пропсами */}
        <Checkbox control={control} />
        <button
          type="submit"
          disabled={!isValid}
          style={!isValid ? { backgroundColor: 'gray' } : {}}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default App;
