import { useState } from 'react';
import { usePersonContext } from './PersonContext';
import { states } from '../../assets/data/state';
import { departmentOptions} from '../../assets/data/departmentOptions';

const PersonForm = () => {
  const { addPerson } = usePersonContext();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerson({ name, department, state });
    setName('');
    setDepartment('');
    setState('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Department:
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departmentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        State:
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Person</button>
    </form>
  );
};

export default PersonForm;
