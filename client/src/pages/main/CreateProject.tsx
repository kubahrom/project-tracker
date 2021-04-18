import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { useCreateProjectStyles } from '../../styles/muiStyles';
import { useForm, Controller } from 'react-hook-form';
import { AddBox } from '@material-ui/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../graphql/project_mutations';
import { GET_PROJECTS } from '../../graphql/project_query';
import { useHistory } from 'react-router';
import { ProjectContext } from '../../context/project';

type ProjectCategoryType = '' | 'Software' | 'Marketing' | 'Business';

interface ICreateProjectForm {
  name: string;
  description: string;
  category: ProjectCategoryType;
}

const CreateProject: React.FC = () => {
  const classes = useCreateProjectStyles();
  const history = useHistory();
  const { setSidebarState } = useContext(ProjectContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateProjectForm>();

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: GET_PROJECTS,
      });
      proxy.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: [result.data.createProject, ...data.getProjects] },
      });
      setSidebarState({
        currProject: `${result.data.createProject.id}`,
        projectAction: 'board',
      });
      history.push(`/project/${result.data.createProject.id}`);
    },
    onError(err: ApolloError) {
      console.error(err);
    },
  });

  const onSubmit = (data: ICreateProjectForm) => {
    createProject({ variables: data });
  };
  return (
    <Paper elevation={2}>
      <div className={classes.formWrapper}>
        <Typography variant="h4" component="h1">
          Create Project
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.form}
        >
          <div className={classes.inputField}>
            <TextField
              fullWidth
              required
              label="Name"
              {...register('name', {
                required: 'Name of the project must not be empty',
              })}
              type="text"
              variant="outlined"
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : ''}
            />
          </div>
          <div className={classes.inputField}>
            <TextField
              fullWidth
              label="Description"
              {...register('description')}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
          <div className={classes.inputField}>
            <FormControl
              variant="outlined"
              fullWidth
              required
              error={errors.category ? true : false}
            >
              <InputLabel id="project-category-select">
                Project Category
              </InputLabel>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: 'Project category must not be empty' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="project-category-select"
                    label="Project Category"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes.inputField}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              startIcon={<AddBox />}
              fullWidth
              className={classes.btnSubmit}
              disabled={loading}
            >
              Create project
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default CreateProject;
