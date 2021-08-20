import './app.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import CreateExercise from './CreateExercise';
import CreateUser from './CreateUser';
import EditExercise from './EditExercise';
import ExerciseList from './ExerciseList';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Route path="/exercises" component={ExerciseList}/>
        <Route path="/update/:id" component={EditExercise}/>
        <Route path="/add_exercise" component={CreateExercise}/>
        <Route path="/users/add" component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;