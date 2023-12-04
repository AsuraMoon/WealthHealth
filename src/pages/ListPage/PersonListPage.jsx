import { usePersonContext } from '../../store/PersonContext';

const PersonListPage = () => {
  const { people } = usePersonContext();

  return (
    <div>
      <h1>Person List</h1>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonListPage;
