import Calendar from "./components/Calendar";

function App() {
  const date = new Date("2023", "09", 30).getDate()
   console.log(date)
  return (
    <div className="App">
      <Calendar/>
    </div>
  );
}

export default App;
