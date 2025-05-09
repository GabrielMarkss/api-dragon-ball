import '../styles/planets.css';
import { useEffect, useState } from 'react';
import { Planets } from '../planets';
import { fetchPlanetList } from '../service/PlanetsService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

function Planet() {
  const [planets, setPlanets] = useState<Planets[]>([]);
  const [showTable, setShowTable] = useState(false); // controla visibilidade

  useEffect(() => {
    const getPlanets = async () => {
      const result = await fetchPlanetList();
      setPlanets(result);
    };
    getPlanets();
  }, []);

  const imageTemplate = (planet: Planets) => (
    <Avatar image={planet.image} shape="circle" size="large" />
  );

  const destroyedTemplate = (planet: Planets) => (
    <span
      className={`badge ${planet.isDestroyed ? 'bg-red-500' : 'bg-green-500'} text-white p-2 rounded`}
    >
      {planet.isDestroyed ? 'Destruído' : 'Ativo'}
    </span>
  );

  return (
    <div className="planet-page">
      <h2 className="planet-title">Planetas do Universo Dragon Ball</h2>
      <p className="planet-subtitle">Explore os mundos mais famosos da série.</p>

      <div className="planet-button">
        <Button
          label={showTable ? 'Fechar tabela de Planetas' : 'Abrir tabela de Planetas'}
          icon={showTable ? 'pi pi-eye-slash' : 'pi pi-eye'}
          onClick={() => setShowTable(!showTable)}
        />
      </div>

      {showTable && (
        <div className="planet-table">
          <DataTable value={planets} paginator rows={10}>
            <Column header="Imagem" body={imageTemplate}></Column>
            <Column field="name" header="Nome"></Column>
            <Column field="description" header="Descrição"></Column>
            <Column header="Estado" body={destroyedTemplate}></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
}

export default Planet;
