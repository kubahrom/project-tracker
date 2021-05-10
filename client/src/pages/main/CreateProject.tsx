import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../graphql/projectMutations';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { useHistory } from 'react-router';
import { ProjectContext } from '../../context/project';
import CreateUpdateProject, {
  IProjectForm,
} from '../../components/Forms/CreateUpdateProject';

interface IProject {
  id: string;
}

interface IProjects {
  getProjects: IProject[];
}

type ProjectQueryType = IProjects | null;

const CreateProject: React.FC = () => {
  const history = useHistory();
  const { setSidebarState } = useContext(ProjectContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProjectForm>();

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    update(proxy, result) {
      const data: ProjectQueryType = proxy.readQuery({
        query: GET_PROJECTS,
      });
      if (data)
        proxy.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [result.data.createProject, ...data.getProjects],
          },
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
  return (
    <CreateUpdateProject
      callback={createProject}
      loading={loading}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
    />
  );
};

export default CreateProject;
