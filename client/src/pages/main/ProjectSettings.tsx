import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import CreateUpdateProject, {
  IProjectForm,
} from '../../components/Forms/CreateUpdateProject';
import { UPDATE_PROJECT } from '../../graphql/project_mutations';
import { GET_PROJECTS } from '../../graphql/project_query';

interface IProjectProps {
  project: {
    category: string;
    createdAt: string;
    description: string;
    id: string;
    name: string;
    __typename: string;
  };
}

const ProjectSettings = ({ project }: IProjectProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProjectForm>();

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: GET_PROJECTS,
      });
      proxy.writeQuery({
        query: GET_PROJECTS,
        data: {
          getProjects: data.getProjects.map((project: any) =>
            project.id === result.data.updateProject.id
              ? { ...project, ...result.data.updateProject }
              : project
          ),
        },
      });
    },
    onError(err: ApolloError) {
      console.error(err.graphQLErrors);
    },
  });
  return (
    <CreateUpdateProject
      updateForm
      defaultValues={project}
      callback={updateProject}
      loading={loading}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
    />
  );
};

export default ProjectSettings;
