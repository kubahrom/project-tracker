import React, { useState, useContext } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { AuthContext } from '../../context/auth';
import { useAuthStyles } from '../../styles/muiStyles';
import {
  VisibilityOff,
  Visibility,
  ExitToApp,
  Error,
} from '@material-ui/icons';
import { LOGIN_USER } from '../../graphql/user_mutations';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

interface ILoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email must not be empty')
    .email('Email must be a valid email address'),
  password: yup.string().required('Password must not be empty'),
});

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  const classes = useAuthStyles();
  const [serverError, setServerError] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(schema) });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
    },
    onError(err: ApolloError) {
      if (err.graphQLErrors[0].extensions) {
        setServerError(
          err.graphQLErrors[0].extensions.exception.errors.general
        );
      }
    },
  });

  const onSubmit = (data: ILoginForm) => {
    loginUser({ variables: data });
  };

  return (
    <div className={classes.formWrapper}>
      <Grid xs={12} item>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h3" component="h1" align="center">
              Sign In
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={classes.form}
            >
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
                        <PersonIcon
                          color={errors.email ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  variant="outlined"
                  autoComplete="on"
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          color={errors.password ? 'error' : 'primary'}
                        />
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
                  startIcon={<ExitToApp />}
                  fullWidth
                  disabled={loading}
                  className={classes.btnSubmit}
                >
                  Sign In
                </Button>
              </div>
            </form>
            <Typography variant="body1" align="center">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register">
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Login;
