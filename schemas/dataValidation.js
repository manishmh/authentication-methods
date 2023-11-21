import * as yup from 'yup';

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8)
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
    'Password must contain atleast one uppercase, lowecase, number and unique symbol'
  )
  .required(),
});

export { userSchema };
