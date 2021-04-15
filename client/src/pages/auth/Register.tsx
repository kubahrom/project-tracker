import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../context/auth';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/user_mutations';
import { useAuthStyles } from '../../styles/muiStyles';
import {
  Email,
  EnhancedEncryption,
  Error,
  Lock,
  Person,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name must not be empty'),
  lastName: yup.string().required('Last name must not be empty'),
  email: yup
    .string()
    .required('Email must not be empty')
    .email('Email must be a valid email address'),
  password: yup
    .string()
    .required('Password must not be empty')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/,
      'Must contain 6 Characters, One Uppercase, One Lowercase and One Number'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password must not be empty')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  const classes = useAuthStyles();
  const [serverError, setServerError] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassComf, setShowPassComf] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({ resolver: yupResolver(schema) });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    onError(err: any) {
      setServerError(err.graphQLErrors[0].extensions.exception.errors.email);
    },
  });

  const onSubmit = (data: any) => {
    registerUser({ variables: data });
  };

  return (
    <div className={classes.formWrapper}>
      <Grid xs={12} item>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h3" component="h1" align="center">
              Sign Up
            </Typography>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className={classes.form}
            >
              <p>{serverError}</p>
              <div className={classes.inputFieldSmallWrapper}>
                <div className={classes.inputFieldSmall}>
                  <TextField
                    required
                    fullWidth
                    label="First name"
                    {...register('firstName')}
                    type="text"
                    variant="outlined"
                    error={errors.firstName ? true : false}
                    helperText={
                      errors.firstName ? errors.firstName.message : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person
                            color={errors.firstName ? 'error' : 'primary'}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className={classes.inputFieldSmall}>
                  <TextField
                    required
                    fullWidth
                    label="Last name"
                    {...register('lastName')}
                    type="text"
                    variant="outlined"
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName ? errors.lastName.message : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person
                            color={errors.lastName ? 'error' : 'primary'}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className={classes.inputField}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  {...register('email')}
                  type="email"
                  variant="outlined"
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color={errors.email ? 'error' : 'primary'} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  required
                  fullWidth
                  label="password"
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  variant="outlined"
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color={errors.password ? 'error' : 'primary'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPass(prevState => !prevState)}
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  required
                  fullWidth
                  label="Confirm password"
                  {...register('confirmPassword')}
                  type={showPassComf ? 'text' : 'password'}
                  variant="outlined"
                  error={errors.confirmPassword ? true : false}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EnhancedEncryption
                          color={errors.confirmPassword ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setShowPassComf(prevState => !prevState)
                          }
                        >
                          {showPassComf ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {serverError && (
                <Typography
                  variant="body1"
                  align="center"
                  color="error"
                  className={classes.generalErr}
                >
                  <Error fontSize="small" /> {serverError}
                </Typography>
              )}
              <div className={classes.inputField}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  startIcon={<PersonAdd />}
                  fullWidth
                  disabled={loading}
                  className={classes.btnSubmit}
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <Typography variant="body1" align="center">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Register;
