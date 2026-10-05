import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { fetchModels } from '../api';
import { ModelList } from '../components/ModelList';
import { TaskFilter } from '../components/TaskFilter';
import type { Task } from '../model';

/**
 * Given. The catalogue, at /: the App of TP7, part 3, without its header,
 * which is now the same for every page.
 */
export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const task=(searchParams.get('task') ?? undefined) as Task | undefined;
  const setTask = (newTask: Task | undefined) => {
    setSearchParams(newTask ? { task: newTask } : {});
  };
  // The key plays the role of the dependency array: a new task, a new query.
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['models', task],
    queryFn: () => fetchModels(task),
  });

  return (
    <>
      <TaskFilter value={task} onChange={setTask} />

      {isPending && (
        <p className="status" role="status">
          Chargement…
        </p>
      )}
      {isError && (
        <div className="error" role="alert">
          <span>Impossible de charger le catalogue&nbsp;: {error.message}</span>
        </div>
      )}
      {data && <ModelList models={data} />}
    </>
  );
};
