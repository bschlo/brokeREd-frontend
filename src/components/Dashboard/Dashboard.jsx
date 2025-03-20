import '../Dashboard/Dashboard.css'

const Dashboard = ({user}) => {

    return (
      <div className='dashboard-main'>
        <h1>Welcome, {user}</h1>
        <p>
          This is the dashboard page where you, and only you, can see a dashboard
          of all of your things.
        </p>
      </div>
    );
  };
  
  export default Dashboard;