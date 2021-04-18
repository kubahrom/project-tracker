import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../graphql/project_mutations';
import { GET_PROJECTS } from '../../graphql/project_query';
import { useHistory } from 'react-router';
import { ProjectContext } from '../../context/project';
import CreateUpdateProject, {
  IProjectForm,
} from '../../components/Forms/CreateUpdateProject';

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
