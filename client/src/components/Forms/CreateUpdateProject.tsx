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
import { AddBox } from '@material-ui/icons';
import {
  Controller,
  UseFormHandleSubmit,
  UseFormRegister,
  Control,
  DeepMap,
  FieldError,
} from 'react-hook-form';
import { useCreateProjectStyles } from '../../styles/muiStyles';
import DeleteProjectBtn from './DeleteProjectBtn';

type ProjectCategoryType = '' | 'Software' | 'Marketing' | 'Business';

export interface IProjectForm {
  name: string;
  description: string;
  category: ProjectCategoryType;
  shared?: string[];
}

interface IDefaultValues {
  name: string;
  description?: string;
  category: string;
  shared?: string[];
  id?: string;
}

interface IProps {
  updateForm?: boolean;
  defaultValues?: IDefaultValues;
  callback: any;
  loading: boolean;
  errors: DeepMap<IProjectForm, FieldError>;
  register: UseFormRegister<IProjectForm>;
  handleSubmit: UseFormHandleSubmit<IProjectForm>;
  control: Control<IProjectForm>;
}

const CreateUpdateProject = ({
  updateForm,
  defaultValues,
  callback,
  register,
  handleSubmit,
  errors,
  control,
  loading,
}: IProps) => {
  const classes = useCreateProjectStyles();
  const onSubmit = (data: IProjectForm) => {
    if (updateForm) {
      const updatedData = {
        projectId: defaultValues?.id,
        name: data.name ? data.name : defaultValues?.name,
        description: data.description
          ? data.description
          : defaultValues?.description,
        category: data.category ? data.category : defaultValues?.category,
      };
      //FIXME: cannot update project because defaultValue is not counted in register useForm
      callback({ variables: updatedData });
    } else {
      callback({ variables: data });
    }
  };
  return (
    <Paper elevation={2}>
      <div className={classes.formWrapper}>
        <Typography variant="h4" component="h1">
          {updateForm
            ? `Update Project - ${defaultValues?.name}`
            : 'Create Project'}
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
              defaultValue={defaultValues?.name}
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
              defaultValue={defaultValues?.description}
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
                defaultValue={
                  defaultValues?.category ? defaultValues.category : ''
                }
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
              {updateForm ? 'Update Project' : 'Create project'}
            </Button>
          </div>
          {updateForm && (
            <DeleteProjectBtn
              projectId={defaultValues?.id ? defaultValues.id : ''}
              name={defaultValues?.name ? defaultValues.name : ''}
            />
          )}
        </form>
      </div>
    </Paper>
  );
};

export default CreateUpdateProject;
