import './App.css';
import Message from './components/Message';

function App({name}) {
  const messageText = "Добро пожаловать в React!";
  
  return (
    <div className="App">
      <h1>{name}</h1>
      <Message text={messageText} />
    </div>
  );
}

export default App;
