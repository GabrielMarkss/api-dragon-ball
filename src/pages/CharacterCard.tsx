import '../styles/characters.css';
import { Avatar } from 'primereact/avatar';
import { fetchCharacterList } from '../service/CharacterService';
import { Characters } from '../characters';
import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function Character() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [showTable, setShowTable] = useState(false); // controla visibilidade


  const imageBodyTemplate = (characters: Characters) => {
    return <Avatar image={characters.image} shape="circle" />;
  };

  useEffect(() => {
    const getCharacter = async () => {
      const result = await fetchCharacterList();
      setCharacters(result);
    };
    getCharacter();
  }, []);

  return (
    <div className="character-page">
    <h2 className="character-title">Personagens de Dragon Ball</h2>
    <p className="character-subtitle">Lista com os personagens mais icônicos.</p>

    <div className="character-button">
      <Button
        label={showTable ? 'Fechar tabela de Personagens' : 'Abrir tabela de Personagens'}
        icon={showTable ? 'pi pi-eye-slash' : 'pi pi-eye'}
        onClick={() => setShowTable(!showTable)}
      />
    </div>

    {showTable && (
      <div className="character-table">
        <DataTable value={characters} paginator rows={10}>
          <Column header="Imagem" body={imageBodyTemplate}></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="gender" header="Gênero"></Column>
          <Column field="race" header="Raça"></Column>
          <Column field="affiliation" header="Afiliação"></Column>
        </DataTable>
      </div>
    )}
  </div>
  );
}

export default Character;
