import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ApiError, fetchModel } from '../api';
import { TASK_LABELS } from '../model';
import { formatParameters } from '../format';

const formatNumber = (value: number) => new Intl.NumberFormat('fr-FR').format(value);
/**
 * The page of one model, at /models/:id.
 *
 * TODO step 3: the <a href> becomes a <Link to>.
 *
 * TODO step 4. Below, the mockup: written by hand, for Mistral. Make it show
 * the model of the URL.
 *   - the id in the URL: useParams
 *   - the model: useQuery, with the key ['model', id] and fetchModel(id)
 *   - the three states, like CatalogPage. A 404 of the API: "Modèle introuvable."
 *   - the numbers with format.ts, the task with TASK_LABELS
 *   - no licence: "Non précisée". No createdBy: no "Ajouté par" line
 */
export const ModelPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: model, error , isPending , isError} = useQuery({
    queryKey:['model',id],
    queryFn: () => fetchModel(id!),
  });
  const navigate = useNavigate();
  return (
    <section className="page">
    <button type="button" className="back" onClick={() => navigate(-1)}>
       ← Retour
    </button>
      {isPending && (
       <p className="status" role="status">
        Chargement…
       </p>
      )}
      {isError && <p role="alert">
        {error instanceof ApiError && error.status === 404
          ? 'Modèle introuvable.'
          : `Impossible de charger le modèle : ${error.message}`}
      </p>}
      {model && (
      <article className="detail">
        <title>{model.name}</title>
        <header className="detail-header">
          <h2 className="detail-title">{model.name}</h2>
          <span className="badge">{TASK_LABELS[model.task]}</span>
        </header>

          <dl className="detail-fields">
            <div>
             <dt>Organisation</dt>
             <dd>{model.org}</dd>
           </div>
            <div>
              <dt>Identifiant</dt>
              <dd>{model.id}</dd>
            </div>
            <div>
              <dt>Paramètres</dt>
              <dd>{formatParameters(model.parameters)}</dd>
            </div>
            <div>
              <dt>Téléchargements</dt>
              <dd>{formatNumber(model.downloads)}</dd>
            </div>
            <div>
              <dt>Licence</dt>
              <dd>{model.license ?? "Non précisée"}</dd>
            </div>
            {model.createdBy && (
              <div>
                <dt>Ajouté par</dt>
                <dd>{model.createdBy}</dd>
              </div>
            )}
          </dl>
        </article>
      )}
    </section>
  );
};
